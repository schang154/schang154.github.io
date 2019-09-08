/* Start the Phaser game*/
import {Inventory} from "./inventory.js";
import {Journal} from "./Journal.js";
import {GameEnvironment} from "./GameEnvironment.js"

// contruct an inventorys
Inventory.constructInventory();

// start Phaser
GameEnvironment.constructGame();

/********************************************* */

/* Shared resources */
// //when user clicks outside modal/dropdown, close modals
window.onclick = function(event) {

    if (event.target === journalModal) {
        Journal.close();
    }
    if (event.target === inventoryModal) {
        Inventory.close();
    }

};


//hook up crafting button to requirement_checker
let craft = document.getElementById("craft");

craft.onclick = () => Journal.craftObj();


