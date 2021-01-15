var employees = {} || employees;
employees.intTable = function () {
    $("#employees-dataTable").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/employees/',
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
                    var str = "<div style='justify-content: center;text-align: center'><a href='javascript:' onclick='employees.get(" + data + ")' title='Edit' data-toggle=\"modal\" data-target=\"#modalAddEdit\" class='btn btn-warning fa fa-cogs'></a> " +
                        "<a href='javascript:' class='btn btn-danger' onclick='employees.delete(" + data + ")'><i class=\"ti-trash\" title=\"Delete\"></a></div>"
                    return str;
                }
            }
        ]
    });
};

employees.addNew = function () {
    $('#modalTitle').html("Add new employee");
    employees.validation();
    employees.resetForm();
    $('#modalAddEdit').modal('show');
};


employees.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var employee = {};
            employee.userName = $('#userName').val();
            employee.password = $('#password').val();
            employee.fullName = $('#fullName').val();
            employee.address = $('#address').val();
            employee.phone = $('#phone').val();
            employee.email = $('#email').val();
            employee.gender = $('#gender').val();
            employee.image = $('#image').val();
            employee.dateOfBirth = $('#dateOfBirth').val();
            employee.idCard = $('#idcard').val();

            $.ajax({
                url: "http://localhost:8080/api/employees/",
                method: "POST", //"POST"
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(employee),
                done: function () {
                    $('#modalAddEdit').modal('hide');
                    $("#employees-dataTable").DataTable().ajax.reload();
                },
                success: function (data) {
                    if (data.code === 2) {
                        $('#modalAddEdit').modal('hide');
                        $("#employees-dataTable").DataTable().ajax.reload();
                        toastr.info('employees has been created successfully', 'INFORMATION:')
                    } else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }
            });
        } else if (($('#id').val() != 0)) {
            var employee = {};
            employee.userName = $('#userName').val();
            employee.password = $('#password').val();
            employee.fullName = $('#fullName').val();
            employee.address = $('#address').val();
            employee.phone = $('#phone').val();
            employee.email = $('#email').val();
            employee.gender = $('#gender').val();
            employee.image = $('#image').val();
            employee.dateOfBirth = $('#dateOfBirth').val();
            employee.idCard = $('#idcard').val();
            employee.id = $('#id').val();
            employee.dateUpdate = new Date(Date.UTC);
            employee.dateAdd = $('#dateAdd').val();

            $.ajax({
                url: "http://localhost:8080/api/employees/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(employee),
                success: function (data) {
                    if (data.code === 2) {
                        $('#modalAddEdit').modal('hide');
                        $("#employees-dataTable").DataTable().ajax.reload();
                        toastr.info('employees has been updated successfully', 'INFORMATION:')
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

employees.delete = function (id) {
    bootbox.confirm({
        message: "Do you want to delete this employee",
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
                    url: "http://localhost:8080/api/employees/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function () {
                        $("#employees-dataTable").DataTable().ajax.reload();
                        toastr.info('employee has been deleted successfully', 'INFORMATION:')
                    },
                    error: function (jqXHR, exception) {
                        toastr.error('Error!! Product not has been delete', 'INFORMATION:')
                    }
                });
            }
        }
    });
};

employees.get = function (id) {
    $.ajax({
        url: "http://localhost:8080/api/employees/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            $('#modalTitle').html("Edit employee");
            $('#userName').val(data.userName);
            $('#password').val(data.password);
            $('#password2').val(data.password);
            $('#fullName').val(data.fullName);
            $('#address').val(data.address);
            $('#phone').val(data.phone);
            $('#email').val(data.email);
            $('#gender').val(data.gender);
            $('#image').val(data.image);
            $('#dateOfBirth').val(data.dateOfBirth);
            $('#idcard').val(data.idCard);
            $('#id').val(data.id);
            $('#modalAddEdit').modal('show');
        }
    });
};

employees.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val(0);
    $('#userName').val('');
    $('#password').val('');
    $('#password2').val('');
    $('#fullName').val('');
    $('#address').val('');
    $('#phone').val('');
    $('#email').val('');
    $('#gender').val('');
    $('#image').val('');
    $('#dateOfBirth').val('');
    $('#idcard').val('');
}

//  Làm mắt đọc
let check = true;
employees.showPass1 = function () {
    if (check) {
        document.getElementById("password").type = "text";
        check = false;
    } else {
        document.getElementById("password").type = "password";
        check = true;
    }
}

employees.showPass2 = function () {
    if (check) {
        document.getElementById("password2").type = "text";
        check = false;
    } else {
        document.getElementById("password2").type = "password";
        check = true;
    }
}


// var validator = $("#formAddEdit").validate();

$.validator.addMethod("validatePassword", function (value, element) {
    return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/i.test(value);
}, "Password is not valid...Example: Password123");

$.validator.addMethod("validatePhone", function (value, element) {
    return this.optional(element) || /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(value);
}, "Please specify a valid phone number");


employees.validation = function () {
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
                required: true,
                minlength: 10,
                maxlength: 12,
                validatePhone:true,

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
        }
    });
}

$(document).ready(function () {
    employees.intTable();
    employees.validation()
});

