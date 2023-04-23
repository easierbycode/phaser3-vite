import constants from '../config/constants';
import Phaser from 'phaser';
import blood from '../assets/blood.png';
import bombExplosion from '../assets/mk3-00500-explosion.wav';
import bone from '../assets/bone.png';
import explosion from '../assets/explosion.png';
import explosionJSON from '../assets/explosion.json';
import monkey from '../assets/monkey.png';
import parabomb from '../assets/parabomb.png';
import Parabomb from '../sprites/parabomb';
import Monkey from '../sprites/monkey';
import muscle from '../assets/muscle.png';


export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }
  preload() {
      this.load.audio('bombExplosion', bombExplosion);
      this.load.atlas('explosion', explosion, explosionJSON);
      this.load.image('monkey', monkey);
      this.load.spritesheet('parabomb', parabomb, {
        frameWidth  : 34,
        frameHeight : 42,
        endFrame    : 18
      });
      this.load.spritesheet('blood', blood, {
        frameWidth  : 88,
        frameHeight : 71,
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
        y: this.game.config.height
      });

    this.monkey.x -= this.monkey.displayWidth/2;
      
    this.parabomb = new Parabomb({
      scene : this,
      x     : 53,
      y     : 58
    })
  }
  
  update() {
    this.physics.overlap( this.parabomb, this.monkey, this.hitEnemy, this.checkBulletVsEnemy, this );
    this.parabomb.update();
  }
  
  render() {}

  checkBulletVsEnemy( bullet, enemy ) {
    return bullet.active && enemy.active;
  }

  hitEnemy( bullet, enemy ) {
    enemy.active = false;
    bullet.destroy( bullet, enemy );
  }
}