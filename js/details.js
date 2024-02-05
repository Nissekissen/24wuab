// For handling dashboard/details.html page



// Order form
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        id: formData.get('id'),
        amount: formData.get('amount')
    }

    addItemToQueue(data, (res) => {
        alert('Varan har lagts till i kön');
    }, (err) => {
        alert('Det gick inte att lägga till varan i kön');
        console.error(err);
    });
});

// Get item details
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
getItem(id, (res) => {
    const item = res.data;
    document.getElementById('itemName').innerText = item.name;
    document.getElementById('amount').innerText = `${item.amount}st`;
}, (err) => {
    alert('Det gick inte att hämta varan');
    console.error(err);
});

// Get queue items
getQueueItemsFromID(id, (res) => {
    const itemList = document.querySelector('.item-list');
    itemList.innerHTML = '';
    res.data.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');

        const itemText = document.createElement('div');
        itemText.classList.add('item-text');
        itemText.innerHTML = `<h3>${item.amount}st</h3>`;
        itemElement.appendChild(itemText);

        const itemButtons = document.createElement('div');
        itemButtons.classList.add('item-buttons');
        itemButtons.innerHTML = `<a
        class="btn btn-danger"
        href="details.html?id=${item.id}"
        >Avbryt</a>`
        itemElement.appendChild(itemButtons);

        itemList.appendChild(itemElement);

        const divider = document.createElement('div');
        divider.classList.add('item-list-divider');

        itemList.appendChild(divider);
    })
}, (err) => { });