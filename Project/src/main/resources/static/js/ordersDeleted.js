var orders=orders||{};
var rates=rates||{};
orders.intTableDeleted = function () {
    var id;
    $("#orders-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/ordersDelete/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            {
                data: "id", name: "ID", title: "ID", orderable: true, "render": function (data) {
                    id = data;
                    return id;
                },
            },
            {
                data: "user", name: "Name", title: "Name", sortable: true,
                orderable: false, "render": function (data) {
                    var str = data.fullName
                    return str;
                },
            },
            {
                data: "user", name: "Email", title: "Email", sortable: true,
                orderable: false, "render": function (data) {
                    var str = `<a href="mailto:${data.email}" title="Send mail">${data.email}</a>`;
                    return str;
                },
            },
            {
                data: "user", name: "Phone", title: "Phone", sortable: true,
                orderable: false, "render": function (data) {
                    var str = data.phone
                    return str;
                },
            },
            {
                data: "status", name: "Status", title: "Status", sortable: true,
                orderable: false,"render": function (data) {
                    var str = `<a href="#" title="Change status" onclick="orders.status(${id})">${data}</a>`;
                    return str;
                }
            },
            {
                data: "id", name: "Action", title: "Action", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<div style='justify-content: center;text-align: center'>" +
                        "<a href='javascript:' onclick='orders.get("+data+")' title='View' data-toggle=\"modal\" data-target=\"#modalAddEdit\" class='btn btn-warning'><i class=\"fa fa-eye\" aria-hidden=\"true\"></i></a> " +
                        "<a href='javascript:' class='btn btn-warning' title='Undo' onclick='orders.undo("+data+")'><i class=\"fa fa-undo\" aria-hidden=\"true\" ></i></a> " +
                        "</div>"
                    return str;
                }
            }
        ],
    });
}

orders.get = function (id) {
    $.ajax({
        url: "http://localhost:8080/api/ordersDelete/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            $('.form-control').removeAttr('disabled');
            $('#modalTitle').html("View order");
            $('.hideHtml').show();
            $('#save').hide();
            $('.form-control').attr('disabled','disable');
            var total=0;
            var str="";
            $.each(data.orderDetailList, function (i, v) {
                total=total+v.quantity*v.price;
                str=str+"Name product:\t"+v.product.name+"\t-Price: $ "+v.price+"\t-Qty:\t"+v.quantity+"\n";
            });
            str=str+"Total: $ "+total;
            $('#orderDetail').val(str);
            $('#id').val(data.id);
            $('#status').val(data.status);
            $('#name').val(data.user.fullName);
            $('#email').val(data.user.email);
            $('#phone').val( data.user.phone );

            $( "#formAddEdit" ).validate().resetForm();
            $('#modalAddEdit').modal('show');
        }
    });
};
orders.undo = function (id) {
    bootbox.confirm({
        message: "Do you want to undo order?",
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
                    url: "http://localhost:8080/api/undo/" + id,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        $("#orders-datatables").DataTable().ajax.reload();
                        toastr.info('Order has been undo successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Order not has been undo', 'INFORMATION:')
                    }
                });
            }
        }
    });
};
$(document).ready(function () {
    orders.intTableDeleted();
    rates.findStatus();
});