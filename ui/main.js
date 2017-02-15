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

button.onClick = function () {
        
    //Make a request to the conter end point
    
    //Capture the response and store it in a variable
    
    //Render the variable in the correct span
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};