![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# Project #1: Torri - Adventure Game

## Introduction

Torii is a game based on Adventure Games of the late 80's, like the Legend of Gávea and Amazonia of MSX!

According to wikipedia *Adventure games, also known as adventures, are electronic games whose emphasis is on the **storyline** and not the graphics or action. A game that defines this style well is the classic "Where in the World is Carmen Sandiego?", A hit of the early 1980s, where a player is urged to travel across the world to capture Carmen San Diego and ends up meeting. the **geography** and **cultural aspects** of the countries you pass through.*


### Gameplay

Our play area is divided into three parts:
1. **Stage** - Where the whole story is told through text and images;
2. **Command bar** - Here are given commands so we can interact with our character;
3. **Backpack** - All items collected during the adventure will be stored here;

![](https://github.com/ricartoons/adventureGame/blob/master/assets/image/readme1.jpg)


### Winning or losing
In Torii the player does not die, he simply has to get out of that scenario proposed for him otherwise he does not advance. The game is over when all the puzzles are solved.


## 1. Technologies used

For the creation of the game the following technologies were used:
* HTML/CSS
* Javascript
* Bootstrap


## 2. The code

#### 2.1 The Player class

A Player class has been created where the name, whare, and backpack properties are set, plus the search (), look (), help (), examine (), lookBackpack (), get (), drop (), updateBackpack ( ) and goto () are created;

#### 2.2 The map variable
We use the constant "map" to create the game map, where we will add in each index the scenario id, its name, the allowed directions, the scenery description, the scenery image and the objects that are contained therein. images and descriptions.

#### 2.3 The start function
After proper instantiations made in the start function:

```
function start() {
  player = new Player('John Doe');
  actualLocalization = map[0];
  $scenario.src = actualLocalization.image;
  $historyBoard.innerText = actualLocalization.description;
}

```

#### 2.4 The setTimeout Functions
The game effectively begins, where there is a sequence of setTimeout's functions that will be responsible for the user contextualization in the story.

#### 2.5 The command Bar 
After that, the user should interact using the Command bar with the suggested commands or enter as a 'Help' command to get a short description of the game's main commands.

```
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

```

Some commands are more complex such as *GET STONE*, is a compound command, where for its correct execution we use the function contained in the ** addEventListener ** of actionButton. There we will break the sentence into words:
```
const commandPhrase = $commandInput.value.toLowerCase();
const words = commandPhrase.split(' ');
```
And we will use a switch to check if the typed word exists in the registered vocabulary. If so, we check if it is a command, object or direction and assign the corresponding variable. (it's a kind of artificial intelligence #sqn :wink:)
 
```
for (let i = 0; i < words.length; i += 1) {
    switch (words[i]) {
      case 'help':
        if (command === '') {
          command = 'help'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez`;
          return;
        }
        break;

      case 'search':
        if (command === '') {
          command = 'search'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez`;
          return;
        }
        break;

      case 'look':
        if (command === '') {
          command = 'look'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez`;
          return;
        }
        break;

      case 'examine':
        if (command === '') {
          command = 'examine'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez`;
          return;
        }
        break;
    ...
```
Then we passed another switch to perform this filtering, passing the correct command.
```
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

    ...
```

## 3. Enhancements and Upgrades

While developing the game I had many insights, duly noted for later versions. But suggestions and criticism will always be welcome.
Good game :)