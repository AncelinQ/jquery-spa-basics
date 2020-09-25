

  var container = document.getElementsByClassName('container');
  
function addLogoutBtn(){
  $('.logout').load('templates/partials/_logout.html');
}


  function handleRequest() {
    let user = {};
$('.logout').html('');
$('.login').html('');

    $.get('security.php', function (response) {
      respone = JSON.parse(response);
      let baseUrl = window.location.origin;
      let page = "";
      
      if(response.user){
        MON_SUPER_SITE['security'] = response.user;
        addLogoutBtn();
      }

      if (window.location.hash === "") {
        page = 'homepage';
      }
      if (window.location.hash !== "") {
        page = window.location.hash.split('#')[1];
      }
      if (!response.user && page !== 'login') {
        window.location.hash = 'homepage';
      }
      
      if (response.user && page === 'login') {
        window.location.hash = 'homepage';
      }

      $(container).load('templates/' + page + '.html', function () { console.log("page " + page + " loaded") });
    })

  }
  handleRequest();
  $(window).on('hashchange', handleRequest);

  /*
  function login(e) {
    e.preventDefault();
    console.log('tay');
    let data = $(this).serializeArray();
    console.log(data);
    $.post($(this).attr('action'), data).then(function (user) {
      console.log(user);
    })
  }

  $('#login-form').submit(login);
*/

  /*$.get("./data/user.json").then(function (response) {
    let content = '';
    $.each(response, function (index, data) {
      content += `
    <tr>
      <td>${index + 1}</td>
      <td>${data.lastName}</td>
      <td>${data.firstName}</td>
      <td>${data.age}</td>
      </tr>`;

    })
    console.log(content);
  })*/
  /*
    function login(email, password) {
      $.get('./data/user.json').then(function (response) {
        console.log(response);
        $.each(response, function (index, data) {
  
          if (email === data.email && password === 'paris') {
            document.cookie = `firstName=${data.firstName};expires=Fri, 30 Dec 9999 23:59:59 GMT;`;
          };
        });
  
      })
    }
    */
  /*
    function getCookie(cName) {
      let name = cName + "=";
  
      var cArray = document.cookie.split(';');
  
      for (var i = 0; i < cArray.length; i++) {
  
        var c = cArray[i];
        while (charAt.charAt(0) == ' ') {
          c = cArray.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  
  
    let cookieName = getCookie('name');
    console.log(cookieName);
  */


