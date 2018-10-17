let $cart = {};

$('document').ready(function () {
    loadGoods();
    chekCart();
    renderCart();
});


function loadGoods() {
    $.getJSON('json/goods.json', (data) => {
        let goods = data;
        chekCart();
        renderMiniCart();
        function renderMiniCart() {
            let el = '';
            for (let good in $cart) {
                el += `<div class = "prod" data-id = "${good}" data-pr = "${goods[good].price * $cart[good]}">`;
                el += `<img src="${goods[good].img}">`;
                el += `<p>Mango People T-shirt<br><span>$${goods[good].price} x ${$cart[good]}</span></p>`;
                el += `<div class="close">`;
                el += `<i aria-hidden="true" class="fa fa-times-circle"></i>`;
                el += `</div></div></div>`;
            }
            $('.goods').html(el);
            renderPrice();
            renderCart();
        }
    });
}

function renderPrice() {
    let price = 0;
    if ($('.prod').length !== 0) {
        $('.prod').each((idx, val) => {
            price += +val.dataset.pr;
        });
        $('.total-price-mini-cart').html(`<p>TOTAL</p><span>$${price}</span>`)
    }

    else {
        $('.total-price-mini-cart').html(`<p class = 'base-txt'>Cart the empty</p>`)
    }
}

function chekCart() {
    let LS = localStorage.getItem('cart');
    if (LS != null) {
        $cart = JSON.parse(LS);
    }
}

function renderCart() {
    for (goodToCart in $cart) {
        $('.close').on('click', function () {
            delete $cart[`${$(this).parent().data('id')}`];
            localStorage.setItem('cart', JSON.stringify($cart));
            renderPrice();
            loadGoods();
            loadCart();
        });
    }
}
