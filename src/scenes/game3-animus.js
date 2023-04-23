import constants from '../config/constants';
import Phaser from 'phaser';
import blade from '../assets/blade.png';
import bladeHitSound from '../assets/blade-hit.wav';
import blood from '../assets/blood.png';
import bloodPuddle from '../assets/blood-puddle.png';
import bloodSplat from '../assets/blood-splat.png';
import bone from '../assets/bone.png';
import animus from '../assets/animus.png';
import Animus from '../sprites/animus';
import explosion from '../assets/explosion.png';
import explosionJSON from '../assets/explosion.json';
import monkey from '../assets/monkey.png';
import Monkey from '../sprites/monkey';
import muscle from '../assets/muscle.png';


export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }
  preload() {
      this.load.audio('bladeHitSound', bladeHitSound);
      this.load.atlas('explosion', explosion, explosionJSON);
      this.load.image('monkey', monkey);
      this.load.spritesheet('animus', animus, {
        frameWidth  : 110,
        frameHeight : 155,
        endFrame    : 15
      });
      this.load.spritesheet('blade', blade, {
        frameWidth  : 62,
        frameHeight : 208,
        endFrame    : 1
      });
      this.load.spritesheet('blood', blood, {
        frameWidth  : 88,
        frameHeight : 71,
        endFrame    : 9
      });
      this.load.spritesheet('bloodPuddle', bloodPuddle, {
        frameWidth  : 185,
        frameHeight : 187,
        endFrame    : 4
      });
      this.load.spritesheet('bloodSplat', bloodSplat, {
        frameWidth  : 158,
        frameHeight : 176,
        endFrame    : 9
      });
      this.load.spritesheet('bone', bone, {
        frameWidth  : 18,
        frameHeight : 18
      });
      this.load.spritesheet('muscle', muscle, {
        frameWidth  : 23,
        frameHeight : 22
      });
  }
  create() {
    this.monkey = new Monkey({
        scene: this,
        x: this.game.config.width,
        y: this.game.config.height - 70
      });

    this.monkey.x -= this.monkey.displayWidth/2;

    this.animus = new Animus({
        scene   : this,
        x       : (this.game.config.width - 55),
        y       : (this.game.config.height - 77),
        victim  : this.monkey
    })
  }
  
  update() {
    this.animus.update();
  }
  
  render() {}
}