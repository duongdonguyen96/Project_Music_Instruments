var users = {} || users;
var vendorsData=[];
var rates = {} || rates;
users.intTable = function () {
    $("#users-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/usersDeleted/',
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
                    var str = "<div style='justify-content: center;text-align: center'><a href='javascript:' onclick='users.delete("+data+")' title='Delete' class='btn btn-danger ti-trash'></a> " +
                        "<a href='javascript:' class='btn btn-warning' title='Undo' onclick='users.undo("+data+")'><i class=\"fa fa-undo\" aria-hidden=\"true\" ></i></a></div>"
                    return str;
                }
            }
        ]
    });
};

users.delete = function (id) {
    bootbox.confirm({
        message: "Do you want to permanently delete the User",
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
                    url: "http://localhost:8080/api/usersDelete/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function () {
                        $("#users-datatables").DataTable().ajax.reload();
                        toastr.info('User has been deleted successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! User not has been delete', 'INFORMATION:')
                    }
                });
            }
        }
    });
};


users.undo= function (id) {
    bootbox.confirm({
        message: "Do you want to undo this User",
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
                    url: "http://localhost:8080/api/usersUndo/" + id,
                    method: "PUT",
                    dataType: "json",
                    success: function () {
                        $("#users-datatables").DataTable().ajax.reload();
                        toastr.info('User has been undo successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! User not has been undo', 'INFORMATION:')
                    }
                });
            }
        }
    });
};

$(document).ready(function () {
    users.intTable();
    rates.findStatus();
});
