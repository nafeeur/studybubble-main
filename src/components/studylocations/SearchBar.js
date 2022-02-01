import classes from "./SearchBar.module.css";
import { useRef } from "react";
import Script from "react-load-script"; // Import react script library to load Google object


function SearchBar(props) {
  /*global google*/ // To disable any eslint 'google not defined' errors
  var geocoder;
  var map2;
  const inputRef = useRef();
  const API_key = process.env.REACT_APP_API_KEY; //Google API key

  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng,
    };
    map2 = new google.maps.Map(
      document.getElementById("searchmap"),
      mapOptions
    );
  }

  function codeAddress(event) {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng,
    };
    map2 = new google.maps.Map(
      document.getElementById("searchmap"),
      mapOptions
    );

    event.preventDefault(); //prevents browser from automatically sending a server request when form is submitted
    geocoder.geocode({ address: inputRef.current.value }, callback); //set address parameter for geocoder to value in search bar
  }

  function callback(results, status) {
    if (status == "OK") {
      props.setLat(parseFloat(results[0].geometry.location.lat())); //change state of lat in SearchResults.js
      props.setLng(parseFloat(results[0].geometry.location.lng())); //change state of long in SearchResults.js
      props.newSearch(); //call the newSearch function from SearchResults.js to repopulate the list of study locations using the new lat/long coordinates
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  }

  return (
    <div className={classes.search}>
      <Script
        url={"https://maps.googleapis.com/maps/api/js?key=" + API_key + "&libraries=places"}
        onLoad={initialize}
      />
      <div id="searchmap"></div>
      <form
        className={classes.search}
        onSubmit={codeAddress}
        className={classes.search_wrap}
      >
        <div className={classes.search_box}>
          <input
            id="address"
            placeholder="Enter address or zip code"
            type="textbox"
            ref={inputRef}
          />
          <button onClick={codeAddress}>Go</button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
