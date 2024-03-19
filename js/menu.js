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

document.getElementById('refreshQueue')?.addEventListener('click', () => {
    console.log("refreshing!")
    updateQueueList();
});


document.getElementById('clearQueue')?.addEventListener('click', () => {
    
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // get all items in the queue

    const callback = res => {
        // remove all items from the queue with status > 1
        res.data.forEach(item => {
            if (item.status < 2) return;

            removeItemFromQueue(item.id, (res) => {
                updateQueueList();
            }, (err) => {
                // alert('Det gick inte att ta bort varan från kön');
                console.error(err);
            });
        })
    }

    if (id) {
        getQueueItemsFromId(id, callback, console.error);
    } else {
        getQueue(callback, console.error);
    }
})