var productLines = {} || productLines;
productLines.listType = function () {
    $.ajax({
        url: 'http://localhost:8080/api/listTypeProductsById/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            var size=data.unshift();
            var index=Math.floor(size/6);
            console.log(size);
            console.log(index);
            for (let i=0;i<=index;i++){
                let str="";
                let j=i+5*i;
                let index2=((i+1)*6-1);
                if (index2>size){
                    index2=size-1;
                }
                for (j;j<=index2;j++){
                    str=str+`<div class="col1">
                                <div class="h_nav">
                                    <ul>
                                        <li>
                                        <a href="/categories"><h4>${data[j].name}</h4></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>`
                }
                $('#menu').append(
                    `<div class="row">
                        ${str}
                    </div>`
                );
            }

        }
    });
}
users.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var user = {};
            user.userName = $('#userName').val();
            user.password = $('#password').val();
            user.fullName = $('#fullName').val();
            user.address = $('#address').val();
            user.phone = $('#phone').val();
            user.email = $('#email').val();
            user.gender = $('#gender').val();
            user.image = $('#image').val();
            user.dateOfBirth = $('#dateOfBirth').val();
            $.ajax({
                url: "http://localhost:8080/api/users/",
                method: "POST", //"POST"
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(user),
                done: function () {
                    $('#modalAddEdit').modal('hide');
                    $("#users-dataTable").DataTable().ajax.reload();
                },
                success: function (data) {
                    if (data.code === 2) {
                        $('#modalAddEdit').modal('hide');
                        $("#users-dataTable").DataTable().ajax.reload();
                        toastr.info('User has been created successfully', 'INFORMATION:')
                    } else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }
            });
        }
    }
}

$(document).ready(function () {
    productLines.listType();
});