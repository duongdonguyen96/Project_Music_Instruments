var productLines = {} || productLines;
var vendors = {} || vendors;
var orders={}|orders;
//productLines
productLines.listType = function () {
    $.ajax({
        url: 'http://localhost:8080/api/listTypeProductsById/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            var size=data.unshift();
            var index1=Math.floor(size/6);
            for (let i=0;i<=index1;i++){
                let str="";
                let j=i+5*i;
                let index2=((i+1)*6-1);
                if (index2>=size){
                    index2=size-1;
                }
                for (j;j<=index2;j++){
                    str=str+`<div class="col1">
                                <div class="h_nav">
                                    <ul>
                                        <li>
                                        <a href="/categories/${data[j].id}"><h4>${data[j].name}</h4></a>
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
            if ($('#type').empty()){
                var size=data.unshift();
                var index3=Math.floor(size/3);
                for (let k=0;k<=index3;k++){
                    let substr="";
                    let l=k+2*k;
                    let index4=((k+1)*3-1);
                    if (index4>=size){
                        index4=size-1;
                    }
                    for (l;l<=index4;l++){
                        if(l%3===0) {
                            substr = substr + `<div class="col-md-4 arriv-left2">
                                    <img src="${data[l].image}" class="img-responsive-category img-responsive" alt="">
                                    <div class="arriv-info3">
                                        <div class="crt-btn">
                                            <a href="/categories/${data[l].id}">${data[l].name}</a>
                                        </div>
                                    </div>
                                </div>`
                        }
                        if (l%3===1) {
                            substr = substr + `<div class="col-md-4 arriv-middle">
                                    <img src="${data[l].image}" class="img-responsive-category img-responsive" alt="">
                                    <div class="arriv-info3">
                                        <div class="crt-btn">
                                            <a href="/categories/${data[l].id}">${data[l].name}</a>
                                        </div>
                                    </div>
                                </div>`
                        }
                        if (l%3===2){
                            substr=substr+`<div class="col-md-4 arriv-right2">
                                    <img src="${data[l].image}" class="img-responsive-category img-responsive" alt="">
                                    <div class="arriv-info3">
                                        <div class="crt-btn">
                                            <a href="/categories/${data[l].id}">${data[l].name}</a>
                                        </div>
                                    </div>
                                </div>`
                        }
                    }
                    $('#type').append(
                        `<div class="arriv-top">
                        ${substr}
                        <div class="clearfix"> </div>
                    </div>`
                    );
                }
            }
            if ($('#allType').empty()){
                $.each(data, function (i, v) {
                    $('#allType').append(
                        `<li><a href="javascript:" onclick="productLines.listProducts(${v.id})">${v.name}</a></li>`
                    );
                    $('#allTypeDetail').append(
                        `<li><a href="/categories/${v.id}">${v.name}</a></li>`
                    );
                });
            }
        }
    });
}

productLines.listProducts=function(id,page){
    $("#search").html(`<input type="button" value="" onclick="return productLines.listProducts(${id},1)" >`);
    if (page==null){
        page=1;
    }
    var search = $('#str').val();
    $.ajax({
        url: 'http://localhost:8080/api/typeProduct/' +id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#nameTypeVendor').html(data.name)
            $.ajax({
                url: 'http://localhost:8080/api/productsByIdTypeProduct/'+id+'?page='+page+"&search="+search,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    let totalPage = parseInt(data.totalPages);
                    $('#pageable').empty('');
                    for(let i =0; i<totalPage; i++){
                        if(data.pageable.pageNumber===i){
                            $('#pageable').append(`<li class="page-item disabled"><a class="page-link" href="#">${i+1}</a></li>`)
                        }else {
                            $('#pageable').append(`<li class="page-item"><a class="page-link" href="#" onclick="productLines.listProducts(${id},${i+1})">${i+1}</a></li>`)
                        }

                    }
                    $('#listProduct').html("")
                    let size=data.content.unshift();
                    $('#sl').html(size)
                    let index=Math.floor(size/4);
                    for (let i=0;i<=index;i++){
                        let str="";
                        let j=i+3*i;
                        let index2=((i+1)*4-1);
                        if (index2>=size){
                            index2=size-1;
                        }
                        for (j;j<=index2;j++){
                            str=str+
                                `<div class="grid1_of_4">
                            <div class="content_box"><a href="/details/${data.content[j].id}">
                                <img src="${data.content[j].image}" class="img-responsive" alt=""/>
                                </a>
                                <h4><a href="/details/${data.content[j].id}"> ${data.content[j].name}</a></h4>
                                <p>It is a long established fact that</p>
                                <div class="grid_1 simpleCart_shelfItem">
                                    <div class="item_add"><span class="item_price"><h6>ONLY $${data.content[j].price}</h6></span></div>
                                    <div class="item_add"><span class="item_price"><a href="#" onclick="orders.addToCart(${data.content[j].id})">add to cart</a></span></div>
                                </div>
                            </div>
                        </div>`
                        }
                        $('#listProduct').append(
                            `<div class="grids_of_4">
                                 ${str}
                                 <div class="clearfix"></div>
                            </div>`
                        );
                    }
                }
            })
        }
    });
}

productLines.listProductsById=function(page){
    $("#search").html("<input type=\"button\" value=\"\" onclick=\"return productLines.listProductsById(1)\">");
    let search = $('#str').val();
    if ($('#idType').val()){
    var idType=$('#idType').val();
    if (page==null){
        page=1;
    }
    if (idType!=""){
        $.ajax({
            url: 'http://localhost:8080/api/productsByIdTypeProduct/'+idType+'?page='+page+"&search="+search,
            method: "GET",
            dataType: "json",
            success: function (data) {
                let totalPage = parseInt(data.totalPages);
                $('#pageable').empty('');
                for(let i =0; i<totalPage; i++){
                    if(data.pageable.pageNumber===i){
                        $('#pageable').append(`<li class="page-item disabled"><a class="page-link" href="#">${i+1}</a></li>`)
                    }else {
                        $('#pageable').append(`<li class="page-item"><a class="page-link" href="#" onclick="productLines.listProductsById(${i+1})">${i+1}</a></li>`)
                    }

                }
                $('#listProduct').html("");
                let size=data.content.unshift();
                $('#sl').html(size)
                let index=Math.floor(size/4);
                for (let i=0;i<=index;i++){
                    let str="";
                    let j=i+3*i;
                    let index2=((i+1)*4-1);
                    if (index2>=size){
                        index2=size-1;
                    }
                    for (j;j<=index2;j++){
                        str=str+
                            `<div class="grid1_of_4">
                            <div class="content_box"><a href="/details/${data.content[j].id}">
                                <img src="${data.content[j].image}" class="img-responsive" alt=""/>
                                </a>
                                <h4><a href="/details/${data.content[j].id}"> ${data.content[j].name}</a></h4>
                                <p>It is a long established fact that</p>
                                <div class="grid_1 simpleCart_shelfItem">
                                    <div class="item_add"><span class="item_price"><h6>ONLY $${data.content[j].price}</h6></span></div>
                                    <div class="item_add"><span class="item_price"><a href="#" onclick="orders.addToCart(${data.content[j].id})">add to cart</a></span></div>
                                </div>
                            </div>
                        </div>`
                    }
                    $('#listProduct').append(
                        `<div class="grids_of_4">
                        ${str}
                        <div class="clearfix"></div>
                    </div>`
                    );
                }
            }
        })
    }
    }
}

//vendors
vendors.listVendors= function () {
    if ($('#allVendor').empty()){
    $.ajax({
        url: 'http://localhost:8080/api/listVendorsById/',
        method: "GET",
        dataType: "json",
        success: function (data) {

                $.each(data, function (i, v) {
                    $('#allVendor').append(
                        `<li><a href="javascript:" onclick="return vendors.listProducts(${v.id})">${v.name}</a></li>`
                    );
                    $('#allVendorDetail').append(
                        `<li><a href="/vendors/${v.id}">${v.name}</a></li>`
                    );
                });
            }
        });
    }
}

vendors.listProducts=function(id,page){
    $("#search").html(`<input type="button" value="" onclick="return vendors.listProducts(${id},1)" >`);
    if (page==null){
        page=1;
    }
    var search = $('#str').val();
    $.ajax({
        url: 'http://localhost:8080/api/vendor/' +id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#nameTypeVendor').html(data.name)
            $.ajax({
                url: 'http://localhost:8080/api/productsByVendorId/'+id+'?page='+page+"&search="+search,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    let totalPage = parseInt(data.totalPages);
                    $('#pageable').empty('');
                    for(let i =0; i<totalPage; i++){
                        if(data.pageable.pageNumber===i){
                            $('#pageable').append(`<li class="page-item disabled"><a class="page-link" href="#">${i+1}</a></li>`)
                        }else {
                            $('#pageable').append(`<li class="page-item"><a class="page-link" href="#" onclick="productLines.listProducts(${id},${i+1})">${i+1}</a></li>`)
                        }

                    }
                    $('#listProduct').html("")
                    let size=data.content.unshift();
                    $('#sl').html(size)
                    let index=Math.floor(size/4);
                    for (let i=0;i<=index;i++){
                        let str="";
                        let j=i+3*i;
                        let index2=((i+1)*4-1);
                        if (index2>=size){
                            index2=size-1;
                        }
                        for (j;j<=index2;j++){
                            str=str+
                                `<div class="grid1_of_4">
                            <div class="content_box"><a href="/details/${data.content[j].id}">
                                <img src="${data.content[j].image}" class="img-responsive" alt=""/>
                                </a>
                                <h4><a href="/details/${data.content[j].id}"> ${data.content[j].name}</a></h4>
                                <p>It is a long established fact that</p>
                                <div class="grid_1 simpleCart_shelfItem">
                                    <div class="item_add"><span class="item_price"><h6>ONLY $${data.content[j].price}</h6></span></div>
                                    <div class="item_add"><span class="item_price"><a href="#" onclick="orders.addToCart(${data.content[j].id})">add to cart</a></span></div>
                                </div>
                            </div>
                        </div>`
                        }
                        $('#listProduct').append(
                            `<div class="grids_of_4">
                                 ${str}
                                 <div class="clearfix"></div>
                            </div>`
                        );
                    }
                }
            })
        }
    });
}

vendors.listProductsById=function(page){
    $("#search").html("<input type=\"button\" value=\"\" onclick=\"return vendors.listProductsById(1)\">");
    let search = $('#str').val();
    if ($('#idVendor').empty()){
    var idVendor=$('#idVendor').val();
    if (page==null){
        page=1;
    }
    if (idVendor!=""){
        $.ajax({
            url: 'http://localhost:8080/api/vendor/' + idVendor,
            method: "GET",
            dataType: "json",
            success: function (data) {
                $('#nameTypeVendor').html(data.name);

                $.ajax({
                    url: 'http://localhost:8080/api/productsByVendorId/' + idVendor + '?page=' + page + "&search=" + search,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        let totalPage = parseInt(data.totalPages);
                        $('#pageable').empty('');
                        for (let i = 0; i < totalPage; i++) {
                            if (data.pageable.pageNumber === i) {
                                $('#pageable').append(`<li class="page-item disabled"><a class="page-link" href="#">${i + 1}</a></li>`)
                            } else {
                                $('#pageable').append(`<li class="page-item"><a class="page-link" href="#" onclick="productLines.listProductsById(${i + 1})">${i + 1}</a></li>`)
                            }

                        }
                        $('#listProduct').html("");
                        let size = data.content.unshift();
                        $('#sl').html(size)
                        let index = Math.floor(size / 4);
                        for (let i = 0; i <= index; i++) {
                            let str = "";
                            let j = i + 3 * i;
                            let index2 = ((i + 1) * 4 - 1);
                            if (index2 >= size) {
                                index2 = size - 1;
                            }
                            for (j; j <= index2; j++) {
                                str = str +
                                    `<div class="grid1_of_4">
                            <div class="content_box"><a href="/details/${data.content[j].id}">
                                <img src="${data.content[j].image}" class="img-responsive" alt=""/>
                                </a>
                                <h4><a href="/details/${data.content[j].id}"> ${data.content[j].name}</a></h4>
                                <p>It is a long established fact that</p>
                                <div class="grid_1 simpleCart_shelfItem">
                                    <div class="item_add"><span class="item_price"><h6>ONLY $${data.content[j].price}</h6></span></div>
                                    <div class="item_add"><span class="item_price"><a href="#" onclick="orders.addToCart(${data.content[j].id})">add to cart</a></span></div>
                                </div>
                            </div>
                        </div>`
                            }
                            $('#listProduct').append(
                                `<div class="grids_of_4">
                        ${str}
                        <div class="clearfix"></div>
                    </div>`
                            );
                        }
                    }
                });
            }
        });
    }
    }
}

$(document).ready(function () {
    productLines.listType();
    if ($("#idVendor").val()===""){
        productLines.listProductsById();
    }else {
        vendors.listProductsById();
    }
    vendors.listVendors();
});