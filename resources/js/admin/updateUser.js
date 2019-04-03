import 'core-js/fn/promise';

$(document).ready(function () {
    let oUpdate = {
        init: function() {
            this.oBtnEdit = $('#editButton');
            this.oInputFirstName = $('#inputFirstName');
            this.oInputLastName = $('#inputLastName');
            this.oInputInputUsername = $('#inputUsername');
            this.oInputInputEmail = $('#inputEmail');
            this.oSelectRole = $('#inputRole');

            this.oBtnEdit.on('click', () => {
               oUpdate.requestUpdateUser().then((response) => {
                   alert(response.data.sMessage);
                   if (response.data.bResult === true) {
                      window.location.href = '/admin/users/verified';
                  }
               });
            });
        },
        /**
         * Request for updating user
         * @return {*}
         */
        requestUpdateUser: function() {
            return axios({
                method: 'POST',
                url: '/admin/users/update',
                data: {
                    id: this.oBtnEdit.val(),
                    firstname: this.oInputFirstName.val(),
                    lastname: this.oInputLastName.val(),
                    username: this.oInputInputUsername.val(),
                    email: this.oInputInputEmail.val(),
                    user_role: this.oSelectRole.find(':selected').val(),
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    };

    oUpdate.init();
});
