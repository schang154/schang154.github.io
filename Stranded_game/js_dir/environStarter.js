/* Start the game */

import {IndexScene} from "./scenes/IndexScene.js";
import {Inventory} from "./inventory.js";

// contruct an inventory
Inventory.constructInventory();

var config = {
    type: Phaser.AUTO,
    parent: 'Stranded',
    width: 1280,
    height: 800,
    scene: IndexScene
};

var game = new Phaser.Game(config);

/********************************************* */

/* Shared resources */

//when user clicks outside modal/dropdown, close
window.onclick = function(event) {

    //when user clicks outside modal, close
    if (event.target === Journalmodal) {
        Inventory.close(Journalmodal);
    }
    if (event.target === inventoryModal) {
        Inventory.close(inventoryModal);
    }
}


