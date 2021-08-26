function createMap(geojson) {
    const styles = {
        'MultiPolygon': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 3,
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.1)',
            }),
        }),
    };

    const styleFunction = function (feature) {
       return styles[feature.getGeometry().getType()];
    };

    console.log(geojson);

    const vectorSource = new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(
            geojson,
            {
                dataProjection: ol.proj.get('EPSG:4326'),
                featureProjection: ol.proj.get('EPSG:3857')
            }
        )
    });

    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: styleFunction,
        // TODO: Add attribution
    });
    
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                  attributions:
                    '<a href="https://services.arcgisonline.com/ArcGIS/' +
                    'rest/services/NatGeo_World_Map/MapServer">' +
                    'National Geographic World Map by ArcGIS</a><br>',
                  url:
                    'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                    'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
                }),
            }),
            new ol.layer.Tile({
                source: new ol.source.TileArcGISRest({
                    attributions:
                        '<a href="https://livefeeds2.arcgis.com/arcgis/rest/services/' +
                        'GEOGLOWS/GlobalWaterModel_Medium/MapServer">' + 
                        'GEOGloWS ECMWF Streamflow Prediction Service by ArcGIS</a>',
                    url: 'https://livefeeds2.arcgis.com/arcgis/rest/services/' +
                         'GEOGLOWS/GlobalWaterModel_Medium/MapServer',
                }),
            }),
            vectorLayer,
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([2.2137, 46.2276]),
          zoom: 6
        })
    });
}

function createPlot() {
    $.getJSON('https://geoglows.ecmwf.int/api/ForecastStats/?reach_id=12040813&return_format=json', function(json) {
        console.log(json);

        flow_25 = {
            x: json.time_series.datetime,
            y: json.time_series['flow_25%_m^3/s'],
            type: 'scatter',
            name: '25%-75% Flow (cms)',
            line: {
                dash: 'dash',
                width: 3,
                color: 'rgb(0, 150, 8)',
            },
            showlegend: false,
            hovertemplate: '25% Flow on %{x}: %{y:.1f} cms',
        };

        flow_75 = {
            x: json.time_series.datetime,
            y: json.time_series['flow_75%_m^3/s'],
            type: 'scatter',
            name: '25%-75% Flow (cms)',
            fill: 'tonexty',
            line: {
                dash: 'dash',
                width: 3,
                color: 'rgb(0, 150, 8)',
            },
            hovertemplate: '75% Flow on %{x}: %{y:.1f} cms',
        };

        flow_avg = {
            x: json.time_series.datetime,
            y: json.time_series['flow_avg_m^3/s'],
            type: 'scatter',
            name: 'Average Flow (m^3/s)',
            line: {
                dash: 'solid',
                width: 3,
                color: 'rgb(255, 0, 0)',
            },
            hovertemplate: 'Averge Flow on %{x}: %{y:.1f} cms',
        };

        layout = {
            xaxis: {
                type: 'date',
                dtick: '1D',
            },
            yaxis: {
                title: {
                    text: 'Streamflow (cms)',
                }
            }
        };
          
        var data = [flow_25, flow_75, flow_avg];
          
        Plotly.react('plot', data, layout);
    });
}

$(function () {
    $.getJSON('https://datahub.io/core/geo-countries/r/countries.geojson', function(geojson) {
        let countryFeature;
        for (var f of geojson.features) {
            if (f.properties.ADMIN === 'France') {
                countryFeature = f;
                break;
            }
        }

        let countryGeoJSON = {
            type: "FeatureCollection",
            features: [
                countryFeature,
            ],
            crs: {
                'type': 'name',
                'properties': {
                    'name': 'EPSG:4326',
                },
            }
        }
        createMap(countryGeoJSON);
    });

    $('#plot-modal').on('shown.bs.modal', function(event) {
        createPlot();
    });
});