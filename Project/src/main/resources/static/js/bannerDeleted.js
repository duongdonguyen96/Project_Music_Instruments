var banners = {} || banners;
var rates=rates||{};

banners.intTable = function () {
    var id;
    var role=$('#role').val();
    if (role==='ADMIN'){
        $('#banners-datatables').DataTable({
            ajax: {
                url: 'http://localhost:8080/api/bannersDeleted/',
                method: 'GET',
                dataType: 'json',
                dataSrc: ''
            },
            columns: [
                {
                    data: "id", name: "Id", title: "Id", orderable: true, "render": function (data) {
                        id=data;
                        return id;
                    }
                },
                {
                    data: "title", name: "Title", title: "Title", orderable: true,"render": function (data) {
                        var str ="<div><a href='javascript:' onclick='banners.getBannerDeleted("+id+")' title='View'>"+data+"</a></div>" ;
                        return str;
                    },
                },
                {
                    data: "image", name: "Image", title: "Image", sortable: false, orderable: true, "render": function (data){
                        var str = "<img style='width: 106px; height: 130px; border:1px solid red' src="+ data +">";
                        return str;
                    }
                },
                {
                    data: "dateDelete", name: "Date Delete", title: "date Delete", sortable: false, orderable: false
                },
                {
                    data: "id", name: "Action", title: "Action", sortable: false,
                    orderable: false, "render": function (data) {
                        var str = "<div style='justify-content: center;text-align: center'>" +
                            "<a href='javascript:' class='btn btn-warning' title='Undo' onclick='banners.undo("+data+")'><i class=\"fa fa-undo\" aria-hidden=\"true\" ></i></a> " +
                            "<a href='javascript:' onclick='banners.delete("+data+")' title='Delete' class='btn btn-danger'><i class=\"ti-trash\" title=\"Delete\"></a>" +
                            "</div>"
                        return str;
                    }
                }
            ],
        });
    }else {
        $('#banners-datatables').DataTable({
            ajax: {
                url: 'http://localhost:8080/api/bannersDeleted/',
                method: 'GET',
                dataType: 'json',
                dataSrc: ''
            },
            columns: [
                {
                    data: "id", name: "ID", title: "ID", orderable: true, "render": function (data) {
                        id=data;
                        return id;
                    }
                },
                {
                    data: "title", name: "Title", title: "Title", orderable: true,"render": function (data) {
                        var str ="<div><a href='javascript:' onclick='banners.getBannerDeleted("+id+")' title='View'>"+data+"</a></div>" ;
                        return str;
                    },
                },
                {
                    data: "image", name: "Image", title: "Image", sortable: false, orderable: true, "render": function (data){
                        var str = "<img style='width: 106px; height: 130px; border:1px solid red' src="+ data +">";
                        return str;
                    }
                },
                {
                    data: "dateDelete", name: "Date Delete", title: "date Delete", sortable: false, orderable: false
                },
            ],
        });
    }

};

banners.getBannerDeleted = function (id) {
    $.ajax({
        url: "http://localhost:8080/api/bannerDeleted/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            $('#modalTitle').html("View banner");
            $('#id').val(data.id);
            $('#dateAdd').val(data.dateAdd);
            $('#dateUpdate').val(data.dateUpdate);
            $('#dateDelete').val(data.dateDelete);
            $('#title').val(data.title);
            $('#imageHtml').html(
                `<img class="form-control" src="${data.image}"
                           name="image" id="image" style="width: 600px;height: 600px">`
            );
            $('.form-control').attr('disabled','disable');
            $('#modalAddEdit').modal('show');
        }
    });
};

banners.delete = function (id){
    bootbox.confirm({
        message: "Do you want to delete this banner?",
        button: {
            confirm:{
                label: 'Yes',
                className: 'btn-success'
            },
            cancel:{
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result){
            if (result){
                $.ajax({
                    url: 'http://localhost:8080/api/bannerDeleted/' + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function (){
                        $("#banners-datatables").DataTable().ajax.reload();
                        toastr.info('Banner has been deleted successfully', 'INFORMATION:')
                    },
                    error: function (jqXHR, exception){
                        toastr.error('Error!! Banner not has been delete', 'INFORMATION:')
                    }
                });
            }
        }
    });
};

banners.undo = function (id){
    bootbox.confirm({
        message: "Do you want to permanently delete the banner",
        button: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result){
            $.ajax({
                url: 'http://localhost:8080/api/bannerUndo/' + id,
                method: "PUT",
                dataType: "json",
                success: function (){
                    $("#banners-datatables").DataTable().ajax.reload();
                    toastr.info('Banner has been undo successfully', 'INFORMATION:')
                },
                error: function (){
                    toastr.error('Error!! Banner not has been undo', 'INFORMATION:')
                }
            });
        }
    });
};

$(document).ready(function (){
    banners.intTable();
    rates.findStatus();
});