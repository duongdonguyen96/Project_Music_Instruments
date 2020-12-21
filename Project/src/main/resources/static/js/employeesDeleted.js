var employees = {} || employees;
var vendorsData=[];
var rates = {} || rates;
employees.intTable = function () {
    $("#employees-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/employeesDeleted/',
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
                    var str = "<div style='justify-content: center;text-align: center'><a href='javascript:' onclick='employees.delete("+data+")' title='Delete' class='btn btn-danger ti-trash'></a> " +
                        "<a href='javascript:' class='btn btn-warning' title='Undo' onclick='employees.undo("+data+")'><i class=\"fa fa-undo\" aria-hidden=\"true\" ></i></a></div>"
                    return str;
                }
            }
        ]
    });
};

employees.delete = function (id) {
    bootbox.confirm({
        message: "Do you want to permanently delete the Vendor",
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
                    url: "http://localhost:8080/api/employeesDeleted/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function () {
                        $("#employees-datatables").DataTable().ajax.reload();
                        toastr.info('Employee has been deleted successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Employee not has been delete', 'INFORMATION:')
                    }
                });
            }
        }
    });
};


employees.undo= function (id) {
    bootbox.confirm({
        message: "Do you want to undo this Employee",
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
                    url: "http://localhost:8080/api/employeeUndo/" + id,
                    method: "PUT",
                    dataType: "json",
                    success: function () {
                        $("#employees-datatables").DataTable().ajax.reload();
                        toastr.info('Employee has been undo successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Employee not has been undo', 'INFORMATION:')
                    }
                });
            }
        }
    });
};

$(document).ready(function () {
    employees.intTable();
    rates.findStatus();
});
