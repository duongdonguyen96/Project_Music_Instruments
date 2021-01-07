var banners = {} || banners;
banners.bannerList = function () {
    $.ajax({
        url: 'http://localhost:8080/api/banners/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#slides').empty();
            $('#index').empty();
            $.each(data, function (i, v) {
                if (i === 0) {
                    $('#index').append(
                        `<li data-target="#myCarousel" data-slide-to="${0}" class="active"></li>`
                    );
                    $('#slides').append(
                        `<div class="item active">
                            <img src="${v.image}" alt="New York" width="100%" height="400">
                            <div class="carousel-caption">
                                <h3>New York</h3>
                                <p>The atmosphere in New York is lorem ipsum.</p>
                            </div>
                         </div>`
                    );

                }else {
                    $('#index').append(
                        `<li data-target="#myCarousel" data-slide-to="${i}"></li>`
                    );
                    $('#slides').append(
                        `<div class="item">
                            <img src="${v.image}" alt="New York" width="100%" height="400">
                            <div class="carousel-caption">
                                <h3>New York</h3>
                                <p>The atmosphere in New York is lorem ipsum.</p>
                            </div>
                         </div>`
                    );
                };
            });
        }
    });
};
$(document).ready(function () {
    banners.bannerList();
});