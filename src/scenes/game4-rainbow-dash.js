import constants from '../config/constants';
import Phaser from 'phaser';
import blade from '../assets/blade.png';
import blood from '../assets/blood.png';
import bone from '../assets/bone.png';
import explosion from '../assets/explosion.png';
import explosionJSON from '../assets/explosion.json';
// import liuKang from '../assets/liu-kang.png';
// import liuKangIdle from '../assets/liu-kang-idle.png';
import monkey from '../assets/monkey.png';
import Monkey from '../sprites/monkey';
import muscle from '../assets/muscle.png';
import rainbowCloud from '../assets/rainbow-cloud.png';
import rainbowDash from '../assets/rainbow-super.png';


export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }
  preload() {
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
      this.load.spritesheet('rainbowDash', rainbowDash, {
        frameWidth  : 69,
        frameHeight : 75,
        endFrame    : 13
      });
      this.load.spritesheet('rainbowCloud', rainbowCloud, {
        frameWidth  : 39,
        frameHeight : 40,
        endFrame    : 14
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

    // loop 11-14 (10-13)
    this.anims.create({
        frameRate   : 12,
        frames      : this.anims.generateFrameNumbers('rainbowDash', {
            start : 0,
            end   : 9,
            first : 0
        }),
        key         : 'aboutToAttack'
    });

    this.anims.create({
        frameRate   : 12,
        frames      : this.anims.generateFrameNumbers('rainbowDash', {
            start : 10,
            end   : 13,
            first : 10
        }),
        key         : 'attack',
        repeat      : -1
    });

    this.anims.create({
        frameRate   : 12,
        frames      : this.anims.generateFrameNumbers('rainbowDash', {
            start : 0,
            end   : 0,
            first : 0
        }),
        key         : 'chill'
    });

    this.anims.create({
        frameRate   : 24,
        frames      : this.anims.generateFrameNumbers('rainbowCloud', {
            start : 0,
            end   : 14,
            first : 0
        }),
        key         : 'rainbowAttack',
        repeat      : 5
    });

    let rainbowDash   = this.add.sprite(
                        this.game.config.width/2,
                        (this.game.config.height - 37),
                        'rainbowDash',
                        0
                    );

    rainbowDash.on('animationcomplete', (anim, frame) => rainbowDash.emit('animationcomplete_' + anim.key, anim, frame));
    
    rainbowDash.on('animationcomplete_aboutToAttack', (anim) => {
        let rainbowCloud   = this.add.sprite(
                        this.monkey.x,
                        (this.monkey.body.top - 20) + 5,
                        'rainbowCloud',
                        0
                    );
        
        rainbowCloud.play( 'rainbowAttack' );
        
        rainbowCloud.on('animationcomplete', (anim, frame) => rainbowCloud.emit('animationcomplete_' + anim.key, anim, frame));
        
        rainbowDash.play( 'attack' );

        rainbowCloud.on('animationcomplete_rainbowAttack', (anim) => {
            rainbowCloud.destroy();
            rainbowDash.play( 'chill' );
            this.monkey.destroy();
        });

        this.rainbowCloud = rainbowCloud;
    });

    rainbowDash.play( 'aboutToAttack' );
  }
  
  update() {
      // cloud lightning
      if ( !this.rainbowCloud )  return;
      let lightning = [0, 1, 3, 4, 9, 10];
      if ( lightning.includes( this.rainbowCloud.frame.name ) ) {
          let color = Phaser.Math.RND.pick(
          [
            0xe0332c,
            0xfdf768,
            0x0078c0
          ]
          );
        
          this.monkey.setTint( color );

          this.cameras.main.setBackgroundColor( color );
      } else {
          this.monkey.clearTint();
          this.cameras.main.setBackgroundColor( 0x000000 )
      }
  }
  
  render() {}
}