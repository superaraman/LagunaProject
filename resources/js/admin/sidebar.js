let oSidebar = {
    init: function () {
        this.cacheDom();
        this.bindEvents();
    },
    /**
     * Caching of DOM
     */
    cacheDom: function () {
        this.oToggle = $('#sidebarCollapse');
        this.oNav    = $('#sidebar');
    },
    bindEvents: function() {
        this.oToggle.on('click', this.toggleSideBar);
    },
    /**
     * Shows and hides the sidebar
     */
    toggleSideBar: function() {
        oSidebar.oNav.toggleClass('active');
    }
};

export default oSidebar;