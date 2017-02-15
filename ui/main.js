/*
console.log('Loaded!');

// Change the text of the main-text div

var element = document.getElementById('main-text');
    
element.innerHTML = 'New Value';

//Move the Image

var img = document.getElementById('pic');
var marginLeft = 0;
function moveRight () {
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
}
img.onClick = function () {
    var interval = setInterval(moveRight, 100);
};
*/

// Counter Code
var button = document.getElementById('counter');
var counter = 0;

button.onclick = function () {
        
    //Create a request object
    var request = new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if (request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        //Not done yet
    }
    //Make the request
    request.open('GET','http://arunkrisg.imad.hasura-app.io/counter',true);
    request.send(null);
};