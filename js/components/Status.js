
const STATUS = {
    QUEUED: 0,
    IN_PROGRESS: 1,
    COMPLETED: 2,
    FAILED: 3
}

const statusBtnClass = [
    'cancel-btn',
    'disabled',
    'remove-btn',
    'remove-btn',
    'resume-btn',
]

class Status {
    constructor(status) {
        this.status = status;
        this.statusText = this.status === STATUS.QUEUED ? 'Queued' : this.status === STATUS.IN_PROGRESS ? 'In Progress' : this.status === STATUS.COMPLETED ? 'Completed' : 'Failed';
    }

    render() {
        return `<div class="item-status ${this.statusText.toLowerCase().replace(' ', '-')}">
            <p>${this.statusText}</p>
        </div>`
    }
}