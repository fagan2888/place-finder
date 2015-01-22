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

    // Wikipedia AJAX request
    var wikiURL = "http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=" + cityStr + "&continue=&callback=wikiCallback";
    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        success: function(response) {
            var articleList = response[1];
            for (var i=0; i < articleList.length; i++) {
                var articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };
        }
    });

    // NYTimes AJAX request
    $.getScript("/static/js/secret_key.js", function(){
        console.log(secret_key);
        var nytKey = secret_key;
        var nytURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + address + "&api-key=" + nytKey;
        $.getJSON(nytURL, function(data){
            articles = data.response.docs;
            for (var i=0; i < articles.length; i++) {
                var article = articles[i];
                var href = '<a href="' + article.web_url + '">' + article.headline.main + '</a>';
                var par = '<p>' + article.lead_paragraph + '</p>'; 
                var liString = '<li class="article">' + href + par + '</li>';
                $nytElem.append(liString);
            };
        }).error(function(e){
            console.log(e);
            $nytHeaderElem.text("New York Times Articles Could not be Loaded");
        });
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
