// File for handling dashboard (for menu, see js/menu.js)

const itemList = document.querySelector('.item-list');

getItems((res) => {
    itemList.innerHTML = '';
    if (res.data.length === 0) {
        const errorElement = document.querySelector('.item-list');
        errorElement.classList.remove('item-list');
        errorElement.classList.add('error');

        errorElement.innerHTML = `<h3>Inga varor hittades</h3>`;
        return;
    }
    res.data.forEach((item) => {
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');

        const itemText = document.createElement('div');
        itemText.classList.add('item-text');
        itemText.innerHTML = `<h3>${item.name}</h3><p>${item.amount}st</p>`;
        itemElement.appendChild(itemText);

        const itemButtons = document.createElement('div');
        itemButtons.classList.add('item-buttons');
        itemButtons.innerHTML = `<a
        class="btn btn-primary"
        href="details.html?id=${item.id}"
        >Detaljer</a>`
        itemElement.appendChild(itemButtons);

        itemList.appendChild(itemElement);

        const divider = document.createElement('div');
        divider.classList.add('item-list-divider');

        itemList.appendChild(divider);
    });
}, (err) => {
    const errorElement = document.querySelector('.item-list');
    errorElement.classList.remove('item-list');
    errorElement.classList.add('error');

    errorElement.innerHTML = `<h3>Det gick inte att hämta varor</h3>`;
    console.error(err);
})

document.getElementById('themeBtn').addEventListener('click', () => {
    const htmlElement = document.documentElement;
    const [sunIcon, moonIcon] = document.querySelectorAll('.theme-icon');
    const activeCircle = document.querySelector('.active-circle');
    if (htmlElement.dataset.theme === 'light') {
        htmlElement.dataset.theme = 'dark';
        
        sunIcon.classList.remove('active');
        moonIcon.classList.add('active');
        activeCircle.classList.add('active');
    } else {
        htmlElement.dataset.theme = 'light';

        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
        activeCircle.classList.remove('active');

    }
});