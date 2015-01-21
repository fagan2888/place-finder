$(function () {
    $("img").attr("src","http://placekitten.com/350/150");
});

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;
    // load streetview
    $body.append('<img class="bgimg" src="' + streetViewURL + '">');

    // NYTimes AJAX request
    $.getScript("/static/js/secret_key.js", function(){
        console.log(secret_key);
        var nytKey = secret_key;
        var nytURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + address + "&api-key=" + nytKey;
        $.getJSON(nytURL, function(data){
            articles = data.response.docs;
            for (var i=0; i < articles.length; i++) {
                $("#nytimes-articles").append("<li>" + articles[i].headline.main + "</li>");
            }
            console.log(data.response.docs);
            //$("nytimes-articles").each(
        });
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
