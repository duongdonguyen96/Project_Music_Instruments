var productLines = {} || productLines;
var rates = {} || rates;
productLines.intTable = function () {
    $("#productLines-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/typeProductsDeleted/',
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
                data: "description", name: "Description", title: "Description", sortable: false,
                orderable: false,
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
                        "<a href='javascript:' class='btn btn-warning' title='Undo' onclick='productLines.undo("+data+")'><i class=\"fa fa-undo\" aria-hidden=\"true\" ></i></a> "+
                        "<a href='javascript:' onclick='productLines.delete("+data+")' title='Delete' class='btn btn-danger'><i class=\"ti-trash\" title=\"Delete\"></a>" +
                        "</div>"
                    return str;
                }
            }
        ],
    });
};

productLines.delete = function (id) {
    bootbox.confirm({
        message: "Do you want to permanently delete the Type",
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
                    url: "http://localhost:8080/api/typeProductDeleted/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function () {
                        $("#productLines-datatables").DataTable().ajax.reload();
                        toastr.info('Type has been deleted successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Type not has been delete', 'INFORMATION:')
                    }
                });
            }
        }
    });
};


productLines.undo= function (id) {
    bootbox.confirm({
        message: "Do you want to undo this Type",
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
                    url: "http://localhost:8080/api/typeProductUndo/" + id,
                    method: "PUT",
                    dataType: "json",
                    success: function () {
                        $("#productLines-datatables").DataTable().ajax.reload();
                        toastr.info('Vendor has been undo successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Type not has been undo', 'INFORMATION:')
                    }
                });
            }
        }
    });
};

$(document).ready(function () {
    productLines.intTable();
    rates.findStatus();
});
