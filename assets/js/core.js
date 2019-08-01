class Player {
  constructor(name) {
    this.name = name,
      this.where = [],
      this.backpack = []
  }

  search() {
    if (!actualLocalization.objects || actualLocalization.objects.length === 0) {
      $historyBoard.innerText = 'Nothing usefull here!\n\n';
      return;
    }
    let objectsInScenario = '';

    actualLocalization.objects.forEach((element, index) => {
      if (index === 0) {
        objectsInScenario = 'a ' + element.name;
      } else if (index != actualLocalization.objects.length - 1 && index === 0) {
        objectsInScenario += 'a ' + element.name;
      } else if (index != actualLocalization.objects.length - 1) {
        objectsInScenario += ', a ' + element.name;
      } else {
        objectsInScenario += ' and a ' + element.name;
      }
    });

    $historyBoard.innerText = `Here is ${objectsInScenario}!\n\n`;
  }

  look() {
    $historyBoard.innerText = actualLocalization.description;
  }

  help() {
    document.querySelector('#container').classList.add('addBlur');
    $('#examine-modal').modal('show');
    document.querySelector('#examine-modal__body').innerHTML += `<div class="row">
      <div class="col-md-12">
        <h1>How to play</h1>
        <p>The game is basically an interactive story where we create our character through commands and actions as follows:</p>
      </div>
      <div class="col-md-4">
        <p>Exploration</p>
        <ul class="help-list">
          <li><u>look</u>: describes the environment you are</li>
          <li><u>search</u>: looking for something that is not evident</li>
          <li><u>examine</u>: examines something that is in your backpack</li>
        </ul>
      </div>
      <div class="col-md-4">
        <p>Navigation</p>
        <ul class="help-list">
          <li><u>go to</u>: move our character across the game map, through the scenarios</li>        
          <li><u>call</u>: Used to call a taxi or uber!</li>        
        </ul>
      </div>
      <div class="col-md-4">
        <p>Interation</p>
        <ul class="help-list">
          <li><u>get</u>: take something from the scenery and put it in your backpack</li>
          <li><u>drop</u>: remove something from the backpack</li>
        </ul>
      </div>
      <div class="col-md-12">
          <h1>Puzzles</h1>
          <p>There are also some puzzles and other commands that you must discover to advance the game.</p>
          <p>Have a good time :)</p>
      </div>
    </div>`
  }

  examine(object) {
    if (backpack === [] || !object) {
      $historyBoard.innerText = 'Nothing usefull to examinate!\n\n';
      return;
    }

    const test = this.backpack.find((elem) => {
      if (elem.name == object) {
        return elem;
      }
    })

    if (test) {
      document.querySelector('#container').classList.add('addBlur');
      $('#examine-modal').modal('show');
      document.querySelector('#examine-modal__body').innerHTML += `<div class="row">
        <div class="col-md-7">
          <img src="${test.urlExamine}" alt="${test.name}" >
        </div>
        <div class="col-md-5">
            <h1>${test.name}</h1>
            <p>${test.description}</p>
        </div>
      </div>`
    } else {
      $historyBoard.innerText = `You dont have a ${object}\n\n`;
    }

  }

  lookBackpack() {
    if (this.backpack.length === 0) {
      $historyBoard.innerText = 'There nothing in your backpack!\n\n'
      return;
    }
    let objectsInBackpack = '';

    this.backpack.forEach((element, index) => {
      if (index === 0) {
        objectsInBackpack = 'a ' + element.name;
      } else if (index != this.backpack.length - 1 && index === 0) {
        objectsInBackpack += 'a ' + element.name;
      } else if (index != this.backpack.length - 1) {
        objectsInBackpack += ', a ' + element.name;
      } else {
        objectsInBackpack += ' and a ' + element.name;
      }
    });

    $historyBoard.innerText = `Inside your backpack has ${objectsInBackpack}!\n\n`;

  }

  get(object) {
    if (!actualLocalization.objects) {
      $historyBoard.innerText = 'Nothing usefull here!\n\n';
      return;
    }

    if (object === 'key') {
      actualLocalization.objects.push(object);
      this.updateBackpack();
      this.goto('key');
      return;
    }

    const test = actualLocalization.objects.find((elem, index) => {
      if (elem.name == object) {
        return player.backpack.push(actualLocalization.objects.splice(index, 1)[0]);
      }
    })

    if (test) {
      $historyBoard.innerText = `You took a ${object}\n\n`;
      this.updateBackpack();
    } else {
      $historyBoard.innerText = `The ${object} doens't exist in scenario\n\n`;
    }
  }

  drop(object, puzzle) {
    if (!this.backpack || this.backpack.length === 0) {
      $historyBoard.innerText = 'There nothing in your backpack!\n\n';
      return;
    }

    if (object === 'coin' && puzzle == true) {
      for (let i = 0; i < this.backpack.length; i += 1) {
        if (this.backpack[i].name == object) {
          actualLocalization.objects.push(player.backpack.splice(i, 1));
          this.updateBackpack();
          this.goto('omikuji');
          return;
        }
      }
    }

    if (object === 'candles' && puzzle == true) {
      for (let i = 0; i < this.backpack.length; i += 1) {
        if (this.backpack[i].name == object) {
          actualLocalization.objects.push(player.backpack.splice(i, 1));
          this.updateBackpack();
          this.goto('secret');
          return;
        }
      }
    }

    const test = this.backpack.find((elem, index) => {
      if (elem.name == object) {
        return actualLocalization.objects.push(player.backpack.splice(index, 1)[0]);
      }
    })

    if (test) {
      $historyBoard.innerText = `You droped a ${object}\n\n`;
      this.updateBackpack();
    } else {
      $historyBoard.innerText = `The ${object} doens't exist in backpack\n\n`;
    }
  }

  updateBackpack() {
    document.querySelector('#backpack').innerHTML = '';
    for (let i = 0; i < this.backpack.length; i += 1) {
      document.querySelector('#backpack').innerHTML += `<li class="backpack-item"><img src="${this.backpack[i].url}" alt="${this.backpack[i].name}">${this.backpack[i].name}</li>`
    }
  }

  goto(path) {
    if (!path) {
      return $historyBoard.innerText = `Sorry, i don't understand! Let's try again?`;
    }
    actualLocalization.directions.find((item) => {
      if (item.name !== path) {
        return;
      }
      actualLocalization = map[item.idNextScenario];
      $scenario.src = actualLocalization.image;
      $historyBoard.innerText = actualLocalization.description;
    });
  }

}


const map = [
  { id: 0, name: 'GoodBye', directions: [{name: 'nextScene', idNextScenario: 1}], objects: [], description: 'Our story begins with a funeral… \n\nOur character has just lost his parents in an accident and is completely alone', image: 'assets/image/scenes/image01.jpg' },
  { id: 1, name: 'Home', directions: [{name: 'nextScene', idNextScenario: 2}], objects: [], description: 'That same rainy night, looking through the old family photos, you find a different envelope.', image: 'assets/image/scenes/image02.jpg' },
  { id: 2, name: 'Desk', directions: [{name: 'nextScene', idNextScenario: 3}], objects: [], description: 'There are several ideograms in the Japanese language.\n\n“Strange, I have never seen that!”', image: 'assets/image/scenes/image03.jpg' },
  { id: 3, name: 'Envelope', directions: [{name: 'nextScene', idNextScenario: 4}], objects: [{name: 'painting', url: 'assets/image/backpack/painting.svg', urlExamine: 'assets/image/examine/painting.jpg', description: "It is an old painting, there are incomprehensible inscriptions for you on it. But the drawing is a monkey running away from other animals, it looks like the monkey stole something from them ..."}], description: 'By breaking the seal and opening the package, you discover a very old painting.\n\nLooks like something else is in the envelope', puzzle: {status: false, solution: 'look envelope', reward: 'postal card'}, image: 'assets/image/scenes/image04.jpg' },
  { id: 4, name: 'Postcard', directions: [{name: 'nextScene', idNextScenario: 5}], objects: [{name: 'postcard', url: 'assets/image/backpack/postcard.svg', urlExamine: 'assets/image/examine/postcard.jpg', description: "It's a simple postcard to say “I found the meaning… Meet me at Toganōsan Kōsan-ji Temple (栂 尾 山 高 山寺). Signed H ”on the back, written by beautiful handwriting and a 1990 Osaka stamp"}], description: 'Looking inside the envelope, you discover a postcard with something written on its back.', image: 'assets/image/scenes/image05.jpg' },
  { id: 5, name: 'Leaving', directions: [{name: 'nextScene', idNextScenario: 6}], objects: [], description: 'Motivated by the sudden discovery and needing time to recover, you decide to take a trip to Japan to understand this mystery. ”', image: 'assets/image/scenes/image07.jpg' }, 

  { id: 6, name: 'Japan', directions: [{name: 'nextScene', idNextScenario: 7}], objects: [], description: 'When you arrive at Osaka Airport, you take a taxi to the hotel and after check-in you sleep for 12 hours straight.', image: 'assets/image/scenes/image08.jpg' },
  { id: 7, name: 'Restaurant', directions: [{name: 'nextScene', idNextScenario: 8}], objects: [], description: 'You wake up hungry and decide to go to the hotel restaurant for a bite to eat. And then back to the room.', image: 'assets/image/scenes/image06.jpg' },
  { id: 8, name: 'Room', directions: [{name: 'leave', idNextScenario: 9}, {name: 'right', idNextScenario: 0}], objects: [{name: 'envelope', url: 'assets/image/backpack/envelope.svg', urlExamine: 'assets/image/examine/envelope.jpg', description: "Inside the envelope is a rectangular piece of paper written in your language with a typewriter: “Tsuji of the monument (Mino Road + Yamada highway)”.\n\nAfter a quick Google search you find an address and that is a monument."}], description: 'The room where you are is very simple, the maid is already gone because the bed is made up, however something about her, an envelope ...\n\nWhat will you do?', image: 'assets/image/scenes/image09.jpg' },
  { id: 9, name: 'Lobby', directions: [{name: 'hall', idNextScenario: 10}, {name: 'enter', idNextScenario: 8}], objects: [], description: 'You are outside your room in the hotel lobby. The hotel hall is just ahead', image: 'assets/image/scenes/image10.jpg' },
  { id: 10, name: 'Hall', directions: [{name: 'street', idNextScenario: 12}, {name: 'leave', idNextScenario: 12}, {name: 'reception', idNextScenario: 11}, {name: 'right', idNextScenario: 11}, {name: 'lobby', idNextScenario: 9}], objects: [], description: 'You are in the hotel hall, opposite the street, on your right is the reception or you can go back to the lobby', image: 'assets/image/scenes/image11.jpg' },
  { id: 11, name: 'Reception', directions: [{name: 'hall', idNextScenario: 10}, {name: 'left', idNextScenario: 10}, {name: 'lobby', idNextScenario: 9}], objects: [{name: 'coin', url: 'assets/image/backpack/coin.svg', urlExamine: 'assets/image/examine/coin.jpg', description: "It's a different currency than the yen you saw, it looks older. It must be a commemorative coin."}], description: 'It is a small and very simple reception, there is a computer, a telephone and nothing else. Apparently there is no one here.', image: 'assets/image/scenes/image11b.jpg' },
  { id: 12, name: 'Street', directions: [{name: 'left', idNextScenario: 13}, {name: 'right', idNextScenario: 14}, {name: 'enter', idNextScenario: 11},{name: 'uber', idNextScenario: 15}], objects: [], description: "We are in front of the hotel. It's a simple building with a few floors, maybe 5 or 6 floors.\n\n You can enter the building, follow the street to the left or to the right.", image: 'assets/image/scenes/image12.jpg' },
  { id: 13, name: 'Street left', directions: [{name: 'uber', idNextScenario: 15}, {name: 'right', idNextScenario: 12}, {name: 'hall', idNextScenario: 11},{name: 'uber', idNextScenario: 15}], objects: [], description: "We drove a couple of blocks from the hotel, I think it'll be a little hard to get to the paper address of this walking.", image: 'assets/image/scenes/image13.jpg' },
  { id: 14, name: 'Street right', directions: [{name: 'uber', idNextScenario: 15}, {name: 'left', idNextScenario: 12}, {name: 'hall', idNextScenario: 11},{name: 'uber', idNextScenario: 15}], objects: [], description: "We come to a fork where in front of us is a river. Wouldn't it be better to drive?", image: 'assets/image/scenes/image14.jpg' },
  { id: 15, name: 'Uber', directions: [{name: 'uber', idNextScenario: 17}, {name: 'hotel', idNextScenario: 12}, {name: 'park', idNextScenario: 16}, {name: 'ask', idNextScenario: 16}], objects: [], description: "You go down to the address indicated on the envelope paper. It's a corner and there is a stone pillar monument with some words you don't understand and a figure of a priest holding a ringed cane and on his kimono we can see an insignia that looks familiar…\n\nIt would be interesting to ask to someone what is written here!", image: 'assets/image/scenes/image15.jpg' },
  { id: 16, name: 'Token', directions: [{name: 'hotel', idNextScenario: 12}, {name: 'uber', idNextScenario: 17}], objects: [], description: "You ask some cops coming towards you, one of them visibly in a hurry babbling the words 'Hattori ... Park' and walking away. Looks like there's something urgent going on near here ...\n\nHow do we get to the park?", image: 'assets/image/scenes/image16.jpg' },

  { id: 17, name: 'Park', directions: [{name: 'east', idNextScenario: 18},{name: 'oest', idNextScenario: 21},{name: 'uber', idNextScenario: 15}], objects: [], description: "The size of the park really surprised you. Looking at the map right at the entrance you can see that the whole park is actually a large open-air museum, as well as numerous annexes with football pitches, baseball fields, an aquatic center and even a horse riding center! two ways to go east and west", image: 'assets/image/scenes/image17.jpg' },
  { id: 18, name: 'Park East', directions: [{name: 'east', idNextScenario: 19},{name: 'front', idNextScenario: 19},{name: 'oest', idNextScenario: 17},{name: 'back', idNextScenario: 17}], objects: [{name: 'stone', url: 'assets/image/backpack/stone.svg', urlExamine: 'assets/image/examine/stone.jpg',  description: "It's a flat stone about 10 centimeters, great for throwing on the surface of a lake and watching it bounce!"}], description: "On the east trail there is a stone trail surrounded by cherry trees, at the end there is an old house that is part of the museum", image: 'assets/image/scenes/image18.jpg' },
  { id: 19, name: 'First house', directions: [{name: 'enter', idNextScenario: 20},{name: 'oest', idNextScenario: 18}], objects: [{name: 'rope', url: 'assets/image/backpack/rope.svg', urlExamine: 'assets/image/examine/rope.jpg',  description: "It is a piece of rope approximately 2 meters"}], description: "It's a high-ceilinged, one-story house, typical of Edo-era Japan (that's what the map said!)", image: 'assets/image/scenes/image19.jpg' },
  { id: 20, name: 'First house - inside', directions: [{name: 'leave', idNextScenario: 19}, {name: 'omikuji', idNextScenario: 32}], objects: [{name: 'candles', url: 'assets/image/backpack/candles.svg', urlExamine: 'assets/image/examine/candles.jpg', description: "You got two candles about 10 centimeters high and about 4 in diameter"}], description: "You can see a smooth, well-polished (albeit old-fashioned) wooden floor in the center of the main room an opening in the floor with a handful of sand and a kind of fireplace. \ NThere are many candles on display on a shelf and no one by here to sell them ...", image: 'assets/image/scenes/image20.jpg' },
  { id: 21, name: 'Park Oest', directions: [{name: 'oest', idNextScenario: 22},{name: 'front', idNextScenario: 22},{name: 'east', idNextScenario: 17},{name: 'back', idNextScenario: 17}], objects: [], description: "You decide to go west towards the Museum headquarters.", image: 'assets/image/scenes/image21.jpg' },
  { id: 22, name: 'Park Oest 2', directions: [{name: 'oest', idNextScenario: 23},{name: 'trail', idNextScenario: 25},{name: 'enter', idNextScenario: 25},{name: 'east', idNextScenario: 21}], objects: [{name: 'stick', url: 'assets/image/backpack/stick.svg', description: "It is a stick, almost one meter high and very resistant ..."}], description: "The path is very wide, has a lawn on your right while on your left a forest, in the distance we can see a lake and the headquarters building next to it. Looking to your left more closely there is something like an entry in the woods.", image: 'assets/image/scenes/image22.jpg' },
  { id: 23, name: 'Big house', directions: [{name: 'enter', idNextScenario: 24},{name: 'east', idNextScenario: 22}], objects: [], description: "You are in front of the headquarters of the Japanese People's Village Museum. It is a large building, similar to smaller ones, but it seems that there are more rooms there.", image: 'assets/image/scenes/image23.jpg' },
  { id: 24, name: 'Big house - inside', directions: [{name: 'leave', idNextScenario: 23}], objects: [], description: "You are in the lobby, there you will find some typical objects on display. After a quick search, you find nothing unusual. Even because the rooms are locked or locked preventing a better search.", image: 'assets/image/scenes/image24.jpg' },
  
  { id: 25, name: 'The trail1', directions: [{name: 'front', idNextScenario: 26},{name: 'back', idNextScenario: 22}], objects: [], description: "It really doesn't look like a trail, as there is no visible way forward. What do you intend to do, keep going, or come back?", image: 'assets/image/scenes/image25.jpg' },
  { id: 26, name: 'The trail2', directions: [{name: 'front', idNextScenario: 27},{name: 'back', idNextScenario: 25}], objects: [], description: "The forest is getting thicker and you can barely tell where it came from. This is starting to get really dangerous ... What do you intend to do?", image: 'assets/image/scenes/image26.jpg' },
  { id: 27, name: 'The trail3', directions: [{name: 'front', idNextScenario: 28},{name: 'back', idNextScenario: 26}], objects: [{name: 'lighter', url: 'assets/image/backpack/lighter.svg', urlExamine: 'assets/image/examine/lighter.jpg', description: "It's a traditional Zippo lighter that still has fluid!"}], description: 'In the distance you can see a kind of clearing ... Will we keep moving on or back?', image: 'assets/image/scenes/image27.jpg' },
  { id: 28, name: 'The temple', directions: [{name: 'enter', idNextScenario: 29},{name: 'back', idNextScenario: 27}], objects: [], description: 'In the center of the clearing you will find a tiny temple, reserved for small offerings and prayers.', image: 'assets/image/scenes/image28.jpg' },
  { id: 29, name: 'The altar', directions: [{name: 'back', idNextScenario: 28},{name: 'secret', idNextScenario: 30}], objects: [], description: "You take a closer look at the altar and find that the monk's kimono insignia of the street monument is the same as the one in the center of the altar, there are also two vases ...", image: 'assets/image/scenes/image29.jpg' },
  { id: 30, name: 'The secret', directions: [{name: 'key', idNextScenario: 31},{name: 'back', idNextScenario: 29}], objects: [], description: "Placing the candles in the pots you hear a mechanism activate and the badge opens revealing a small compartment with a key inside !!!", image: 'assets/image/scenes/image30.jpg' },
  { id: 31, name: 'The key', directions: [], objects: [], description: "Congratulations, you have finished the Torii game prologue, soon we will be releasing new chapters. \n\n Thanks so much !!!", image: 'assets/image/scenes/image31.jpg' },
  { id: 32, name: 'The omikuji', directions: [{name: 'leave', idNextScenario: 19},{name: 'back', idNextScenario: 19}], objects: [{name: 'omikuji', url: 'assets/image/backpack/omikuji.svg', urlExamine: 'assets/image/examine/omikuji.jpg', description: "Omikuji (お み く じ) is a strip of paper containing random luck. Omikuji has existed for almost a thousand years. This ritual is believed to have begun due to the custom of asking the gods, opinions and predictions for decision making. Thus, this practice has evolved into a way of showing people's fortunes, making predictions for the future.\n\nIn your Omikuji, it reads: 'In the darkness, seek the light!'"}], description: "As you deposit the coin on the counter, you hear a noise of something small falling behind you.", image: 'assets/image/scenes/image20b.jpg' },
]

let player = {};
let actualLocalization = '';

const $historyBoard = document.querySelector('#history');
const $actionButton = document.querySelector('#action');
const $commandInput = document.querySelector('#command');
const $scenario = document.querySelector('#scenario');
const $closeModal = document.querySelector('#closeModal');

function start() {
  player = new Player('John Doe');
  actualLocalization = map[0];
  $scenario.src = actualLocalization.image;
  $historyBoard.innerText = actualLocalization.description;
}

start();
setTimeout(() => player.goto('nextScene'), 7000);
setTimeout(() => player.goto('nextScene'), 14000);
setTimeout(() => {
  player.goto('nextScene');
  player.get('painting');
  player.look();
}, 21000);
setTimeout(() => {
  player.goto('nextScene');
  player.get('postcard');
  player.look();
}, 28000);
setTimeout(() => player.goto('nextScene'), 35000);
setTimeout(() => player.goto('nextScene'), 42000);
setTimeout(() => player.goto('nextScene'), 49000);
setTimeout(() => player.goto('nextScene'), 56000);
setTimeout(() => player.goto('nextScene'), 63000);
setTimeout(() => player.goto('nextScene'), 70000);

$closeModal.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('#examine-modal__body').innerHTML = "";
  document.querySelector('#container').classList.remove('addBlur');
  $('#examine-modal').modal('dispose');
});

$actionButton.addEventListener('click', function (e) {
  e.preventDefault();
  const commandPhrase = $commandInput.value.toLowerCase();
  const words = commandPhrase.split(' ');

  let command = '';
  let object = '';
  let direction = '';
  let puzzle = false;

  //Your IA XD
  for (let i = 0; i < words.length; i += 1) {
    switch (words[i]) {
      case 'help':
        if (command === '') {
          command = 'help'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'search':
        if (command === '') {
          command = 'search'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'look':
        if (command === '') {
          command = 'look'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'examine':
        if (command === '') {
          command = 'examine'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'backpack':
        if (command === '') {
          command = 'lookBackpack'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'get':
        if (command === '') {
          command = 'get'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'give':
        if (command === '') {
          command = 'drop'
          puzzle = true
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'drop':
        if (command === '') {
          command = 'drop'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'go':
        if (command === '') {
          command = 'go'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'call':
        if (command === '') {
          command = 'call'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'ask':
        if (command === '') {
          command = 'ask'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'leave':
        if (command === '') {
          command = 'leave'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'enter':
        if (command === '') {
          command = 'enter'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'use':
        if (command === '') {
          command = 'use'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'put':
        if (command === '') {
          command = 'drop'
          puzzle = true
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'postcard':
        if (object === '') {
          object = 'postcard'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'envelope':
        if (object === '') {
          object = 'envelope'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'painting':
        if (object === '') {
          object = 'painting'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'coin':
        if (object === '') {
          object = 'coin'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'key':
        if (object === '') {
          object = 'key'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'stone':
        if (object === '') {
          object = 'stone'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'money':
        if (object === '') {
          object = 'money'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'omikuji':
        if (object === '') {
          object = 'omikuji'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'rope':
        if (object === '') {
          object = 'rope'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'candles':
        if (object === '') {
          object = 'candles'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'lighter':
        if (object === '') {
          object = 'lighter'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'stick':
        if (object === '') {
          object = 'stick'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'amulet':
        if (object === '') {
          object = 'amulet'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez`;
          return;
        }
        break;

      case 'nextScene':
        if (direction === '') {
          direction = 'nextScene'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      case 'right':
        if (direction === '') {
          direction = 'right'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez`;
          return;
        }
        break;

      case 'left':
        if (direction === '') {
          direction = 'left'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez`;
          return;
        }
        break;

      case 'front':
        if (direction === '') {
          direction = 'front'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez`;
          return;
        }
        break;

      case 'east':
        if (direction === '') {
          direction = 'east'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez`;
          return;
        }
        break;

      case 'oest':
        if (direction === '') {
          direction = 'oest'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez`;
          return;
        }
        break;

      case 'back':
        if (direction === '') {
          direction = 'back'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez`;
          return;
        }
        break;

      case 'hall':
        if (direction === '') {
          direction = 'hall'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;
      case 'room':
        if (direction === '') {
          direction = 'room'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;
      case 'lobby':
        if (direction === '') {
          direction = 'lobby'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;
      case 'reception':
        if (direction === '') {
          direction = 'reception'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;
      case 'street':
        if (direction === '') {
          direction = 'street'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;
      case 'park':
        if (direction === '') {
          direction = 'park'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;
      case 'house':
        if (direction === '') {
          direction = 'house'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;
      case 'trail':
        if (direction === '') {
          direction = 'trail'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;
      case 'temple':
        if (direction === '') {
          direction = 'temple'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;
      case 'altar':
        if (direction === '') {
          direction = 'altar'
        } else {
          $historyBoard.innerText = `You can only enter one command at a time.`;
          return;
        }
        break;

      default:
        break;
    }
  };

  switch (command) {
    case 'help':
      player.help()
      break;
    case 'search':
      player.search()
      break;
    case 'examine':
      player.examine(object)
      break;
    case 'look':
      player.look()
      break;
    case 'lookBackpack':
      player.lookBackpack()
      break;
    case 'get':
      player.get(object)
      break;
    case 'drop':
      player.drop(object, puzzle)
      break;
    case 'go':
      player.goto(direction)
      break;
    case 'leave':
      player.goto('leave')
      break;
    case 'call':
      player.goto('uber')
      break;
    case 'ask':
      player.goto('ask')
      break;
    case 'enter':
      player.goto('enter')
      break;
    case 'use':
      player.goto(direction)
      break;
    default:
      $historyBoard.innerText = `Sorry, i don't understand what ${command} means :(\n\n`
      break;
  }

  $commandInput.value = '';
})
