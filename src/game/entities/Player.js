import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        // Add this sprite to the scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.body.setSize(this.width * 0.6, this.height * 0.5);
        this.body.setOffset(this.width * 0.2, this.height * 0.5);

        // Setup controls
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.speed = 150;
    }

    update() {
        this.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.anims.play('walk-left', true);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
            this.anims.play('walk-right', true);
        } else if (this.cursors.up.isDown) {
            this.setVelocityY(-this.speed);
            this.anims.play('walk-up', true);
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(this.speed);
            this.anims.play('walk-down', true);
        } else {
            this.anims.stop();
        }
    }
}