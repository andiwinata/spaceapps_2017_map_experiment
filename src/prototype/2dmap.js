mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kaXdpbmF0YSIsImEiOiJjajIyZ3JiN3AwMGtvMndycDk3anNid2FpIn0.wyRlZsd-Mz5a3FLqtsrbWA';
var map = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [153.0251, -27.4698],
    zoom: 15,
    pitch: 0,
    bearing: -180,
    container: 'map'
});

let terrainLayer = {
    "id": "terrain-data",
    "type": "fill",
    "source": {
        type: 'vector',
        tiles: 'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=pk.eyJ1IjoiYW5kaXdpbmF0YSIsImEiOiJjajIyZ3JiN3AwMGtvMndycDk3anNid2FpIn0.wyRlZsd-Mz5a3FLqtsrbWA'
    },
    // "source-layer": "terrain-data",
    "paint": {
        "fill-color": "#3887be"
    }
    // "layout": {
    //     "line-join": "round",
    //     "line-cap": "round"
    // },
    // "paint": {
    //     "line-color": "#ff69b4",
    //     "line-width": 1
    // }
};

map.on('load', function () {
    map.addLayer(terrainLayer);
});