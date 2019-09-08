/**
 *  Everything to do with the inventory.
 */

/**
 * The HTML elements.
 */
let inventoryModal = document.getElementById('inventoryModal');
let inventoryStorageSpaces = document.getElementById("items");
let bag_sound = new Audio('sound/backpack.m4a');
let closeSpan = document.getElementById("iclose");

/**
 * When the user clicks on <span> (x), close the inventoryModal.
 */
closeSpan.onclick = () => Inventory.close();

/**
 * The Inventory HTML element.
 */
export let Inventory = {
    // keep track of items user has
    items: [],

    animal: ['seal', 'dog', 'bird', 'turtle'],

    // keep track of empty slots
    emptySlots: 12,

    /**
     * Constructs inventory spaces in the page.
     *
     * @postcond this will create inventory spaces in the inventory modal.
     */
    constructInventory: () => {
        for (let i = 0; i < 12; i++){
            Inventory.items.push(Inventory.createBtn());
        }
    },

    /**
     * Generates buttons and toggle for inventory.
     *
     * @postcond this will create button and its toggle.
     */
    createBtn: () => {
        let btns = document.createElement("button");
        btns.setAttribute("Class", "empty");

        // create the tool tip text
        let span = document.createElement('span');
        span.setAttribute('class', 'toolTipText');
        btns.appendChild(span);

        // set up the event listener
        btns.addEventListener('click', Inventory.toggleToolTip);
        inventoryStorageSpaces.appendChild(btns);
        return btns;
    },

    /**
     * Toggle the name of the item in inventory.
     * 
     * @param event, an Event Object.
     * @precond this is an event handler.
     * @postcond the tool tip is shown.
     */
    toggleToolTip: event => {
        // find the source of the event
        let button = event.currentTarget;

        // if there's no value yet
        if (button.value === "") return;

        let toolTip = button.children[0];
        let toolVisibility = toolTip.style.visibility;
        
        // check if button is revealed yet
        if (toolVisibility === "" || toolVisibility === "hidden") {
            let text = document.createTextNode(button.value);
            toolTip.appendChild(text);
            toolTip.style.visibility = "visible";
        } else {
            let text = toolTip.childNodes[0];
            toolTip.removeChild(text);
            toolTip.style.visibility = "hidden";            
        }
        
    },

    /**
     * Get the item into the inventory.
     * Also remove it from the scene.
     * 
     * @param item, a Phaser Image object.
     * @param imgSrc, a String of the source of the image.
     * @precond item must be an image object and imgSrc must be
     *          a String of image source.
     * @postcond this will remove picked-up item from the screen
     *          and put it to the inventory.
     */
    get_item: (item, imgSrc) => {
        if (Inventory.checkAnimal(item.texture.key)) {
            item.destroy();
        }
        else {
            if (Inventory.emptySlots > 0) {
                // remove object from screen
                item.destroy();

                // add it to inventory
                Inventory.add_item_to_inventory(item.texture.key, imgSrc);

                Inventory.emptySlots--;
            } else {
                alert("Inventory full! Craft something!");
            }
        }
    },

    /**
     * Add the item into the inventory.
     * Helper function for get_item function.
     * 
     * @param itemName, a String of the item's name.
     * @param imgSrc, a String of the source of the image.
     * @precond itemName and imgSrc must be String of item name and image source.
     * @postcond this will add the item to the inventory.
     */
    add_item_to_inventory: (itemName, imgSrc) => {
        for (let i = 0; i < 12; i++) {
        // find an empty div space
            if (Inventory.items[i].className === "empty") {
                let picked_item = Inventory.items[i];
                picked_item.className = "filled";
                picked_item.value = itemName;

                //set the picked-up item to as the background-image of the inventory button
                picked_item.style.backgroundImage = `url(${imgSrc})`;
                break;
            }
        }
    },

    /**
     * Check if the picked-up item is an animal.
     *
     * @param item, a String of the item's name.
     * @precond item must be String of item name.
     * @postcond this will check if the item is an animal.
     * @return boolean value.
     */
    checkAnimal(item) {
        return Inventory.animal.includes(item);
    },

    /**
     * Reveal the inventory.
     *
     * @postcond this will change the display of inventory modal to block.
     */
    reveal: () => {
        inventoryModal.style.display = "block";
    },

    /**
     * Close the inventory.
     *
     * @postcond this will change the display of inventory
     * modal to none with sound effect.
     */
    close: () => {
        inventoryModal.style.display = "none";
        bag_sound.play();
    },

    /**
     * Check that the Inventory has all necessary craft 
     * item requirement.
     * 
     * @param requirements, an Array of Strings.
     * @precond this takes in the requirements from the Journal.
     * @return true if all the requirements are in the Inventory.
     */
    requirement_checker: requirements => {
        return requirements.every(Inventory.checkForCraftableItem);
    },

    /**
     * Check that the Inventory has all necessary craft 
     * item requirement.
     * 
     * @param requiredItem, an Array of Strings.
     * @precond this takes in the requirements from the Journal.
     * @return true if all the requirements are in the Inventory.
     */
    checkForCraftableItem: requiredItem => {
        let inventoryItems = Inventory.listNamesOfItemsPossessed();
        return inventoryItems.includes(requiredItem);
    },

    /**
     * Remove items from the inventory based on the requirements.
     * 
     * This will remove crafting materials needed for that object.
     * 
     * @param requirements, an Array of Strings.
     * @precond requirement_check() has to be called first.
     * @postcond the inventory gets rid of the required items.
     */
    remove_items_from_inventory: requirements => {
        let newInventory = Inventory.items.slice();
        let domObjArray = [];
        
        requirements.forEach(requiredItem => {
            let inventoryItems = Inventory.listNamesOfItemsPossessed();
            let index = inventoryItems.findIndex(item => item === requiredItem);
            domObjArray.push(newInventory[index]);

        });

        domObjArray.forEach(element => {
            inventoryStorageSpaces.removeChild(element);
            newInventory.push(Inventory.createBtn());
            Inventory.emptySlots += 1;
        });

        Inventory.items = newInventory;

    },

    /**
     * List the names of the items in the Inventory.
     *
     * @postcond this will loop through the items Array and
     *           put it in a new Array.
     * @return an Array of item names that we have.
     */
    listNamesOfItemsPossessed: () => {
        let itemsGot = [];
        // make an Array of items names that we have now
        for (let i = 0; i < Inventory.items.length; i++) {
            if (Inventory.items[i].value !== "") {
                itemsGot.push(Inventory.items[i].value);
            }
        }
        return itemsGot;
    },

    /**
     * Reset the inventory when we reload the game.
     * 
     * @precond this is called when the game restart.
     * @postcond the inventory is empty.
     */
    resetInventory: () => {
        while (inventoryStorageSpaces.hasChildNodes()) {
            inventoryStorageSpaces.removeChild(inventoryStorageSpaces.firstChild);
        }
        Inventory.items = [];
        Inventory.constructInventory();
        Inventory.emptySlots = 12;
    }
};


