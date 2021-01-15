var orders=orders||{};
var rates=rates||{};
orders.intTable = function () {
    var id;
    $("#orders-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/orders/',
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
                        "<a href='javascript:' class='btn btn-danger' onclick='orders.delete(" + data + ")'><i class=\"ti-trash\" title=\"Delete\"></a>" +
                        "</div>"
                    return str;
                }
            }
        ],
    });
}

orders.get = function (id) {
    $.ajax({
        url: "http://localhost:8080/api/orders/" + id,
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

orders.delete = function (id) {
    bootbox.confirm({
        message: "Do you want to delete this Order",
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
                    url: "http://localhost:8080/api/orders/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function () {
                        $("#orders-datatables").DataTable().ajax.reload();
                        toastr.info('Order has been deleted successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Order not has been delete', 'INFORMATION:')
                    }
                });
            }
        }
    });
};

orders.status = function (id) {
    bootbox.confirm({
        message: "Do you want to change your order status?",
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
                    url: "http://localhost:8080/api/ship/" + id,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        if (data.status!="success"){
                            $("#orders-datatables").DataTable().ajax.reload();
                            toastr.info('Status has been change successfully', 'INFORMATION:')
                        }else{
                            $("#orders-datatables").DataTable().ajax.reload();
                            toastr.info('The status is successful and you cannot replace the status order ', 'INFORMATION:')
                        }
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Status not has been change', 'INFORMATION:')
                    }
                });
            }
        }
    });
};

$(document).ready(function () {
    orders.intTable();
    rates.findStatus();
});