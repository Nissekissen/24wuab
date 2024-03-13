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

        const itemElement = new Item(item.name, `${item.amount}st`, null, new Button('Detaljer', 'details.html?id=' + item.id, styles.primary));
        itemList.innerHTML += itemElement.render();
    });
}, (err) => {
    const errorElement = document.querySelector('.item-list');
    errorElement.classList.remove('item-list');
    errorElement.classList.add('error');

    errorElement.innerHTML = `<h3>Det gick inte att hämta varor</h3>`;
    console.error(err);
})
