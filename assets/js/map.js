(function($) {
    'use strict';

    var cities = L.layerGroup();
    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [59, 75],
            iconAnchor: [15, 100]
        }
    });
    var customIcon = new LeafIcon({ iconUrl: 'assets/images/icons/marker.png' });

    L.marker([40.7128, -74.0060], { icon: customIcon }).addTo(cities);

    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Ducor © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    var dark = L.tileLayer(mbUrl, { id: 'mapbox/dark-v10', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
        grayscale = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
        streets = L.tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr });

    const map_lat = window.localStorage.getItem("map_lat");
    const map_lng = window.localStorage.getItem("map_lng");
    
    var map = L.map('map', {
        center: [map_lat, map_lng],
        zoom: 10,
        layers: [dark, cities],
        scrollWheelZoom: false
    });

    var baseLayers = {
        "Dark": dark,
        "Grayscale": grayscale,
        "Streets": streets
    };

    L.control.layers(baseLayers).addTo(map);
})(jQuery);