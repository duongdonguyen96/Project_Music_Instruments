var productLines = {} || productLines;
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
                if (index2>size){
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
                        `<li><a href="/categories/${v.id}">${v.name}</a></li>`
                    );
                });
            }

        }
    });
}

$(document).ready(function () {
    productLines.listType();
});