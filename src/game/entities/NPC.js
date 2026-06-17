import Phaser from 'phaser';

export default class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, animPrefix) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.animPrefix = animPrefix;
        this.speed = 50;

        // Start the AI Brain
        scene.time.addEvent({
            delay: 1000,
            callback: this.moveRandomly,
            callbackScope: this, 
            loop: true
        });
    }

    moveRandomly() {
        if (!this.active) return;

        const directions = ['up', 'down', 'left', 'right', 'stop', 'stop'];
        const dir = directions[Math.floor(Math.random() * directions.length)];

        this.setVelocity(0);

        if (dir === 'left') {
            this.setVelocityX(-this.speed);
            this.anims.play(`${this.animPrefix}-left`, true);
        } else if (dir === 'right') {
            this.setVelocityX(this.speed);
            this.anims.play(`${this.animPrefix}-right`, true);
        } else if (dir === 'up') {
            this.setVelocityY(-this.speed);
            this.anims.play(`${this.animPrefix}-up`, true);
        } else if (dir === 'down') {
            this.setVelocityY(this.speed);
            this.anims.play(`${this.animPrefix}-down`, true);
        } else {
            this.anims.stop();
        }
    }
}