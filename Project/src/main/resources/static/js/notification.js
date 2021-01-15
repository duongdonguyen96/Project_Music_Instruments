rates.findStatus = function () {
    $.ajax({
        url: "http://localhost:8080/api/ratesStatus/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('.amountNotification').html(data.unshift());
            if (data.unshift()==0){
                $('#meg').html("");
            }else {
                $('#meg').html("");
                $.each(data, function (i, v) {
                    if (i<=5){
                        var  content=v.content
                        if (content.length>20){
                            content=v.content.substring(0,20)+'...'
                        }
                        $('#meg').append(
                            `<a href="/rates" class="notify-item">
                        <div class="notify-thumb"  id="meg">
                            <p id="nameSend">${v.name}</p>
                            <span class="msg">${v.email}</span>
                            <span id="dateSend">${v.dateAdd}</span>
                        </div>
                        <div class="notify-text">
                            <span style="color: blue;font-size: 0.8rem">${content}</span>
                        </div>
                    </a><br>`
                        );
                    }
                });
            }
        }
    });
}

employees.findUser = function () {
    $.ajax({
        url: "http://localhost:8080/api/employeesName/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $("#avatar").src=data.image
        }
    });
}
