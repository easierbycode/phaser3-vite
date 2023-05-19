
import Phaser from 'phaser'
import blood from '../assets/blood.png'
import muscle from '../assets/muscle.png'
import bone from '../assets/bone.png'
import beavis from '../assets/beavis.png'
import monkey from '../assets/monkey.png'
import Monkey from '../sprites/monkey'
import Beavis from '../sprites/beavis'


export default class Game extends Phaser.Scene {
    
    private monkey: Phaser.Physics.Arcade.Sprite
    
    constructor() {
        super({ key: 'Game' })
    }

    preload() {
        this.load.image('monkey', monkey)

        this.load.spritesheet('beavis', beavis, {
            frameWidth  : 61,
            frameHeight : 90
        })
        this.load.spritesheet('blood', blood, {
            frameWidth  : 88,
            frameHeight : 71,
            endFrame    : 9
        })
        this.load.spritesheet('bone', bone, {
            frameWidth  : 18,
            frameHeight : 18
        });
        this.load.spritesheet('muscle', muscle, {
            frameWidth  : 23,
            frameHeight : 22
        })
    }

    create() {
        this.monkey = new Monkey({
            scene: this,
            x: this.game.config.width,
            y: this.game.config.height
          })
    
        this.monkey.x -= this.monkey.displayWidth/2

        const beavis = new Beavis({
            scene   : this,
            x       : ((+this.game.config.width - 30) + 13) - this.monkey.displayWidth/2,
            y       : (+this.game.config.height - 45),
            victim  : this.monkey
        })
    }
}