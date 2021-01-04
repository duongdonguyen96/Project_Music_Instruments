var blogs = {} || blogs;
var rates = rates || {};

blogs.intTable = function (){
    var role=$('#role').val();
    if (role==='ADMIN'){
        $("#blogs-datatables").DataTable({
            ajax:{
                url: 'http://localhost:8080/api/blogsDeleted/',
                method: 'GET',
                dataType: 'json',
                dataSrc: ''
            },
            columns: [
                {
                    data: "id", name: "Id", title: "Id", orderable: true
                },
                {
                    data: "title", name: "Title", title: "Title", orderable: true
                },
                {
                    data: "image", name: "Image", title: "Image", sortable:false, "render": function (data){
                        var str = "<img style='width: 106px; height: 130px; border: 1px solid red' src="+data+">"
                        return str;
                    }
                },
                {
                    data: "dateDelete", name: "DateDelete", title: "Date Delete", sortable: false, orderable: false
                },
                {
                    data: "id", name: "Action", title: "Action", "render": function (data){
                        var str = "<div style='justify-content: center; text-align: center'><a href='javascript:' onclick='blogs.delete("+data+")' title='Delete' class='btn btn-danger ti-trash'></a>" +
                            "<a href='javascript:' onclick='blogs.undo("+data+")' class='btn btn-warning' title='Undo'><i class=\"fa fa-undo\" aria-hidden=\"true\" ></i></a></div>"
                        return str;
                    }
                }
            ],
        });
    }else {
        $("#blogs-datatables").DataTable({
            ajax:{
                url: 'http://localhost:8080/api/blogsDeleted/',
                method: 'GET',
                dataType: 'json',
                dataSrc: ''
            },
            columns: [
                {
                    data: "id", name: "Id", title: "Id", orderable: true
                },
                {
                    data: "title", name: "Title", title: "Title", orderable: true
                },
                {
                    data: "image", name: "Image", title: "Image", sortable:false, "render": function (data){
                        var str = "<img style='width: 106px; height: 130px; border: 1px solid red' src="+data+">"
                        return str;
                    }
                },
                {
                    data: "dateDelete", name: "DateDelete", title: "Date Delete", sortable: false, orderable: false
                },
            ],
        });
    }

};

blogs.delete = function (id){
    bootbox.confirm({
        message: "Do you want this post?",
        button: {
            confirm:{
                label: "Yes",
                className: "btn-success",
            },
            cancel:{
              label: "No",
              className: "btn-danger"
            }
        },
        callback: function (result){
            if (result){
                $.ajax({
                    url: 'http://localhost:8080/api/blogDeleted/' + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function (){
                        $("#blogs-datatables").DataTable().ajax.reload();
                        toastr.info('Blog has been deleted successfully', 'INFORMATION:')
                    },
                    error: function (jqXHR, exception){
                        toastr.info('Error!! Blog not has been delete', 'INFORMATION:')
                    }
                });
            }
        }
    });
};

blogs.undo = function (id){
    bootbox.confirm({
        message: "Do you want permanently delete the post",
        button: {
            confirm: {
                label: "Yes",
                className: "btn-success"
            },
            cancel: {
                label: "No",
                className: "btn-danger"
            }
        },
        callback: function (result){
            if (result){
                $.ajax({
                    url: 'http://localhost:8080/api/blogUndo/' + id,
                    method: 'PUT',
                    dataType: 'json',
                    success: function (){
                        $("#blogs-datatables").DataTable().ajax.reload();
                        toastr.info("Blog has been undo successfully", "INFORMATION:")
                    },
                    error: function (jqXHR, exception){
                        toastr.info("Error!! Blog not has been undo", "INFORMATION:")
                    }
                });
            }
        }
    });
};

$(document).ready(function (){
    blogs.intTable();
    rates.findStatus();
})