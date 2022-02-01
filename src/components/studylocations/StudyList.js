import StudyLocation from "./StudyLocation";
import classes from "./StudyList.module.css";


function StudyList(props) {
  return (
    <ul className={classes.list}>
      {props.locationList.map((location) => {
        return (
          <StudyLocation
            key={location.place_id}
            id={location.place_id}
            name={location.name}
            image={location.photos[0].getUrl()}
            address={location.formatted_address}
            rating={location.rating}
            user_ratings_total={location.user_ratings_total}
            longitude={location.geometry.location.lng()}
            latitude={location.geometry.location.lat()}
            resetLocation={props.resetLocation}
            setLng={props.setLng}
            setLat={props.setLat}
            setZoom={props.setZoom}
            goToLocation={props.goToLocation}
          />
        );
      })}
    </ul>
  );
}

export default StudyList;
