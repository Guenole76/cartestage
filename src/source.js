import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import Circle from 'ol/geom/Circle';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';


 
var highlight = new Style({
image: new CircleStyle({
  radius: 5,
  Fill: null,
  stroke: new Stroke({color: 'blue', width: 20})  
   
    
  })
 
});

var styles = new Style({
image: new CircleStyle({
  radius: 5,
  Fill: null,
  stroke: new Stroke({color: 'red', width: 5})  
   
    
  })
 
});








var geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:3857'
    }
  },
  'features': [{
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [60493.24,6324512.25 ]
      //Nordet Jean Pierre
    }
    
  },

  {
    'type': 'Feature',
    
    'geometry': {
      'type': 'Point',
      'coordinates': [45460.29,6330451.21] ,
      
      //Ferme de la Sébirerie
      
      
    }
    
  },  {
    'type': 'Feature',
    
    'geometry': {
      'name': "fdp",
      'type': 'Point',
      'coordinates': [50274.15,6332484.24] ,
      //Ferme du Mont Crocq
      
      
    }},
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [58350.74,6332855.30] ,
        //Ferme Rossiniere
        
        
      }},
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [72363.91,6278177.73] ,
          //Richar Alain (pas précis)
          
          
        }},
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [69375.40,6336710.03] ,
            //Agnes Sandrine 
            
            
          }},
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [8399.57,6271738.08] ,
              //Perrel Olivier
              
              
            }},
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [56699.69,6341922.48] ,
        //Ferme ddes colombos
        
        
      }
    
  }]

};

var vectorSource = new VectorSource({
  features: (new GeoJSON()).readFeatures(geojsonObject)
});

vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 5e6)));

var vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styles
});

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vectorLayer
  ],
  target: 'map',
  view: new View({
    center: [0 , 0],
   
    zoom: 4
  })
});






var selected = null;
var status = document.getElementById('status');

map.on('pointermove', function(e) {
  if (selected !== null) {
    selected.setStyle(undefined);
    selected = null;
  }

  map.forEachFeatureAtPixel(e.pixel, function(f) {
    selected = f;
    f.setStyle(highlight);
    return true;
  });

  if (selected) {
    status.innerHTML = '&nbsp;Description: ' + selected.get('coordinates');
  } else {
    status.innerHTML = '&nbsp;';
  }
});