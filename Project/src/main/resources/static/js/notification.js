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
                    $('#meg').append(
                        `<p id="nameSend">${v.name}</p>
                            <span class="msg">${v.email}</span>
                            <span id="dateSend">${v.dateAdd}</span>`
                    );
                });
            }
        }
    });
}