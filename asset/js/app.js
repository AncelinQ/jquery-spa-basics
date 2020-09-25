// console.log(window.location);

let MON_SUPER_SITE = {};

let addLogoutButton = function () {
    $('.logout').load('templates/partials/_logout.html');
    $('#product').html('<a href="/#product" class="btn product">Product</a>');
    $('#profile').html('<a href="/#profile" class="btn profile">Profile</a>');
    
}

let addLoginButton = function () {
    $('.login').html(`
        <a href="/#login" class="btn btn-success">Login</a>
    `);
    $('#product').html('');
    $('#profile').html('');
}

let handleRequest = function () {
    let user = {};

    $('.logout').html('');
    $('.login').html('');
    $('#product').html('');
    $('#profile').html('');
    


    $.get('security.php', function(response) {
        response = JSON.parse(response);

        if (response.user) {
            MON_SUPER_SITE['security'] = response.user;
            addLogoutButton();
        }
        
        if (!response.user) {
            addLoginButton();
        }

        let baseUrl = window.location.origin;
        let page = "";

        if (window.location.hash === "") {
            page = 'homepage';
        }

        if (window.location.hash !== "") {
            page = window.location.hash.split('#')[1];
        }

        if (!response.user && page !== 'login') {
            window.location.hash = '#homepage';
        }

        if (response.user && page === 'login') {
            window.location.hash = '#homepage';
        }

        $('.container').load('templates/' + page + '.html', function () {
        });
    })
}


function totalCal(){
    console.log('total');
    console.log(MON_SUPER_SITE['panier']);
    let total = '';
    if(MON_SUPER_SITE['panier']){
        for(var i =0 ; i < MON_SUPER_SITE['panier'].length; i++){
        total += MON_SUPER_SITE['panier'][product.price];
        }
    }
    $('.total').html(total +' €');
    ///JE SAIS QUE CA NE MARCHE PAS, MAIS TU AS L'INTENTION///
}

totalCal();

function addToCart(){
    console.log('panier');
    console.log(MON_SUPER_SITE['panier']);
    let content = '';
    ///EN COURS, MANQUE UN FOR EACH  ///
    content +=
    `<ul class="list-group mb-3">
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">${product.title}/h6>
        </div>
        <span class="text-muted">${product.price} €</span>
      </li>
      </ul>`;
}

handleRequest();

$(window).on('hashchange', handleRequest);

$('body').on('SECURITY_LOGOUT', handleRequest);
