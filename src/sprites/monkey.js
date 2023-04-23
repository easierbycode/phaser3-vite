import Phaser from 'phaser';


export default class Monkey extends Phaser.Physics.Arcade.Sprite {
    constructor({ scene, x, y }) {
        super(scene, x, y, 'monkey');

        this.setOrigin( 0.5, 1 );

        this.health = 1;
        
        this.scene  = scene;

        scene.physics.add.existing( this );

        this.setScale( 6 );

        this.setOffset( 4, 0 );

        // bloodAnimation
        scene.anims.create({
            frameRate   : 20,
            frames      : scene.anims.generateFrameNumbers('blood', {
                start : 0,
                end   : 9,
                first : 0
            }),
            hideOnComplete  : true,
            key         : 'bloodAnimation',
            repeat      : 0
        });

        let bone      = scene.add.particles('bone');

        this.bones     = bone.createEmitter({
            frame: [0,1,2,3,4,5,6,7],
            speed: 750,
            on: false
        });

        this.bones.startFollow( this );

        let muscle      = scene.add.particles('muscle');

        this.muscles     = muscle.createEmitter({
            frame: [0,1,2,3,4,5,6,7],
            speed: 1500,
            on: false
        });

        this.muscles.startFollow( this );
        
        let explosion   = scene.add.particles('explosion');

        this.explosionFlash     = explosion.createEmitter({
            frame       : 'muzzleflash2',
            lifespan    : 200,
            scale       : { start: 4, end: 0 },
            rotate      : { start: 0, end: 180 },
            on          : false
        });

        this.explosionFlash.startFollow( this );

        scene.add.existing( this );
    }

    bloodAnimation() {
        // blood
        this.scene.add.sprite( this.x, this.y - this.body.halfHeight, 'blood' )
            .setScale( 2.5 )
            .play( 'bloodAnimation' );
    }

    showCodeMonkeyBanner() {
        // show CodeMonkey.Games text
        this.scene.add.text(this.x - (this.body.width + 10), this.y - this.body.halfHeight, 'CodeMonkey.Games', { font: '"Bangers"' });
    }

    destroy() {
        this.bones.explode( 16 )
        this.scene.cameras.main.shake( 500, 0.01 );

        this.scene.time.delayedCall(
            25,
            function() {
                this.explosionFlash.explode( 1 );

                this.bloodAnimation();

                this.muscles.explode( 60 );

                this.showCodeMonkeyBanner();
            },
            [],
            this
        )

        this.scene.time.delayedCall( 50, () => {
            this.muscles.explode( 32 );
            super.destroy();
        });
    }

    damage( bullet ) {
        
        this.health -= (bullet.damagePoints || 1);

        let isDead  = this.health <= 0;

        if ( isDead ) {
            this.setActive( false );
            this.setVisible( false );
            this.destroy();
        }

        return isDead;
    }
}