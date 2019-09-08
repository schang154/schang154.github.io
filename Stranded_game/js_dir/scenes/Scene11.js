import {GameScene} from "./GameScene.js"
import {GameEnvironment} from "../GameEnvironment.js"

/** A special version of the GameScene */
// This class is different than other scene
// due to a few special functions
export class Scene11 extends GameScene {
    constructor() {
        const stage = 1;
        const scene = 6;
        super(stage, scene);
    }

    /**
     * 
     * update the health, pause the music, and check win condition
     * 
     * @param 
     * @precond no
     * @postcond update the health, pause the music, and check win condition
     */
    update() {
        this.updateHealthBar();
        this.pauseMusic();
        this.checkWinCondition();
        
    }    

    /**
     * 
     * Check if the user has finished the game.
     * 
     * @param 
     * @precond no
     * @postcond If they have, play the ending sequence
     */
    checkWinCondition() {
        if (GameEnvironment.isGameFinish()) {
            // delete any current narration
            this.message.destroy();

            // create the ending narration
            // when it ends, call a callback function
            // that runs the winning scene
            
            this.getNarration('endGame', () => this.displayWinningScene(this))
            
            // set to false so the update doesn't run again
            GameEnvironment.setFinishGame(false)
        }
    }

    /**
     * 
     * freeze user actions, run winning scene
     * 
     * @param 
     * @precond no
     * @postcond run winning scene
     */
    displayWinningScene(thisScene) {
        thisScene.cameras.main.fadeOut(3000);
        
        //when the scene is fading, prevent user from navigating away
        thisScene.input.disable(thisScene);

        thisScene.cameras.main.on('camerafadeoutcomplete', () => {
            this.moveToNextScene('winningScene', false)
        })

    }

    

}