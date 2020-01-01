let map;
let jsonData = "assets/Data/maps.json";

const countries = [
    //Australia
    { lat: -35.279382, lng: 149.129349, zoom: 4, name: "Australia" },
    //Brazil
    { lat: -15.793889, lng: -47.882778, zoom: 4, name: "Brazil" },
    //Canada
    { lat: 45.422186, lng: -75.692438, zoom: 4, name: "Canada"},
    //France
    { lat: 48.857497, lng: 2.347628, zoom: 5, name: "France" },        
    //India
    { lat: 28.613068, lng: 77.207920, zoom: 4, name: "India" },
    //USA
    { lat: 38.904845, lng: -77.036535, zoom: 3.5, name: "USA" }
];


let icons = "assets/images/lotus.png"
let countriesIcon = "assets/images/circle.png"

function initMap() {
    const mapOptions = {
        center: {
            lat: 9.072264,
            lng: 7.491302
        },
        zoom: 1.6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    countries.forEach(function (data) {
        let countriesMarker = new google.maps.Marker({
            map: map,
            position: { lat: data.lat, lng: data.lng },
            title: data.name,
            icon: countriesIcon
        });
        $("#selectlocation").append('<option value="' + [data.lat, data.lng, data.zoom].join('|') + '">' + data.name + '</option>');
    });


    let infowindow = new google.maps.InfoWindow();
    let clusterMarkers = [];

    //Method found on StackOverflow: https://stackoverflow.com/questions/28606149/load-data-from-json-file-into-map-markers-in-google-maps
    $.getJSON(jsonData, function (jsonMarkers) {
        $.each(jsonMarkers.markers, function (key, data) {
            let latLng = new google.maps.LatLng(data.lat, data.lng);
            if (!data.title)
              data.title = ""+key;
            let marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: icons,
                title: data.title
            });
            clusterMarkers.push(marker);
            //Added click listener
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infowindow.setContent(data.description);
                    infowindow.open(map, marker);
                });
            })(marker, data);
        });
        //StackOverflow helped to solve Marker Clustering issue: https://stackoverflow.com/questions/59521349/marker-clustering-on-google-maps-with-json-multi-markers
        var markerCluster = new MarkerClusterer(map, clusterMarkers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
          });

    });
    
}

// Created drop-down menu for each Country
// Code from http://bl.ocks.org/amenadiel/353e4d04d4b2923c438e
$(document).on('change', '#selectlocation', function () {
    let latlngzoom = $(this).val().split('|');
    let newzoom = 1 * latlngzoom[2],
        newlat = 1 * latlngzoom[0],
        newlng = 1 * latlngzoom[1];
    map.setZoom(newzoom);
    map.setCenter({ lat: newlat, lng: newlng });
});


//France
    //Courses

//    
//     {
//         // icon: icon,
//         content: '<div id="web-info"> <h6><a target="_blank" href="https://www.ecole-aroma.com/">French School  of Integrative Aromatherapy</a></h6><p>Integrative Aromatherapy Practitioner Training</p></div>',
//         position: { lat: 48.829997, lng: 2.227497 }
//     },
//     {
//         // icon: icon,
//         content: '<div id="web-info"> <h6><a target="_blank" href="https://www.laromatheque.fr/">L\'Aromathèque Jacobins</a></h6><p>Complete Essential Oils Training</p></div>',
//         position: { lat: 45.761047, lng: 4.832847 }
//     }
// ];