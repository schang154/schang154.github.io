import { Narration } from "../Narration.js";
import {GameEnvironment} from "../GameEnvironment.js";

/**
 * Inform user about the game's premise.
 */

export class IntroScene extends Phaser.Scene {
    /**
     * Construct the scene
     * 
     * @precond N/A
     * @postcond N/A
     */
    constructor() {
        let sceneKey = "intro";
        super({key: sceneKey});
        this.sentenceNum = 0;
        this.yPosIncrease = 0;
    }

    create() {
        this.displayLine(this.sentenceNum++, this.yPosIncrease);
        this.yPosIncrease += 100;

        this.input.on('pointerdown', 
            this.revealMoreLines, this);
    }

    /**
     * Reveal more texts.
     * @precond this is used as an event handler.
     * @postcond display text or move to loadingScene.
     */
    revealMoreLines() {
        if (!Narration.hasMoreQuote('intro', this.sentenceNum)) {
            this.scene.start('loadingScene');
            this.scene.sleep();
            return;
        } else {
            this.displayLine(this.sentenceNum++, this.yPosIncrease);
            this.yPosIncrease += 100;
        }
    }

    /**
     * Display each line 
     * @param sentenceNum, a Number that 
     *        describes the sentence number. 
     * @param yPosIncrease, a Number that increases
     *        the y position each time.
     */
    displayLine(sentenceNum, yPosIncrease) {
        let config = Narration.quote_config("intro", sentenceNum);  
        let message = this.make.text(config);
        let xPos = GameEnvironment.getGame().canvas.width / 2;

        let yPos = message.y;
        message.setPosition(xPos, yPos + yPosIncrease);
    }
}