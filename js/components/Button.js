

const styles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
}

class Button {
    constructor(text, href, style, id, extraStyles) {
        this.text = text;
        this.href = href;
        this.style = style;
        this.id = id;
        this.extraStyles = extraStyles;
    }

    render() {
        return `<${this.href != null ? 'a' : 'div'} class="btn ${this.style} ${this.extraStyles?.map(style => { return style + ' ' })}" id="${this.id}" ${this.href != null ? 'href="' + this.href + '"' : ""}>${this.text}</${this.href != null ? 'a' : 'div'}>`
    }
}