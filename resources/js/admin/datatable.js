import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import $ from 'jquery';
const ACCEPT = 'accept';
const REJECT = 'reject';
const EDIT   = 'edit';

let oDataTable = {
    init: function () {
        this.data();
        this.cacheDom();
        this.bindEvents();
    },
    data: function() {
        this.oInitializedTable = null;
    },
    /**
     * Caching of DOM
     */
    cacheDom: function () {
        this.oUsersTable = $('#usersTable');
    },
    /**
     * Bind events to elements
     */
    bindEvents: function() {
        this.oUsersTable.on('click', '.accept-user',  this.acceptUser);
        this.oUsersTable.on('click', '.delete-user',  this.rejectUser);
        this.oUsersTable.on('click', '.edit-user',  this.editUser);
    },
    /**
     * Accepts the Request of User to be verified handler
     */
    acceptUser: function() {
        if (confirm('Are you sure you want to accept this user?') === false) {
            return;
        }

        let oElement = $(this);
        let oParent = oDataTable.getParentElement(oElement);
        let oRowData = oDataTable.oInitializedTable.row(oParent).data();
        let iID = parseInt(oRowData.id);
        oDataTable.requestsForPending(iID, ACCEPT).then(function(response) {
            let aResult = response.data;
            if (aResult.bResult = true) {
                if (oParent.next().attr('class') === 'child') {
                    oParent.next().remove();
                }

                oParent.remove();
            }

            alert(aResult.sMessage);
        });
    },
    /**
     * Accepts the Request of User to be verified handler
     */
    rejectUser: function() {
        if (confirm('Are you sure you want to delete this user?') === false) {
            return;
        }

        let oElement = $(this);
        let oParent = oDataTable.getParentElement(oElement);
        let oRowData = oDataTable.oInitializedTable.row(oParent).data();
        let iID = parseInt(oRowData.id);
        oDataTable.requestsForPending(iID, REJECT).then(function(response) {
            let aResult = response.data;
            if (aResult.bResult = true) {
                if (oParent.next().attr('class') === 'child') {
                    oParent.next().remove();
                }

                oParent.remove();
            }

            alert(aResult.sMessage);
        });
    },
    editUser: function() {
        if (confirm('Are you sure you want to edit this user?') === false) {
            return;
        }

        let oElement = $(this);
        let oParent = oDataTable.getParentElement(oElement);
        let oRowData = oDataTable.oInitializedTable.row(oParent).data();
        let iID = parseInt(oRowData.id);
        
    },
    /**
     * Accept and Reject Common
     * @param oElement
     * @param sAction
     */
    getParentElement: function(oElement) {
        let oParent = oElement.parents('tr');
        let iChildDetector = oElement.parents('tr.child').length;
        if (iChildDetector > 0) {
            oParent = oParent.prev();
        }

        return oParent;
    },
    /**
     * Shows Pending Users in table
     */
    showPendingRequests: function() {
         this.oInitializedTable = oDataTable.oUsersTable.DataTable({
            responsive: true,
            pageLength: 10,
            lengthChange: false,
            searching: true,
            serverSide: true,
            ajax: '/admin/table/getPendingUsers',
            columns: [
                { data: 'id', name: 'id' },
                { data: 'username', name: 'username' },
                { data: 'lastname', name: 'lastname' },
                { data: 'firstname', name: 'firstname' },
                { data: 'email', name: 'email' },
                { data: 'created_at', name: 'created_at' },
                {
                    data: null,
                    searchable: false,
                    orderable: false,
                    defaultContent: `
                            <button type="button" class="btn btn-outline-success accept-user">Accept</button>
                            <button type="button" class="btn btn-outline-danger delete-user">Delete</button>
                    `
                }
            ],
        });
    },
    /**
     * Shows Verified Users in table
     */
    showVerifiedUsers: function() {
        this.oInitializedTable = oDataTable.oUsersTable.DataTable({
            responsive: true,
            pageLength: 10,
            lengthChange: false,
            searching: true,
            serverSide: true,
            ajax: '/admin/table/getVerifiedUsers',
            columns: [
                { data: 'id', name: 'id' },
                { data: 'username', name: 'username' },
                { data: 'lastname', name: 'lastname' },
                { data: 'firstname', name: 'firstname' },
                { data: 'email', name: 'email' },
                { data: 'user_role', name: 'user_role' },
                {
                    data: null,
                    searchable: false,
                    orderable: false,
                    defaultContent: `
                            <button type="button" class="btn btn-outline-primary edit-user">Update</button>
                            <button type="button" class="btn btn-outline-danger delete-user">Delete</button>
                    `
                }
            ]
        });
    },
    /**
     * Request for Pendings
     * @param iID
     * @param sAction
     * @returns {*}
     */
    requestsForPending: function(iID, sAction) {
        return axios({
            method: 'POST',
            url: '/admin/users/' + sAction,
            data: {
                id: iID
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
};

export default oDataTable;