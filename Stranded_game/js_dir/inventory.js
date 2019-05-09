/* Everything to do with the inventory */

let inventoryModal = document.getElementById('inventoryModal');
let inventoryStorageSpaces = document.getElementById("items");

let items = {
    'coconut': {
        'path' : `url("images/items/coconut_not_attribution.png")`,
    },
    'energy_bar': {
        'path' : `url("images/items/energy_bar.png")`,
    },
    't_shirt': {
        'path' : `url("images/items/t_shirt.png")`,
    },
    'water_bottle': {
        'path' : `url("images/items/water_bottle.png")`,
    }

};

/* The whole Inventory Div */
export let Inventory = {
    // construct the Inventory
    constructInventory: () => {
        for (let i = 0; i < 15; i++){
            let btns = document.createElement("button");
            btns.setAttribute("Class", "empty");
            btns.setAttribute("id", "invSpace" + (i + 1));
            inventoryStorageSpaces.appendChild(btns);
        }

        // Set up closing the inventory
        let closeSpan = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the inventoryModal
        closeSpan.onclick = () => Inventory.close(inventoryModal);
    },

    // remove the object from the screen
    get_item: (item_str, item) => {
        item.destroy();
        Inventory.add_item_to_inventory(item, item_str);
    },

    //adding picked up items to the inventory
    add_item_to_inventory: (item, item_src) => {
        for (let i = 1; i < 16; i++) {
            if(document.getElementById("invSpace" + i).className === "empty"){
                let picked_item = document.getElementById("invSpace" + i);
                let picked_item_styling = picked_item.style;
                picked_item.className = "filled";
                //set the picked-up item to as the background-image of the inventory button
                picked_item_styling.backgroundImage = items[item_src]['path'];
                break;
            }
        }
    },

    reveal: modal => {
        modal.style.display = "block";
    },

    close: modal => {
        modal.style.display = "none";
    },

    requirement_checker: (questName, questObj) => {
        let requirementObj = questObj[questName];
        for (let i=0; i< requirementObj.length; i++) {
            if (!(items.includes(requirementObj[i]))) {
                console.log('lacking material');
                return false;
            }
        }
        console.log('enough material');
        return true;
    },

    remove_item_from_inventory: () => {

    }
};


