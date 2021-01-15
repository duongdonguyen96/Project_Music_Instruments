var products = {} || products;
var rates = {} || rates;
var employees={}||employees;
products.intTable = function () {
    var id;
    var role=$('#role').val();
    if (role==='ADMIN'){
        $("#products-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/products/',
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
                        var str ="<img onclick='products.get(this.title,"+id+")' title='View' style='width: 80px; height: 80px; border: 1px solid red' src="+data+">" ;
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
                        var str = "<div style='justify-content: center;text-align: center'>" +
                            "<a href='javascript:' onclick='products.get(this.title,"+data+")' title='Edit' data-toggle=\"modal\" data-target=\"#modalAddEdit\" class='btn btn-warning'><i class=\"fa fa-cogs\" aria-hidden=\"true\"></i></a> " +
                            "<a href='javascript:' class='btn btn-danger' onclick='products.delete("+data+")'><i class=\"ti-trash\" title=\"Delete\"></a>" +
                            "</div>"
                        return str;
                    }
                }
            ],
        });
    }else {
        $("#products-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/products/',
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
                        var str ="<img onclick='products.get(this.title,"+id+")' title='View' style='width: 80px; height: 80px; border: 1px solid red' src="+data+">" ;
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
                    data: "dateAdd", name: "Date Add", title: "Date Add", sortable: false,
                    orderable: false
                },
                {
                    data: "dateUpdate", name: "Date Edit", title: "Date Edit", sortable: false,
                    orderable: false
                },
        ]
        });
    }
};

products.addNew = function () {
    $('#modalTitle').html("Add new products");
    $('.hideHtml').hide();
    $('.form-control').removeAttr('disabled');
    $('#imageHtml').html(
        `<img id='output' height="150px" width="100px">
               <input class="form-control" type='file' accept='image/*' onchange='openFile(event)' name="fileUpdate" data-rule-required=true ><br>`
    );
    $('#save').show();
    products.validation();
    products.resetForm();
    $( "#formAddEdit" ).validate().resetForm();
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
            productObj.image = $('#base64').val();
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
                        toastr.info('Product has been created successfully', 'INFORMATION:')
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
            productObj.image = $('#base64').val();
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
        $( "#formAddEdit" ).validate().resetForm();
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

products.get = function (title,id) {
    $.ajax({
        url: "http://localhost:8080/api/product/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            $('.form-control').removeAttr('disabled');
            if (title==='Edit'){
                $('#modalTitle').html("Edit product");
                $('.hideHtml').hide();
                $('#save').show();
                $('#base64').val(data.image)
                $('#imageHtml').html(
                    `<img id='output' height="150px" width="100px" src="${data.image}">
                            <input class="form-control" type='file' accept='image/*' onchange='openFile(event)' name="fileUpdate" ><br>`
                );
            };
            //
            if (title==='View'){
                $('#modalTitle').html("View product");
                $('.hideHtml').show();
                $('#imageHtml').html(
                    `<img class="form-control" src="${data.image}"
                           name="image" id="image" style="width: 600px;height: 600px">`
                );
                $('#save').hide();
                $('.form-control').attr('disabled','disabled');
            }
            $('#id').val(data.id);
            $('#dateAdd').val(data.dateAdd);
            $('#dateUpdate').val(data.dateUpdate);
            $('#name').val(data.name);
            $('#price').val( data.price);
            $('#amount').val(data.amount);
            $('#weight').val(data.weight);
            $('#size').val( data.size);
            $('#color').val( data.color);
            $('#description').val( data.description);
            $('#type').val(data.typeProduct.id)
            $('#vendor').val(data.vendor.id)
            $( "#formAddEdit" ).validate().resetForm();
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
                    `<option class="form-control noDisable" value='${ v.id }'>${v.name}</option>`
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

products.validation=function (){
    $('#formAddEdit').validate({
        rules: {
            name: {
                required: true,
                minlength: 10,
                maxlength: 100,
            },
            price:{
                required:true,
                min:0
            },
            amount:{
                required:true,
                min:0
            },
            weight:{
                required:true,
                min:0
            },
            size:{
                required:true,
                min:0
            },
            image:{
                required:true
            },
            type:{
                required:true,
            },
            vendor:{
                required:true,
            },
            description:{
                required: true,
                minlength: 100,
                maxlength: 500,
            },
        },
        messages: {
            name:{
                required:"Please enter input name product",
                minlength:"Enter names of at least 10 characters",
                maxlength:"Enter names of up to 100 characters"
            },
            price:{
                required:"Please enter input price product",
                min:"Please enter a price greater than or equal to zero!",
            },
            amount:{
                required:"Please enter input amount product",
                min:"Please enter a amount greater than or equal to zero!",
            },
            weight:{
                required:"Please enter input weight product",
                min:"Please enter a weight greater than or equal to zero!",
            },
            size:{
                required:"Please enter input size product",
                min:"Please enter a size greater than or equal to zero!",
            },
            vendor:{
                required: "Please initialize the manufacturer first",
            },
            description:{
                required: "Please enter input description product",
                minlength:"Enter names of at least 100 characters",
                maxlength:"Enter names of up to 500 characters"
            },
            image:{
                required:"Please upload the image",
            },
            type:{
                required:"Please initialize the category first",
            },
        }
    });
}
$(document).ready(function () {
    products.validation();
    products.intTable();
    vendors.initVendors();
    types.initTypes();
    rates.findStatus();
});
