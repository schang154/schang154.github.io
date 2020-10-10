let buttonContainer = document.getElementById("button-container");
for (let i=0; i<26; i++){
    let btn = document.createElement("button");
    buttonContainer.appendChild(btn);
    btn.style.height = "50px";
    btn.style.width = "50px";
    btn.innerHTML = String.fromCharCode(65+i);
    btn.onclick = () => {
        window.alert("Button " + String.fromCharCode(65+i) + " was clicked.");
    };
}
