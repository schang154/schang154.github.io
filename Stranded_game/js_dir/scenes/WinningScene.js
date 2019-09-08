import { Narration} from "../Narration.js";
import {GameEnvironment} from "../GameEnvironment.js";

/** A special version of the GameScene */
// This file deals with the winning scene
// This class is different than other scene
// due to a few special functions

var message;

export class WinningScene extends Phaser.Scene {
    constructor() {
        super({key: "winningScene"})
        this.music = null;
    }

    preload ()
    {
        this.load.image('win', 'images/background/rescued.jpg');
        this.load.audio('winningTheme', 'music_sounds/bensound-birthofahero.mp3');
    }

    create() {
        //add background image
        this.createBackGround('win');

        //add music
        this.createMusic();

        //add fade in effect
        this.cameras.main.fadeIn(3000);

        /**
         * Get ending narration after fading effect
         *
         * @param camerafadeincomplete, a Boolean to access the code.
         * @precond camerafadeincomplete must be a boolean.
         * @postcond trigger getNarraion funciton quotes.
         * @return n/a
         */
        this.cameras.main.on('camerafadeincomplete', 
            () => this.getNarration(this));

        /**
         * Add text to the sene
         *
         * @param n/a
         * @precond n/a
         * @postcond display message on the scene
         * @return n/a
         */
        this.add.text(
            635,
            600,
            'Tap To Return To Menu',
            {fontSize: '68px', fontFamily: 'Noto-Serif', fill: '#FFFFFF'}
        );

        // load loadingScene after click restart
        this.input.on('pointerdown', 
            () => this.returnToMenu(this), this)
    }

    /**
     *
     * freeze user actions, run winning scene
     *
     * @param
     * @precond no
     * @postcond run winning scene
     */
    returnToMenu(thisScene) {
        this.cameras.main.on (
            'camerafadeoutcomplete', 
            GameEnvironment.reloadGame
        );

        thisScene.cameras.main.fadeOut(3000);

        //when the scene is fading, prevent user from navigating away
        thisScene.input.disable(thisScene);

        // stop music
        this.music.stop();
    }
    /**
     * Play music
     *
     * @param n/a
     * @precond n/a
     * @postcond n/a
     * @return n/a
     */
    createMusic(){
        this.music = this.sound.add('winningTheme', {loop: true});
        this.music.play();
    }

    //get Intro narrations for each scene
    getNarration(thisScene) {
        //add narration box
        let number = 0;
        message = thisScene.make.text(
            Narration.quote_config(2.0, number)
        );
        //add stroke effect
        message.setStroke("#000000", 5);
        //Handle the narration box with click event
        thisScene.input.on('pointerdown', (event) => {
            message.destroy();
            message = thisScene.make.text(
                Narration.quote_config(2.0, number)
            );
            message.setStroke("#000000", 5);
            number++;
        }, thisScene);
    }
    /**
     * Create background image
     *
     * @param key, a String to access the code.
     * @precond key must be a string.
     * @postcond n/a
     * @return n/a
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