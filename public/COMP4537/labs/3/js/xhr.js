function myFunc(){
let xhttp = new XMLHttpRequest();
let url = "https://calm-ridge-59694.herokuapp.com/";
let variableName = "name";
let name = document.getElementById(variableName).value;
let combinedURL = `${url}?${variableName}=${name}`;

console.log("clicked");
console.log(combinedURL);

xhttp.open("GET", combinedURL, true);
xhttp.send();
xhttp.onreadystatechange =  () => {
    let writeBlockId = "response";
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        document.getElementById(writeBlockId).innerHTML =
            xhttp.responseText;
    }
};}