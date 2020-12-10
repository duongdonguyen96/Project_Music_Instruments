var rates = {} || rates;
rates.intTable = function () {
    $("#rates-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/rates/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            {
                data: "id", name: "ID", title: "ID", orderable: true
            },
            {
                data: "name", name: "Name", title: "Name", orderable: true,
            },
            {
                data: "email", name: "Email", title: "Email", sortable: false,
                orderable: false,
            },
            {
                data: "status", name: "Status", title: "Status", sortable: false,
                orderable: false,
            },
            {
                data: "dateAdd", name: "Date Add", title: "Date Add", sortable: false,
                orderable: false
            },
            {
                data: "id", name: "Action", title: "Action", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<div style='justify-content: center;text-align: center'><a href='javascript:' onclick='rates.get("+data+")' title='View' data-toggle=\"modal\" data-target=\"#modalAddEdit\" class='btn btn-warning'><i class=\"fa fa-eye\" aria-hidden=\"true\"></i></a> " +
                        "<a href='javascript:' class='btn btn-danger' onclick='rates.delete("+data+")'><i class=\"ti-trash\" title=\"Delete\"></a></div>"
                    return str;
                }
            }
        ]
    });
};


// rates.addNew = function () {
//     $('#modalTitle').html("Add new rates");
//     validator.resetForm();
//     rates.resetForm();
//     $('#modalAddEdit').modal('show');
// };


// rates.save = function () {
//     if ($("#formAddEdit").valid()) {
//         if ($('#id').val() == 0) {
//             var vendorObj = {};
//             vendorObj.name = $('#name').val();
//             vendorObj.address = $('#address').val();
//             vendorObj.email = $('#email').val();
//             vendorObj.phone = $('#phone').val();
//             vendorObj.surrogate = $('#surrogate').val();
//             vendorObj.image = $('#image').val();
//             //
//             $.ajax({
//                 url: "http://localhost:8080/api/rate/",
//                 method: "POST",
//                 dataType: "json",
//                 contentType: "application/json",
//                 data: JSON.stringify(vendorObj),
//                 done: function () {
//                     $('#modalAddEdit').modal('hide');
//                     $("#rates-datatables").DataTable().ajax.reload();
//                 },
//                 success: function (data) {
//                     if(data.code === 2){
//                         $('#modalAddEdit').modal('hide');
//                         $("#rates-datatables").DataTable().ajax.reload();
//                         toastr.info('Vendor has been created successfully', 'INFORMATION:')
//                     }else {
//                         data.stringListMessage.map(e =>toastr.error(e));
//                     }
//                 }
//             });
//         } else {
//             var vendorObj = {};
//             vendorObj.name = $('#name').val();
//             vendorObj.address = $('#address').val();
//             vendorObj.email = $('#email').val();
//             vendorObj.phone = $('#phone').val();
//             vendorObj.surrogate = $('#surrogate').val();
//             vendorObj.image = $('#image').val();
//             vendorObj.id = $('#id').val();
//             vendorObj.dateUpdate = new Date();
//             //
//             $.ajax({
//                 url: "http://localhost:8080/api/rate/",
//                 method: "PUT",
//                 dataType: "json",
//                 contentType: "application/json",
//                 data: JSON.stringify(vendorObj),
//                 success: function (data) {
//                     if(data.code === 2){
//                         $('#modalAddEdit').modal('hide');
//                         $("#rates-datatables").DataTable().ajax.reload();
//                         toastr.info('Vendor has been updated successfully', 'INFORMATION:')
//                     }else {
//                         data.stringListMessage.map(e =>toastr.error(e));
//                     }
//
//                 }
//             });
//         }
//         validator.resetForm();
//     }
// };

rates.delete = function (id) {
    bootbox.confirm({
        message: "Do you want to delete this Rates",
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
                    url: "http://localhost:8080/api/rate/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function () {
                        $("#rates-datatables").DataTable().ajax.reload();
                        toastr.info('Rate has been deleted successfully', 'INFORMATION:')
                    },
                    error:function (jqXHR,exception){
                        toastr.error('Error!! Rate not has been delete', 'INFORMATION:')
                    }
                });
            }
        }
    });
};

rates.get = function (id) {
    $.ajax({
        url: "http://localhost:8080/api/rate/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#formAddEdit')[0].reset();
            $('#modalTitle').html("View rate");
            $('#name').val(data.name);
            $('#email').val(data.email);
            $('#content').val(data.content);
            $('#modalAddEdit').modal('show');
        }
    });
};

// rates.resetForm = function () {
//     $('#formAddEdit')[0].reset();
//     $('#id').val(0);
//     $('#name').val("");
//     $('#address').val("");
//     $('#phone').val("");
//     $('#email').val("");
//     $('#surrogate').val("");
//     $('#image').val("");
// }

// var validator = $( "#formAddEdit" ).validate();

$(document).ready(function () {
    rates.intTable();
});
