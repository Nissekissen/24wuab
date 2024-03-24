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
        getItem(queueItem.item_id, (res) => {
            const queueElement = new QueueItem(`${res.data.name} - ${queueItem.amount}st`, types[queueItem.type],
                new Button()
                    .setText(
                        queueItem.paused ? 'Skicka tillbaka' : queueItem.status > 1 ? 'Ta bort' : 'Avbryt'
                    )
                    .setStyle(styles.danger)
                    .setId(queueItem.id)
                    .setExtraStyles(
                        queueItem.paused
                            ? [statusBtnClass[statusBtnClass.length - 1]]
                            : [statusBtnClass[queueItem.status]]
                    ),
                queueItem.status,
                queueItem.paused);
                document.querySelector('.queue-item').innerHTML = queueElement.render();
        });
    } else {
        document.querySelector('.current-status-row').style.display = 'none';
    }
}, (err) => {
    document.querySelector('.current-status-row').style.display = 'none';
});