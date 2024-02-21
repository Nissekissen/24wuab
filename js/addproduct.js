

document.getElementById('addProductForm').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('productName'),
        start_amount: parseInt(formData.get('start_amount'))
    }

    console.log(data)

    addItem(data, res => {
        window.location.href = '/dashboard';
    }, err => {
        console.error(err);
    })
})