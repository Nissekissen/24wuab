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

        const itemElement = new Item(item.name, `${item.amount}st`, null,
            new Button()
                .setText('Detaljer')
                .setHref('details.html?id=' + item.id)
                .setStyle(styles.primary)
        );
        itemList.innerHTML += itemElement.render();
    });
}, (err) => {
    const errorElement = document.querySelector('.item-list');
    errorElement.classList.remove('item-list');
    errorElement.classList.add('error');

    errorElement.innerHTML = `<h3>Det gick inte att hämta varor</h3>`;
    console.error(err);
})

getCurrentQueueItem((res) => {
    if (res.data) {
        const queueItem = res.data;
        const queueElement = new QueueItem(`${queueItem.amount}st`, types[queueItem.type],
            new Button()
                .setText('Detaljer')
                .setHref('details.html?id=' + queueItem.id)
                .setStyle(styles.primary)
        );
        document.querySelector('.queue-item').innerHTML = queueElement.render();
    } else {
        document.querySelector('.queue-item').innerHTML = `<h3>Inga varor i kön</h3>`;
    }
}, (err) => { 
    if (err.response.status === 404) {
        document.querySelector('.queue-item').innerHTML = `<h3>Inga varor i kön</h3>`;
        document.querySelector('.queue-item').classList.add('error');
        document.querySelector('.queue-item').classList.add('no-margin');
        return;
    }
    document.querySelector('.queue-item').innerHTML = `<h3>Det gick inte att hämta nästa vara i kön</h3>`;
    console.error(err);
});