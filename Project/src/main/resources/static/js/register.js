var users = {} || users;

users.create = function () {
    if ($("#formRegister").valid()) {
        var user = {};
        user.userName = $('#userName').val();
        user.password = $('#password').val();
        user.fullName = $('#fullName').val();
        user.address = $('#address').val();
        user.phone = $('#phone').val();
        user.email = $('#email').val();
        user.gender=$('input[name=gender]:checked').val();
        // var gender = document.querySelector('input[name = "gender"]:checked').value;
        // user.gender = $('#gender').val();
        user.image = $('#base64').val();
        user.dateOfBirth = $('#dateOfBirth').val();
        $.ajax({
            url: "http://localhost:8080/api/users/",
            method: "POST",
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(user),
            success: function (data) {
                if(data.code === 2){
                    toastr.info('User has been created successfully', 'INFORMATION:')
                    $('#formRegister').validate().resetForm();

                    users.resetForm();
                }else {
                    data.stringListMessage.map(e =>toastr.error(e));
                }
            },
            error:function () {
                toastr.error('User has not been created successfully', 'INFORMATION:')
            }
        });

    }
        return false;
};
// users.create = function () {
//     if ($("#formRegister").valid()) {
//         var user = {};
//         user.userName = $('#userName').val();
//         user.password = $('#password').val();
//         user.fullName = $('#fullName').val();
//         user.address = $('#address').val();
//         user.phone = $('#phone').val();
//         user.email = $('#email').val();
//         user.gender = $('#gender').val();
//         user.image = $('#image').val();
//         user.dateOfBirth = $('#dateOfBirth').val();
//         $.ajax({
//             url: "http://localhost:8080/api/users/",
//             method: "POST", //"POST"
//             dataType: 'json',
//             contentType: "application/json",
//             data: JSON.stringify(user),
//             done: function () {
//             },
//             success: function (data) {
//                 if (data.code === 2) {
//                     toastr.info('User has been created successfully', 'INFORMATION:')
//                     users.resetForm();
//                 } else {
//                     data.stringListMessage.map(e => toastr.error(e));
//                 }
//             }
//         });
//
//     }
//     return false;
// };

users.resetForm = function () {
    $('#formRegister')[0].reset();
    $('#id').val(0);
    $('#userName').val('');
    $('#password').val('');
    $('#fullName').val('');
    $('#address').val('');
    $('#phone').val('');
    $('#email').val('');
    $('#gender').val('');
    $('#image').val('');
    $('#dateOfBirth').val('');
}


$.validator.addMethod("validatePassword", function (value, element) {
    return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/i.test(value);
}, "Password is not valid...Example: Password123");
// var validator = $("#formAddEdit").validate();

$.validator.addMethod("validatePhone", function (value, element) {
    return this.optional(element) || /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(value);
}, "Please specify a valid phone number");



$(document).ready(function () {
    users.validation();
});

users.validation = function () {
    $('#formRegister').validate({
        rules: {
            fullName: {
                required: true,
                minlength: 5,
                maxlength: 45,
            },
            userName: {
                required: true,
                minlength: 5,
                maxlength: 45,
            },
            password: {
                required: true,
                minlength: 5,
                maxlength: 45,
                validatePassword: true,
            },
            password2: {
                equalTo: "#password"
            },
            phone: {
                validatePhone:true,
                required: true,
                minlength: 10,
                maxlength: 12,

            },
            email: {
                required: true,
                maxlength: 50,
                minlength: 10,
            },
            address: {
                required: true,
                minlength: 10,

            },
            gender: {
                required: true,
            },
            dateOfBirth: {
                required: true,
            },
            image: {
                required: true
            }
        },
    });
}