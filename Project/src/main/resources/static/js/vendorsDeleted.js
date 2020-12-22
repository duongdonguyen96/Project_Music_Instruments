var vendors = {} || vendors;
var vendorsData=[];
var rates = {} || rates;
vendors.intTable = function () {
    $("#vendors-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/vendorsDeleted/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            {
                data: "id", name: "ID", title: "ID", orderable: true
            },
            {
                data: "name", name: "Name", title: "Name", orderable: true,
            },
            {
                data: "address", name: "Address", title: "Address", sortable: false,
                orderable: false,
            },
            {
                data: "phone", name: "Phone", title: "Phone", sortable: false,
                orderable: false,
            },
            {
                data: "email", name: "Email", title: "Email", sortable: true,
                orderable: true,
            },
            {
                data: "surrogate", name: "Surrogate", title: "Surrogate", sortable: true,
                orderable: true,
            },
            {
                data: "dateAdd", name: "Date Add", title: "Date Add", sortable: true,
                orderable: true
            },
            {
                data: "dateUpdate", name: "Date Edit", title: "Date Edit", sortable: false,
                orderable: false
            },
            {
                data: "dateDelete", name: "Date Delete", title: "Date Delete", sortable: false,
                orderable: false
            },
            {
                data: "id", name: "Action", title: "Action", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<div style='justify-content: center;text-align: center'>" +
                        "<a href='javascript:' class='btn btn-warning' title='Undo' onclick='vendors.undo("+data+")'><i class=\"fa fa-undo\" aria-hidden=\"true\" ></i></a> " +
                        "<a href='javascript:' onclick='vendors.delete("+data+")' title='Delete' class='btn btn-danger'><i class=\"ti-trash\" title=\"Delete\"></a>" +
                        "</div>"
                    return str;
                }
            }
        ],
    });
};

vendors.delete = function (id) {
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
                    url: "http://localhost:8080/api/vendorDeleted/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function () {
                        $("#vendors-datatables").DataTable().ajax.reload();
                        toastr.info('Vendor has been deleted successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Vendor not has been delete', 'INFORMATION:')
                    }
                });
            }
        }
    });
};


vendors.undo= function (id) {
    bootbox.confirm({
        message: "Do you want to undo this Vendor",
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
                    url: "http://localhost:8080/api/vendorUndo/" + id,
                    method: "PUT",
                    dataType: "json",
                    success: function () {
                        $("#vendors-datatables").DataTable().ajax.reload();
                        toastr.info('Vendor has been undo successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Vendor not has been undo', 'INFORMATION:')
                    }
                });
            }
        }
    });
};

$(document).ready(function () {
    vendors.intTable();
    rates.findStatus();
});
