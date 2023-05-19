
import Phaser from 'phaser'


export default class Beavis extends Phaser.Physics.Arcade.Sprite {
    constructor({scene, x, y, victim}) {
        super(scene, x, y, 'beavis')

        this.victim = victim

        scene.physics.add.existing( this )

        scene.anims.create({
            frameRate   : 3,
            frames      : scene.anims.generateFrameNumbers('beavis', {
                start   : 2,
                end     : 4
            }),
            key         : 'saw',
            repeat      : 3
        })

        scene.add.existing( this )

        this.on('animationcomplete', (anim, frame) => this.emit('animationcomplete_' + anim.key, anim, frame))

        this.on('animationcomplete_saw', () => {
            this.scene.monkey.destroy()
        })

        this.play( 'saw' )

        return this
    }
}