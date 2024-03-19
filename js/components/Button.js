

const styles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
}

class Button {
    constructor() {
        this.text = null;
        this.href = null;
        this.style = null;
        this.id = null;
        this.extraStyles = null;
    }

    setText(text) {
        this.text = text;
        return this;
    }

    setHref(href) {
        this.href = href;
        return this;
    }

    setStyle(style) {
        this.style = style;
        return this;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setExtraStyles(extraStyles) {
        this.extraStyles = extraStyles;
        return this;
    }

    render() {
        return `<${this.href != null ? 'a' : 'div'} class="btn ${this.style} ${this.extraStyles?.map(style => { return style + ' ' })}" id="${this.id}" ${this.href != null ? 'href="' + this.href + '"' : ""}>${this.text}</${this.href != null ? 'a' : 'div'}>`
    }
}