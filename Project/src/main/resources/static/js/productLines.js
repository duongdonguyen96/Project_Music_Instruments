var productLines = {} || productLines;
productLines.intTable = function () {
    $("#productLines-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/typeProducts/',
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
                    var str = "<div style='justify-content: center;text-align: center'><a href='javascript:' title='Edit' onclick='productLines.get("+data+")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" class='btn btn-warning fa fa-cogs'></a> " +
                        "<a href='javascript:'  class='btn btn-danger' onclick='productLines.delete("+data+")' ><i class=\"ti-trash\" title=\"Delete\"></a></div>"
                    return str;
                }
            }
        ]
    });
};

productLines.addNew = function () {
    $('#modalTitle').html("Add new type");
    validator.resetForm();
    productLines.resetForm();
    $('#modalAddEdit').modal('show');
};

productLines.save = function () {
    validator.resetForm();
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var typeObj = {};
            typeObj.name = $('#name').val();
            typeObj.description = $('#description').val();
            //
            $.ajax({
                url: "http://localhost:8080/api/typeProduct/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(typeObj),
                done: function () {
                    $('#modalAddEdit').modal('hide');
                    $("#productLines-datatables").DataTable().ajax.reload();
                },
                success: function (data) {
                    if(data.code === 2){
                        $('#modalAddEdit').modal('hide');
                        $("#productLines-datatables").DataTable().ajax.reload();
                        toastr.info('Type has been created successfully', 'INFORMATION:')
                    }else {
                        data.stringListMessage.map(e =>toastr.error(e));
                    }
                }
            });
        } else {
            var typeObj = {};
            typeObj.name = $('#name').val();
            typeObj.id = $('#id').val();
            typeObj.description = $('#description').val();
            typeObj.dateUpdate = new Date();
            //
            $.ajax({
                url: "http://localhost:8080/api/typeProduct/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(typeObj),
                success: function (data) {
                    if (data.code === 2) {
                        $('#modalAddEdit').modal('hide');
                        $("#productLines-datatables").DataTable().ajax.reload();
                        toastr.info('Type has been updated successfully', 'INFORMATION:')
                    } else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }
            });
        }
    }
};

productLines.delete = function (id) {
    bootbox.confirm({
        message: "Do you want to delete this Type",
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
                    url: "http://localhost:8080/api/typeProduct/" + id,
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
    validator.resetForm();
};

productLines.get = function (id) {
    $.ajax({
        url: "http://localhost:8080/api/typeProduct/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            $('#modalTitle').html("Edit type");
            $('#id').val(data.id);
            $('#name').val(data.name);
            $('#description').val( data.description );
            $('#modalAddEdit').modal('show');
        }
    });
};

productLines.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val(0);
    $('#name').val("");
    $('#description').val("");
}

var validator = $( "#formAddEdit" ).validate();
$(document).ready(function () {
    productLines.intTable();
});
