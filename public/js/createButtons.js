for (let i=0; i<26; i++){
    btn = document.createElement("button");
    document.body.appendChild(btn);
    btn.innerHTML = String.fromCharCode(65+i);
    btn.onclick = function() {console.log("Button " + String.fromCharCode(65+i) + " was clicked.")}
}