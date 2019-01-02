import 'core-js/fn/promise';
import oSidebar from './sidebar.js';
import oDataTable from './datatable';

const PENDING_USERS = '/admin/users/pendings';
const VERIFIED_USERS = '/admin/users/verified';

$(document).ready(function () {
    let oAdmin = {
        init: function() {
            oSidebar.init();
            oDataTable.init();
            this.data();
            this.main();
        },
        /**
         * Data
         */
        data: function() {
            this.sDomainURL = window.location.origin;
        },
        /**
         * Main Function
         */
        main: function() {
            this.checkActionByUrl();
        },
        /**
         * Shows Table depending on the URL
         */
        checkActionByUrl: function() {
            if (window.location.href === this.sDomainURL + PENDING_USERS) {
                oDataTable.showPendingRequests();
            } else if (window.location.href === this.sDomainURL + VERIFIED_USERS) {
                oDataTable.showVerifiedUsers();
            }
        },

    };

    oAdmin.init();
});
