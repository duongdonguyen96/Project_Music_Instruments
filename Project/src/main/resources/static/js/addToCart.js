var orders={}||orders;
orders.addToCart=function (id) {
    $.ajax({
        url: 'http://localhost:8080/api/addCart/'+id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            var total=0;
            $("#simpleCart_quantity").html(data.orderDetailList.unshift());
            $.each(data.orderDetailList, function (i, v) {
                total=total+v.quantity*v.price;
                console.log(total+"lan1")
                $("#simpleCart_total").html("$"+total);
            });
            toastr.info('Add products to cart', 'INFORMATION:')
        }
    });
}

orders.showCart=function () {
    if ($("#addCart").empty()){
        var id=$("#id").val();
        $("#addCart").html(
            `<a href="#" onclick="orders.addToCart(${id})">buy</a>`
        )
    }
    $.ajax({
        url: 'http://localhost:8080/api/showCart/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            var total=0;
            $("#simpleCart_quantity").html(data.orderDetailList.unshift());
            $("#sl").html(data.orderDetailList.unshift());
            $.each(data.orderDetailList, function (i, v) {
                total=total+v.quantity*v.price;
                $("#simpleCart_total").html("$"+total);
                $("#total1").html(total);
                $("#total2").html(total);
                $("#listOrder").append(
                    `<div class="cart-header">
                        <div class="close1" onclick="orders.deleteProduct(${v.product.id})"></div>
                        <div class="cart-sec simpleCart_shelfItem">
                            <div class="cart-item cyc">
                                <img src="${v.product.image}" class="img-responsive" alt=""/>
                            </div>
                            <div class="cart-item-info">
                                <h3><a href="#">${v.product.name}</a><span>Model No: ${v.product.id}</span></h3>
                                <ul class="qty">
                                    <li><p>Size : ${v.product.size}</p></li>
                                    <li><p>Weight : ${v.product.weight}</p></li>
                                    <li><p>Color : ${v.product.color}</p></li>
                                    <li><p>Qty : ${v.quantity}</p></li>
                                    <li><p>Price : ${v.product.price}</p></li>
                                </ul>
                                <div class="delivery">
                                    <p>Total :$ ${v.product.price*v.quantity} </p>
                                    <span>Delivered in 2-3 bussiness days</span>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>`
                );
            });
        }
    });
}

orders.deleteProduct=function (id) {
    $.ajax({
        url: 'http://localhost:8080/api/deleteProduct/' + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            location.reload();
            toastr.info('Delete products to cart', 'INFORMATION:')
        }
    });
}

orders.deleteAllProduct=function () {
    $.ajax({
        url: 'http://localhost:8080/api/deleteALlProduct/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            toastr.info('Delete all products to cart', 'INFORMATION:')
            location.reload();
        }
    });
}

orders.checkoutCart=function (){
    $.ajax({
        url: 'http://localhost:8080/api/checkoutCart/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            location.reload();
            toastr.info('Checkout cart success', 'INFORMATION:')

        }
    });
}
$(document).ready(function () {
    orders.showCart();
});
