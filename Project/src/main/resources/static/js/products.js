var products = {} || products;
var rates = {} || rates;
products.intTable = function () {
    $("#products-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/products/',
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
                data: "id", name: "Action", title: "Action", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<div style='justify-content: center;text-align: center'><a href='javascript:' onclick='products.get("+data+")' title='Edit' data-toggle=\"modal\" data-target=\"#modalAddEdit\" class='btn btn-warning'><i class=\"fa fa-cogs\" aria-hidden=\"true\"></i></a> " +
                        "<a href='javascript:' class='btn btn-danger' onclick='products.delete("+data+")'><i class=\"ti-trash\" title=\"Delete\"></a></div>"
                    return str;
                }
            }
        ]
    });
};

products.addNew = function () {
    $('#modalTitle').html("Add new products");
    validator.resetForm();
    products.resetForm();
    $('#modalAddEdit').modal('show');
};


products.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var productObj = {};
            productObj.name = $('#name').val().trim();
            productObj.price = $('#price').val();
            productObj.amount = $('#amount').val();
            productObj.weight = $('#weight').val();
            productObj.size = $('#size').val();
            productObj.color = $('#color').val();
            productObj.description = $('#description').val();
            productObj.image = $('#image').val();
            productObj.typeProduct = types.findById(parseInt($('#type').val()));
            productObj.vendor = vendors.findById(parseInt($('#vendor').val()));
            console.log(productObj);
            //
            $.ajax({
                url: "http://localhost:8080/api/product/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(productObj),
                done: function () {
                    $('#modalAddEdit').modal('hide');
                    $("#products-datatables").DataTable().ajax.reload();
                },
                success: function (data) {
                    if(data.code === 2){
                        $('#modalAddEdit').modal('hide');
                        $("#products-datatables").DataTable().ajax.reload();
                        toastr.info('Vendor has been created successfully', 'INFORMATION:')
                    }else {
                        data.stringListMessage.map(e =>toastr.error(e));
                    }
                }
            });
        } else {
            var productObj = {};
            productObj.name = $('#name').val().trim();
            productObj.price = $('#price').val();
            productObj.amount = $('#amount').val();
            productObj.weight = $('#weight').val();
            productObj.size = $('#size').val();
            productObj.color = $('#color').val();
            productObj.description = $('#description').val();
            productObj.image = $('#image').val();
            productObj.typeProduct = types.findById(parseInt($('#type').val()));
            productObj.vendor = vendors.findById(parseInt($('#vendor').val()));
            productObj.id = $('#id').val();
            productObj.dateAdd = $('#dateAdd').val();
            //
            $.ajax({
                url: "http://localhost:8080/api/product/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(productObj),
                success: function (data) {
                    if(data.code === 2){
                        $('#modalAddEdit').modal('hide');
                        $("#products-datatables").DataTable().ajax.reload();
                        toastr.info('Product has been updated successfully', 'INFORMATION:')
                    }else {
                        data.stringListMessage.map(e =>toastr.error(e));
                    }

                }
            });
        }
        validator.resetForm();
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
                    url: "http://localhost:8080/api/product/" + id,
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

products.get = function (id) {
    $.ajax({
        url: "http://localhost:8080/api/product/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            $('#modalTitle').html("Edit product");
            $('#id').val(data.id);
            $('#name').val(data.name);
            $('#price').val( data.price);
            $('#amount').val(data.amount);
            $('#weight').val(data.weight);
            $('#size').val( data.size);
            $('#color').val( data.color);
            $('#description').val( data.description);
            $('#image').val(data.image);
            $('#type').val(data.typeProduct.id);
            $('#vendor').val(data.vendor.id);
            $('#dateAdd').val(data.dateAdd);
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
                    `<option class="form-control" value='${ v.id }'>${v.name}</option>`
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
                    `<option class="form-control" value='${ v.id }'>${v.name}</option>`
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

products.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val(0);
    $('#name').val("");
    $('#price').val("");
    $('#amount').val("");
    $('#description').val("");
    $('#weight').val("");
    $('#size').val("");
    $('#color').val("");
    $('#image').val("");
    $("#type").val($("#type option:first").val());
    $("#vendor").val($("#vendor option:first").val());
}

var validator = $( "#formAddEdit" ).validate();
$(document).ready(function () {
    products.intTable();
    vendors.initVendors();
    types.initTypes();
    rates.findStatus();
});
