var productLines = {} || productLines;
var vendors = {} || vendors;
var rates = {} || rates;
var canvas={}||canvas;

var listType;
var listCountProductByType;

var listVendor;
var listCountProductByVendor;

var hexType;
var hexVendor;

productLines.listType = function () {
    $.ajax({
        url: 'http://localhost:8080/api/listTypeProductsById/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            listCountProductByType=new Array(data.unshift)
            hexType=new Array(data.unshift);
            listType=new Array(data.unshift);
            $.each(data, function (i, v) {
                hexType[i]='#'+((Math.random()/i)*0xFFFFFF<<0).toString(16);
                listType[i]=v.name;
                $.ajax({
                    url: 'http://localhost:8080/api/productsByIdType/'+data[i].id,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        listCountProductByType[i]=data.unshift();
                        canvas.panelType();
                    }
                });
            });

        }
    });
}

vendors.listVendor = function () {
    $.ajax({
        url: 'http://localhost:8080/api/listVendorsById/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            listCountProductByVendor=new Array(data.unshift)
            hexVendor=new Array(data.unshift);
            listVendor=new Array(data.unshift);
            $.each(data, function (i, v) {
                hexVendor[i]='#'+((Math.random()/i)*0xFFFFFF<<0).toString(16);
                listVendor[i]=v.name;
                $.ajax({
                    url: 'http://localhost:8080/api/productsByIdVendor/'+data[i].id,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        listCountProductByVendor[i]=data.unshift();
                        canvas.panelVendor();
                    }
                });
            });
        }
    });
}

canvas.panelType=function () {
    if ($('#chartType').empty()) {
        var ctx = document.getElementById("chartType").getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'doughnut',
            // The data for our dataset
            data: {
                labels:listType ,
                datasets: [{
                    backgroundColor: hexType,
                    borderColor: '#fff',
                    data:listCountProductByType ,
                }]
            },
            // Configuration options go here
            options: {
                legend: {
                    display: true
                },
                animation: {
                    easing: "easeInOutBack"
                }
            }
        });
    }
}

canvas.panelVendor=function () {
    if ($('#chartVendor').empty()) {
        var ctx = document.getElementById("chartVendor").getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'doughnut',
            // The data for our dataset
            data: {
                labels:listVendor ,
                datasets: [{
                    backgroundColor: hexVendor,
                    borderColor: '#fff',
                    data:listCountProductByVendor ,
                }]
            },
            // Configuration options go here
            options: {
                legend: {
                    display: true
                },
                animation: {
                    easing: "easeInOutBack"
                }
            }
        });
    }
}

$(document).ready(function () {
    productLines.listType();
    vendors.listVendor();
    rates.findStatus();



    console.log(Math.random())
});