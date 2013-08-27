var map;
var gc = new google.maps.Geocoder();

function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    zoom: 10
        });

    gc.geocode( 
      {'address': '3 Lost Creek Drive, Selinsgrove, PA'},
      function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
	      map.fitBounds(results[0].geometry.viewport);
	  }});
    
    //infowindow = new google.maps.InfoWindow();
    //var service = new google.maps.places.PlacesService(map);
    //service.search(request, callback);
    
    $.getJSON('maps/mmap-steve.json', function(data) {
    	readMapLocations(data)
    });
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
	for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
	}
    }
}

function createMMapMarker(place, name, comment, date) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
	    map: map,
	    position: place.geometry.location
        });
        
	var contentString = '<h1>' + date + '</h1><h2>'+name+'</h2><p>' + comment + '</p>';
    var infowindow = new google.maps.InfoWindow({
    	content: contentString
	});

    google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(map, this);
        });
}

function readMapLocations(data) {
	events = data.events;
	places = new google.maps.places.PlacesService(map);
	console.log(data);
	for (var i=0; i < events.length; i++) {
		name = events[i].name;
		comment = events[i].what;
		date = events[i].when;
		
		gc.geocode({'address': events[i].where }, function(results, status)
		{
			if (status == google.maps.GeocoderStatus.OK) {
				console.log(results);
				places.search({"location": results[0].geometry.location, "radius": 50000, "keyword": name}, function(res, status) {
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						console.log(res);
						createMMapMarker(res[0], name, comment, date);
					}
				});

			}
		})
	}
}