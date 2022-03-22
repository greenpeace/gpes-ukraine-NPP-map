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

var activeReactors = function (ammount) {
    var result = "";
    for (var i = 0; i < ammount; i++) {
        result = result + '<img src="https://storage.googleapis.com/gpes-static/ucrania-nuclear-map/activa.png" alt="+" />';
    }
    return result;
};

var passiveReactors = function (ammount) {
    var result = "";
    for (var i = 0; i < ammount; i++) {
        result = result + '<img src="https://storage.googleapis.com/gpes-static/ucrania-nuclear-map/pasiva.png" alt="0" />';
    }
    return result;
};

// Rusia map OK
fetch("https://storage.googleapis.com/gpes-static-cors/ucrain-nuclear-map/Russia.json").then(res => res.json()).then(data => {
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
fetch("https://storage.googleapis.com/gpes-static-cors/ucrain-nuclear-map/Ukraine.json").then(res => res.json()).then(data => {
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
fetch("https://storage.googleapis.com/gpes-static-cors/ucrain-nuclear-map/Ukraine_NPP_with_active_reactors.json?1").then(res => res.json()).then(data => {
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: nuclearIcon
            });
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                '<h3>' + feature.properties.name + '</h3>' +
                '<p>' + activeReactors(feature.properties.active_reactors) + passiveReactors(feature.properties.passive_reactors) + '</p>' +
                '<p><strong>Reactores:</strong> ' + feature.properties.reactors + '</p>' +
                '<p><strong>¿Operativa?</strong> ' + feature.properties.operativa + '</p>' +
                '<p><strong>Proprietario:</strong> ' + feature.properties.propietario + '</p>' +
                '<p>' + feature.properties.comentario + '</p>' +
                '<p style="color:red">' + feature.properties.control + '</p>'
            );
        },
    }).addTo(osmap);

});

// Chernobil power plant - OK
fetch("https://storage.googleapis.com/gpes-static-cors/ucrain-nuclear-map/Chornobyl_nuclear_power_plant.json?3").then(res => res.json()).then(data => {
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: nuclearIcon
            });
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                '<h3>' + feature.properties.name + '</h3>' +
                '<p>' + activeReactors(feature.properties.active_reactors) + passiveReactors(feature.properties.passive_reactors) + '</p>' +
                '<p><strong>Reactores:</strong> ' + feature.properties.reactors + '</p>' +
                '<p><strong>¿Operativa?</strong> ' + feature.properties.operativa + '</p>' +
                '<p><strong>Proprietario:</strong> ' + feature.properties.propietario + '</p>' +
                '<p>' + feature.properties.comentario + '</p>' +
                '<p style="color:red">' + feature.properties.control + '</p>'
            );
        },
    }).addTo(osmap);
});

// Zonas de Ucrania ocupadas - OK
fetch("https://storage.googleapis.com/gpes-static-cors/ucrain-nuclear-map/1703_3pm_EST_ISW.json").then(res => res.json()).then(data => {
    setTimeout(function () {
        L.geoJson(data, {
            style: function (e) {
                return {
                    color: e.properties.fill ? e.properties.fill : "#ffffff",
                    fillOpacity: e.properties["fill-opacity"] ? e.properties["fill-opacity"] : .3,
                    weight: e.properties["stroke-width"] ? e.properties["stroke-width"] : 1
                }
            }
        }).addTo(osmap);
    }, 2000);
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