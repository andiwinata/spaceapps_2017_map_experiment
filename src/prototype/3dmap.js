mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kaXdpbmF0YSIsImEiOiJjajIyZ3JiN3AwMGtvMndycDk3anNid2FpIn0.wyRlZsd-Mz5a3FLqtsrbWA';
var map = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [153.0251, -27.4698],
    zoom: 15,
    pitch: 20,
    bearing: -180,
    container: 'mapGL'
});


// the 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.
map.on('load', function () {
    let smallArea = [
        [
            153.02141904830933,
            -27.47012516433008
        ],
        [
            153.02423000335693,
            -27.47440871010315
        ],
        [
            153.03077459335327,
            -27.4718195645639
        ],
        [
            153.0300235748291,
            -27.468773433102598
        ],
        [
            153.0259895324707,
            -27.46728841348764
        ],
        [
            153.02141904830933,
            -27.47012516433008
        ]
    ];

    let bigArea = [[
        152.8809356689453,
        -27.65281758178339
    ],
    [
        153.22357177734375,
        -27.65281758178339
    ],
    [
        153.22357177734375,
        -27.390363724986674
    ],
    [
        152.8809356689453,
        -27.390363724986674
    ],
    [
        152.8809356689453,
        -27.65281758178339
    ]];

    function addBuildings(id, extraFilter, color) {
        map.addLayer({
            'id': '3d-buildings' + id,
            'source': 'composite',
            'source-layer': 'building',
            'filter': [
                'all',
                ['==', 'extrude', 'true'],
                extraFilter
            ],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': color,
                'fill-extrusion-height': {
                    'type': 'identity',
                    'property': 'height'
                },
                'fill-extrusion-base': {
                    'type': 'identity',
                    'property': 'min_height'
                },
                'fill-extrusion-opacity': 0.5
            }
        });
    }

    function addWaterExtrude() {
        map.addLayer({
            'id': 'brisbane',
            'type': 'fill-extrusion',
            'source': {
                'type': 'geojson',
                'data': {
                    "type": "Feature",
                    "properties": {
                        "height": 50,
                        "color": 'blue'
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            smallArea
                        ]
                    }
                }
            },
            'paint': {
                'fill-extrusion-color': {
                    // Get the fill-extrusion-color from the source 'color' property.
                    'property': 'color',
                    'type': 'identity'
                },
                'fill-extrusion-height': {
                    // Get fill-extrusion-height from the source 'height' property.
                    'property': 'height',
                    'type': 'identity'
                },
                'fill-extrusion-opacity': 0.2

            }
        });
    }

    function addWaterPolygon() {
        map.addLayer({
            'id': 'brisbane',
            'type': 'fill',
            'source': {
                'type': 'geojson',
                'data': {
                    "type": "Feature",
                    "properties": {
                        "height": 50,
                        "color": 'blue'
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            smallArea
                        ]
                    }
                }
            },
            'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.5
            }
        });
    }

    function addBuildingAndExtrusion() {
        map.addLayer({
            'id': 'brisbane',
            'type': 'fill-extrusion',
            'sources': {
                'extrusion': {
                    'type': 'geojson',
                    'data': {
                        "type": "Feature",
                        "properties": {
                            "height": 50,
                            "color": 'blue'
                        },
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                smallArea
                            ]
                        }
                    }
                },
                'building': 'composite'
            },
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'paint': {
                'fill-extrusion-color': {
                    // Get the fill-extrusion-color from the source 'color' property.
                    'property': 'color',
                    'type': 'identity'
                },
                'fill-extrusion-height': {
                    // Get fill-extrusion-height from the source 'height' property.
                    'property': 'height',
                    'type': 'identity'
                },
                'fill-extrusion-base': {
                    'type': 'identity',
                    'property': 'min_height'
                },
                'fill-extrusion-opacity': 0.2
            }
        });
    }

    addBuildings(2, ['<', 'height', 50], '#4286f4');
    addBuildings(1, ['>=', 'height', 50], '#a3fc37');
    // addWaterExtrude();
    // addBuildingAndExtrusion();

    // map.addSource('terrain-rgb', {
    //     type: 'vector',
    //     url: 'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=pk.eyJ1IjoiYW5kaXdpbmF0YSIsImEiOiJjajIyZ3JiN3AwMGtvMndycDk3anNid2FpIn0.wyRlZsd-Mz5a3FLqtsrbWA'
    // });

    // map.addLayer({
    //     id: 'terrain',
    //     type: 'line',
    //     source: {
    //         type: 'vector',
    //         url: 'mapbox://mapbox.terrain-rgb'
    //     },
    //     'source-layer': 'contour',
    //     "layout": {
    //         "line-join": "round",
    //         "line-cap": "round"
    //     },
    //     "paint": {
    //         "line-color": "#ff69b4",
    //         "line-width": 1
    //     }
    // });

    // map.addLayer({
    //     id: 'terrain',
    //     type: 'fill',
    //     source: {
    //         type: 'vector',
    //         url: 'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=pk.eyJ1IjoiYW5kaXdpbmF0YSIsImEiOiJjajIyZ3JiN3AwMGtvMndycDk3anNid2FpIn0.wyRlZsd-Mz5a3FLqtsrbWA'
    //     },
    //     'source-layer': 'terrain',
    //     // "layout": {
    //     //     "line-join": "round",
    //     //     "line-cap": "round"
    //     // },
    //     // "paint": {
    //     //     "line-color": "#ff69b4",
    //     //     "line-width": 1
    //     // }
    // });
});
