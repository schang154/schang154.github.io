import {GameScene} from "./GameScene.js";

//index page
export class IndexScene extends Phaser.Scene {
    preload ()
    {
        this.load.image('bg', 'images/background/game_title.png');
    }

    create ()
    {
        // adding background image
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        // adding start text
        this.button = this.add.text(580, 600, 'Start', { fontSize: '40px', fill: '#FFFFFF' }).setInteractive();

        //change scene to beginning Scene after clicking on START
        this.button.once('pointerup', function() {
            this.scene.add('stage0_scene0', new GameScene(0, 0), true, { x: 640, y: 400 })}, this);
    }

}