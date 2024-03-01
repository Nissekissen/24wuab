// For handling dashboard/details.html page


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Order form
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        item_id: parseInt(id),
        amount: parseInt(formData.get('amount'))
    }

    addItemToQueue(data, (res) => {
        updateQueueList();
    }, (err) => {
        console.error(err);
    });

});

// Get item details
getItem(id, (res) => {
    const item = res.data;
    document.getElementById('itemName').innerText = item.name;
    document.getElementById('amount').innerText = `${item.amount}st`;
}, (err) => {
    alert('Det gick inte att hämta varan');
    console.error(err);
});


function updateQueueList() {
    // Get queue items
    getQueueItemsFromID(id, (res) => {
        console.log(res);
        const itemList = document.querySelector('.item-list');
        if (!itemList) {
            itemList = document.querySelector('.error');
            itemList.classList.remove('error');
            itemList.classList.add('item-list');
        }

        itemList.innerHTML = '';

        if (res.data.length === 0) {
            const errorElement = document.querySelector('.item-list');
            errorElement.classList.remove('item-list');
            errorElement.classList.add('error');
    
            errorElement.innerHTML = `<h3>Inga varor i kön</h3>`;
            return;
        }
        res.data.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');

            const itemTextWrapper = document.createElement('div');
            itemTextWrapper.classList.add('item-text-wrapper');

            const itemText = document.createElement('div');
            itemText.classList.add('item-text');
            itemText.innerHTML = `<h3>${item.amount}st</h3>`;
            itemElement.appendChild(itemText);

            const itemStatus = document.createElement('div');
            itemStatus.classList.add('item-status');

            const statusText = item.status === 0 ?'Queued' :
                item.status == 1 ? 'In Progress' :
                item.status == 2 ? 'Completed' :
                'Failed';

            itemStatus.classList.add(`${statusText.toLowerCase().replace(' ', '-')}`)
            itemStatus.innerHTML = `<p>${statusText}</p>`;
            // itemElement.appendChild(itemStatus);

            itemTextWrapper.appendChild(itemText);
            // itemTextWrapper.appendChild(itemStatus);

            itemElement.appendChild(itemTextWrapper);

            const itemButtons = document.createElement('div');
            itemButtons.classList.add('item-buttons');
            itemButtons.innerHTML = `<button
        class="btn btn-danger remove-btn"
        id="${item.id}"
        >Avbryt</button>`
            itemButtons.appendChild(itemStatus);
            itemElement.appendChild(itemButtons);

            itemList.appendChild(itemElement);

            const divider = document.createElement('div');
            divider.classList.add('item-list-divider');

            itemList.appendChild(divider);
        })

        document.querySelectorAll('.remove-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                console.log(e.target.id)
                removeItemFromQueue(e.target.id, (res) => {
                    updateQueueList();
                }, (err) => {
                    alert('Det gick inte att ta bort varan från kön');
                    console.error(err);
                });
            });
        })
    }, (err) => {
        console.log(err)
    });
}

document.querySelectorAll('.remove-item-btn').forEach(element => element.addEventListener('click', e => {
    removeItem(id, res => {
        window.location.href = '/dashboard';
    }, err => {
        console.error(err);
    });
}));

updateQueueList();