var banners = {} || banners;
banners.bannerList = function () {
    $.ajax({
        url: 'http://localhost:8080/api/banners/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data.unshift()===0){
                $('#banner').hide();
            }else {
                $('#banner').show();
                $('#slides').empty();
                $('#index').empty();
                $.each(data, function (i, v) {
                    if (i === 0) {
                        $('#index').append(
                            `<li data-target="#myCarousel" data-slide-to="${0}" class="active"></li>`
                        );
                        $('#slides').append(
                            `<div class="item active">
                            <img src="${v.image}" alt="New York" width="100%" height="100%">
                            <div class="carousel-caption">
                                <h3>${v.title}</h3>
                            </div>
                         </div>`
                        );
                    }else {
                        $('#index').append(
                            `<li data-target="#myCarousel" data-slide-to="${i}"></li>`
                        );
                        $('#slides').append(
                            `<div class="item">
                            <img src="${v.image}" alt="New York" width="100%" height="100%">
                            <div class="carousel-caption">
                                <h3>${v.title}</h3>
                            </div>
                         </div>`
                        );
                    };
                    if (data.unshift()===1){
                        $('.go').hide();
                    }else {
                        $('.go').show();
                    }
                });
            }
        }
    });
};

$(document).ready(function () {
    banners.bannerList();
});