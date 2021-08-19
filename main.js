function createMap(geojson) {
    const styles = {
        'MultiPolygon': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'yellow',
                width: 1,
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 0, 0.1)',
            }),
        }),
    };

    const styleFunction = function (feature) {
       return styles[feature.getGeometry().getType()];
    };

    console.log(geojson);

    const vectorSource = new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(geojson),
    });

    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: styleFunction,
    });
    
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                  attributions:
                    'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                    'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                  url:
                    'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                    'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
                }),
            }),
            vectorLayer,
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([37.41, 8.82]),
          zoom: 4
        })
    });
}

$(function () {
    $.getJSON('https://datahub.io/core/geo-countries/r/countries.geojson', function(geojson) {
        geojson['crs'] = {
            'type': 'name',
            'properties': {
                'name': 'EPSG:4326',
            },
        };
        createMap(geojson);
    });
});