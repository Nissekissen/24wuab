// Will be execute before the DOM is loaded

// Preload the images
var images = new Array()
var dir = 'img/components'
var fileextension = '.png'

$.ajax({
    url: dir,
    success: function (data) {
        $(data).find("a:contains(" + fileextension + ")").each(function () {
            image = new Image();
            image.src = this.href;
            images.push(image);
        });
    }
});
