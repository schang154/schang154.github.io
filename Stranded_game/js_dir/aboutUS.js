/* The about us 'page' (modal). */

// References the div holding the about us 'page'.
let aboutModal = document.getElementById('aboutUsModal');

// References the elements that allow the about us page to be closed.
let closeSpan = document.getElementById('aboutClose');

// Tells the closing elements what to do on a click.
closeSpan.onclick = () => about.close();

// Tells the 'page'/modal to close when clicked anywhere. Scrolling is still possible.
aboutModal.onclick = () => about.close();

// A small class defining the two functions (open and close) available to the about us modal.
export let about = {
    // Opens the about us 'page'.
    reveal: () => {
        aboutModal.style.display = "block";
    },

    // Closes the about us 'page'.
    close: () => {
        aboutModal.style.display = "none";
    }
};