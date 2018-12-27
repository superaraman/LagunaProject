import 'core-js/fn/promise';
import oSidebar from './sidebar.js';

$(document).ready(function () {
    let oAdmin = {
        init: function() {
            this.data();
            this.cacheDom();
            this.bindEvents();
        },
        data: function() {

        },
        cacheDom: function() {
        },
        bindEvents: function() {
        }
    };

    oAdmin.init();
    oSidebar.init();
});
