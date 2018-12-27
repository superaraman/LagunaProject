let oSidebar = {
    init: function () {
        this.cacheDom();
        this.bindEvents();
    },
    cacheDom: function () {
        this.oToggle = $('#sidebarCollapse');
        this.oNav    = $('#sidebar');
    },
    bindEvents: function() {
        this.oToggle.on('click', this.toggleSideBar);
    },
    toggleSideBar: function() {
        oSidebar.oNav.toggleClass('active');
    }
};

export default oSidebar;