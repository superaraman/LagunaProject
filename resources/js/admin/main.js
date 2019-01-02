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
            this.main();
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
            if ((new RegExp(PENDING_USERS)).test(window.location.href) === true) {
                oDataTable.showPendingRequests();
            } else if ((new RegExp(VERIFIED_USERS)).test(window.location.href)) {
                oDataTable.showVerifiedUsers();
            }
        },

    };

    oAdmin.init();
});
