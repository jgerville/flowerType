import deepai from 'deepai';
import Util from './utilities';

class Start {
  constructor() {
    this.container = Util.q('.start-container')
    this.textGenerated;
    this.special = false;
    this.test = false;

    this.render();
    this.button = Util.q('#start-button')
    this.input = Util.q('#sentence-input')
  }

  render() {
    const input = document.createElement('input');
    input.id = 'sentence-input'
    input.type = 'text';
    input.placeholder = 'Type a sentence or two in here!'
    this.container.appendChild(input);

    const button = document.createElement('button');
    button.id = 'start-button'
    button.innerText = 'Start';
    this.container.appendChild(button);
  }

  async generateText() {
    const input = Util.q('#sentence-input');
    const value = input.value;
    input.value = '';

    if (value === 'Pokemon!') {
      this.textGenerated = `I want to be the best there ever was To beat all the rest, yeah, that's my cause Electrode, Diglett, Nidoran, Mankey Venusaur, Rattata, Fearow, Pidgey Seaking, Jolteon, Dragonite, Gastly Ponyta, Vaporeon, Poliwrath, Butterfree Catch 'em, catch 'em, gotta catch 'em all, Pokémon I'll search across the land, look far and wide Release from my hand the power that's inside Venomoth, Poliwag, Nidorino, Golduck Ivysaur, Grimer, Victreebel, Moltres Nidoking, Farfetch'd, Abra, Jigglypuff Kingler, Rhyhorn, Clefable, Wigglytuff Catch 'em, catch 'em, gotta catch 'em all Gotta catch 'em all, Pokémon Zubat, Primeape, Meowth, Onix Geodude, Rapidash, Magneton, Snorlax Gengar, Tangela, Goldeen, Spearow Weezing, Seel, Gyarados, Slowbro Gotta catch 'em all, gotta catch 'em all (yeah) Gotta catch 'em all, gotta catch 'em all (yeah) Gotta catch 'em all, Pokémon (ow) Kabuto, Persian, Paras, Horsea Raticate, Magnemite, Kadabra, Weepinbell Ditto, Cloyster, Caterpie, Sandshrew Bulbasaur, Charmander, Golem, Pikachu At least 150 or more to see To be a Pokémon Master is my destiny Alakazam, Doduo, Venonat, Machoke Kangaskhan, Hypno, Electabuzz, Flareon Blastoise, Poliwhirl, Oddish, Drowzee Raichu, Nidoqueen, Bellsprout, Starmie "Whoo, we're at the halfway point, dooing great so far!" "We? What's all this 'we' stuff? I'm doing all the hard work!" "Break time's over, here we go!" Metapod, Marowak, Kakuna, Clefairy Dodrio, Seadra, Vileplume, Krabby Lickitung, Tauros, Weedle, Nidoran Machop, Shellder, Porygon, Hitmonchan Gotta catch 'em all, gotta catch 'em all (yeah) Gotta catch 'em all, gotta catch 'em all (yeah) Articuno, Jynx, Nidorina, Beedrill Haunter, Squirtle, Chansey (Pokémon) Parasect, Exeggcute, Muk, Dewgong Pidgeotto, Lapras, Vulpix, Rhydon At least 150 or more to see To be a Pokémon Master is my destiny Charizard, Machamp, Pinsir, Koffing Dugtrio, Golbat, Staryu, Magikarp Ninetales, Ekans, Omastar Scyther, Tentacool, Dragonair, Magmar "Whoa, catch your breath man, shake out those lips!" "It's downhill from here, just 24 more to go!" "Now it gets tricky, so listen real good!" Sandslash, Hitmonlee, Psyduck, Arcanine Eevee, Exeggutor, Kabutops, Zapdos Dratini, Growlithe, Mr. Mime, Cubone Graveler, Voltorb, Gloom (we're almost home) Gotta catch 'em all, gotta catch 'em all (yow) Gotta catch 'em all, gotta catch 'em all (huh) Gotta catch 'em all, Pokémon (yeah) Charmeleon, Wartortle Mewtwo, Tentacruel, Aerodactyl Omanyte, Slowpoke Pidgeot, Arbok, that's all, folks Catch 'em, catch 'em, gotta catch 'em all Ooh, gotta catch 'em all, Pokémon Catch 'em, catch 'em, gotta catch 'em all Ooh, gotta catch 'em all, Pokémon Catch 'em, catch 'em, gotta catch 'em all Gotta catch 'em all, Pokémon`
      this.special = true;
    } else if (value.slice(0, 6) === 'Test: ') {
      // the goal here is to lower timer to 30s if input begins with 'Test: '
      let response = await fetch('/api')
      let response2 = await response.json();
      let key = response2.deepaiKEY;
      deepai.setApiKey(key);
      const resp = await deepai.callStandardApi("text-generator", {
              text: value.slice(6),
      });
      this.textGenerated = resp.output;
      this.test = true;
    } else {      
      let response = await fetch('/api')
      let response2 = await response.json();
      let key = response2.deepaiKEY;
      deepai.setApiKey(key);
      const resp = await deepai.callStandardApi("text-generator", {
              text: value,
      });
      this.textGenerated = resp.output
    }
  }

}

export default Start;