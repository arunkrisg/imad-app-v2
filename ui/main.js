console.log('Loaded!');

// Change the text of the main-text div

var element = document.getElementById('main-text');
    
element.innerHTML = 'New Value';

//Move the Image

var img = document.getElementById('pic');
img.onClick = function() {
    img.style.marginleft = "200px";
};