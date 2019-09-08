import {GameScene} from "./GameScene.js"
import {egg} from "../easterEgg.js";
import {Scene11} from "./Scene11.js";


/** A special version of the GameScene */
// This class is different than other scene
// due to a few special functions
export class Scene0 extends GameScene {
    /**
     * Construct the object.
     */
    constructor() {
        super(0, 0);
    }

    /**
     * Create objects for the game.
     * 
     * @precond objects must be preloaded.
     * @postcond objects are created for the game.
     */
    create() {
        this.createBackGround();        
        this.createMusic();
        this.createEasterEgg();
        this.createItems();
        this.getNarration();
        this.createHealthBar();
        this.createLocationText();

        this.editBag();
        this.loadRemainingScenes();
    }
        

    /**
     * 
     * create the bag, enable the sidebar
     * 
     * @postcond pick up the bag and enable the sidebar
     */
    editBag() {
        // find the bag
        let bag = this.children.getChildren().find(child =>
            child.texture.key === "backpack");

        // if bag is not made aka it's collected
        if (bag === undefined) {
            this.createSideBar();
            this.createNavigationArrows();
            return;
        }

        // remove the default onclick
        bag.removeAllListeners();

        // add our own eventHandler
        bag.on('pointerup', () => {
            this.createSideBar();
            this.createNavigationArrows();
            this.getItemNarration("backpack");

            // play sound
            this.sound.play("pickupSound");

            let BAG_INDEX = 0;
            this.items[BAG_INDEX].collected = true;

            bag.destroy();

        }, this)

    }

    /**
     * 
     * add the easter egg
     * 
     * @precond add image methods exist
     * @postcond add eventListener to easter egg
     */
    createEasterEgg() {
        // add the easter egg to the scene
        var canada = this.add.image(260, 600, 'canada').setScale(0.05).setAlpha(0.75).setInteractive(); // 660 520

        // add eventListeners to easter egg
        canada.on('pointerdown', () => {
            egg.reveal();
        });
    }

    /**
     * Load the scenes after the trail.
     * 
     * @precond need access to GameScene and Scene11 class.
     * @postcond add the remaining scene to the game.
     */
    loadRemainingScenes() {
        const scenesInStage1Besides11 = 6;
        for (let i = 0; i < scenesInStage1Besides11; i++) {
            this.scene.add(`scene${i  + 5}`,
            new GameScene(1, i), false);
        }

        this.scene.add('scene11',
            new Scene11(), false);

        // remove some scenes so it doesn't slow down the game
        this.scene.remove('strandedMenu');
        this.scene.remove('introScene');

    }

}