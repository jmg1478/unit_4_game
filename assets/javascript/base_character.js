// basic information on hero stats
class BaseCharacterClass {
    health;
  
    constructor(classType, health, mana, strength, agility, speed) {
      this.classType = classType;
      this.health = health;
      this.mana = mana;
      this.strength = strength;
      this.agility = agility;
      this.speed = speed;
    }
  
    subtractHealth(amount) {
      return (this.health = this.health - amount);
    }
  
    attack() {
      let calcBaseDamage;
      if (hero.mana > 0) {
        calcBaseDamage = (hero.strength * hero.mana) / 1000;
      } else {
        calcBaseDamage = (hero.strength * hero.agility) / 1000;
      }
      const offsetDamage = Math.floor(Math.random() * Math.floor(10));
      const calcOutputDamage = calcBaseDamage + offsetDamage;
      // # of hits
      const numberOfHits = Math.floor((Math.random() * Math.floor(hero.agility / 10)) / 2 + 1);
      const attackValues = [calcOutputDamage, numberOfHits];
      return attackValues;
    }
  }
  