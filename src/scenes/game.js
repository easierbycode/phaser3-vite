import constants from '../config/constants';
import Phaser from 'phaser';
import blood from '../assets/blood.png';
import bomb from '../assets/bomb.png';
import Bomb from '../sprites/bomb';
import bombDrop from '../assets/mk3-00805-bomb-drop.wav';
import bombEject from '../assets/mk3-00695-bomb-eject.wav';
import bombExplosion from '../assets/mk3-00500-explosion.wav';
import bone from '../assets/bone.png';
import cyrax from '../assets/cyrax.png';
import Cyrax from '../sprites/cyrax';
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
      this.load.audio('bombDrop', bombDrop);
      this.load.audio('bombEject', bombEject);
      this.load.audio('bombExplosion', bombExplosion);
      this.load.spritesheet('bomb', bomb, {
        frameWidth  : 10,
        frameHeight : 11,
        endFrame    : 5
      });
      this.load.atlas('explosion', explosion, explosionJSON);
      this.load.spritesheet('cyrax', cyrax, {
        frameWidth  : 35,
        frameHeight : 100,
        endFrame    : 3
      });
      this.load.image('monkey', monkey);
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
      
    this.cyrax = new Cyrax({
        scene: this,
        x: 0,
        y: this.game.config.height
      });
      
    this.bomb = new Bomb({
        scene: this,
        x: this.cyrax.x + (this.cyrax.width - 3),
        y: this.cyrax.y - (this.cyrax.height / 2) - 20
    });
  }
  
  update() {
    this.physics.overlap( this.bomb, this.monkey, this.hitEnemy, this.checkBulletVsEnemy, this );
    this.bomb.update();
  }
  
  render() {}

  checkBulletVsEnemy( bullet, enemy ) {
    return bullet.active && enemy.active;
  }

  hitEnemy( bullet, enemy ) {
    let isDead  = enemy.damage( bullet );
    if ( isDead )  this.cyrax.victoryDance();
    bullet.destroy();
  }
}