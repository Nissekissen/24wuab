// Util functions for making requests to the backend

function getItems(callback, errCallback) {
    axios.get('http://192.168.0.38:3000/items').then(callback).catch(errCallback);
}

function getItem(id, callback, errCallback) {
    axios.get(`http://localhost:3000/items/${id}`).then(callback).catch(errCallback);
}

function addItem(item, callback, errCallback) {
    axios.post('http://localhost:3000/items', item).then(callback, errCallback);
}