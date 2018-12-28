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
            this.oUsersTable = $('#users-table');
        },
        bindEvents: function() {
        },
        loadUserDataTable: function() {
            this.oUsersTable.DataTable({
                responsive: true,
                pageLength: 10,
                lengthChange: false,
                searching: true,
                serverSide: true,
                ajax: '/admin/getUsersData',
                columns: [
                    { data: 'id', name: 'id' },
                    { data: 'username', name: 'username' },
                    { data: 'lastname', name: 'lastname' },
                    { data: 'firstname', name: 'firstname' },
                    { data: 'email', name: 'email' },
                    { data: 'user_role', name: 'user_role' },
                    { data: 'created_at', name: 'created_at' },
                    { data: 'updated_at', name: 'updated_at' }
                ]
            });
        }
    };

    oAdmin.init();
    oSidebar.init();
    oAdmin.loadUserDataTable();
});
