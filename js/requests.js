// Util functions for making requests to the backend

const url = 'http://localhost:3000'

function getItems(callback, errCallback) {
    axios.get(`${url}/items`).then(callback).catch(errCallback);
}

function getItem(id, callback, errCallback) {
    axios.get(`${url}/items/${id}`).then(callback).catch(errCallback);
}

function addItem(item, callback, errCallback) {
    axios.post(`${url}/items`, item).then(callback, errCallback);
}

function removeItem(id, callback, errCallback) {
    axios.delete(`${url}/items/${id}`).then(callback, errCallback);
}

function updateItem(id, item, callback, errCallback) {
    axios.patch(`${url}/items/${id}`, item).then(callback, errCallback);
}

function getQueue(callback, errCallback) {
    axios.get(`${url}/queue`).then(callback).catch(errCallback);
}

function getQueueItemsFromID(id, callback, errCallback) {
    axios.get(`${url}/queue?item_id=${id}`).then(callback).catch(errCallback);
}

function addItemToQueue(item, callback, errCallback) {
    axios.post(`${url}/queue`, item).then(callback, errCallback);
}

function removeItemFromQueue(id, callback, errCallback) {
    axios.delete(`${url}/queue/${id}`).then(callback, errCallback);
}

function resumeQueueItem(id, callback, errCallback) {
    axios.patch(`${url}/queue/resume/${id}`).then(callback, errCallback);
}