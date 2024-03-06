

const htmlElement = document.documentElement;
const active = localStorage.getItem('theme') || 'light';
htmlElement.dataset.theme = active;


document.addEventListener('DOMContentLoaded', () => {
    const [sunIcon, moonIcon] = document.querySelectorAll('.theme-icon');
    const activeCircle = document.querySelector('.active-circle');

    if (active === 'dark') {
        sunIcon.classList.remove('active');
        moonIcon.classList.add('active');
        activeCircle.classList.add('active');
    } else {
        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
        activeCircle.classList.remove('active');
    }

    document.getElementById('themeBtn').addEventListener('click', () => {
        const htmlElement = document.documentElement;
        const [sunIcon, moonIcon] = document.querySelectorAll('.theme-icon');
        const activeCircle = document.querySelector('.active-circle');
        if (htmlElement.dataset.theme === 'light') {
            htmlElement.dataset.theme = 'dark';
            
            sunIcon.classList.remove('active');
            moonIcon.classList.add('active');
            activeCircle.classList.add('active');

            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.dataset.theme = 'light';

            sunIcon.classList.add('active');
            moonIcon.classList.remove('active');
            activeCircle.classList.remove('active');

            localStorage.setItem('theme', 'light');
        }
    });
})