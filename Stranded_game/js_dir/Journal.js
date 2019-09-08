import {Inventory} from "./inventory.js";
import { GameEnvironment } from "./GameEnvironment.js";
/* Journal and Crafting*/

// Get modal
let journalModal = document.getElementById("journalModal");

//get <span> that closes modal
let Journalspan = document.getElementsByClassName("x")[0];

//when user clicks <span> (x), close
Journalspan.onclick = () => Journal.close();

let closeJournal = new Audio('sound/closeJournal.m4a');

/**
 * 
 * display for craftable items and required materials.
 * 
 * @param evt target Event property.
 * @param questName questName, the name of the quest selected by user.
 * @precond questname selected.
 * @postcond display the active tab's content.
 */

function openQuest(evt, questName) {

    //Declare all variables
    var i, tabcontent, tablinks;

    //Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    //Get all elements with class="tablinks" and remove class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    //Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(questName).style.display = "block";
    evt.currentTarget.className += " active";

    localStorage.setItem('to_be_craft', questName);

}


//for loop get element from scene
//create button for each element

//FOR NOW read from quest object
export let Journal = {
    //materials for craftable
    quests: {
        knife: ['rock', 'rope'],
        filter: ['bottle','sand', 'pebble'],
        coconut: ['coconut'],
        fire: ['branch', 'wood', 'tinder', 'string']
    },

    diagrams: {
        knife: "images/diagrams/knife.png",
        filter: "images/diagrams/filter.png",
        coconut: "images/diagrams/coconut.png",
        fire: "images/diagrams/makefire.png",
        shelter: "images/diagrams/shelter.png",
        teepee: "images/diagrams/teepee.png"
    },
    
    /**
     * 
     * craft items in journal
     * 
     * @param None
     * @precond items and inventory exist
     * @postcond if the inventory has the change ID of active tab to <quest>complete.
     */
    craftObj: () => {
        let selected_item = localStorage.getItem('to_be_craft');
        if (Inventory.requirement_checker(Journal.quests[selected_item])) {
            Inventory.remove_items_from_inventory(Journal.quests[selected_item]);

            //function to replace checkbox image src after crafting done done
            replace_checkbox(selected_item);
            document.getElementsByClassName("active")[0].id = selected_item + "complete"; //new id indicates quest complete
            is_complete(selected_item);
            
            //if craft successful, run create_next_quest() to create the next quest
            create_next_quest();

        }
        
        else {
            alert('Lacking Materials')
        }
    },

    reveal: () => {
        journalModal.style.display = "block";
    },

    close: ()=> {
        journalModal.style.display = "none";
        closeJournal.play();
    },


    /**
     * 
     * Resets the journal to its original state.
     * 
     * @param None
     * @precond uses array and progress variable to track which quest user is on.
     * @postcond recreate left tabs and set right side diagram to display none 
     */
    resetJournal: () => {
        // let leftColumn = document.getElementsByClassName("column")[0];
        let tab_in_journal = document.getElementById("tab");

        // remove whatever is in tab
        while (tab_in_journal.hasChildNodes()) {
            tab_in_journal.removeChild(tab_in_journal.firstChild);
        }
        createTabs();
        //create_next_quest fn trigered by two things: when the page loads and when you successfully complete a quest

        //create array of keys for looping
        let key_array = Object.keys(Journal.quests);

        //set progress back to 0
        progress = 0; //track the index for quests

        create_next_quest();
        resetRightSide();
    },

};

//create array of keys for looping
let key_array = Object.keys(Journal.quests);

var progress = 0; //track the index for quests

//create_next_quest fn trigered by two things: when the page loads and when you successfully complete a quest
document.addEventListener('DOMContentLoaded', function() {create_next_quest(); right_page_creator();
}, false);

/**
 * 
 * create the tab of the next quest or end the game.
 * 
 * @param None
 * @precond uses array and progress variable to track which quest user is on.
 * @precond give the next quest if there is one, else run game end.
 */
function create_next_quest() {
    if (progress < key_array.length) { 
        left_page_creator(progress++)
    } else {
        play_heli()
        GameEnvironment.setFinishGame(true);
    }
}

/**
 * 
 * create item display on left page
 * 
 * @param progress, Int tracking the quest user is on
 * @precond uses array and progress variable to create next tab
 * @postcond create the tab, assigning it functions to open a diagram and work in journal.
 */
function left_page_creator(progress) {
    let key = key_array[progress]; //get name of the next quest

    let btn = document.createElement("BUTTON");
    btn.innerHTML = key;

    btn.className = "tablinks"; //tabcontent connects to the button via class
    btn.onclick = function () { openQuest(event, key); openDiagram(); is_complete(key) };

    document.getElementsByClassName("items")[0].appendChild(btn);
    
    create_checkbox(key);
}

/**
 * 
 * create checkboxes sequentially, essentially make img src so you can switch out img later
 * 
 * @param key, String representing the quests from the JS object
 * @precond there are keys in the JS object.
 * @postcond for each quest, create checkbox w/ unique id, and hide it.
 */
function create_checkbox(key) {
    let checkbox = document.createElement("IMG");
    checkbox.style.display = "none";
    checkbox.setAttribute("src", "images/sidebar/checkmark.png");
    checkbox.setAttribute("width", "20");
    checkbox.setAttribute("height", "20");
    checkbox.id = key + "checkbox"; //checkbox unique id to call later to replace image
    checkbox.className = "checkbox_class"; //same class for all checkboxes class for CSS

    document.getElementsByClassName("checkboxes")[0].appendChild(checkbox);
}

/**
 * 
 * change checkbox display to "block"
 * 
 * @param selected_item, from the JS object representing the quests, same as the keys of the prev. fn.
 * @precond there is a selected item with a corresponding checkmark.
 * @postcond using the previously set unique id, set display to "block."
 */
function replace_checkbox(selected_item) {
    document.getElementById(selected_item + "checkbox").style.display = "block";

}

/**
 * 
 * create required materials display on right page of journal.
 * 
 * @param None
 * @precond there is a quest object in the Journal object.
 * @postcond use the keys to get the values (materials required for crafting in-game). Place in appropriate div.
 */
function right_page_creator() {
    for (let key in Journal.quests) {
        let div = document.createElement("div");
        div.id = key;
        div.innerHTML = Journal.quests[key];
        div.className = "tabcontent";
        document.getElementById("content").appendChild(div);
        document.getElementById(key).style.display = "none";
    }
}

/**
 * 
 * show the corresponding diagram when an item is clicked.
 * 
 * @param None
 * @precond there is a diagrams object in the Journal object.
 * @postcond use the key of the active tab to show the corresponding diagram.
 */
function openDiagram () {
    for (let key in Journal.diagrams) { //loop through keys in diagrams array
        if (document.getElementsByClassName("active")[0].innerHTML == key) {
            document.getElementById("diagram").src = Journal.diagrams[key]; // replace innerHTML of <diagram div> w/ img (value of the key)
        }
    }
}

/**
 * 
 * hide the craft button when quest is complete.
 * 
 * @param key, String
 * @precond there is an element with id consisting of the item and "complete."
 * @postcond use that id to set the display to "none". else show the element.
 */
function is_complete(key) {
    //-"complete" indicates the quest is turned in.
    if (document.getElementsByClassName("active")[0].id == key  + "complete") {
        document.getElementById("craft").style.display = "none";
    } else {
        document.getElementById("craft").style.display = "block";
    }
}

/**
 * 
 * play helicopter sound (when all quests complete).
 * 
 * @param None
 * @precond audio file exists.
 * @postcond play helicopter sound.
 */
function play_heli() {
    var sound = new Audio("music_sounds/battle_field-navaneetha_kris-2040183680.mp3");
    sound.play();
}

/**
 * 
 * Generates tab on the left side in journal.
 * 
 * @param None
 * @precond 
 * @postcond create tabs on the left side of the journal.
 */
function createTabs() {
    let tab = document.getElementById("tab");
    let quests = document.createElement("div");
    quests.className = 'items';
    let checkboxes = document.createElement("div");
    checkboxes.className = 'checkboxes';
    tab.appendChild(quests);
    tab.appendChild(checkboxes);
    // let title = document.getElementsByClassName("title")[0];
    // title.appendChild(tab);
}

/**
 * 
 * Replaces the diagram and requirement with original sticky.
 * 
 * @param None
 * @precond 
 * @postcond Will set right side diagram to display none and diagram will source sticky note picture
 */
function resetRightSide() {
    let diagram = document.getElementById("diagram");
    let requirement = document.getElementsByClassName("tabcontent");
    let craftBtn = document.getElementById("craft");
    for (let i=0; i<requirement.length; i++) {
        requirement[i].style.display = "none"
    }
    diagram.src = "images/sidebar/sticky.png";
    craftBtn.style.display = "none";
}