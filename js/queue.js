
const itemList = document.querySelector('.item-list');

getQueue(res => {
    itemList.innerHTML = '';
    res.data.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.setAttribute('data-id', item.id)
        itemElement.classList.add('item');

        const itemText = document.createElement('div');
        itemText.classList.add('item-text');
        itemText.innerHTML = `<h3>${item.name}</h3><p>${item.amount}st</p>`;
        itemElement.appendChild(itemText);

        getItem(item.item_id, res => {
            console.log(res.data);
            console.log(document.querySelector(`.item[data-id="${item.id}"] .item-text h3`));
            document.querySelector(`.item[data-id="${item.id}"] .item-text h3`).innerHTML = res.data.name;
        }, console.error);

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
})