var rpg = {

  characters: [
    {
      shortname: "jarjar",
      name: "Jar-Jar Binks",
      hp: 200,
      attack: 30,
      counterattack: 30,
    },
    
    {
      shortname: "porg",
      name: "Porg",
      hp: 31,
      attack: 200,
      counterattack: 200,
    },

    {
      shortname: "thalasirens",
      name: "Thala Sirens",
      hp: 600,
      attack: 1,
      counterattack: 125,
    },

    {
      shortname: "wicket",
      name: "Wicket",
      hp: 250,
      attack: 25,
      counterattack: 25,
    }
  ],

  remainingCharacters: [],
  playerCharacter: "",
  pcs: $("#player-character-selection"),
  pc: $("#player-character"),
  ccb: $("#computer-character-block"),
  pcb: $("#player-character-block"),
  cb: $("#combat-block"),
  att: $("#attack"),
  ps: $("#playerStats"),
  cs: $("#computerStats"),
  name: $("#name"),
  hp: $("#hp"),
  sc: $("#select-computer"),
  computerName: $("#computerName"),
  computerHp: $("#computerHp"),
  counterattack: $("#counterattack"),
  attack: $("#attack-button"),
  pwl: $("#play-win-lose"),
  play: $("#play"),
  win: $("#win"),
  lose: $("#lose"),
  computerCharactersRemaining: 3,
  computerCharacter1: "",
  computerCharacter2: "",
  computerCharacter3: "",
  opponentCounter: 0,
  indexOfPlayerCharacter: 0,
  playerDamage: 0,
  playerHp: 0,
  computerDamage: 0,
  computerHitPoints: 0,
  indexOfComputerCharacter: 0,


  playerSelection: function(char) {

    // the clicked character is saved as rpg.playerCharacter
    rpg.playerCharacter = (char.id);

    // hide the player character selection screen
    rpg.pcs.attr("class", "hide");

    // make a new array of remaining characters, removing the player character
    rpg.remainingCharacters = $.grep(rpg.characters, function(e){ 
      return e.shortname != rpg.playerCharacter;
    });
    
    // add id and class to pcb
    rpg.pc.attr("id", rpg.playerCharacter);
  },

  computerSelectionScreen: function() {
    // clear the computer selection screen
    rpg.ccb.html("");
    rpg.pcb.attr("class","hide");
    rpg.ps.attr("class","hide");
    rpg.cb.attr("class","hide");
    rpg.cs.attr("class","hide");
    rpg.attack.attr("class","hide");
    
    for (var i = 0; i < rpg.remainingCharacters.length; i++) {
      var newDiv = $("<div>");
      newDiv.attr("id", rpg.remainingCharacters[i].shortname);
      newDiv.attr("class", "computer-character")
      rpg.ccb.append(newDiv);
    };
    
    // show the label and character selection area
    rpg.sc.attr("class", "show-select-computer");
    rpg.ccb.attr("class","show-computer-character-selection");
  },

  computerSelection: function (char) {
    if (rpg.opponentCounter == 0) {
      rpg.computerCharacter1 = (char.id);
      rpg.remainingCharacters = $.grep(rpg.remainingCharacters, function(e){ 
      return e.shortname != rpg.computerCharacter1;
    });
      rpg.opponentCounter = 1;
      rpg.sc.attr("class","hide");
      rpg.ccb.attr("class","hide");

    } else if (rpg.opponentCounter == 1) {
      rpg.computerCharacter2 = (char.id);
      console.log("computer character 2: " + rpg.computerCharacter2);
      rpg.ccb.attr("class","hide");
      rpg.remainingCharacters = $.grep(rpg.remainingCharacters, function(e){ 
      return e.shortname != rpg.computerCharacter2;
      });
      rpg.opponentCounter = 2;
    } else {
      rpg.computerCharacter3 = (char.id);
      console.log("computer character 3: " + rpg.computerCharacter3);
      rpg.ccb.attr("class","hide");
      rpg.remainingCharacters = $.grep(rpg.remainingCharacters, function(e){ 
      return e.shortname != rpg.computerCharacter3;
      });
      rpg.opponentCounter = 3;
    }
  },

  battleScreen: function () {
    // setting up all the variables for combat
    var newDiv = $("<div>");
    rpg.indexOfPlayerCharacter = rpg.characters.findIndex(i => i.shortname === rpg.playerCharacter);
    if (rpg.opponentCounter == 1) {
      // setting the variables for the first computer opponent
      indexOfComputerCharacter = rpg.characters.findIndex(i => i.shortname === rpg.computerCharacter1);
      
      // fill the a new div with larger character for computer
      newDiv.attr("id", rpg.computerCharacter1 + "2");
      
      // fill the combatblock with this new div
      rpg.cb.html(newDiv);

      // set the player character initial variables
      rpg.playerDamage = rpg.characters[rpg.indexOfPlayerCharacter].attack;
      rpg.playerHp = rpg.characters[rpg.indexOfPlayerCharacter].hp;

      // fill the information areas with the player character information
      rpg.name.text("Name: " + rpg.characters[rpg.indexOfPlayerCharacter].name);
      rpg.hp.text("Hit Points: " + rpg.playerHp);
      rpg.att.text("Next Attack Damage: " + rpg.playerDamage);

      // set the first computer character initial variables
      rpg.computerDamage = rpg.characters[indexOfComputerCharacter].counterattack;
      rpg.computerHitPoints = rpg.characters[indexOfComputerCharacter].hp;

       // fill the information areas with the computer character information
      rpg.computerName.text("Name: " + rpg.characters[indexOfComputerCharacter].name);
      rpg.computerHp.text("Hit Points: " + rpg.computerHitPoints);
      rpg.counterattack.text("Next Attack Damage: " + rpg.computerDamage);
                 
      // show the fight divs
      // players character
      rpg.pcb.attr("class","show-player-character-block");
      rpg.ps.attr("class","show-player-stats");
      rpg.cb.attr("class","show-computer-character-block");
      rpg.cs.attr("class","show-computer-stats");
      rpg.attack.attr("class","show-attack-button");            

    } else if (rpg.opponentCounter == 2) {
      // setting the variables for the second computer opponent
      indexOfComputerCharacter = rpg.characters.findIndex(i => i.shortname === rpg.computerCharacter2);

      // fill a new div with larger character for computer
      newDiv.attr("id", rpg.computerCharacter2 + "2");
      
      // fill the combatblock with this new div
      rpg.cb.html(newDiv);
      
      // the player information is already set, and doesn't reset for each new opponent

      // set the second computer character initial variables
      rpg.computerDamage = rpg.characters[indexOfComputerCharacter].counterattack;
      rpg.computerHitPoints = rpg.characters[indexOfComputerCharacter].hp;

      // fill th einformation areas with the computer character information
      rpg.computerName.text("Name: " + rpg.characters[indexOfComputerCharacter].name);
      rpg.computerHp.text("Hit Points: " + rpg.computerHitPoints);
      rpg.counterattack.text("Next Attack Damage: " + rpg.computerDamage);

      //show the fight divs
      rpg.pcb.attr("class","show-player-character-block");
      rpg.ps.attr("class","show-player-stats");
      rpg.cb.attr("class","show-computer-character-block");
      rpg.cs.attr("class","show-computer-stats");
      rpg.attack.attr("class","show-attack-button"); 

     
    } else if (rpg.opponentCounter == 3) {
      // setting the variables for the third computer opponent
      indexOfComputerCharacter = rpg.characters.findIndex(i => i.shortname === rpg.computerCharacter3);

      // fill a new div with larger character for computer
      newDiv.attr("id", rpg.computerCharacter3 + "2");
      
      // fill the combatblock with this new div
      rpg.cb.html(newDiv);
      
      // the player information is already set, and doesn't reset for each new opponent

      // set the third computer character initial variables
      rpg.computerDamage = rpg.characters[indexOfComputerCharacter].counterattack;
      rpg.computerHitPoints = rpg.characters[indexOfComputerCharacter].hp;

      // fill the information areas with the computer character information
      rpg.computerName.text("Name: " + rpg.characters[indexOfComputerCharacter].name);
      rpg.computerHp.text("Hit Points: " + rpg.computerHitPoints);
      rpg.counterattack.text("Next Attack Damage: " + rpg.computerDamage);


      //show the fight divs
      rpg.pcb.attr("class","show-player-character-block");
      rpg.ps.attr("class","show-player-stats");
      rpg.cb.attr("class","show-computer-character-block");
      rpg.cs.attr("class","show-computer-stats");
      rpg.attack.attr("class","show-attack-button"); 

    };

  },

  combat: function () {


    // Player damage is subtracted from computer HP, new computer HP is posted
    rpg.computerHitPoints = rpg.computerHitPoints - rpg.playerDamage;
    rpg.computerHp.text("Hit Points: " + rpg.computerHitPoints);

    // player damage is doubled, new attack damage is posted
    rpg.playerDamage = 2 * rpg.playerDamage;
    rpg.att.text("Next Attack Damage: " + rpg.playerDamage);

    // if the enemy doesn't die, it counter attacks
    if (rpg.computerHitPoints > 0) {
      // Computer counter attack damage is subtracted from player HP, new Player Hp is posted
      rpg.playerHp = rpg.playerHp - rpg.computerDamage;
      rpg.hp.text("Hit Points: " + rpg.playerHp);

      // if player hp = 0 lose
      if (rpg.playerHp <= 0) {
          
        rpg.youLose()
      }
    } else {

      // if computer does die, if its the 1st or 2nd opponent retur to the computer selection screen, otherwise you win
      if (rpg.opponentCounter < 3) {
        
        rpg.computerSelectionScreen()

      } else {
        
        rpg.youWin()
      }
    }
  },

  youWin: function () {
    rpg.remainingCharacters = [];
    rpg.playerCharacter = "";
    rpg.opponentCounter = 0;
    rpg.characters = [
      {
        shortname: "jarjar",
        name: "Jar-Jar Binks",
        hp: 200,
        attack: 30,
        counterattack: 30,
      },
      
      {
        shortname: "porg",
        name: "Porg",
        hp: 31,
        attack: 200,
        counterattack: 200,
      },

      {
        shortname: "thalasirens",
        name: "Thala Sirens",
        hp: 600,
        attack: 1,
        counterattack: 125,
      },

      {
        shortname: "wicket",
        name: "Wicket",
        hp: 250,
        attack: 25,
        counterattack: 25,
      }
     ];

    rpg.pcb.attr("class","hide");
    rpg.ps.attr("class","hide");
    rpg.cb.attr("class","hide");
    rpg.cs.attr("class","hide");
    rpg.attack.attr("class","hide");
    rpg.play.attr("class","hide");
    rpg.sc.attr("class","hide");
    rpg.lose.attr("class","hide");
    rpg.win.attr("class","show-win-text");
    rpg.pwl.attr("class","play-win-lose");

  },

  youLose: function() {
    rpg.remainingCharacters = [];
    rpg.playerCharacter = "";
    rpg.opponentCounter = 0;
    rpg.characters = [
      {
        shortname: "jarjar",
        name: "Jar-Jar Binks",
        hp: 200,
        attack: 30,
        counterattack: 30,
      },
      
      {
        shortname: "porg",
        name: "Porg",
        hp: 31,
        attack: 200,
        counterattack: 200,
      },

      {
        shortname: "thalasirens",
        name: "Thala Sirens",
        hp: 600,
        attack: 1,
        counterattack: 125,
      },

      {
        shortname: "wicket",
        name: "Wicket",
        hp: 250,
        attack: 25,
        counterattack: 25,
      }
     ];
    rpg.pcb.attr("class","hide");
    rpg.ps.attr("class","hide");
    rpg.cb.attr("class","hide");
    rpg.cs.attr("class","hide");
    rpg.attack.attr("class","hide");
    rpg.play.attr("class","hide");
    rpg.sc.attr("class","hide");
    rpg.win.attr("class","hide");
    rpg.lose.attr("class","show-lose-text");
    rpg.pwl.attr("class","play-win-lose");
  }
};
            
$(document).ready(function() {

  $("body").on("click", ".player-character", function() {
    // player selects their character
    rpg.playerSelection(this)
    // Create computer-character-selection div
    rpg.computerSelectionScreen()
  });

  $("body").on("click", ".computer-character", function() {
    // select computer's character
    rpg.computerSelection(this)
    // show battle screen
    rpg.battleScreen()
  });

  $("body").on("click", "#attack-button", function() {

    rpg.combat()

  });

  $("body").on("click", "#play-button", function() {
    rpg.pwl.attr("class","hide");
    rpg.pcs.attr("class", "player-character-selection");

  });
});