var banners = {} || banners;
var rates=rates||{};
banners.intTable = function () {
    var id;
    var role=$('#role').val();
    if (role==='ADMIN'){
        $("#banners-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/banners/',
                method: "GET",
                dataType: "json",
                dataSrc: ""
            },
            columns:[
                {
                    data: "id", name: "Id", title:"Id", orderable: true, "render": function (data){
                        id = data;
                        return id;
                    }
                },
                {
                    data: "title", name: "Title", title:"Title", orderable: true, "render": function (data){
                        var str ="<div><a href='javascript:' onclick='banners.get(this.title,"+id+")' title='View'>"+data+"</a></div>" ;
                        return str;
                    }
                },
                {
                    data: "image", name: "Image", title: "Image", orderable: true, "render": function (data){
                        var str = "<img style='width: 106px; height: 130px; border: 1px solid red' src="+data+">";
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
                        var str = "<div style='justify-content: center;text-align: center'>" +
                            "<a href='javascript:' onclick='banners.get(this.title,"+data+")' title='Edit' data-toggle=\"modal\" data-target=\"#modalAddEdit\" class='btn btn-warning'><i class=\"fa fa-cogs\" aria-hidden=\"true\"></i></a> " +
                            "<a href='javascript:' class='btn btn-danger' onclick='banners.delete("+data+")'><i class=\"ti-trash\" title=\"Delete\"></a>" +
                            "</div>"
                        return str;
                    }
                }
            ]
        });
    }else {
        $("#banners-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/banners/',
                method: "GET",
                dataType: "json",
                dataSrc: ""
            },
            columns:[
                {
                    data: "id", name: "Id", title:"Id", orderable: true, "render": function (data) {
                        id = data;
                        return id;
                    }
                },
                {
                    data: "title", name: "Title", title:"Title", orderable: true, "render": function (data){
                        var str ="<div><a href='javascript:' onclick='banners.get(this.title,"+id+")' title='View'>"+data+"</a></div>" ;
                        return str;
                    }
                },
                {
                    data: "image", name: "Image", title: "Image", orderable: true, "render": function (data){
                        var str = "<img style='width: 106px; height: 130px; border: 1px solid red' src="+data+">";
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
            ]
        });
    }

};

banners.addNew = function () {
    $('#modalTitle').html(("Add new banner"));
    $('.hideHtml').hide();
    $('.form-control').removeAttr('disabled');
    $('#imageHtml').html(
        `<img id='output' height="150px" width="100px">
               <input class="form-control" type='file' accept='image/*' onchange='openFile(event)' name="fileUpdate" data-rule-required=true ><br>`
    );
    $('#save').show();
    $( "#formAddEdit" ).validate().resetForm();
    banners.resetForm();
    $('#modalAddEdit').modal('show');
};

banners.save = function (){
    if ($("#formAddEdit").valid()){
        if ($('#id').val() == 0){
            var bannerObj = {};
            bannerObj.title = $('#title').val();
            bannerObj.image = $('#base64').val();

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
            bannerObj.title = $('#title').val();
            bannerObj.image = $('#base64').val();
            bannerObj.id = $('#id').val();
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
        $( "#formAddEdit" ).validate().resetForm();
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

banners.get = function (title, id) {
    $.ajax({
        url: "http://localhost:8080/api/banner/" + id,
        method: "GET",
        dataType: "json",
        success: function (data){
            $('#formAddEdit')[0].reset();
            $('.form-control').removeAttr('disabled');
            if(title === 'Edit'){
                $('#modalTitle').html("Edit banner");
                $('.hideHtml').hide();
                $('#save').show();
                $('#base64').val(data.image)
                $('#imageHtml').html(
                    `<img id='output' height="150px" width="100px" src="${data.image}">
                            <input class="form-control" type='file' accept='image/*' onchange='openFile(event)' name="fileUpdate" ><br>`
                );
            }
            if (title === 'View'){
                $('#modalTitle').html("View banner");
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
            $('#title').val(data.title);
            $( "#formAddEdit").validate().resetForm();
            $('#modalAddEdit').modal('show');
        }
    });
};

banners.resetForm = function (){
    $('#formAddEdit')[0].reset();
    $('#title').val("");
    $('#id').val(0);
    $('#image').val("");
}

banners.validation = function (){
    $('#formAddEdit').validate({
        rule:{
            title: {
                required: true,
                minlength: 10,
                maxlength: 100,
            },
            image:{
                required:true
            },
        },
        message:{
            title:{
                required:"Please enter input title",
                minlength:"Enter title of at least 10 characters",
                maxlength:"Enter title of up to 100 characters"
            },
            image:{
                required:"Please upload the image",
            },
        }
    });
}


$(document).ready(function () {
    banners.intTable();
    banners.validation();
    rates.findStatus();
});