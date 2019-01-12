$(document).ready(function() {
    var oHide = {
        init: function() {
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function() {
            this.oReadMoreBtn = $('.read-more');
        },
        bindEvents: function() {
            this.oReadMoreBtn.on('click', this.readMore);
        },
        readMore: function() {
            oElement = $(this);
            let sIDToHide = oElement.attr('hide');
            $('#' + sIDToHide).toggleClass('d-none');
            oElement.remove();
        }
    };

    oHide.init();
});