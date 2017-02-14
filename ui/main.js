console.log('Loaded!');

// Change the text of the main-text div

var element = document.getElementById('main-text');
    
element.innerHTML = 'New Value';

//Move the Image

var img = document.getElementById('pic');
var marginLeft = 0;
function moveRight () {
    marginLeft = marginLeft + 10;
    img.style.marginLeft = margingLeft + 'px';
}
img.onClick = function () {
    var interval = setInterval(moveRight, 100);
};