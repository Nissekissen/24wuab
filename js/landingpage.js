// For handling the landing page


function setScrollVar() {
    const htmlElement = document.documentElement;
    const percentage = htmlElement.scrollTop * 100 / htmlElement.clientHeight;

    htmlElement.style.setProperty('--scroll', percentage);


    // switch to dark mode if scroll is more than 100%
    if (percentage > 300 && percentage < 600) {
        htmlElement.dataset.theme = 'dark';

        // change the background of #intro

        document.getElementById('introDashboardImage').attributes.src.value = '../img/darkmode.jpg';
    } else {
        htmlElement.dataset.theme = 'light';

        document.getElementById('introDashboardImage').attributes.src.value = '../img/lightmode.jpg';

    }
}

document.addEventListener('scroll', setScrollVar);

var currentComponent = null;
var lastComponent = null;
const componentImage = document.getElementById('componentImage');
function updateComponentImage() {
    // set the transform of the image to match the position of the current component
    let index = Array.from(currentComponent.parentElement.children).indexOf(currentComponent);
    if (currentComponent == null || images[index] === undefined) {
        currentComponent = null;
        componentImage.style.display = 'none';
        return;
    };
    
    if (lastComponent != currentComponent) {
        const scrollClick = new Audio('https://d2aaqgugo71xux.cloudfront.net/assets/audio/scroll-click.mp3');
        scrollClick.play();
    }

    componentImage.src = images[index].src;

    componentImage.style.display = 'block';
    componentImage.style.transform = `translateY(${currentComponent.offsetTop}px) translateY(-50%)`;
    lastComponent = currentComponent;
}

const isHover = e => e.parentElement.querySelector(':hover') === e;

document.addEventListener('mousemove', e => {
    let found = false;
    document.querySelectorAll('.component-list tr').forEach(element => {
        if (isHover(element)) {
            currentComponent = element;
            element.classList.add('hover');
            updateComponentImage();
            found = true;
            return;
        }

        element.classList.remove('hover');
    });
    if (!found) currentComponent = null;
    updateComponentImage();
})

document.addEventListener('scroll', e => {
    let closest = null;
    document.querySelectorAll('.component-list tr').forEach(element => {
        // remove the hover selector
        element.classList.remove('hover');
        
        let rect = element.getBoundingClientRect();
        // find the closest element to the middle of the screen
        if (closest == null || Math.abs(rect.top - window.innerHeight / 2) < Math.abs(closest.top - window.innerHeight / 2)) {
            closest = rect;
            currentComponent = element;
        }
    });
    
    // Define the range around the middle of the screen
    let middleRangeTop = window.innerHeight / 2 - window.innerHeight * 0.1;
    let middleRangeBottom = window.innerHeight / 2 + window.innerHeight * 0.1;

    // Check if the closest element is within the range
    if (closest.top <= middleRangeBottom && closest.bottom >= middleRangeTop) {
        // Apply the hover effect
        currentComponent.classList.add('hover');
    } else {
        currentComponent = null;
    }

    updateComponentImage();
});
// document.querySelectorAll('.component-list tr').forEach(element => element.addEventListener('onmouseover', e => {
//     currentComponent = e.target;
//     updateComponentImage();
// }));

setScrollVar();