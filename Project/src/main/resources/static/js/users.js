var users = {} || users;
var rates = {} || rates;
users.intTable = function () {
    $("#users-dataTable").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/users/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            {
                data: "id", name: "ID", title: "ID", orderable: true
            },
            {
                data: "image", name: "image", title: "IMAGE", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<img style='width: 80px; height: 80px; border: 1px solid red' src=" + data + ">";
                    return str;
                }
            },
            {
                data: "fullName", name: "fullName", title: "FULLNAME", orderable: true,
            },
            {
                data: "email", name: "email", title: "EMAIL", sortable: false,
                orderable: false,
            },

            {
                data: "dateAdd", name: "Date Add", title: "DATE ADD", sortable: false,
                orderable: false
            },
            {
                data: "dateUpdate", name: "Date Edit", title: "DATE EDIT", sortable: false,
                orderable: false
            },
            {
                data: "id", name: "Action", title: "ACTION", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<div style='justify-content: center;text-align: center'><a href='javascript:' onclick='users.get(" + data + ")' title='Edit' data-toggle=\"modal\" data-target=\"#modalAddEdit\" class='btn btn-warning fa fa-cogs'></a> " +
                        "<a href='javascript:' class='btn btn-danger' onclick='users.delete(" + data + ")'><i class=\"ti-trash\" title=\"Delete\"></a></div>"
                    return str;
                }
            }
        ]
    });
};

users.addNew = function () {
    $('#modalTitle').html("Add new user");
    users.validation();
    users.resetForm();
    $('#modalAddEdit').modal('show');
};


users.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var user = {};
            user.userName = $('#userName').val();
            user.password = $('#password').val();
            user.fullName = $('#fullName').val();
            user.address = $('#address').val();
            user.phone = $('#phone').val();
            user.email = $('#email').val();
            user.gender = $('#gender').val();
            user.image = $('#image').val();
            user.dateOfBirth = $('#dateOfBirth').val();
            $.ajax({
                url: "http://localhost:8080/api/users/",
                method: "POST", //"POST"
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(user),
                done: function () {
                    $('#modalAddEdit').modal('hide');
                    $("#users-dataTable").DataTable().ajax.reload();
                },
                success: function (data) {
                    if (data.code === 2) {
                        $('#modalAddEdit').modal('hide');
                        $("#users-dataTable").DataTable().ajax.reload();
                        toastr.info('User has been created successfully', 'INFORMATION:')
                    } else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }
            });
        } else {
            var user = {};
            user.userName = $('#userName').val();
            user.password = $('#password').val();
            user.fullName = $('#fullName').val();
            user.address = $('#address').val();
            user.phone = $('#phone').val();
            user.email = $('#email').val();
            user.gender = $('#gender').val();
            user.image = $('#image').val();
            user.dateOfBirth = $('#dateOfBirth').val();
            user.id = $('#id').val();
            user.dateUpdate = new Date(Date.UTC);
            $.ajax({
                url: "http://localhost:8080/api/users/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(user),
                success: function (data) {
                    if (data.code === 2) {
                        $('#modalAddEdit').modal('hide');
                        $("#users-dataTable").DataTable().ajax.reload();
                        toastr.info('Users has been updated successfully', 'INFORMATION:')
                        $('#formAddEdit').validate().resetForm();
                    } else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }

                }
            });
        }


    }
    return false;
};

users.delete = function (id) {
    bootbox.confirm({
        message: "Do you want to delete this user",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "http://localhost:8080/api/users/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function () {
                        $("#users-dataTable").DataTable().ajax.reload();
                        toastr.info('user has been deleted successfully', 'INFORMATION:')
                    },
                    error: function (jqXHR, exception) {
                        toastr.error('Error!! Product not has been delete', 'INFORMATION:')
                    }
                });
            }
        }
    });
};

users.get = function (id) {
    $.ajax({
        url: "http://localhost:8080/api/users/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            $('#modalTitle').html("Edit User");
            $('#userName').val(data.userName);
            $('#password').val(data.password);
            $('#fullName').val(data.fullName);
            $('#address').val(data.address);
            $('#phone').val(data.phone);
            $('#email').val(data.email);
            $('#gender').val(data.gender);
            $('#image').val(data.image);
            $('#dateOfBirth').val(data.dateOfBirth);
            $('#id').val(data.id);
            $('#modalAddEdit').modal('show');
            $('#password2').val(data.password);
        }
    });
};

users.resetForm = function () {
    $('#formAddEdit')[0].reset();
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

//  Làm mắt đọc
let check = true;
users.showPass1 = function () {
    if (check) {
        document.getElementById("password").type = "text";
        check = false;
    } else {
        document.getElementById("password").type = "password";
        check = true;
    }
}

users.showPass2 = function () {
    if (check) {
        document.getElementById("password2").type = "text";
        check = false;
    } else {
        document.getElementById("password2").type = "password";
        check = true;
    }
}

$.validator.addMethod("validatePassword", function (value, element) {
    return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/i.test(value);
}, "Password is not valid...Example: Password123");
// var validator = $("#formAddEdit").validate();

$.validator.addMethod("validatePhone", function (value, element) {
    return this.optional(element) || /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(value);
}, "Please specify a valid phone number");



$(document).ready(function () {
    users.intTable();
    users.validation();
    rates.findStatus();
});

users.validation = function () {
    $('#formAddEdit').validate({
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
