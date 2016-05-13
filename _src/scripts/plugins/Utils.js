'use strict';

module.exports = {
    bp: bp
};

function bp() {
    var div = document.createElement('div');

    div.style.position = 'fixed';
    div.style.bottom = '10px';
    div.style.left = '10px';
    div.style.overflow = 'hidden';
    div.style.borderRadius = '5px';
    div.style.padding = '2.5px 10px';
    div.style.display = 'block';
    div.style.backgroundColor = 'black';
    div.style.color = 'white';
    div.style.cursor = 'pointer';
    div.style.opacity = '0.85';
    div.style.mozOpacity = '0.85';
    div.style.zIndex = '1000';

    div.innerHTML = window.innerWidth + 'px';

    div.onclick = function() {
        div.style.bottom = '-100px';
    };

    window.onresize = function() {
        div.innerHTML = window.innerWidth + 'px';
    };

    document.body.appendChild(div);

    return 'BP Display';
}