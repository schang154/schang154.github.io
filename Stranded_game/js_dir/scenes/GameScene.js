import {stages} from "./stages.js";
import {Inventory} from "../inventory.js"

/*
A library that loads scenes for Phaser base on a JS object.
*/
    
/*
    Our custom class that let us create a Scene
*/
export class GameScene extends Phaser.Scene {

    // holds data about the scene
    sceneData;

    /*
    Instantiate a new StageLoader

    PARAM: @game a Phaser.Game object
           @config an Scene object
    POSTCOND: create a new StageLoader instance
    */
    constructor(stage, scene) {
        super();
        this.sceneData = stages[stage][scene];
    }

    preload ()
    {
        // background
        this.load.image('beach', 'images/background/beach_1280_800.jpg');

        // sidebar
        this.load.image('sidebar', 'images/sidebar/sidebar.png');
        this.load.image('bag', 'images/sidebar/backpack.png');
        this.load.image('journal', 'images/sidebar/journal_sidebar.png');
        this.load.image('coconut', 'images/items/coconut_not_attribution.png')
    }

    create ()
    {
        // adding background image
        var beach = this.add.image(0, 0, 'beach').setOrigin(0, 0);
        var sidebar = this.add.image(1130, 0, 'sidebar').setOrigin(0, 0);
        var bag = this.add.image(1130, 0, 'bag').setOrigin(0, 0).setInteractive();
        var journal = this.add.image(1130, 160, 'journal').setOrigin(0, 0).setInteractive();
        var coconut = this.add.image(100, 600, 'coconut').setOrigin(0, 0).setScale(0.04).setInteractive();

        coconut.id = 'coconut';

        coconut.on('pointerup', () => Inventory.get_item('coconut', coconut), this);
        bag.on('pointerup', () => Inventory.reveal(inventoryModal), this);
        journal.on('pointerup', () => Inventory.reveal(Journalmodal), this);
    }
}
