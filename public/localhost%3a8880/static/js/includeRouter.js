function includeRouter(cb) {
  var content, file, xhttp
  document.body.addEventListener('click', (e)=> {
    file = e.target.getAttribute('route-link');
    if (file) {
      content = document.getElementById('content');
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            content.innerHTML = this.responseText; // load html
            
            
            setTimeout(function() {
              var fileref=document.createElement('script');
              fileref.setAttribute('type','text/javascript')
              fileref.setAttribute('src', '/static/js/convenience-stores.js')
              get
              cb(e);
            }, 0)
          }
          if (this.status == 404) {
            content.innerHTML = 'Page not found.';
          }
        }
      }      
      xhttp.open('GET', file, true);
      xhttp.send();
    }
  });
}

