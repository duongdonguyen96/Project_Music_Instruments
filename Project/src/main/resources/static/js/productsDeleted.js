var products = {} || products;
var productData=[];
products.intTable = function () {
    $("#products-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/productsDeleted/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            {
                data: "id", name: "ID", title: "ID", orderable: true
            },
            {
                data: "image", name: "Image", title: "Image", sortable: false,
                orderable: false, "render": function (data) {
                    var str ="<img style='width: 80px; height: 80px; border: 1px solid red' src="+data+">" ;
                    return str;
                }
            },
            {
                data: "name", name: "Name", title: "Name", orderable: true,
            },
            {
                data: "price", name: "Price", title: "Price", sortable: false,
                orderable: false,
            },

            {
                data: "amount", name: "Amount", title: "Amount", sortable: false,
                orderable: false,
            },
            {
                data: "dateAdd", name: "Date Add", title: "Date Add", sortable: false,
                orderable: false
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
                    var str = "<div style='justify-content: center;text-align: center'><a href='javascript:' onclick='products.delete("+data+")' title='Delete' class='btn btn-danger ti-trash'></a> " +
                        "<a href='javascript:' class='btn btn-warning' title='Undo' onclick='products.undo("+data+")'><i class=\"fa fa-undo\" aria-hidden=\"true\" ></i></a></div>"
                    return str;
                }
            }
        ],
    });
};

products.delete = function (id) {
    bootbox.confirm({
        message: "Do you want to delete this Product",
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
                    url: "http://localhost:8080/api/productDeleted/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function () {
                        $("#products-datatables").DataTable().ajax.reload();
                        toastr.info('Product has been deleted successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Product not has been delete', 'INFORMATION:')
                    }
                });
            }
        }
    });
};


products.undo= function (id) {
    bootbox.confirm({
        message: "Do you want to permanently delete the Product",
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
                    url: "http://localhost:8080/api/productUndo/" + id,
                    method: "PUT",
                    dataType: "json",
                    success: function () {
                        $("#products-datatables").DataTable().ajax.reload();
                        toastr.info('Product has been undo successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Product not has been undo', 'INFORMATION:')
                    }
                });
            }
        }
    });
};

$(document).ready(function () {
    products.intTable();
});
