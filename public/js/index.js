var shadowRoot_;
var container = document.getElementById('container');

(window.AMP = window.AMP || []).push(function(AMP) {
  // AMP is now available.
  var clickListener1 = document.getElementById("load-amp");
  var clickListener2 = document.getElementById("load-amp-2");
  var ampedDoc;

  clickListener1.onclick = function(e){
    e.preventDefault();


    // The AMP page you want to display
    var url = "/amp-test-1";
    if(ampedDoc){
      ampedDoc.close();
    }
    
    // Use our fetchDocument method to get the doc
    fetchDocument(url).then(function(doc) {
      // Let AMP take over and render the page
      ampedDoc = AMP.attachShadowDoc(getShadowRoot(), doc, url);
    });
  }

  clickListener2.onclick = function(e){
    e.preventDefault();

    // The AMP page you want to display
    var url = "/amp-test-2";
    if(ampedDoc){
      ampedDoc.close();
    }
    // Use our fetchDocument method to get the doc
    fetchDocument(url).then(function(doc) {
      // Let AMP take over and render the page
      ampedDoc = AMP.attachShadowDoc(getShadowRoot(), doc, url);
    });
  }

});

function getShadowRoot(){
  var oldShadowRoot = shadowRoot_;
  shadowRoot_ = document.createElement('div');
  if (oldShadowRoot) {
    container.replaceChild(shadowRoot_, oldShadowRoot);
  } else {
    container.appendChild(shadowRoot_);
  }
  return shadowRoot_;
}

function fetchDocument(url) {

  // unfortunately fetch() does not support retrieving documents,
  // so we have to resort to good old XMLHttpRequest.
  var xhr = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.onload = function() {
      // .responseXML contains a ready-to-use Document object
      resolve(xhr.responseXML);
    };
    xhr.send();
  });
}
