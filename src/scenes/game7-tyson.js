
import Phaser from 'phaser'
import tyson from '../assets/tyson.png'
import monkey from '../assets/monkey.png'
import Monkey from '../sprites/monkey'
import Tyson from '../sprites/tyson'


export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' })
    }

    preload() {
        this.load.image('monkey', monkey)

        this.load.spritesheet('tyson', tyson, {
            frameWidth  : 55,
            frameHeight : 122,
            endFrame    : 12
        })
    }

    create() {
        this.tyson = new Tyson({
            scene   : this,
            x       : (this.game.config.width - 27) - 20,
            y       : (this.game.config.height - 61) - 50
        })

        this.monkey = new Monkey({
            scene: this,
            x: this.game.config.width,
            y: this.game.config.height
          })
    
        this.monkey.x -= this.monkey.displayWidth/2
    }
}