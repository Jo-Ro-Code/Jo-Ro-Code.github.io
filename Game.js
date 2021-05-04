/*

Several sections of this CSS code have been adapted from the following sources:
https://github.com/WebDevSimplified/JavaScript-Text-Adventure
https://stackoverflow.com/questions/2735881/adding-images-to-an-html-document-with-javascript

*/

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

// State funciton which will hold the current status of the character
let state = {}

// Simple start function
function startGame() {
  state = {}
  showTextNode(1)
}


// Displays the info from the different text nodes (What the buttons are named and the in game text)
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

  textElement.innerText = textNode.text
  document.getElementById('game-image').src = textNode.image;

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }


  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}


// Option function which allows the choice of different routes depending on the state
function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}


//  Function for selecting the players option
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}


function restartGame() {
  confirm("Are you sure you want to restart the entire game?");
  showTextNode(1)
}


// Text nodes for holding the in game levels/game information
const textNodes = [
  {
    id: 1,
    image: "images/image2.jfif",
    text: 'Welcome traveller to the City of Glaschu, to begin your journey choose an item!',
    options: [
      {
        text: 'Small Dagger',
        setState: { dagger: true},
        nextText: 2
      },
      {
        text: 'Rope',
        setState: { rope: true},
        nextText: 2
      },
      {
        text: 'Single gold coin',
        setState: { goldCoin: true},
        nextText: 2
      },
      {
        text: 'Small bag',
        setState: { smallBag: true},
        itemAdd: 'Small bag',
        nextText: 2
      }
  ]
  },
  {
    id: 2,
    image: "images/image2.jfif",
    text: 'After taking your selected gear you now have to choose a direction, which path will you take?',
    options: [
      {
        text: 'North',
        nextText: 3
      },
      {
        text: 'East',
        nextText: 4
      },
      {
        text: 'South',
        nextText: 5
      },
      {
        text: 'West',
        nextText: 6
      }
  ]
  },
  {
    id: 3,
    image: "images/image.jfif",
    text: 'You come across a large archway with a sign that reads "Head North for Queen Street railway"',
    options: [
      {
        text: 'Head North',
        nextText: 7
      },
      {
        text: 'Go back',
        nextText: 2
      },
      {
        text: 'Inspect the sign',
        nextText: 8
      }
  ]
  },
  {
    id: 4,
    image: "images/eastwoods.jfif",
    text: 'After heading East you find a trail leading towards some woods',
    options: [
      {
        text: 'Keep walking',
        nextText: 9
      },
      {
        text: 'Go back',
        nextText: 2
      },
      {
        text: 'Inspect the area',
        nextText: 10
      }
    ]
    },
    {
      id: 5,
      image: "images/goback.jpg",
      text: 'What are you doing! No adventurer quits that easily, go back',
      options: [
        {
          text: 'Go back',
          nextText: 2
        }
    ]
    },
    {
      id: 6,
      image: "images/otherentrance.jfif",
      text: 'You head West and stumble across another entrance to the City',
      options: [
        {
          text: 'Go back',
          nextText: 2
        },
        {
          text: 'Try the rusted gate door?',
          nextText: 11
        }
    ]
    },
    {
      id: 7,
      image: "images/guard.png",
      text: 'You head North and arrive at Queen Street. A guard approaches and questions you for a ticket',
      options: [
        {
          text: 'Hand over your gold coin',
          requiredState: (currentState) => currentState.goldCoin,
          nextText: 12
        },
        {
          text: 'Stab him with your dagger',
          requiredState: (currentState) => currentState.dagger,
          nextText: 13
        },
        {
          text: 'Go back',
          nextText: 3
        }
    ]
    },
    {
      id: 8,
      image: "images/sign.png",
      text: 'Its just a sign, nothing more, nothing less.',
      options: [
        {
          text: 'Look back down',
          nextText: 3
        }
    ]
    },
    {
      id: 9,
      image: "images/necropolis.jpg",
      text: 'You keep walking and find yourself in the necropolis. Seems to be covered in mist and you see a faint figure in the distance',
      options: [
        {
          text: 'Keep walking',
          nextText: 14
        },
        {
          text: 'Go back',
          nextText: 4
        }
    ]
    },
    {
      id: 10,
      image: "images/frog.gif",
      text: 'You see a small Wizard frog, it croaks',
      options: [
        {
          text: 'Look back up',
          nextText: 4
        },
        {
          text: 'Attempt to capture it with your small bag',
          requiredState: (currentState) => currentState.smallBag,
          nextText: 15
        }
    ]
    },
    {
      id: 11,
      image: "images/dooropen.jpg",
      text: 'The door opens',
      options: [
        {
          text: 'Keep walking',
          nextText: 16
        },
        {
          text: 'Go back',
          nextText: 6
        }
    ]
    },
    {
      id: 12,
      image: "images/Glaschu.jfif",
      text: 'You hand over your single gold coin. You enter the train and head towards the Four Corners! You win!',
      options: [

    ]
    },
    {
      id: 13,
      image: "images/reaper.gif",
      text: 'You kill the guard and gain the power of the reaper! You Win!',
      options: [

    ]
    },
    {
      id: 14,
      image: "images/wizard1.png",
      text: 'Once you step closer you see a Wizard, he stands over you',
      options: [
        {
          text: 'Kill him with your dagger',
          requiredState: (currentState) => currentState.dagger,
          nextText: 19
        },
        {
          text: 'Offer him a gold coin',
          requiredState: (currentState) => currentState.goldCoin,
          nextText: 20
        },
        {
          text: 'Lasso him with your rope',
          requiredState: (currentState) => currentState.rope,
          nextText: 21
        },
        {
          text: 'Run away',
          nextText: 9
        }
    ]
    },
    {
      id: 15,
      image: "images/wizardzap.gif",
      text: 'The frog vanish and a Wizard appears before you. He zaps you for being so rude, you lose!',
      options: [

    ]
    },
    {
      id: 16,
      image: "images/monk.gif",
      text: 'Once through the gate you see a monk with a crystal ball',
      options: [
        {
          text: 'Offer him the coin',
          requiredState: (currentState) => currentState.goldCoin,
          nextText: 17
        },
        {
          text: 'Go back',
          nextText: 11
        },
        {
          text: 'Stab him with the dagger',
          requiredState: (currentState) => currentState.dagger,
          nextText: 18
        }
    ]
    },
    {
      id: 17,
      image: "images/Glaschu.jfif",
      text: 'He teleports you to the centre of Glaschu! You win!',
      options: [

    ]
    },
    {
      id: 18,
      image: "images/wizardzap.gif",
      text: 'He smirks at you before blasting the dagger from your hand. You fool! You die!',
      options: [

    ]
    },
    {
      id: 19,
      image: "images/bombdeath.gif",
      text: 'You stab him in the chest and he explodes due to a magical bomb implant. You die along with him! Game over',
      options: [

    ]
    },
    {
      id: 20,
      image: "images/wizardblast.gif",
      text: "He takes your coin and proceeds to blast you with magic. Guess you shouldn't trust a random Wizard from Glaschu. Game over!",
      options: [

    ]
    },
    {
      id: 21,
      image: "images/wizardblast.gif",
      text: 'As you wrap your rope around the wizard he lights it like a fuse and burns it away. He then blast you with magic! Game over!',
      options: [

    ]
    }

  ]



window.addEventListener("load", function(){
  var username = prompt("Enter username:");

  if (username != null) {
    document.getElementById("username").innerHTML = " " + username;
  }
});

startGame()
