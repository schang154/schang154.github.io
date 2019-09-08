/* The games Easter Egg. */

// References the div that holds the Easter Egg.
let eggModal = document.getElementById('eggModal');

// References the elements that can close the Easter Egg.
let closeSpan = document.getElementById('eggClose');

// Tells the close elements what to do on a click.
closeSpan.onclick = () => egg.close();

// Tells the full modal to close when clicked anywhere.
eggModal.onclick = () => egg.close();

// A small class defining the two functions (open and close) available to the Easter Egg.
export let egg = {
    // Opens the Easter Egg.
    reveal: () => {
        eggModal.style.display = "block";
    },

    // Closes the Easter Egg.
    close: () => {
        eggModal.style.display = "none";
    }
};