var productLines = {} || productLines;
var vendors = {} || vendors;
var rates = {} || rates;
var canvas={}||canvas;

var listType=[];
var listCountProductByType=[];

var listVendor=[];
var listCountProductByVendor=[];

var hexType=[];
var hexVendor=[];

productLines.listType = function () {
    $.ajax({
        url: 'http://localhost:8080/api/listTypeProductsById/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, v) {
                hexType.push('#'+((Math.random()/i)*0xFFFFFF<<0).toString(16));
                listType.push(v.name);
                $.ajax({
                    url: 'http://localhost:8080/api/productsByIdType/'+v.id,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        listCountProductByType.push(data.unshift())
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
            $.each(data, function (i, v) {
                hexVendor.push('#'+((Math.random()/i)*0xFFFFFF<<0).toString(16));
                listVendor.push(v.name);
                $.ajax({
                    url: 'http://localhost:8080/api/productsByIdVendor/'+v.id,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        listCountProductByVendor.push(data.unshift())
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
    canvas.panelType();
    canvas.panelVendor();
    console.log(Math.random())
});