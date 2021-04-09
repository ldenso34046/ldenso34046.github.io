var map = L.map('map').setView([38, -95], 4);
var basemapUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
var basemap = L.tileLayer(basemapUrl).addTo(map);
var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
  layers: 'nexrad-n0r-900913',
  format: 'image/png',
  transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);
var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
$.getJSON(weatherAlertsUrl, function(data) {
  L.geoJSON(data, {
  style: function(feature){
  var alertColor = 'white';
  if (feature.properties.severity === 'Minor') alertColor = 'green';
  if (feature.properties.severity === 'Moderate') alertColor = 'blue';
  if (feature.properties.severity === 'Severe') alertColor = 'orange';
  if (feature.properties.severity === 'Extreme') alertColor = 'red';
  return { color: alertColor };
},

  onEachFeature: function(feature, layer) {
  layer.bindPopup(feature.properties.headline + ' - Alert type: ' + feature.properties.severity);
}

}).addTo(map);


});

