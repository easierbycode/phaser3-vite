
import Phaser from 'phaser'


export default class Beavis extends Phaser.Physics.Arcade.Sprite {
    
    private victim: Phaser.Physics.Arcade.Sprite
    
    constructor({scene, x, y, victim}) {
        super(scene, x, y, 'beavis')

        this.victim = victim

        scene.physics.add.existing( this )


        const animConfig: Phaser.Types.Animations.Animation = {
            frameRate   : 3,
            frames      : scene.anims.generateFrameNumbers('beavis', {
                start   : 2,
                end     : 4
            }),
            key         : 'saw',
            repeat      : 3
        }
        scene.anims.create( animConfig )

        const anim2     : Phaser.Types.Animations.Animation = {
            frameRate   : 4,
            frames      : scene.anims.generateFrameNumbers('beavis2', {
                start   : 2,
                end     : 3
            }),
            key         : 'headBang',
            repeat      : -1,
            yoyo        : true
        }
        scene.anims.create( anim2 )


        scene.add.existing( this )

        this.on('animationcomplete', (anim, frame) => this.emit('animationcomplete_' + anim.key, anim, frame))

        this.on('animationcomplete_saw', () => {
            this.victim.destroy()
            this.play( 'headBang' )
        })

        this.play( 'saw' )

        return this
    }
}