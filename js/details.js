// For handling dashboard/details.html page


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Order form
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        item_id: parseInt(id),
        amount: parseInt(formData.get('amount')),
        type: 0
    }

    addItemToQueue(data, (res) => {
        updateQueueList();
    }, (err) => {
        console.error(err);
    });

});

document.getElementById('restockForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        item_id: parseInt(id),
        amount: parseInt(formData.get('amount')),
        type: 1
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
        let itemList = document.querySelector('.item-list');
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
            const itemElement = new QueueItem(`${item.amount}st`, types[item.type],
                    new Button()
                        .setText(
                            item.paused ? 'Skicka tillbaka' : item.status > 1 ? 'Ta bort' : 'Avbryt'
                        )
                        .setStyle(styles.danger)
                        .setId(item.id)
                        .setExtraStyles(
                            item.paused
                                ? [statusBtnClass[statusBtnClass.length - 1]]
                                : [statusBtnClass[item.status]]
                        ),
                    item.status,
                    item.paused);
            itemList.innerHTML += itemElement.render();
        })

        document.querySelectorAll('.cancel-btn, .remove-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                removeItemFromQueue(e.target.id, (res) => {
                    updateQueueList();
                }, (err) => {
                    alert('Det gick inte att ta bort varan från kön');
                    console.error(err);
                });
            });
        })

        document.querySelectorAll('.resume-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                console.log('resuming', e.target.id)
                resumeQueueItem(e.target.id, (res) => {
                    updateQueueList();
                }, (err) => {
                    alert('Det gick inte att återuppta varan');
                    console.error(err);
                });
            });
        });
    }, console.error);
}

document.querySelectorAll('.remove-item-btn').forEach(element => element.addEventListener('click', e => {
    removeItem(id, res => {
        window.location.href = '/dashboard';
    }, console.error);
}));

updateQueueList();