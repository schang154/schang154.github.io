import {GameEnvironment} from "../GameEnvironment.js";

/**
 * Create a loading screen
 */
export class LoadingScene extends Phaser.Scene {
    constructor() {
        super({key: "loadingScene"});
        this.text = "Loading...";
        this.sceneToStart = "scene0";
    }

    create() {
        let message = this.createMessage();
        this.createTweens(message);
    }

    /**
     * Create the loading message using Phaser.
     * 
     * @precond Game must be initialized first.
     * @postcond a Phaser Text Object is created.
     * @return a Phaser Text Object.
     */
    createMessage() {
        let messageConfig = {
            x: GameEnvironment.getGame().canvas.width / 2,
            y: 400,
            align: "center",
            text: this.text,
            origin: { x: 0.5, y: 0.5 },
            style: {
                fontSize: '68px',
                fontFamily: 'Noto-Serif',
                color: '#ffffff'
            }
        }

        return this.make.text(messageConfig);
    }

    /**
     * Add tween to the message so it fades.
     * @param message, a Phaser Text Object.
     */
    createTweens(message) {
        let scene = this;
        this.tweens.add({
            targets: message,
            alpha: 0,
            duration: 700,
            yoyo: true,
            repeat: 5,
            onStart: () => this.scene.run(this.sceneToStart),
            onComplete: () => scene.scene.pause()
        });
    }
}