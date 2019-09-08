import {StrandedMenu} from "./scenes/StrandedMenu.js";
import {IntroScene} from "./scenes/IntroScene.js";
import {LoadingScene} from "./scenes/LoadingScene.js";
import {GameScene} from "./scenes/GameScene.js";
import {Scene0} from "./scenes/Scene0.js";
import {LosingScene} from "./scenes/LosingScene.js";
import {WinningScene} from "./scenes/WinningScene.js";
import {Inventory} from "./inventory.js";
import {Journal} from "./Journal.js";
import {HealthReset} from "./scenes/GameScene.js";

/** 
 * The Phaser Game Environment
 */
export let GameEnvironment = {
    // holds a base game object
    game: null,

    // check if the game is finished
    finishGame: false,

    /**
     * Construct the game.
     * 
     * @precond none
     * @postcond made the game.
     */
    constructGame: () => {
        let config = {
            type: Phaser.AUTO,
            parent: 'Stranded',
            width: 1500,
            height: 850,
            scene: StrandedMenu
        };

        GameEnvironment.game = new Phaser.Game(config);
    },

    /**
     * Get the game object.
     */
    getGame: () => GameEnvironment.game,

    isGameFinish: () => GameEnvironment.finishGame,

    setFinishGame: value => GameEnvironment.finishGame = value,

    loadGame: () => {
        GameEnvironment.game.scene.add('introScene',
            new IntroScene(), true);

        GameEnvironment.loadGameScenes();

        GameEnvironment.game.scene.add('winningScene',
            new WinningScene(), false);

        GameEnvironment.game.scene.add('losingScene',
            new LosingScene(), false);
    },

    loadGameScenes: () => {
        GameEnvironment.game.scene.add('loadingScene',
        new LoadingScene(), false);

        GameEnvironment.game.scene.add('scene0',
            new Scene0(), false);

        const scenesInStage0 = 5;
        for (let i = 1; i < scenesInStage0; i++) {
            GameEnvironment.game.scene.add(`scene${i}`,
            new GameScene(0, i), false);
        }
    },

    deleteGameScenes: () => {
        GameEnvironment.game.scene.remove('loadingScene');

        const amountOfScenes = 12;
        for (let i = 0; i < amountOfScenes; i++) {
            GameEnvironment.game.scene.remove(`scene${i}`);
        }
    },

    replayGame: () => {
        GameEnvironment.deleteGameScenes();
        GameEnvironment.loadGameScenes();
        GameEnvironment.game.scene.sleep('losingScene');
        GameEnvironment.game.scene.sleep('winningScene');
        GameEnvironment.game.scene.start('loadingScene');
        
        Inventory.resetInventory();
        Journal.resetJournal();
        HealthReset.resetHealth();
    },

    /**
     * Destroy and reconstruct the game
     */
    reloadGame: () => {
        GameEnvironment.game.destroy(true);

        GameEnvironment.constructGame();
        Inventory.resetInventory();
        Journal.resetJournal();
        HealthReset.resetHealth();
    }
};
