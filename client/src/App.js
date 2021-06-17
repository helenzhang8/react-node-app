import React from "react";
import logo from './logo.svg';
import './App.css';
import Map from './MapViewScratch.js';

function App() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        setTimeout(()=>{
            fetch("/api")
                .then((res1) => res1.json())
                .then((res2) => {
                    setData(res2.message)});},100)
    }, []);

    return (
        <div className="App">
            {/*<div>*/}
            {/*    {data.map((d) => <li key={d._id}>{d._id},{d.latlon},{d.status.toString()}</li>)}*/}
            {/*</div>*/}
            <Map allLocations={data} setMarkerToDisplay={null}/>
        </div>
    );
}

export default App;

