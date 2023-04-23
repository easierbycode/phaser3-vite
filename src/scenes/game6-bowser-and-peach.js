import constants from '../config/constants';
import Phaser from 'phaser';
import blood from '../assets/blood.png';
import bone from '../assets/bone.png';
import bowser from '../assets/bowser.png';
import bowserCannonball from '../assets/bowser-cannonball.png';
import bowserCopter from '../assets/bowser-copter.png';
import bowserCopterPropeller from '../assets/bowser-copter-propeller.png';
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
      this.load.image('bowserCopter', bowserCopter);
      this.load.atlas('explosion', explosion, explosionJSON);
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
    this.load.spritesheet('bowser', bowser, {
        frameWidth  : 49,
        frameHeight : 37,
        endFrame    : 5
    });
    this.load.spritesheet('bowser', bowser, {
        frameWidth  : 49,
        frameHeight : 37,
        endFrame    : 5
    });
    this.load.spritesheet('bowserCannonball', bowserCannonball, {
        frameWidth  : 48,
        frameHeight : 48,
        endFrame    : 7
    });
    this.load.spritesheet('bowserCopterPropeller', bowserCopterPropeller, {
        frameWidth  : 40,
        frameHeight : 8,
        endFrame    : 2
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

    this.physics.add.existing( this.monkey );
      
      // rotate propeller Animation
    this.anims.create({
        frameRate   : 9,
        frames      : this.anims.generateFrameNumbers('bowserCopterPropeller', {
            start : 0,
            end   : 2,
            first : 0
        }),
        key         : 'rotate',
        repeat      : -1
      });

    let bowserCopterContainer   = this.add.container( this.monkey.x, (this.game.config.height / 2) - 24 );
    
    let cannonball   = this.add.sprite(
                        0,
                        -24,
                        'bowserCannonball',
                        0
                    );
    
    this.physics.add.existing( cannonball );
    
    cannonball.alpha    = 0;

    this.cannonball     = cannonball;
    
    let bowserCopter   = this.add.sprite(
                        0,
                        0,
                        'bowserCopter',
                        0
                      );
    
    let bowserCopterPropeller   = this.add.sprite(
                        0,
                        (bowserCopter.height/2) + 4,
                        'bowserCopterPropeller',
                        0
                    );
    
    bowserCopterPropeller.play( 'rotate' );
    
    this.anims.create({
        frameRate   : 6,
        frames      : this.anims.generateFrameNumbers('bowser', {
            start : 0,
            end   : 5,
            first : 0
        }),
        key         : 'bowserHide'
      });
    
    let bowser                  = this.add.sprite(
                        0,
                        (0 - (bowserCopter.height/2) - 18) + 5,  //(bowserCopter.y - (bowserCopter.height/2) - 18) + 5,
                        'bowser',
                        0
                    );

    bowserCopterContainer.add([ cannonball, bowserCopter, bowserCopterPropeller, bowser ]);
    
    bowserCopterContainer.scaleX = -1;
    
    this.time.delayedCall(
        1000,
        () => { bowser.play( 'bowserHide' ) }
    )
    
    this.time.delayedCall(
        2000,
        () => {
            bowser.alpha    = 0;

            this.tweens.add({
                targets : bowserCopterContainer,
                angle   : { value: 179, duration: 2500 }
            })
        }
    )

    // drop cannonball
    this.time.delayedCall(
        4500,
        () => {
            cannonball.alpha    = 1;

            cannonball.body.setGravityY( -750 );

            this.time.delayedCall(
                750,
                () => {
                    this.tweens.add({
                        targets : bowserCopterContainer,
                        angle   : { value: 1, duration: 2500 },
                    })
                }
            )
            
            

            this.time.delayedCall(
                3250,
                () => {
                    bowser.alpha    = 1;
                    bowser.anims.playReverse( 'bowserHide' );
                }
            )
        }
    )
  }
  
  update() {
    if ( this.cannonball.alpha ) {
        this.physics.overlap( this.cannonball, this.monkey, this.hitEnemy, this.checkBulletVsEnemy );
    }
  }
  
  render() {}
  
  checkBulletVsEnemy( bullet, enemy ) {
    return bullet.active && enemy.active;
  }

  hitEnemy( bullet, enemy ) {
      enemy.damage( bullet, enemy );
  }
}