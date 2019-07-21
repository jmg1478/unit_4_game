let villain;
let hero;
let gameManager = {
  setGameStart: function(classType) {
    this.resetHero(classType);
    this.setPreFight();
  },
  //character stats
  resetHero: function(classType) {
    switch (classType) {
      case "Simba":
        hero = new Hero(classType, 200, 0, 60, 150, 175);
        break;
      case "Buzz":
        hero = new Hero(classType, 200, 150, 0, 125, 150);
        break;
      case "Ariel":
        hero = new Hero(classType, 200, 175, 0, 100, 150);
        break;
      case "Zeus":
        hero = new Hero(classType, 200, 200, 50, 75, 125);
        break;
    }
    // add hero infomation into HTML readable by user
    let getInterface = document.querySelector(".interface");
    getInterface.innerHTML =
      '<img src= "assets/images1/heros/' +
      classType +
      '.png" class = "img-avatar"><div><h3>' +
      classType +
      '</h3><p class = "health-hero">Health: ' +
      hero.health +
      "</p><p>Mana: " +
      hero.mana +
      "</p><p>Strength: " +
      hero.strength +
      "</p><p>Agility: " +
      hero.agility +
      "</p><p>Speed: " +
      hero.speed +
      "</p></div>";
  },
  // getting the battle ground ready with randon generate villain
  setPreFight: function() {
    let getHeader = document.querySelector(".header");
    let getActions = document.querySelector(".actions");
    let getArena = document.querySelector(".arena");
    getHeader.innerHTML = "<p>Task: Find a villain!</p>";
    // this needs to be added to the DOM...
    const fightButtonHTML = document.createElement("button");
    fightButtonHTML.innerText = "Search for a Villain";
    fightButtonHTML.type = "button";
    fightButtonHTML.className = "btn-prefight";
    fightButtonHTML.id = "searchForVillian";
    fightButtonHTML.onclick = () => gameManager.setFight();
    document.getElementById("actions").appendChild(fightButtonHTML);
    getArena.style.visibility = "visible";
  },
  setFight: function() {
    console.log("setFight");
    let getHeader = document.querySelector(".header");
    let getActions = document.querySelector(".actions");
    let getVillian = document.querySelector(".villain");
    // create villain
    let villains = [new Villain("Ursula", 100, 50, 100, 75, 60), new Villain("Hades", 150, 100, 110, 60, 50), new Villain("Scar",175, 75, 50, 50,75), new Villain("Zurg", 125, 100, 25, 60, 50)];

    // generate random villain
    let CRV = Math.floor(Math.random() * Math.floor(villains.length));
    console.log("crv", CRV);

    villain = villains[CRV];

    console.log("villain", villain);
    // villain moves and stats
    getHeader.innerHTML = "<p>Task: Choose your move!</p>";

    const attackButtonHTML = document.createElement("button");
    attackButtonHTML.innerText = "Attack!";
    attackButtonHTML.type = "button";
    attackButtonHTML.className = "btn-prefight";
    attackButtonHTML.id = "searchForVillian";
    attackButtonHTML.onclick = () => gameManager.startRound();
    document.getElementById("actions").appendChild(attackButtonHTML);

    getVillian.innerHTML =
      '<img src="assets/images1/villians/' +
      villain.classType +
      '.png" alt="' +
      villain.classType +
      '" class="img-avatar"><div><h3>' +
      villain.classType +
      '</h3><p class= "health-villain">Health: ' +
      villain.health +
      "</p><p>Mana: " +
      villain.mana +
      "</p><p>Strength: " +
      villain.strength +
      "</p><p>Agility: " +
      villain.agility +
      "</p><p>Speed: " +
      villain.speed +
      "</p></div>";
  },
  startRound: function() {
    let heroSpeed = hero.speed;
    let villainSpeed = villain.speed;

    // --------------------------------------------------------------------------
    // health
    const heroHealthDomRef = document.querySelector(".health-hero");
    const villainHealthDomRef = document.querySelector(".health-villain");

    // first attack based off speed
    if (heroSpeed >= villainSpeed) {
      const heroAttackValues = hero.attack();
      const totalDamage = heroAttackValues[0] * heroAttackValues[1];
      villain.subtractHealth(totalDamage);
      alert(hero.classType + " hit " + heroAttackValues[0] + " damage " + heroAttackValues[1] + " times.");
      if (villain.health <= 0) {
        alert("You Win. Refresh to keep playing!");
        heroHealthDomRef.innerHTML = "Health: " + hero.health;
        villainHealthDomRef.innerHTML = "Health: 0";
      } else {
        villainHealthDomRef.innerHTML = "Health " + villain.health;

        // this is called array destructuring. being that .attack() returns a tuple, you can just do this.
        const [dmg, times] = villain.attack();
        hero.subtractHealth(dmg * times);

        alert(villain.classType + " hit " + dmg + " damage " + times + " times.");

        if (hero.health <= 0) {
          alert("You loose. Refrest to keep playing!");
          villainHealthDomRef.innerHTML = "Health: " + villain.health;
          heroHealthDomRef.innerHTML = "Health: 0";
          ``;
        } else {
          heroHealthDomRef.innerHTML = "Health: " + hero.health;
        }
      }
    } else if (villainSpeed >= heroSpeed) {
      const [dmg, times] = villain.attack();
      hero.subtractHealth(dmg * times);

      alert("Villain hit " + villainAttackValues[0] + " damage " + villainAttackValues[1] + " times.");
      if (hero.health <= 0) {
        alert("You lose. Refrest to keep playing!");
        villainHealthDomRef.innerHTML = "Health: " + Villain.health;
        heroHealthDomRef.innerHTML = "Health: 0";
      } else {
        heroHealthDomRef.innerHTML = "Health " + Hero.health;

        const heroAttackValues = hero.attack();
        const totalDamage = heroAttackValues[0] * heroAttackValues[1];
        villain.subtractHealth(totalDamage);
        alert("you hit " + heroAttackValues[0] + " damage " + heroAttackValues[1] + " times.");
        if (villain.health <= 0) {
          alert("You win. Refrest to keep playing!");
          heroHealthDomRef.innerHTML = "Health: " + hero.health;
          villainHealthDomRef.innerHTML = "Health: 0";
          ``;
        } else {
          villainHealthDomRef.innerHTML = "Health: " + villain.health;
        }
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", function(event) {
  var elem = document.getElementById("searchForVillian");
  elem.addEventListener("click", () => alert("Thanks!"));
});
