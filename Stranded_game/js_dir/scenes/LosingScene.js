import {GameEnvironment} from "../GameEnvironment.js"
import { Journal } from "../Journal.js"
import { Inventory } from "../inventory.js";

/**
 *  This scene for losing ending.
 */
export class LosingScene extends Phaser.Scene {

    constructor() {
        super({key: "losingScene"});
    }

    preload ()
    {
        this.load.image('lose', 'images/background/lose.png');
        this.load.audio('Wilhelm', 'sound/Wilhelm Scream sound effect.mp3'); //Pre-load scream.
    }

    create() {
        Journal.close()
        Inventory.close()
        
        let wilhelm = this.sound.add('Wilhelm'); //add to losing scene
        wilhelm.play(); //play the sound

        this.createBackGround('lose');
        
        // add losing text and restart btn
        this.add.text(
            635,
            150, 
            'YOU ARE', 
            {fontSize: '68px', fontFamily: 'Noto-Serif', fill: '#FFFFFF'});

        let restartBtn = this.add.text(
            685,
            600, 
            'Restart', 
            {fontSize: '68px', fontFamily: 'Noto-Serif', fill: '#FFFFFF'}
            ).setInteractive();

        // load loadingScene after click restart
        restartBtn.on('pointerup', GameEnvironment.replayGame, this);
    }

    /**
     * Create the background for the scene.
     *
     * @param key, the key of the background image.
     *              Default is the this.background.name.
     * @precond key must be String
     * @postcond this will create background image for losing scene from the source
     */
    createBackGround(key = this.background.name) {
        // adding background image
        let background = this.add.image(0, 0, key).setOrigin(0, 0);
        let canvas = GameEnvironment.getGame().canvas;
        let xRatio = canvas.width / background.width;
        let yRatio = canvas.height / background.height;
        background.setScale(xRatio, yRatio);
    }

}