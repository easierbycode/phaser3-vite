import constants from '../config/constants';
import Phaser from 'phaser';
import blade from '../assets/blade.png';
import blood from '../assets/blood.png';
import bone from '../assets/bone.png';
import explosion from '../assets/explosion.png';
import explosionJSON from '../assets/explosion.json';
import headlessMonkey from '../assets/monkey-headless.png';
import liuKang from '../assets/liu-kang.png';
import liuKangIdle from '../assets/liu-kang-idle.png';
import monkey from '../assets/monkey.png';
import Monkey from '../sprites/monkey';
import muscle from '../assets/muscle.png';


export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }
  preload() {
      this.load.atlas('explosion', explosion, explosionJSON);
      this.load.image('headlessMonkey', headlessMonkey);            
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
    this.load.spritesheet('liuKang', liuKang, {
        frameWidth  : 129,
        frameHeight : 169,
        endFrame    : 12
      });
      this.load.spritesheet('liuKangIdle', liuKangIdle, {
        frameWidth  : 42,
        frameHeight : 100,
        endFrame    : 5
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

    // chillin
    this.anims.create({
        frameRate   : 12,
        frames      : this.anims.generateFrameNumbers('liuKangIdle', {
            start : 0,
            end   : 5,
            first : 0
        }),
        hideOnComplete  : true,
        key         : 'chillin',
        repeat      : -1
    });

    // dragon Animation
    this.anims.create({
        frameRate   : 12,
        frames      : this.anims.generateFrameNumbers('liuKang', {
            start : 0,
            end   : 9,
            first : 0
        }),
        key         : 'dragonMorph'
      });
      
      // dragon Animation
    this.anims.create({
        frameRate   : 12,
        frames      : this.anims.generateFrameNumbers('liuKang', {
            start : 10,
            end   : 12,
            first : 10
        }),
        key         : 'dragonBite'
      });

    let liuKang   = this.add.sprite(
                        this.game.config.width - 40,
                        this.game.config.height,
                        'liuKang',
                        0
                      );
    
    liuKang.setOrigin( 1, 1 );

    liuKang.on('animationcomplete', (anim, frame) => liuKang.emit('animationcomplete_' + anim.key, anim, frame));

    liuKang.play( 'dragonMorph' );

    liuKang.once('animationcomplete_dragonMorph', (anim) => {
      this.time.delayedCall(
        1000,
        () => {
          liuKang.play( 'dragonBite' );
        }
      )
    })

    liuKang.on('animationcomplete_dragonBite', () => {
      this.monkey.setTexture( 'headlessMonkey' );
      
      this.monkey.bloodAnimation();
      
      this.time.delayedCall(
        750,
        () => {
          this.monkey.destroy();
        }
      )

      liuKang.once('animationcomplete_dragonMorph', (anim) => {
        liuKang.alpha = 0;

        let liuKangIdle   = this.add.sprite(
                        liuKang.getBottomLeft().x,
                        liuKang.getBottomLeft().y,
                        'liuKangIdle',
                        0
                      );

        liuKangIdle.setOrigin( 0, 1 );

        liuKangIdle.play( 'chillin' );
      })
      
      this.time.delayedCall(
        500,
        () => {
          liuKang.anims.playReverse( 'dragonMorph' );
        }
      )
    })
  }
  
  update() {
  }
  
  render() {}
}