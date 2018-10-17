let $cart = {};
$('document').ready(function () {
    loadGoods();
    chekCart();
    renderCart();
});


function loadGoods() {
    $.getJSON('json/goods.json', function (json) {
        let goods = '';
        for (let good in json) {
            goods += `<div class = "items">`;
            goods += `<a href="singlePage.html">`;
            goods += `<div class="shadow">`;
            goods += `</div>`;
            goods += `<img src="${json[good]['img']}" alt="cut">`;
            goods += `</a>`;
            goods += `<div class="cut" data-src = "${json[good]['img']}" data-price = "${json[good]['price']}" data-id = "${good}">`
            goods += `<img src="img/Forma1.png" alt="cut"> &nbsp; Add to Cart</div>`;
            goods += `<p>Mango People T-shirt<br><span>$${json[good]['price']}</span></p>`;
            goods += `</div>`;

            renderMiniCart();

            function renderMiniCart() {
                let el = '';
                for (let good in $cart) {
                    el += `<div class = "prod" data-id = "${good}" data-pr = "${json[good].price * $cart[good]}">`;
                    el += `<img src="${json[good].img}">`;
                    el += `<p>Mango People T-shirt<br><span>$${json[good].price} x ${$cart[good]}</span></p>`;
                    el += `<div class="close">`;
                    el += `<i aria-hidden="true" class="fa fa-times-circle"></i>`;
                    el += `</div></div></div>`;
                }
                $('.goods').html(el);
            }
        }
        renderPrice();
        $('.first-row').html(goods);
        $('.cut').on('click', addToCart);
        renderCart();
    });
}

function renderPrice() {
    let price = 0;
    if ($('.prod').length !== 0) {
        $('.prod').each((idx, val) => {
            price += +val.dataset.pr;
        });
        $('.total-price-mini-cart').html(`<p>TOTAL</p><span>$${price}</span>`)
        /*$('.mainCart').each((idx, val) => {
            $(val).append(`<div class = "qnt"><p>${$('.prod').length}</p></div>`);
        });*/
    } else {
        /*$('.qnt').remove();*/
        $('.total-price-mini-cart').html(`<p class = 'base-txt'>Cart the empty</p>`)
    }
}

function addToCart() {
    let qnt = $(this).data('id');
    if ($cart[qnt] !== undefined) {
        $cart[qnt]++;
    } else {
        $cart[qnt] = 1;
    }
    localStorage.setItem('cart', JSON.stringify($cart));
    renderCart();
    loadGoods();
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
        });
    }
}


