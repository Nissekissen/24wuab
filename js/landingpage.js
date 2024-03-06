// For handling the landing page


function setScrollVar() {
    const htmlElement = document.documentElement;
    const percentage = htmlElement.scrollTop * 100 / htmlElement.clientHeight;

    htmlElement.style.setProperty('--scroll', percentage);

    console.log(percentage);

    // switch to dark mode if scroll is more than 100%
    if (percentage > 100) {
        htmlElement.dataset.theme = 'dark';

        // change the background of #intro
        const intro = document.getElementById('intro');
        // intro.style.background = 'var(--background)';

        // set the background of the #intro::before element to linear-gradient that is entirely black
        // intro.style.setProperty('--intro-overlay', 'linear-gradient(var(--background), var(--background))');

        intro.style.setProperty('--intro-bg-color1', 'var(--background)');
        intro.style.setProperty('--intro-bg-color2', 'var(--background)');

        document.getElementById('introDashboardImage').attributes.src.value = '../img/darkmode.jpg';
    } else {
        htmlElement.dataset.theme = 'light';
        const intro = document.getElementById('intro');
        intro.style.backgroundImage = 'url(../img/intro-bg.jpg)';
        intro.style.setProperty('--intro-bg-color1', 'white');
        intro.style.setProperty('--intro-bg-color2', 'transparent');

        document.getElementById('introDashboardImage').attributes.src.value = '../img/lightmode.jpg';

    }
}

document.addEventListener('scroll', setScrollVar);

setScrollVar();