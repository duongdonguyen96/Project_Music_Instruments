var banners = {} || banners;
banners.intTable = function () {
    $("#banners-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/banners/',
            method: "GET",
            dataType: "json",
            dataSrc: ""
        },
        columns:[
            {
                data: "id", name: "Id", title:"Id", orderable: true,
            },
            {
                data: "image", name: "Image", title: "Image", orderable: true, "render": function (data){
                    var str = "<img style='width: 106px; height 130px; border: 1px solid red' src="+data+">";
                    return str;
                }
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
                data: "id", name: "Action", title: "Action", sortable: false, orderable: false, "render": function (data) {
                    var str = "<div style='justify-content: center;text-align: center'><a href='javascript:' onclick='banners.get("+data+")' title='Edit' data-toggle=\"modal\" data-target=\"#modalAddEdit\" class='btn btn-warning fa fa-cogs'></a> " +
                        "<a href='javascript:' class='btn btn-danger' onclick='banners.delete("+data+")'><i class=\"ti-trash\" title=\"Delete\"></a></div>"
                    return str;
                }
            }
        ]
    });
};

banners.addNew = function () {
    $('#modalTitle').html(("Add new banner"));
    validator.resetForm();
    banners.resetForm();
    $('#modalAddEdit').modal('show');
};

banners.save = function (){
    if ($("#formAddEdit").valid()){
        if ($('#id').val() == 0){
            var bannerObj = {};
            bannerObj.image = $('#image').val();

            $.ajax({
                url: "http://localhost:8080/api/banner/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(bannerObj),
                done: function () {
                    $('#modalAddEdit').modal('hide');
                    $('#banners-datatables').DataTable().ajax.reload();
                },
                success: function (data) {
                    if (data.code === 2){
                        $('#modalAddEdit').modal('hide');
                        $('#banners-datatables').DataTable().ajax.reload();
                        toastr.info('Banner has been created successfully', 'INFOMATION:')
                    }else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }
            });
        }else {
            var bannerObj = {};
            bannerObj.id = $('#id').val();
            bannerObj.image = $('#image').val();
            bannerObj.dateAdd = $("#dateAdd").val();

            $.ajax({
                url: "http://localhost:8080/api/banner/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(bannerObj),
                success: function (data) {
                    if (data.code === 2){
                        $('#modalAddEdit').modal('hide');
                        $('#banners-datatables').DataTable().ajax.reload();
                        toastr.info('Banner has been updated successfully', 'INFORMATION:')
                    }else {
                        data.stringLIstMessage.map(e => toastr.error(e));
                    }
                }
            });
        }
        validator.resetForm();
    }
};

banners.delete = function (id) {
    bootbox.confirm({
        message: "Do you want to delete this Banner",
        button: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel:{
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result){
                $.ajax({
                    url: "http://localhost:8080/api/banner/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function () {
                        $("#banners-datatables").DataTable().ajax.reload();
                        toastr.info('Banner has been deleted successfully', 'INFORMATION:')
                    },
                    error: function (jsqXHR, exception){
                        toastr.error('Error !! Banner not has been delete', 'INFORMATION:')
                    }
                });
            }
        }
    });
    validator.resetForm();
};

banners.get = function (id) {
    $.ajax({
        url: "http://localhost:8080/api/banner/" + id,
        method: "GET",
        dataType: "json",
        success: function (data){
            $('#formAddEdit')[0].reset();
            $('#modalTitle').html("Edit banner");
            $('#id').val(data.id);
            $('#image').val(data.image);
            $('#dateAdd').val(data.dateAdd);
            $('#modalAddEdit').modal('show');
        }
    });
};

banners.resetForm = function (){
    $('#formAddEdit')[0].reset();
    $('#id').val(0);
    $('#image').val("");
}

var validator = $('#formAddEdit').validate();

$(document).ready(function () {
    banners.intTable();
});