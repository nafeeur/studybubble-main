import StudyList from "./StudyList";
import classes from "./SearchResults.module.css";
import { useState } from "react";
import Script from "react-load-script"; // Import react script library to load Google object
import SearchBar from "./SearchBar";
import Tilt from 'react-vanilla-tilt'
import Bubble from "../../pages/Bubble";

function SearchResults(props) {
  const [lat, setLat] = useState(40.6284755);
  const [long, setLng] = useState(-73.9881622);
  const [zoom, setZoom] = useState(12);
  const [locationList, setLocationList] = useState([]);
  const [tempList, setTempList] = useState([]);
  const API_key = process.env.REACT_APP_API_KEY; //Google API key

  /*global google*/ // To disable any eslint 'google not defined' errors
  function initialize() {
    //initializes results based on some default parameters upon loading the page
    var temp = new google.maps.LatLng(lat, long);
    var map = new google.maps.Map(document.getElementById("map"), {
      center: temp,
      zoom: 12,
    });

    var request = {
      //define the search parameters
      location: temp,
      radius: "500",
      query: "libraries",
    };

    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
  }

  function callback(results, status) {
    setTempList([]);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        if (
          //only save the results that have at least one photo and are currently operational (not closed)
          typeof place.photos !== "undefined" &&
          place.business_status == "OPERATIONAL"
        ) {
          tempList.push(place);
        }
      }
      setLocationList(tempList);
    }
    //console.log(locationList);
  }

  function newSearch() {
    //resets search results and makes a new search
    //console.log("lat:", lat);
    //console.log("long:", long);
    setLocationList([]); //purge results of previous search by resetting locationList to an empty array
    setZoom(12);
    var temp = new google.maps.LatLng(lat, long);
    var map = new google.maps.Map(document.getElementById("map"), {
      center: temp,
      zoom: 12,
    });

    var request = {
      //define search parameters
      location: temp,
      radius: "500",
      query: "libraries",
    };
    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
  }

  function goToLocation() {
    //function for changing map view to specific location in list of locations
    {
      var location = new google.maps.LatLng(lat, long);
      var map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 15,
      });
    }
  }

  return (
   
    <section className={classes.main}>
       
      <Script
        url={"https://maps.googleapis.com/maps/api/js?key=" + API_key + "&libraries=places"}
        onLoad={initialize}
      />
   
      <SearchBar
        setLat={(value) => setLat(value)}
        setLng={(value) => setLng(value)}
        newSearch={newSearch}
      />
       <Bubble>      </Bubble>
      <div className={classes.mapcontainer} id="map"></div>
      
      <h1 className={classes.listheading}>Recommended Results</h1>

      <div className={classes.studylist} onChange={initialize}>
    
       <StudyList
          locationList={locationList}
          goToLocation={goToLocation}
          setLat={(value) => setLat(value)}
          setLng={(value) => setLng(value)}
          setZoom={(value) => setZoom(value)}
        />
        
        
      </div>
      
    </section>
  
  );
}

export default SearchResults;
