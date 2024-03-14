import Map, { Source, Layer } from "react-map-gl";

const Directions = (props: any) => {
  
    console.log('props',props);
    
  return (
    <Source
    //   id="my-data"
      type="geojson"
      data={{
        type: "Feature",
        geometry: { type: "LineString", coordinates: props.coordinates },
        properties: {}
      }}
    >
      <Layer 
      type="line"
      layout={{'line-join': "round" , 'line-cap': "square"}}
      paint={{'line-color': "#000",'line-width': 4}}
      />
    </Source>
  );
};

export default Directions;
