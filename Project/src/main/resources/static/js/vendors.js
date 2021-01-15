var vendors = {} || vendors;
var rates = {} || rates;
vendors.intTable = function () {
    var id;
    var role=$('#role').val();
    if (role==="ADMIN"){
        $("#vendors-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/vendors/',
                method: "GET",
                datatype: "json",
                dataSrc: ""
            },
            columns: [
                {
                    data: "id", name: "ID", title: "ID", orderable: true, "render": function (data) {
                        id=data;
                        return id;
                    }
                },
                {
                    data: "name", name: "Name", title: "Name", orderable: true,"render": function (data) {
                        var str ="<div><a href='javascript:' onclick='vendors.get(this.title,"+id+")' title='View'>"+data+"</a></div>" ;
                        return str;
                    },
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
                    orderable: true,"render": function (data) {
                        var str = `<a href="mailto:${data}" title="Send mail">${data}</a>`;
                        return str;
                    }
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
                    data: "id", name: "Action", title: "Action", sortable: false,
                    orderable: false, "render": function (data) {
                        var str = "<div style='justify-content: center;text-align: center'>" +
                            "<a href='javascript:' onclick='vendors.get(this.title,"+data+")' title='Edit' data-toggle=\"modal\" data-target=\"#modalAddEdit\" class='btn btn-warning'><i class=\"fa fa-cogs\" aria-hidden=\"true\"></i></a> " +
                            "<a href='javascript:' class='btn btn-danger' onclick='vendors.delete("+data+")'><i class=\"ti-trash\" title=\"Delete\"></a>" +
                            "</div>"
                        return str;
                    }
                }
            ]
        });
    }else {
        $("#vendors-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/vendors/',
                method: "GET",
                datatype: "json",
                dataSrc: ""
            },
            columns: [
                {
                    data: "id", name: "ID", title: "ID", orderable: true, "render": function (data) {
                        id=data;
                        return id;
                    }
                },
                {
                    data: "name", name: "Name", title: "Name", orderable: true,"render": function (data) {
                        var str ="<div><a href='javascript:' onclick='vendors.get(this.title,"+id+")' title='View'>"+data+"</a></div>" ;
                        return str;
                    },
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
            ]
        });
    }
};

vendors.addNew = function () {
    $('#modalTitle').html("Add new vendors");
    $('.hideHtml').hide();
    $('.form-control').removeAttr('disabled');
    $('#imageHtml').html(
        `<img id='output' height="150px" width="100px">
               <input class="form-control" type='file' accept='image/*' onchange='openFile(event)' name="fileUpdate" data-rule-required=true ><br>`
    );
    $('#save').show();
    $( "#formAddEdit" ).validate().resetForm();
    vendors.resetForm();
    $('#modalAddEdit').modal('show');
};


vendors.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var vendorObj = {};
            vendorObj.name = $('#name').val().trim();
            vendorObj.address = $('#address').val();
            vendorObj.email = $('#email').val().trim();
            vendorObj.phone = $('#phone').val();
            vendorObj.surrogate = $('#surrogate').val();
            vendorObj.image = $('#base64').val();
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
            vendorObj.name = $('#name').val().trim();
            vendorObj.address = $('#address').val();
            vendorObj.email = $('#email').val().trim();
            vendorObj.phone = $('#phone').val();
            vendorObj.surrogate = $('#surrogate').val();
            vendorObj.image = $('#base64').val();
            vendorObj.id = $('#id').val();
            vendorObj.dateAdd = $('#dateAdd').val();
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
        $( "#formAddEdit" ).validate().resetForm();
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

vendors.get = function (title,id) {
    $.ajax({
        url: "http://localhost:8080/api/vendor/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            $('.form-control').removeAttr('disabled');
            if (title==='Edit'){
                $('#modalTitle').html("Edit vendor");
                $('.hideHtml').hide();
                $('#save').show();
                $('#base64').val(data.image)
                $('#imageHtml').html(
                    `<img id='output' height="150px" width="100px" src="${data.image}">
                            <input class="form-control" type='file' accept='image/*' onchange='openFile(event)' name="fileUpdate" ><br>`
                );
            }
            if (title==='View'){
                $('#modalTitle').html("View vendor");
                $('.hideHtml').show();
                $('#imageHtml').html(
                    `<img class="form-control" src="${data.image}"
                           name="image" id="image" style="width: 600px;height: 600px">`
                );
                $('#save').hide();
                $('.form-control').attr('disabled','disable');
            }
            $('#id').val(data.id);
            $('#dateAdd').val(data.dateAdd);
            $('#dateUpdate').val(data.dateUpdate);
            $('#name').val(data.name);
            $('#address').val( data.address);
            $('#email').val(data.email);
            $('#surrogate').val(data.surrogate);
            $('#phone').val( data.phone );
            $( "#formAddEdit").validate().resetForm();
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

vendors.validation=function (){
    $('#formAddEdit').validate({
        rules: {
            name: {
                required: true,
                minlength: 5,
                maxlength: 100,
            },
            address:{
                required:true,
                minlength: 5,
                maxlength: 100,
            },
            phone:{
                required:true,
                minlength: 10,
                maxlength:11,
            },
            email:{
                required:true,
            },
            surrogate:{
                required:true,
                minlength: 10,
                maxlength: 45,
            },
            image:{
                required:true
            },
        },
        messages: {
            name:{
                required:"Please enter input name vendor",
                minlength:"Enter names of at least 5 characters",
                maxlength:"Enter names of up to 100 characters"
            },
            address:{
                required:"Please enter input address",
                minlength:"Enter address of at least 5 characters",
                maxlength:"Enter address of up to 100 characters"
            },
            phone:{
                required:"Please enter input phone number",
                minlength:"Enter phone number of at least 10 characters",
                maxlength:"Enter phone number of up to 11 characters"
            },
            email:{
                required:"Please enter input email",
            },
            surrogate:{
                required:"Please enter input name surrogate",
                minlength:"Enter names surrogate of at least 10 characters",
                maxlength:"Enter names surrogate of up to 45 characters"
            },
            image:{
                required:"Please upload the image",
            },
        }
    });
}

$(document).ready(function () {
    vendors.intTable();
    vendors.validation();
    rates.findStatus();
});
