$(function () {
    var tmpl, // main template html
        tdata = {};

    var initPage = function () {

        // load the HTML template
        $.get("/templates/home.html", function (d) {
            tmpl = d;
        });

        // retrieve the server data and then initialize the page. 
        $.getJSON("/v1/albums.json", function (d) {
            $.extend(tdata, d.data); // $.extend - take this object and add stuff to it. 
        });

        // When AJAX calls are complete parse the template replacing mustache tags with vars
        $(document).ajaxStop(function () {
            var final_data = massage_album_list(tdata); 
            var renderedPage = Mustache.to_html(tmpl, final_data);
            $("body").html(renderedPage);
        })
    }();
});

function massage_album_list(data){
    if(data.albums && data.albums.length > 0){
        data.have_albums = true;
    } else {
        data.have_albums = false; 
    }

    return data; 
}