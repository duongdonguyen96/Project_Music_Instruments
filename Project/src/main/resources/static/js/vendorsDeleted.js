var vendors = {} || vendors;
var rates = {} || rates;

vendors.intTable = function () {
    var id;
    var role=$('#role').val();
    if (role==="ADMIN"){
        $("#vendors-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/vendorsDeleted/',
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
                        var str ="<div><a href='javascript:' onclick='vendors.getVendorDeleted("+id+")' title='View'>"+data+"</a></div>" ;
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
                    data: "dateDelete", name: "Date Delete", title: "Date Delete", sortable: false,
                    orderable: false
                },
                {
                    data: "id", name: "Action", title: "Action", sortable: false,
                    orderable: false, "render": function (data) {
                        var str = "<div style='justify-content: center;text-align: center'>" +
                            "<a href='javascript:' class='btn btn-warning' title='Undo' onclick='vendors.undo("+data+")'><i class=\"fa fa-undo\" aria-hidden=\"true\" ></i></a> " +
                            "<a href='javascript:' onclick='vendors.delete("+data+")' title='Delete' class='btn btn-danger'><i class=\"ti-trash\" title=\"Delete\"></a>" +
                            "</div>"
                        return str;
                    }
                }
            ],
        });
    }else {
        $("#vendors-datatables").DataTable({
            ajax: {
                url: 'http://localhost:8080/api/vendorsDeleted/',
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
                        var str ="<div><a href='javascript:' onclick='vendors.getVendorDeleted("+id+")' title='View'>"+data+"</a></div>" ;
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
                {
                    data: "dateDelete", name: "Date Delete", title: "Date Delete", sortable: false,
                    orderable: false
                },
            ],
        });
    }
};

vendors.delete = function (id) {
    bootbox.confirm({
        message: "Do you want to permanently delete the Vendor",
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
                    url: "http://localhost:8080/api/vendorDeleted/" + id,
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


vendors.undo= function (id) {
    bootbox.confirm({
        message: "Do you want to undo this Vendor",
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
                    url: "http://localhost:8080/api/vendorUndo/" + id,
                    method: "PUT",
                    dataType: "json",
                    success: function () {
                        $("#vendors-datatables").DataTable().ajax.reload();
                        toastr.info('Vendor has been undo successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Vendor not has been undo', 'INFORMATION:')
                    }
                });
            }
        }
    });
};
vendors.getVendorDeleted = function (id) {
    $.ajax({
        url: "http://localhost:8080/api/vendorDeleted/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            $('#modalTitle').html("View vendor");
            $('#id').val(data.id);
            $('#dateAdd').val(data.dateAdd);
            $('#dateUpdate').val(data.dateUpdate);
            $('#dateDelete').val(data.dateDelete);
            $('#name').val(data.name);
            $('#address').val( data.address);
            $('#email').val(data.email);
            $('#surrogate').val(data.surrogate);
            $('#phone').val( data.phone );
            $('#imageHtml').html(
                `<img class="form-control" src="${data.image}"
                           name="image" id="image" style="width: 600px;height: 600px">`
            );
            $('.form-control').attr('disabled','disable');
            $('#modalAddEdit').modal('show');
        }
    });
};
$(document).ready(function () {
    vendors.intTable();
    rates.findStatus();
});
