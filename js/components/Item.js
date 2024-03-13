

class Item {
    constructor(title, subtitle, status, button) {
        this.title = title;
        this.subtitle = subtitle;
        this.button = button;
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
                </div>
            </div>
            <div class="item-list-divider"></div>
        `
    }
}