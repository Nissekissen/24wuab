// For handling hamburger menu

// using queryselectorall if i want to use multiple menu-btn
document.querySelectorAll('.menu-btn').forEach((e) => e.addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('menu--open');
}))

// Close menu when clicked outside
document.addEventListener('click', (e) => {
    if (e.target.closest('.menu') === null && e.target.closest('.menu-btn') === null) {
        document.querySelector('.menu').classList.remove('menu--open');
    }
})