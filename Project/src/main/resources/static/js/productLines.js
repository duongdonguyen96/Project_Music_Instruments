var productLines = {} || productLines;
var rates = {} || rates;
productLines.intTable = function () {
    var id;
    var role=$('#role').val();
    if (role==="ADMIN"){
        $("#productLines-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/typeProducts/',
                method: "GET",
                datatype: "json",
                dataSrc: ""
            },
            columns: [
                {
                    data: "id", name: "ID", title: "ID", orderable: true,"render": function (data) {
                        id=data;
                        return id;
                    }
                },
                {
                    data: "name", name: "Name", title: "Name", orderable: true,"render": function (data) {
                        var str ="<div><a href='javascript:' onclick='productLines.get(this.title,"+id+")' title='View'>"+data+"</a></div>" ;
                        return str;
                    },
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
                    data: "id", name: "Action", title: "Action", sortable: false,
                    orderable: false, "render": function (data) {
                        var str = "<div style='justify-content: center;text-align: center'>" +
                            "<a href='javascript:' title='Edit' onclick='productLines.get(this.title,"+data+")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" class='btn btn-warning'><i class=\"fa fa-cogs\" aria-hidden=\"true\"></i></a> " +
                            "<a href='javascript:'  class='btn btn-danger' onclick='productLines.delete("+data+")' ><i class=\"ti-trash\" title=\"Delete\"></a>" +
                            "</div>"
                        return str;
                    }
                }
            ]
        });
    }else {
        $("#productLines-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/typeProducts/',
                method: "GET",
                datatype: "json",
                dataSrc: ""
            },
            columns: [
                {
                    data: "id", name: "ID", title: "ID", orderable: true,"render": function (data) {
                        id=data;
                        return id;
                    }
                },
                {
                    data: "name", name: "Name", title: "Name", orderable: true,"render": function (data) {
                        var str ="<div><a href='javascript:' onclick='productLines.get(this.title,"+id+")' title='View'>"+data+"</a></div>" ;
                        return str;
                    },
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
            ]
        });
    }
};

productLines.addNew = function () {
    $('#modalTitle').html("Add new type");
    $('.hideHtml').hide();
    $('#save').show();
    $('.form-control').removeAttr('disabled');
    $( "#formAddEdit" ).validate().resetForm();
    productLines.resetForm();
    $('#modalAddEdit').modal('show');
};

productLines.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var typeObj = {};
            typeObj.name = $('#name').val().trim();
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
            typeObj.name = $('#name').val().trim();
            typeObj.id = $('#id').val();
            typeObj.dateAdd = $('#dateAdd').val();
            typeObj.description = $('#description').val();
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
        $( "#formAddEdit" ).validate().resetForm();
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
};

productLines.get = function (title,id) {
    $.ajax({
        url: "http://localhost:8080/api/typeProduct/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            if (title==='Edit'){
                $('#modalTitle').html("Edit type");
                $('.hideHtml').hide();
                $('#save').show();
                $('.form-control').removeAttr('disabled');
            }
            if (title==='View'){
                $('#modalTitle').html("View type");
                $('.hideHtml').show();
                $('#save').hide();
                $('.form-control').attr('disabled','disabled');
            }
            $('#id').val(data.id);
            $('#dateAdd').val(data.dateAdd);
            $('#dateUpdate').val(data.dateUpdate);

            $('#name').val(data.name);
            $('#description').val( data.description );
            $( "#formAddEdit" ).validate().resetForm();
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

productLines.validation=function (){
    $('#formAddEdit').validate({
        rules: {
            name: {
                required: true,
                minlength: 10,
                maxlength: 50,
            },
            description:{
                required: true,
                minlength: 100,
                maxlength:500,
            },
        },
        messages: {
            name:{
                required:"Please enter input name types",
                minlength:"Enter names of at least 10 characters",
                maxlength:"Enter names of up to 100 characters"
            },
            description:{
                required:"Please enter input description",
                minlength:"Enter description of at least 100 characters",
                maxlength:"Enter description of up to 500 characters"
            },
        }
    });
}

$(document).ready(function () {
    productLines.intTable();
    productLines.validation();
    rates.findStatus();
});
