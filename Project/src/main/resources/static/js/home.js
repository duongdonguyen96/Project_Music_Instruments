var banners = {} || banners;
var products = {} || products;
var blogs = {} || blogs;
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
products.new4products = function () {
    $.ajax({
        url: 'http://localhost:8080/api/newFourProducts/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#new4products').empty();
            $.each(data, function (i, v) {
                $('#new4products').append(
                    `<li>
                        <a href="/details/${v.id}"><img src="${v.image}" class="img-responsive" alt=""></a>
                        <div class="special-info grid_1 simpleCart_shelfItem">
                            <h5>${v.name}</h5>
                            <div class="item_add"><span class="item_price">
                                <h6 style="margin: 10px 0">ONLY $ ${v.price}</h6>
                                </span>
                            </div>
                        <div class="item_add">
                        <span class="item_price">
                        <a href="#0" class="cd-add-to-cart js-cd-add-to-cart" data-price="25.99">add to cart</a>
                        </span>
                        </div>
                        </div>
                    </li>`
                );
            });
            $('#new4products').append(
                `<div class="clearfix"> </div>`
            )
        }
    })
}
blogs.new4blogs = function () {
    $.ajax({
        url: 'http://localhost:8080/api/newFourBlogs/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            if ($('#new4blogs').empty()){
                $.each(data, function (i, v) {
                    var  title=v.title
                    if (title.length>20) {
                        title = v.title.substring(0, 20) + '...'
                    }
                    $('#new4blogs').append(
                        `<li>
                        <a href="details.html"><img src="${v.image}" class="img-responsive" alt=""></a>
                        <div class="special-info grid_1 simpleCart_shelfItem">
                            <h5 class="blog-title">${title}</h5>
                            <div class="item_add blog-btn-read">
                                <span class="item_price">
                                <a href="/news/${v.id}" class="cd-add-to-cart js-cd-add-to-cart button-cart-home" data-price="25.99">Read more
                                </a>
                                </span>
                            </div>
                        </div>
                    </li>`
                    );
                });
            }
        }
    })
}
//Page Blogs
blogs.new8blogs = function () {
    $.ajax({
        url: 'http://localhost:8080/api/newEightBlogs/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            if ($('#new8blogs').empty()){
                var size=data.unshift();
                var index1=Math.floor(size/4);
                for (let i=0;i<=index1;i++){
                    let str="";
                    let j=i+3*i;
                    let index2=((i+1)*4-1);
                    if (index2>=size){
                        index2=size-1;
                    }
                    for (j;j<=index2;j++){
                        var  content=data[j].title
                        if (content.length>20) {
                            content = content.substring(0, 20) + '...'
                        }
                        str=str+
                            `<li>
                            <a href="details.html"><img src="${data[j].image}" class="img-responsive" alt=""></a>
                            <div class="special-info grid_1 simpleCart_shelfItem">
                                <h5 class="blog-title">${content}</h5>
                                <div class="item_add blog-btn-read">
                                    <span class="item_price">
                                        <a href="/news/${data[j].id}" class="cd-add-to-cart js-cd-add-to-cart button-cart-home" data-price="25.99">Read more
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </li>`
                    }
                    $('#new8blogs').append(
                        `<div class="container">
                            <div class="specia-top" >
                                <ul class="grid_2" >
                                ${str}
                                </ul>
                            </div>
                        </div>`
                    );
                }
            }
        }
    })
}

$(document).ready(function () {
    banners.bannerList();
    products.new4products();
    blogs.new4blogs();
    blogs.new8blogs();
});