var lfm_artists = [];
var lfm_artists_copy = [];
var dt_artists;
var bcs_artists = []
var bcs_links = {}
var artists;

var which_sites = {}


$(function() {
    $.get('daytrotter.json', function(data) { dt_artists = data; }, 'json');
    $.get('blackcabsessions.json', function(data) { 
        for (var i=0; i < data.length; i++) {
            bcs_artists.push(data[i][0]);
            bcs_links[data[i][0].toLowerCase()] = data[i][1]; 
        }        
    },'json' );
    
    $('#loadingDiv')
    .hide()  // hide it initially
    .ajaxStart(function() {
        $(this).show();
    })
    .ajaxStop(function() {
        $(this).hide();
    });
    
    $('#about').hide();
    
    $('.footnote').hover(function() {
        $('#about').slideToggle("fast", "linear");
    });
    
    $("#submit").click( function() {
        $("#results").children().remove();
        lfm_artists = [];
        var username = $("#username").val();
        if (username !== "") {
            $.get('http://ws.audioscrobbler.com/2.0/?method=library.getartists&api_key=4bd0daa155eaa4e5d8b60222382cd711&user='+username+'&limit=9999&format=json',
                function(data) {
                    if ("error" in data || ("artists" in data && !("artist" in data.artists))) {
                        $("#results").append('<p>Whoops! That user doesn\'t exist. Here is a cat for your troubles.<p><img src="http://placekitten.com/g/700/400" />');
                    } else {
                    
                    for (var i=0; i < data.artists.artist.length; i++) {
                        lfm_artists.push(data.artists.artist[i].name);
                    }
                    
                    lfm_artists_copy = lfm_artists.slice(0);
                    
                    artists = re_the(
                                    de_the(union(
                                        intersection(lfm_artists, bcs_artists),
                                        intersection(lfm_artists, dt_artists)
                                    )).sort(caselessSort)
                                    );
                    
                    
                    var $sortdiv = $('<div id="sort"/>');
                    var $abc_order = $('<span class="button">alphabetical</span>');
                    var $lfm_order = $('<span class="button">last.fm plays</span>');
                    $("#results").append($sortdiv);
                    $sortdiv.append('Sort by ', $abc_order, " or ", $lfm_order);
                    
                    $abc_order.click(show_abc_order);
                    $lfm_order.click(show_lfm_order);
                    
                    show_lfm_order();

                    }
                }, 'json'
            );    
        }
    });
})

function render_table(artist_list) {
    $("#results table").remove();
    $("#results").append("<table>");
    for (var i=0; i < artist_list.length; i++) {
        var row = ""
    
        row += "<tr><td>"+artist_list[i]+'</td><td>';
        
        if ($.inArray("dt", which_sites[artist_list[i].toLowerCase()]) !== -1) {
            row += '<a target="_blank" href="http://www.daytrotter.com/#!/search/'+artist_list[i]+'">daytrotter</a>';
        }
        row += '</td><td>';
        if ($.inArray("bcs", which_sites[artist_list[i].toLowerCase()]) !== -1) {
            row += '<a target="_blank" href="http://www.blackcabsessions.com/'+bcs_links[artist_list[i].toLowerCase()]+'">black cab sessions</a>';
        }                        
        row += '</td></tr>';
        
        $("#results table").append(row);
    }
}

function show_abc_order() {
    render_table(artists);
}

function show_lfm_order() {
    var al = [];
    for (var i=0; i < lfm_artists_copy.length; i++) {
        var idx = $.inArray(lfm_artists_copy[i], artists);
        if (idx !== -1) {
            al.push(artists[idx]);
        }
    }
    render_table(al);
}

function de_the(x) {
    for (var i=0; i < x.length; i++) {
        if (x[i].indexOf("The ") === 0 || x[i].indexOf("the ") === 0) {
            x[i] = x[i].substring(4) + '*' + x[i].substring(0,4);
        }
    }
    return x;
}


function re_the(x) {
    for (var i=0; i < x.length; i++) {
        if (x[i].lastIndexOf("*The") === x[i].length - 5 || x[i].lastIndexOf("*the") === x[i].length - 5) {
            x[i] = x[i].substring(x[i].length - 4) + x[i].substring(0,x[i].length - 5);
        }
    }
    return x;
}

function caselessSort(a,b) {
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    return 0;
}

function intersection(x,y){
     x.sort(caselessSort);y.sort(caselessSort);
    var i=j=0;ret=[];
     while(i<x.length && j<y.length){
          if(x[i].toLowerCase()<y[j].toLowerCase())i++;
          else if(y[j].toLowerCase()<x[i].toLowerCase())j++;
          else {
               ret.push(x[i]);
               i++,j++;
          }
     }
     return ret;
}

function union (bcs, dt) {
    var obj = {};
    for (var i = bcs.length-1; i >= 0; -- i) {
        obj[bcs[i].toLowerCase()] = bcs[i];
        which_sites[bcs[i].toLowerCase()] = ["bcs"];
    }
    for (var i = dt.length-1; i >= 0; -- i) {
        obj[dt[i].toLowerCase()] = dt[i];
        if (dt[i].toLowerCase() in which_sites) {
            which_sites[dt[i].toLowerCase()].push("dt");
        } else {
            which_sites[dt[i].toLowerCase()] = ["dt"];
        }
    }
    var res = []
    for (var k in obj) {
     if (obj.hasOwnProperty(k))  // <-- optional
        res.push(obj[k]);
    }
    return res;
}