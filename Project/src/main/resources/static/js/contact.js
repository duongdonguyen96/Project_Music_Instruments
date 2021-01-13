
var rates = rates || {};
rates.create = function () {
    if ($("#formRates").valid()) {
        var rateObj ={};
        rateObj.name = $('#name').val();
        rateObj.email = $('#mail').val();
        rateObj.content = $('#content').val();
        $.ajax({
            url: "http://localhost:8080/api/rate/",
            method: "POST",
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(rateObj),
            success: function (data) {
                if(data.code === 2){
                    toastr.info('Rate has been created successfully', 'INFORMATION:')
                    rates.resetForm();
                }else {
                    data.stringListMessage.map(e =>toastr.error(e));
                }
            }
        });
        return false;
    }
}
rates.resetForm = function () {
    $('#formRates')[0].reset();
    $('#name').val("");
    $('#email').val("");
    $('#content').val("");
}
rates.validation=function (){
    $('#formRates').validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 100,
            },
            email:{
                required:true,
            },
            content:{
                required:true,
                minlength: 10,
                maxlength: 500,
            },
        },
        messages: {
            name:{
                required:"Please enter input your name",
                minlength:"Enter names of at least 2 characters",
                maxlength:"Enter names of up to 100 characters"
            },
            email:{
                required:"Please enter input email",
            },
            content:{
                required:"Please enter input contents",
            },
        }
    });
}
$(document).ready(function () {
    rates.validation();
});
