
const types = [
    'Beställning',
    'Påfyllning',
    'Skapad',
    'Raderad',
]

class QueueItem {
    constructor(title, subtitle, button, status, paused) {
        this.title = title;
        this.subtitle = subtitle;
        this.button = button;
        this.status = status;
        this.paused = paused;
    }

    render() {
        return `
            <div class="item">
                <div class="item-text-wrapper">
                    <div class="item-text">
                        <h3>${this.title}</h3>
                        <p>${this.subtitle}</p>
                    </div>
                </div>
                <div class="item-buttons">
                ${this.button.render()}
                ${new Status(this.status).render()}
                </div>
            </div>
            <div class="item-list-divider"></div>
        `
    }
}