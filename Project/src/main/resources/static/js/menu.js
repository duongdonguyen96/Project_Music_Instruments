var productLines = {} || productLines;
productLines.listType = function () {
    $.ajax({
        url: 'http://localhost:8080/api/listTypeProductsById/',
        method: "GET",
        dataType: "json",
        success: function (data) {
            var size=data.unshift();
            var index=Math.floor(size/6);
            for (let i=0;i<=index;i++){
                $('#menu').append(
                    `<div class="row">
                        <div class="col1" id="cmn">
                       
                        </div>
                    </div>`
                );
                for (let j=0;j<(i+1)*6;j++){
                    $('#cmn').re(
                        `<div class="h_nav">
                                <ul>
                                    <li><a href="/categories">
                                    <h4>Guitar</h4>
                                    </a></li>
                                </ul>
                            </div>
                        </div>`
                    );
                }
            }

        }
    });
}
$(document).ready(function () {
    productLines.listType();
});