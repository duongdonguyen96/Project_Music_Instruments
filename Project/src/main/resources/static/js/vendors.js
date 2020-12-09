var vendors = {} || vendors;
vendors.intTable = function () {
    $("#vendors-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/vendors/',
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
                data: "email", name: "Email", title: "Email", sortable: false,
                orderable: false,
            },
            {
                data: "surrogate", name: "Surrogate", title: "Surrogate", sortable: false,
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
                    var str = "<div style='justify-content: center;text-align: center'><a href='javascript:' onclick='vendors.get("+data+")' title='Edit' data-toggle=\"modal\" data-target=\"#modalAddEdit\" class='btn btn-warning fa fa-cogs'></a> " +
                        "<a href='javascript:' class='btn btn-danger' onclick='vendors.delete("+data+")'><i class=\"ti-trash\" title=\"Delete\"></a></div>"
                    return str;
                }
            }
        ]
    });
};

vendors.addNew = function () {
    $('#modalTitle').html("Add new vendors");
    validator.resetForm();
    vendors.resetForm();
    $('#modalAddEdit').modal('show');
};


vendors.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var vendorObj = {};
            vendorObj.name = $('#name').val();
            vendorObj.address = $('#address').val();
            vendorObj.email = $('#email').val();
            vendorObj.phone = $('#phone').val();
            vendorObj.surrogate = $('#surrogate').val();
            vendorObj.image = $('#image').val();
            //
            $.ajax({
                url: "http://localhost:8080/api/vendor/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(vendorObj),
                done: function () {
                    $('#modalAddEdit').modal('hide');
                    $("#vendors-datatables").DataTable().ajax.reload();
                },
                success: function (data) {
                    if(data.code === 2){
                        $('#modalAddEdit').modal('hide');
                        $("#vendors-datatables").DataTable().ajax.reload();
                        toastr.info('Vendor has been created successfully', 'INFORMATION:')
                    }else {
                        data.stringListMessage.map(e =>toastr.error(e));
                    }
                }
            });
        } else {
            var vendorObj = {};
            vendorObj.name = $('#name').val();
            vendorObj.address = $('#address').val();
            vendorObj.email = $('#email').val();
            vendorObj.phone = $('#phone').val();
            vendorObj.surrogate = $('#surrogate').val();
            vendorObj.image = $('#image').val();
            vendorObj.id = $('#id').val();
            //
            $.ajax({
                url: "http://localhost:8080/api/vendor/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(vendorObj),
                success: function (data) {
                    if(data.code === 2){
                        $('#modalAddEdit').modal('hide');
                        $("#vendors-datatables").DataTable().ajax.reload();
                        toastr.info('Vendor has been updated successfully', 'INFORMATION:')
                    }else {
                        data.stringListMessage.map(e =>toastr.error(e));
                    }

                }
            });
        }
        validator.resetForm();
    }
};

vendors.delete = function (id) {
    bootbox.confirm({
        message: "Do you want to delete this Vendor",
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
                    url: "http://localhost:8080/api/vendor/" + id,
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

vendors.get = function (id) {
    $.ajax({
        url: "http://localhost:8080/api/vendor/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            $('#modalTitle').html("Edit vendor");
            $('#id').val(data.id);
            $('#name').val(data.name);
            $('#address').val( data.address);
            $('#email').val(data.email);
            $('#surrogate').val(data.surrogate);
            $('#phone').val( data.phone );
            $('#image').val(data.image);
            $('#modalAddEdit').modal('show');
        }
    });
};

vendors.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val(0);
    $('#name').val("");
    $('#address').val("");
    $('#phone').val("");
    $('#email').val("");
    $('#surrogate').val("");
    $('#image').val("");
}

var validator = $( "#formAddEdit" ).validate();
$(document).ready(function () {
    vendors.intTable();

});
