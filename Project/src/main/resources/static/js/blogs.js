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
                        var str = "<div style='justify-content: center; text-align: center'><a href='javascript:' class='btn btn-warning ti-eye' onclick='blogs.view("+ data +")' data-toggle=\"modal\" data-target=\"#modalAddEdit\"></a>"+
                            "<a href='/blogedit/" + data + "' title='Edit'  class='btn btn-warning fa fa-cogs' ></a>" +
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
                        var str = "<div style='justify-content: center; text-align: center'>" +
                            "<a href='javascript:' class='btn btn-warning ti-eye' onclick='blogs.view("+ data +")' data-toggle=\"modal\" data-target=\"#modalAddEdit\"></a>"+
                            "<a href='/blogedit/" + data + "' title='Edit'  class='btn btn-warning fa fa-cogs'></a>" +
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
        blogObj.image = $('#base64').val();
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
                    $( "#formAddEdit" ).validate().resetForm();
                    blogs.resetForm();
                } else {
                    data.stringListMessage.map(e => toastr.error(e));
                }
            }
        });

        $( "#formAddEdit" ).validate().resetForm();
    }
}

blogs.update = function (){
    if ($("#formAddEdit").valid()){
        var blogObj = {};
        blogObj.title = $('#title').val();
        blogObj.image = $('#base64').val();
        blogObj.content = $('#content').val();
        blogObj.id = $('#id').val();
        blogObj.dateAdd = $('#dateAdd').val();
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
        $( "#formAddEdit" ).validate().resetForm();
    }
}
blogs.get = function (){
    var id = $('#id').val();
    $.ajax({
        url: 'http://localhost:8080/api/blog/' + id,
        method: 'GET',
        dataType: 'json',
        success: function (data){
            $('#base64').val(data.image);
        }
    });
};

blogs.view = function (id){
    $.ajax({
        url: 'http://localhost:8080/api/blog/' + id,
        method: 'GET',
        dataType: 'json',
        success: function (data){
            $("#formAddEdit")[0].reset();
            $("#modalTitle").html("View Blog");
            // $('#id').val(data.id);
            // $('#dateAdd').val(data.dateAdd);
            // $('#dateUpdate').val(data.dateUpdate);
            $("#title").val(data.title);
            $("#image").html(`<img class="form-control" src="${data.image}">`);
            $("#content").html(data.content);
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
    $('#id').val(0);
    $("#title").val("");
    $("#image").val("");
    $("#content").val("");
    document.getElementsByClassName("note-editable")[0].innerHTML = "";
}

blogs.validation = function (){
    $('#formAddEdit').validate({
        rule: {
            title: {
                required: true,
                minlength: 20,
                maxlength: 1000,
            },
            image:{
                required:true
            },
            content: {
                required: true,
                minlength: 100,
                maxlength: 10000,
            },
        },
        message:{
            title:{
                required:"Please enter input title blog",
                minlength:"Enter names of at least 20 characters",
                maxlength:"Enter names of up to 1000 characters"
            },
            image:{
                required:"Please upload the image",
            },
            content:{
                required:"Please enter input content blog",
                minlength:"Enter names of at least 100 characters",
                maxlength:"Enter names of up to 10000 characters"
            },
        }
    });
}

// var validator = $("#formAddEdit").validate();

$(document).ready(function () {
    blogs.intTable();
    rates.findStatus();
    blogs.validation();
    blogs.get();
})