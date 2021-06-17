import * as React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {useState} from "react";
import {Button, Fade} from "@material-ui/core";
// import PulsingDot from "../assets/PulsingDot/PulsingDot";
// import {enums} from "../utils/enums";
// import 'mapbox-gl/dist/mapbox-gl.css';

const token = 'pk.eyJ1IjoiYmxibGJsNDQiLCJhIjoiY2twcGY2OTN0MGZqazJ1cWpoM2h5eDl5NSJ9.5uYgki649OhuoI6Bw7R3ag'


export default function Map({allLocations, setMarkerToDisplay}) {
    // console.log("allLocations", allLocations)
    const [viewport, setViewport] = React.useState({
        longitude: allLocations.length > 0 ? parseFloat(allLocations[0].latlon.split(", ")[1]) : -73.9361965,
        latitude: allLocations.length > 0 ? parseFloat(allLocations[0].latlon.split(", ")[0]) : 40.6780116,
        zoom: 20
    });

    const [userLocation, setUserLocation] = useState({
        longitude: -73.9361965,
        latitude: 40.6780116,
    })

    function locateUser() {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position)
            setViewport({longitude: position.coords.longitude, latitude: position.coords.latitude, zoom: 20})
            setUserLocation({longitude: position.coords.longitude, latitude: position.coords.latitude})
        });
    }

    function deduceIconType(locationObject) {
        if (locationObject === true){
            return (
                <p>🚘</p>
            )
        } else {
            return (
                <p>🅿️</p>
            )
        }
    }

    return (
        <Fade in timeout={1000}>
            <div style={{position: "fixed", top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1}}>

                <ReactMapGL mapboxApiAccessToken={token} {...viewport} width="100%" height={'100vh'}
                            onViewportChange={setViewport}
                            mapStyle={'mapbox://styles/blblbl44/ckpu5h6mz30ti17s9c9o19y8s'}
                >
                    {allLocations.map(location => {
                        return (
                            <CustomMarker key={location._id} latitude={parseFloat(location.latlon.split(", ")[0])}
                                          longitude={parseFloat(location.latlon.split(", ")[1])} viewport={viewport}
                                          name={location._id} setMarkerToDisplay={setMarkerToDisplay}
                                          icon={deduceIconType(location.status)}
                                          locationObject={location}
                            />)
                    })}

                    <CustomMarker
                        latitude={userLocation.latitude}
                        longitude={userLocation.longitude}
                        name={"You Are Here"}
                        viewport={viewport}
                        // icon={<PulsingDot/>}
                        setMarkerToDisplay={null}
                    />

                </ReactMapGL>

                <Button style={{
                    position: "fixed",
                    bottom: 30,
                    right: 20,
                    backgroundColor: "green",
                    color: "white",
                }}
                        variant={"contained"}
                        aria-label="add"
                        onClick={() => locateUser()}>
                    Locate Me
                </Button>
            </div>
        </Fade>
    );
}

function CustomMarker(props) {
    const [showPopup, togglePopup] = React.useState(false);

    const {longitude, latitude, setMarkerToDisplay, icon, locationObject} = props;

    return (
        <div style={{transition: "ease-in"}}>
            <Marker latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
                <div onClick={() => {
                    togglePopup(!showPopup)
                    setMarkerToDisplay(locationObject)
                }}>{icon}</div>
            </Marker>
            {/*// uncomment if we want to have a pop up when the marker is clicked*/}
            {/*{showPopup && <Popup*/}
            {/*    latitude={latitude} longitude={longitude}*/}
            {/*    closeButton={true}*/}
            {/*    closeOnClick={false}*/}
            {/*    onClose={() => togglePopup(false)}*/}
            {/*    anchor="top">*/}
            {/*    <Grid container alignContent={"center"} alignItems={"center"}>*/}
            {/*        <Grid item xs={12}>*/}
            {/*            <Typography><strong>{name}</strong></Typography>*/}
            {/*        </Grid>*/}

            {/*        <Grid item xs={12}>*/}
            {/*            <Typography>category</Typography>*/}
            {/*        </Grid>*/}

            {/*    </Grid>*/}
            {/*</Popup>}*/}
        </div>
    );
}
