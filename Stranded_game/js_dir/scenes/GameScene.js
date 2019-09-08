import { stages } from "./stages.js";
import { Inventory } from "../inventory.js"
import { Journal } from "../Journal.js"
import { GameEnvironment } from "../GameEnvironment.js"
import { Narration } from "../Narration.js";

/*
    Our custom class that let us create a Scene
*/

// Global variables for initializing health bar
var healthPool = 100;
var healthPresent = null;
let healthBarInterval;

localStorage.setItem('decreaseRate', '5000');

let decreaseRate = parseInt(localStorage.getItem('decreaseRate'));

// Binary checker to see if a scene has been visited.
let sceneChecked = 0;

export class GameScene extends Phaser.Scene {

    /**
     * Instantiate a new GameScene.
     *
     * @param stage, a Number.
     * @param scene, a Number.
     * @precond stage and scene must be number.
     * @postcond this will create a new StageLoader instance.
     */
    constructor(stage, scene) {
        let data = stages[stage][scene];

        super({ key: data.name });
        this.location = data.location;
        this.background = data.background;
        this.items = data.items;
        this.directions = data.directions;
        this.narration = data.narration;
        this.game = GameEnvironment.getGame();

        // declare default value of sidebar
        this.sidebar = [
            {
                name: "bag",
                source: "./images/sidebar/backpack2.png"
            },
            {
                name: "journal",
                source: "./images/sidebar/journal_sidebar.png"
            }
        ];

        // initialize healthBar value
        this.healthBar = {
            bar: null,
            barColor: null,
            barBackground: null,
            barBackgroundColor: null,
            healthText: null
        }

    }

    /**
     * Load objects for the game.
     * 
     * @precond objects must be linked to the game.
     * @postcond objects are loaded for the game.
     */
    preload() {
        // game audio loop preload
        this.load.audio('gameLoop', 'music_sounds/between_worlds_game_loop.mp3');

        // sound fx preload
        this.load.audio('pickupSound', 'sound/item_pickup.wav');
        this.load.audio('hikingSound', 'sound/hard_shoes_simon.mp3');

        // background
        this.load.image(this.background.name, this.background.src);

        // sidebar
        for (let i = 0; i < this.sidebar.length; i++) {
            this.load.image(this.sidebar[i].name, this.sidebar[i].source);
        }

        this.load.audio('bag', 'sound/backpack.m4a');
        this.load.audio('openJournal', 'sound/openJournal.m4a');

        // movement arrow
        this.load.image('movementArrow', 'images/movement_arrow_no_att_2.png');

        // easter egg
        this.load.image('canada', 'images/weed.png'); // images/canada_flag.png

        // game items preload
        if (this.items !== undefined) {
            for (let i = 0; i < this.items.length; i++) {
                this.load.image(this.items[i].name, this.items[i].source);
            }
        }

    }

    /**
     * Create objects for the game.
     * 
     * @precond objects must be preloaded.
     * @postcond objects are created for the game.
     */
    create() {
        this.createBackGround();
        this.createItems();
        this.createSideBar();
        this.createNavigationArrows();
        this.getNarration();
        this.createHealthBar();
        this.createLocationText();
    }

    /**
     * Create the background for the scene.
     * 
     * @param key, the key of the background image.
     *             Default is the this.background.name.
     * @precond 
     */
    createBackGround(key = this.background.name) {
        // adding background image
        let background = this.add.image(0, 0, key).setOrigin(0, 0);
        let canvas = GameEnvironment.getGame().canvas;
        let xRatio = canvas.width / background.width;
        let yRatio = canvas.height / background.height;
        background.setScale(xRatio, yRatio);
    }

    /** Create game music
     *
     * PRECOND: song must have been preloaded
     * POSTCOND: game music is playing
     */
    createMusic() {
        this.gameLoop = this.sound.add('gameLoop', { loop: true });
        this.gameLoop.play();
    }

    //get Intro narrations for each scene
    getNarration(narrationKeyword = "scene", callback = null) {
        if (this.narration === undefined) return;

        //add narration box
        let number = 0;
        this.message = this.make.text(
            Narration.quote_config(this.narration[narrationKeyword], number)
        );
        this.message.setStroke("#000000", 5); //hope for team 11
        //Handle the narration box with click event
        this.input.on('pointerdown', (event) => {
            this.message.destroy();

            if (!Narration.hasMoreQuote(this.narration[narrationKeyword],
                ++number)) {
                if (typeof callback === "function") callback();
                return;
            }

            //Handling narration interruption
            if (this.narration["scene"] === "quit") return;

            this.message = this.make.text(
                Narration.quote_config(this.narration[narrationKeyword], number)
            );
            this.message.setStroke("#000000", 5);
        }, this);

    }

    //get Item narrations for each item
    getItemNarration(itemName) {
        //Handling narration interruption
        this.narration["scene"] = "quit";
        if (this.message) this.message.destroy();

        // add narration box
        this.itemMessage = this.make.text(
            Narration.quote_config(itemName)
        );
        this.itemMessage.setStroke("#000000", 5);
        //Handle the narration box with click event
        this.input.on('pointerdown', (event) => {
            this.itemMessage.destroy();
        }, this);
    }

    /* Add items to the scene
        PRECOND: this.items must not be null
        POSTCOND: items will be added to the scene
    */
    createItems() {
        // check if there's any item in the scene
        if (this.items === undefined) return;

        for (let i = 0; i < this.items.length; i++) {
            let item;
            item = this.add.image(this.items[i].xCoord,
                this.items[i].yCoord, this.items[i].name);

            item.setOrigin(this.items[i].xOrigin, this.items[i].yOrigin);
            item.setScale(this.items[i].scale);

            if (!this.items[i].interactive) continue;
            item.setInteractive();

            item.on('pointerup', () => {
                // play sound
                this.sound.play("pickupSound");

                // add the item to the inventory
                Inventory.get_item(item, this.items[i].source);

                // set its collected property true
                this.items[i].collected = true;

                // pass item name and trigger the item quotes
                let itemName = this.items[i].name;
                this.getItemNarration(itemName);
            }, this)

        }
    }

    /* Add the sidebar to the scene
        PRECOND: the sidebar instance variable must be defined already
        POSTCOND: sidebar will be added to the scene
    */
    createSideBar() {
        // create the background for the sidebar
        let graphics = this.add.graphics();

        graphics.lineStyle(2, 0x121111, 1);
        graphics.fillStyle(0x908C8C, 0.4);

        // create a rounded rectangle
        graphics.strokeRoundedRect(1100, 0, 430, 165, 38);
        graphics.fillRoundedRect(1100, 0, 430, 165, 38);

        // create the bag
        var bag = this.add.image(1325, 10,
            this.sidebar[0].name)
        bag.setOrigin(0, 0).setInteractive().setScale(1, 1); //increased from 0.7, 0.7

        // sound and event handler
        var bagSound = this.sound.add('bag');
        bag.on('pointerup', () => { Inventory.reveal(); bagSound.play() }, this);

        // create the journal
        var journal = this.add.image(1130, 10,
            this.sidebar[1].name)
        journal.setOrigin(0, 0).setInteractive().setScale(1, 1);

        // sound and event handler
        var openJournal = this.sound.add('openJournal');
        journal.on('pointerup', () => { Journal.reveal(); openJournal.play() }, this);
    }

    /* Add the movement arrows to the scene
        POSTCOND: navigation arrows will be added to the scene
    */
    createNavigationArrows() {

        // create arrows based on number of directions
        for (let key in this.directions) {
            let config;
            let destination;

            switch (key) {
                case ("right"):
                    config = {
                        key: "movementArrow",
                        x: GameEnvironment.getGame().config.width - 140,
                        y: GameEnvironment.getGame().config.height / 1.8,
                        scale: { x: 0.20, y: 0.3 },
                    }
                    destination = this.directions[key];
                    break;

                case ("left"):
                    config = {
                        key: "movementArrow",
                        x: 140,
                        y: GameEnvironment.getGame().config.height / 1.8,
                        scale: { x: 0.20, y: 0.3 },
                        flipX: true
                    }
                    destination = this.directions[key];
                    break;

                // case ("special"):
                default:
                    config = this.directions[key].config;
                    destination = this.directions[key].name;
                    break;
            }

            let arrow = this.make.image(config);
            arrow.setInteractive();

            // add eventListeners to arrows
            arrow.on('pointerup', () => this.moveToNextScene(destination), this);
        }
    }

    /**
     * Tests to see if the scenes location name is a specific value and changes the health decrease rate accordingly
     *
     * @param location, the current scenes name
     * @precondition N/A (this function has no preconditions)
     * @post-condition Will set the local storage item 'decreaseRate' to the correct value
     * @returns Nothing
     */
    testSceneLocation(location) {
        if (location === "scene6" || location === "scene7") {
            localStorage.setItem('decreaseRate', '200');
        } else {
            localStorage.setItem('decreaseRate', '5000');
        }
    }


    /** 
     * Run the next scene.
     * 
     * @param sceneName, a String
     * @param soundOn, a boolean. Default is true.
     * @precond needs the specified scene already loaded
     * @postcond the specified scene will run. 
     *          Current scene is paused.
    */
    moveToNextScene(sceneName, soundOn = true) {
        // Sets the health decrease rate according to 
        // the destination scene.
        if (sceneName === "scene6" || sceneName === "scene7") {
            detectHealth(500);
        } else if (sceneName === "scene5") {
            detectHealth(5000);
        }

        // play sound
        if (soundOn === true) {
            this.sound.play("hikingSound");
        }

        // change scene
        this.scene.sleep();
        this.testSceneLocation(sceneName);
        this.scene.run(sceneName);
    }

    /**
     * Create the HealthBar and the percentage.
     * 
     * @precond none.
     * @postcond created a healthbar.
     */
    createHealthBar() {
        // create the background
        this.healthBar.barBackground = new Phaser.Geom.Rectangle(30, 30, 100, 30);
        Phaser.Geom.Rectangle.Scale(this.healthBar.barBackground, 3, 1);

        this.healthBar.barBackgroundColor = this.add.graphics(
            { fillStyle: { color: 0x000000 } });
        this.healthBar.barBackgroundColor.fillRectShape(
            this.healthBar.barBackground);

        // create the bar that will move overtime
        this.healthBar.bar = new Phaser.Geom.Rectangle(30, 30, healthPool, 30);
        Phaser.Geom.Rectangle.Scale(this.healthBar.bar, 3, 1);

        this.healthBar.barColor = this.add.graphics(
            { fillStyle: { color: 0xc80000 } });
        this.healthBar.barColor.fillRectShape(this.healthBar.bar);

        if (this.healthBar.bar) {
            this.healthBar.myHealthText = this.add.text(
                80, 35, 'Health: ' + healthPool + "%");
        }

        if (healthPresent == null) {
            healthPresent = true;
        }
    }

    /**
     * Create text for the current location.
     * 
     * @precond none.
     * @postcond the text is created.
     */
    createLocationText() {
        let obj = {
            x: 35,
            y: 65,
            align: "center",
            text: this.location,
            origin: { x: 0, y: 0 },
            style: {
                fontSize: '6vw',
                fontFamily: 'Noto-Serif',
                color: 'white',
                align: 'center',
            }
        }
        let caption = this.make.text(obj);
        caption.setStroke('black', 3);
    }

    /**
     * Constantly update the scene.
     * 
     * @precond none.
     * @postcond perform any duty specified here.
     */
    update() {
        // Tests to see if a scene has been visited before, 
        // if it has the timer will not be reset.
        if (sceneChecked === 0) {
            decreaseRate = parseInt(localStorage.getItem('decreaseRate'));
            this.testSceneLocation(this.location);
            sceneChecked = 1;
            detectHealth(decreaseRate);
        }
        this.updateHealthBar();
        this.pauseMusic();
        this.resize();
    }

    /**
     * Pause music when game is finished.
     * 
     * @precond the game is finished.
     * @postcond music is paused.
     */
    pauseMusic() {
        if (GameEnvironment.isGameFinish()) {
            this.sound.pauseAll();
        }
    }

    /**
     * Resize canvas on browser size.
     * 
     * @precond the game is started.
     * @postcond the screen is resized if needed.
     */
    resize() {
        var canvas = GameEnvironment.getGame().canvas;
        let width = window.innerWidth, height = window.innerHeight;
        var wratio = width / height, ratio = canvas.width / canvas.height;
        var modal_background = document.getElementsByClassName('modal');

        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = (width / ratio) + "px";
            for (let i = 0; i < modal_background.length; i++) {
                modal_background[i].style.width = width + "px";
                modal_background[i].style.height = (width / ratio) + "px";
            }
        } else {
            canvas.style.width = (height * ratio) + "px";
            canvas.style.height = height + "px";
            for (let i = 0; i < modal_background.length; i++) {
                modal_background[i].style.width = (height * ratio) + "px";
                modal_background[i].style.height = height + "px";
            }
        }
    }

    /**
     * Update the health bar.
     *
     * @precond none.
     * @postcond update the health bar and text.
     */
    updateHealthBar() {
        // Redraws the healthbar to allow it to change size when the health pool decreases
        if (this.healthBar.bar) {
            this.healthBar.barColor.clear();
            this.healthBar.bar.width = healthPool;
            this.healthBar.bar.height = 30;
            Phaser.Geom.Rectangle.Scale(this.healthBar.bar, 3, 1);
            this.healthBar.barColor.fillRectShape(this.healthBar.bar);
            this.healthBar.myHealthText.setText("Health: " + healthPool + "%");
        }

        // Detects if the health bar is present and triggers a function to start it decreasing
        if (healthPresent) {
            if (healthBarInterval) {
                clearInterval(healthBarInterval);
            }
            decreaseRate = parseInt(localStorage.getItem('decreaseRate'));
            detectHealth(decreaseRate);
            healthPresent = false; // Must be here to stop the health bar from being decreased multiple times at once
        }

        if (healthPool <= 0) {
            this.moveToNextScene('losingScene', false);
            healthPool = 100;
        }
    }
}


/**
 * Launches an interval where health will be decreased every 5 seconds (can be changed by changing the timeout).
 * @param decreaseRate, the setInterval period
 * @precond There must be a health bar in the game and on the screen
 * @postcond Will start a interval to decrease the health of the user
 */
function detectHealth(decreaseRate) {
    if (healthBarInterval) {
        clearInterval(healthBarInterval);
    }
    healthBarInterval = setInterval(decreaseHealthPool, decreaseRate);
}

/**
 * Decreases the healthPool variable by 1 when it is called.

 * @precond N/A (this function has no preconditions)
 * @postcond Will decrease the healthPool variable by 1
 */

function decreaseHealthPool() {
    healthPool > 0 ? healthPool -= 1 : clearInterval(healthBarInterval);
}

export class HealthReset {
    static resetHealth() {
        healthPool = 100;
        detectHealth(5000);
    }
}