// Get modal

let Journalmodal = document.getElementById("journalModal");

// //get journal btn
// let Journalbtn = document.getElementById("journalBtn");
//
//get <span> that closes modal
let Journalspan = document.getElementsByClassName("x")[0];
//
// //when user clicks btn, open modal
// Journalbtn.onclick = () => reveal(Journalmodal);
//
//when user clicks <span> (x), close
Journalspan.onclick = () => Inventory.close(Journalmodal);
