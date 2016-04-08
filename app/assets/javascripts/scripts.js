$(document).ready(function() {
  var url_list = [];
  $('form.url_form').submit(function(){
    var url = $("#website_url").val();
    if (/^(http|https|ftp):\/\//i.test(url))
      domain = url.split('//')[1];
    else
      domain = url;
    if (/^(([a-z0-9][a-z0-9_-]+\.)+([a-z]{2,}))(:(\d+))?\/?/i.test(domain)) {
      display_url = domain.replace("www.","").split('/')[0];
      if($.inArray(display_url, collection_urls) < 0){
        $("tbody").prepend("<tr><td>"+ display_url +"</td></tr>");
        url_list.push(display_url);
        $("#website_url").val("");
        collection_urls.push(display_url);
        $.ajax({
          url: "/web_urls",
          type: "post",
          data: {url_list: url_list},
          success: function(response, textStatus, jqXHR){
            url_list.pop(response); 
          },
          error: function(jqXHR, textStatus, errorThrown){
          },
          complete: function(){
          }
        });
      }
    }
    return false;
  });

  setTimeout(function() {worker();}, 15000 );
  function worker(){
    if(url_list.length > 0){
      $.ajax({
        url: "/website",
        type: "post",
        data: {url_list: url_list},
        success: function(response, textStatus, jqXHR){
          $.each(response, function(index, value) { 
            url_list.pop(value); 
          });
        },
        error: function(jqXHR, textStatus, errorThrown){
        },
        complete: function(){
        }
      });
    }
    $.ajax({
      url: "/website/online",
      type: "get",
      success: function(response, textStatus, jqXHR){
        $.each(response, function(index, value) {
    		  if($.inArray(value, collection_urls) == -1){
    			  collection_urls.push(value);
    			  $("tbody").prepend("<tr><td>"+ value +"</td></tr>");
    		  }
        });
      },
      error: function(jqXHR, textStatus, errorThrown){
      },
      complete: function(){
      }
    });
    setTimeout(function() {worker();}, 15000 );
  }
});