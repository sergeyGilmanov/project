$(document).ready(function () {
    loadCart();
    hardDel();
});

function loadCart() {
    $.getJSON('json/goods.json', (data) => {
        let goods = data;
        chekCart();
        renderMainCart();
        loadGoods();

        function renderMainCart() {
            let el = '';
            for (let good in $cart) {
                el += `<div class="raw">`;
                el += `<div class="colums1"><img src="${data[good].img}" alt="img">
                        <div class="txt1"><span class="head-txt">Mango  People  T-shirt</span>
                        <p>Color: Red <br> Size: Xll</p></div>`;
                el += `</div>`;
                el += `<div class="colums"><p class='unit-price'>${data[good].price} $</p></div>`;
                el += `<div class="colums"><form><input class='input-qnt' data-id = '${[good]}' type="number" value='${$cart[good]}' min="0"></form></div>`;
                el += `<div class="colums"><p>FREE</p></div>`;
                el += `<div class="colums"><p class='subtotal'>${$cart[good] * data[good].price} $</p></div>`;
                el += `<div class="colums"><i class="fa fa-times-circle delEl"  data-id = '${[good]}' aria-hidden="true"></i></div>`;
                el += `</div>`;
            }
            $('.goods-wrapper').html(el);
            $('.input-qnt').on('change', addGood);
            $('.delEl').on('click', delEl);
            renderTotalPrice();
        }
        doneEl()
    });
}

function chekCart() {
    let LS = localStorage.getItem('cart');
    if (LS != null) {
        $cart = JSON.parse(LS);
    }
}

function addGood() {
    $cart[$(this).data('id')] = $(this).val();
    localStorage.setItem('cart', JSON.stringify($cart));
    loadCart();
}


function renderTotalPrice() {
    let price = 0;
    $('.subtotal').each((idx, val) => {
        price += parseInt($(val).text());
    });
    $('.txt_2str1').text(price + '$');
}

function delEl() {
    delete $cart[$(this).data('id')];
    localStorage.setItem('cart', JSON.stringify($cart));
    loadCart();
}

function hardDel() {
    $('#clear').on('click', () => {
        $cart = {};
        localStorage.setItem('cart', JSON.stringify($cart));
        loadCart();
    });
}

function doneEl() {
    $('.input-qnt').each(function (idx, val) {
        if ($(val).val() == 0) {
            $(val).parent().parent().parent().each(function (idx, val) {
                $(val).addClass('done');
            })
        }
    })
}