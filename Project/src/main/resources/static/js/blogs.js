var blogs = {} || blogs;
var rates = rates || {};
blogs.intTable = function () {
    var role=$('#role').val();
    if (role==='ADMIN'){
        $("#blogs-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/blogs/',
                method: "GET",
                dataType: "json",
                dataSrc: ""
            },
            columns: [
                {
                    data: "id", name: "Id", title: "Id", orderable: true
                },
                {
                    data: "title", name: "Title", title: "Title", orderable: true
                },
                {
                    data: "image", name: "Image", title: "Image", orderable: true, "render": function (data) {
                        var str = "<img style='width: 103px; height: 130px; border: 1px solid red' src=" + data + ">";
                        return str
                    }
                },
                {
                    data: "dateAdd", name: "Date Add", title: "Date Add", sortable: false
                },
                {
                    data: "dateUpdate", name: "Date Update", title: "Date Update", sortable: false
                },
                {
                    data: "id", name: "Action", title: "Action", "render": function (data) {
                        var str = "<div style='justify-content: center; text-align: center'><a href='javascript:' class='btn btn-warning ti-eye' onclick='blogs.view("+ data +")'></a>"+"<a href='/blogedit/" + data + "' title='Edit'  class='btn btn-warning fa fa-cogs'></a>" +
                            "<a href='javascript:' class='btn btn-danger' onclick='blogs.delete("+ data +")'><i class=\"ti-trash\" title=\"Delete\"></a></div>"
                        return str;
                    }
                }
            ],
        });
    }else {
        $("#blogs-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/blogs/',
                method: "GET",
                dataType: "json",
                dataSrc: ""
            },
            columns: [
                {
                    data: "id", name: "Id", title: "Id", orderable: true
                },
                {
                    data: "title", name: "Title", title: "Title", orderable: true
                },
                {
                    data: "image", name: "Image", title: "Image", orderable: true, "render": function (data) {
                        var str = "<img style='width: 103px; height: 130px; border: 1px solid red' src=" + data + ">";
                        return str
                    }
                },
                {
                    data: "dateAdd", name: "Date Add", title: "Date Add", sortable: false
                },
                {
                    data: "dateUpdate", name: "Date Update", title: "Date Update", sortable: false
                },
                {
                    data: "id", name: "Action", title: "Action", "render": function (data) {
                        var str = "<div style='justify-content: center; text-align: center'><a href='javascript:' class='btn btn-warning ti-eye' onclick='blogs.view("+ data +")'></a>"+"<a href='/blogedit/" + data + "' title='Edit'  class='btn btn-warning fa fa-cogs'></a>" +
                            "</div>"
                        return str;
                    }
                }
            ],
        });
    }

};

blogs.save = function () {
    if ($("#formAddEdit").valid()) {
            var blogObj = {};
            blogObj.title = $('#title').val();
            blogObj.image = $('#image').val();
            blogObj.content = $('#content').val();
            $.ajax({
                url: 'http://localhost:8080/api/blog/',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(blogObj),
                done: function () {
                    $("#blogs-datatables").DataTable().ajax.reload();
                },
                success: function (data) {
                    if (data.code === 2) {
                        $("#blogs-datatables").DataTable().ajax.reload();
                        toastr.info('Blog has been created successfully', 'INFORMATION:')

                    } else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }
            });
        blogs.resetForm();
        validator.resetForm();
    }
}

blogs.update = function (){
    if ($("#formAddEdit").valid()){
            var blogObj = {};
            blogObj.id = $('#id').val();
            blogObj.title = $('#title').val();
            blogObj.image = $('#image').val();
            blogObj.content = $('#content').val();
            console.log(blogObj)
            $.ajax({
                url: 'http://localhost:8080/api/blog/',
                method: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(blogObj),
                success: function (data) {
                    if (data.code === 2) {
                        $("#blogs-datatables").DataTable().ajax.reload();
                        toastr.info('Blog has been update successfully', 'INFORMATION:')
                    } else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }
            });
        // blogs.resetForm();
        validator.resetForm();
    }
}

blogs.view = function (id){
    $.ajax({
        url: 'http://localhost:8080/api/blog/' + id,
        method: 'GET',
        dataType: 'json',
        success: function (data){
            $("#formAddEdit")[0].reset();
            $("#modalTitle").html("View Blog");
            $("#title").val(data.title);
            $("#image").append("<img src='"+ data.image +"'/>");
            $("#content").append(data.content);
            $("#dateAdd").val(data.dateAdd);
            $("#blogs-datatables").DataTable().ajax.reload();
            $("#modalAddEdit").modal("show");
        }
    });
};

blogs.delete = function (id) {
    bootbox.confirm({
        message: "Do you want delete this post",
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
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: 'http://localhost:8080/api/blog/' + id,
                    method: 'DELETE',
                    dataType: 'json',
                    success: function () {
                        $("#blogs-datatables").DataTable().ajax.reload();
                        toastr.info("Blog has been deleted successfully", "INFORMATION:")
                    },
                    error: function (jsqXHR, exception) {
                        toastr.info("Error!! Blog not has been delete", "INFORMATION:")
                    }
                });
            }
        }
    });
    validator.resetForm();
};

blogs.resetForm = function () {
    $("#formAddEdit")[0].reset();
    $("#title").val("");
    $("#image").val("");
    $("#content").val("");
    document.getElementsByClassName("note-editable")[0].innerHTML = "";
}

var validator = $("#formAddEdit").validate();

$(document).ready(function () {
    blogs.intTable();
    rates.findStatus();
})