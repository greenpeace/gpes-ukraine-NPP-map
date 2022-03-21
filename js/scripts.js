document.addEventListener("DOMContentLoaded", function (event) {
    /* global L, document */

    var containerEl = document.getElementById("ukraine_nuclear_map");
    var elwidth = containerEl.offsetWidth;
    var mapheight = elwidth >= 550 ? 550 : 300;
    var zoomvalue = elwidth >= 550 ? 5 : 4;

    document.getElementById("ukraine_nuclear_map").style.height = mapheight + "px";

    var osmap = L.map('ukraine_nuclear_map', {
        scrollWheelZoom: false
    }).setView([50, 28], zoomvalue);

    // Map titles
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 8,
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        id: 'mapbox.light',
    }).addTo(osmap);

    // Icons
    var nuclearIcon = L.icon({
        iconUrl: 'https://storage.googleapis.com/gpes-static/ucrania-nuclear-map/nuclear-32.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -15]
      });

    // Rusia map OK
    fetch("jsonmaps/Russia.json").then(res => res.json()).then(data => {
        L.geoJson(data, {
            style: function (e) {
                return {
                    color: e.properties.fill ? e.properties.fill : "#ffffff",
                    fillOpacity: e.properties["fill-opacity"] ? e.properties["fill-opacity"] : .3,
                    weight: e.properties["stroke-width"] ? e.properties["stroke-width"] : 1
                }
            }
        }).addTo(osmap);
    });

    // Ukrania map OK
    fetch("jsonmaps/Ukraine.json").then(res => res.json()).then(data => {
        L.geoJson(data, {
            style: function (e) {
                return {
                    color: e.properties.fill ? e.properties.fill : "#ffffff",
                    fillOpacity: e.properties["fill-opacity"] ? e.properties["fill-opacity"] : .3,
                    weight: e.properties["stroke-width"] ? e.properties["stroke-width"] : 1
                }
            }
        }).addTo(osmap);
    });

    // Ukrain map plant - OK
    fetch("jsonmaps/Ukraine_NPP_with_active_reactors.json").then(res => res.json()).then(data => {
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: nuclearIcon});
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' + '<a target="_blank" rel="noopener" href="' + feature.properties.url + '">' +  feature.properties.name + '</a></h3>' +
                    '<p> Capacidad: ' + feature.properties.capacity_m + '</p>'
                );
            },
        }).addTo(osmap);
        
    });

    // Chernobil power plant - OK
    fetch("jsonmaps/Chornobyl_nuclear_power_plant.json").then(res => res.json()).then(data => {
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: nuclearIcon});
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' + feature.properties.name + '</h3>'
                );
            },
        }).addTo(osmap);
    });

    // Zonas de Ucrania ocupadas - OK
    fetch("jsonmaps/1703_3pm_EST_ISW.json").then(res => res.json()).then(data => {
        L.geoJson(data, {
            style: function (e) {
                return {
                    color: e.properties.fill ? e.properties.fill : "#ffffff",
                    fillOpacity: e.properties["fill-opacity"] ? e.properties["fill-opacity"] : .3,
                    weight: e.properties["stroke-width"] ? e.properties["stroke-width"] : 1
                }
            }
        }).addTo(osmap);
    });

    // Information on map - PUNTO NO SE QUE ES
    /* fetch("jsonmaps/information-on-map.json").then(res => res.json()).then(data => {
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: nuclearIcon});
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.name);
            },
        }).addTo(osmap);
    }); */

    // 50KM power plant - NO
    /* fetch("jsonmaps/50km_radius_zone.json").then(res => res.json()).then(data => {
        L.geoJson(data, {
            style: function (e) {
                return {
                    color: e.properties.fill ? e.properties.fill : "#AAFFAA",
                    fillOpacity: e.properties["fill-opacity"] ? e.properties["fill-opacity"] : .3,
                    weight: e.properties["stroke-width"] ? e.properties["stroke-width"] : 1
                }
            }
        }).addTo(osmap);
    }); */

    // 100KM power plant - NO
    /* fetch("jsonmaps/100km_radius_zone.json").then(res => res.json()).then(data => {
        L.geoJson(data, {
            style: function (e) {
                return {
                    color: e.properties.fill ? e.properties.fill : "#AAFFAA",
                    fillOpacity: e.properties["fill-opacity"] ? e.properties["fill-opacity"] : .3,
                    weight: e.properties["stroke-width"] ? e.properties["stroke-width"] : 1
                }
            }
        }).addTo(osmap);
    }); */

    // NO - MUCHOS PUNTOS QUE NO SE QUE SON
    /* fetch("jsonmaps/Incidents_within_150km_of_NPP.json").then(res => res.json()).then(data => {
        L.geoJson(data).addTo(osmap);
    }); */

    // NO - MUCHOS PUNTOS QUE NO SE QUE SON
    /* fetch("jsonmaps/Incidents_within_150km_of_NPP.json").then(res => res.json()).then(data => {
        L.geoJson(data).addTo(osmap);
    }); */

    // Fotos en drive - NO
    /* fetch("jsonmaps/Click_for_Zaporizhzhia_photos.json").then(res => res.json()).then(data => {
        L.geoJson(data).addTo(osmap);
    }); */


});