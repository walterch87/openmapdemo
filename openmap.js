
function loadmap(lng,lat) {
	//var hongkong=new google.maps.LatLng(22.3040633,114.1723575);
	map = new OpenLayers.Map("mapdiv");
	map.addLayer(new OpenLayers.Layer.OSM());

	var lonLat = new OpenLayers.LonLat( lng , lat )
		  .transform(
			new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
			map.getProjectionObject() // to Spherical Mercator Projection
		  );

	var zoom=16;
	var markers = new OpenLayers.Layer.Markers( "Markers" );
	map.addLayer(markers);
	markers.addMarker(new OpenLayers.Marker(lonLat));
	map.setCenter (lonLat, zoom);
}

$(document).ready(function(){

  $("#buttonDisplayMap").click(function(){
    $.get("https://www.als.ogcio.gov.hk/lookup?q="+$("#address").val(), function(data, status){

        var long = data.getElementsByTagName("Longitude");
        var lat = data.getElementsByTagName("Latitude");

        $("#long").val(long[0].innerHTML);
        $("#lat").val(lat[0].innerHTML);

        var nlong = parseFloat(long[0].innerHTML);
        var nlat = parseFloat(lat[0].innerHTML);

        loadmap(nlong,nlat);

    });

  });

});
