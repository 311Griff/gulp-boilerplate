(function() {

    'use strict';

    if (typeof window.CL !== 'object') {
        window.CL = {};
    }

    window.CL.utils = {
        hud: function() {
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

            return 'Displaying HUD';
        },
        
        truncateText: function(el, amt, moreText, lessText) {
            var amount = parseInt(amt);
            var fullText = el.textContent;
            var words = fullText.split(' ');
            var lessWords = words.splice(0, amount).join(' ');

            // Initial truncate
            el.textContent = lessWords + '...';

            // Now let's create the "Read More" link
            var trigger = document.createElement('a');
            trigger.setAttribute('href', '#');
            trigger.setAttribute('class', 'read-more');
            moreText = typeof moreText !== 'undefined' ? moreText : 'Read more';
            lessText = typeof lessText !== 'undefined' ? lessText : 'Close';
            trigger.textContent = moreText;
            el.appendChild(trigger);

            trigger.addEventListener('click', function(e) {
                e.preventDefault();

                if (el.textContent !== fullText + lessText) {
                    el.textContent = fullText;
                    trigger.textContent = lessText;
                } else {
                    el.textContent = lessWords + '...';
                    trigger.textContent = moreText;
                }

                el.appendChild(trigger);

            });
        }
    };
})();

