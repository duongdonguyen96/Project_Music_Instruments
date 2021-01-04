var products = {} || products;
var rates = {} || rates;
products.intTable = function () {
    var id;
    var role=$('#role').val();
    if (role==="ADMIN"){
        $("#products-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/productsDeleted/',
                method: "GET",
                datatype: "json",
                dataSrc: ""
            },
            columns: [
                {
                    data: "id", name: "ID", title: "ID", orderable: true, "render": function (data) {
                        id=data;
                        return id;
                    },
                },
                {
                    data: "image", name: "Image", title: "Image", sortable: false,
                    orderable: false, "render": function (data) {
                        var str ="<img onclick='products.getProductDeleted("+id+")' title='View' style='width: 80px; height: 80px; border: 1px solid red' src="+data+">" ;
                        return str;
                    },
                },
                {
                    data: "name", name: "Name", title: "Name", orderable: true,
                },
                {
                    data: "price", name: "Price", title: "Price", sortable: true,
                    orderable: true,
                },

                {
                    data: "amount", name: "Amount", title: "Amount", sortable: true,
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
                        var str = "<div style='justify-content: center;text-align: center'>"+
                            "<a href='javascript:' class='btn btn-warning' title='Undo' onclick='products.undo("+data+")'><i class=\"fa fa-undo\" aria-hidden=\"true\"></i></a> "
                            +"<a href='javascript:' onclick='products.delete("+data+")'class='btn btn-danger'><i class=\"ti-trash\" title=\"Delete\"></a>" +
                            "</div>"
                        return str;
                    }
                }
            ],
        });
    }else {
        $("#products-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/productsDeleted/',
                method: "GET",
                datatype: "json",
                dataSrc: ""
            },
            columns: [
                {
                    data: "id", name: "ID", title: "ID", orderable: true, "render": function (data) {
                        id=data;
                        return id;
                    },
                },
                {
                    data: "image", name: "Image", title: "Image", sortable: false,
                    orderable: false, "render": function (data) {
                        var str ="<img onclick='products.getProductDeleted("+id+")' title='View' style='width: 80px; height: 80px; border: 1px solid red' src="+data+">" ;
                        return str;
                    },
                },
                {
                    data: "name", name: "Name", title: "Name", orderable: true,
                },
                {
                    data: "price", name: "Price", title: "Price", sortable: true,
                    orderable: true,
                },

                {
                    data: "amount", name: "Amount", title: "Amount", sortable: true,
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
            ],
        });
    }

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

products.getProductDeleted = function (id) {
    $.ajax({
        url: "http://localhost:8080/api/productDeleted/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            $('#modalTitle').html("View product");
            $('#id').val(data.id);
            $('#dateAdd').val(data.dateAdd);
            $('#dateUpdate').val(data.dateUpdate);
            $('#dateDelete').val(data.dateDelete);
            $('#name').val(data.name);
            $('#price').val( data.price);
            $('#amount').val(data.amount);
            $('#weight').val(data.weight);
            $('#size').val( data.size);
            $('#color').val( data.color);
            $('#description').val( data.description);
            $('#type').val(data.typeProduct.id)
            $('#vendor').val(data.vendor.id)
            $('#image').html(
                `<img style="width: 600px;height: 600px" class="form-control" src="${data.image}">`
            );
            $('.form-control').attr('disabled','disable');
            $('#modalAddEdit').modal('show');
        }
    });
};

var types=types||{};
var typeData=[];
types.initTypes = function () {
    $.ajax({
        url: "http://localhost:8080/api/typeProducts/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            typeData = data;
            $('#type').empty();
            $.each(data, function (i, v) {
                $('#type').append(
                    `<option class="form-control noDisable" value='${ v.id }'>${v.name}</option>`
                );
            });
        }
    });
};
types.findById = function (id) {
    return typeData.filter(e => {
        return e.id === id
    })[0]
}


var vendors=vendors||{};
var vendorData=[];
vendors.initVendors = function () {
    $.ajax({
        url: "http://localhost:8080/api/vendors/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            vendorData = data;
            $('#vendor').empty();
            $.each(data, function (i, v) {
                $('#vendor').append(
                    `<option class="form-control noDisable"  value='${ v.id }'>${v.name}</option>`
                );
            });
        }
    });
};

vendors.findById = function (id) {
    return vendorData.filter(e => {
        return e.id === id
    })[0]
}
$(document).ready(function () {
    products.intTable();
    vendors.initVendors();
    types.initTypes();
    rates.findStatus();
});
