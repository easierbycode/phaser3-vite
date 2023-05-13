
import Phaser from 'phaser'
import tyson from '../assets/tyson.png'
import Tyson from '../sprites/tyson'


export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' })
    }

    preload() {
        this.load.spritesheet('tyson', tyson, {
            frameWidth  : 55,
            frameHeight : 122,
            endFrame    : 12
        })
    }

    create() {
        this.tyson = new Tyson({
            scene   : this,
            x       : (this.game.config.width - 27),
            y       : (this.game.config.height - 61)
        })
    }
}