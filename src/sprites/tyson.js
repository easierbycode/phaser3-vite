
import Phaser from 'phaser'


export default class Tyson extends Phaser.Physics.Arcade.Sprite {
    constructor({scene, x, y, victim}) {
        super(scene, x, y, 'tyson')

        this.victim = victim

        scene.physics.add.existing( this )

        scene.anims.create({
            frameRate   : 3,
            frames      : scene.anims.generateFrameNumbers('tyson', {
                start   : 0,
                end     : 2,
                first   : 0
            }),
            key         : 'shuffle',
            repeat      : -1
        })

        scene.add.existing( this )

        this.play( 'shuffle' )

        return this
    }
}