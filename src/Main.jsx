import React from 'react'
import "./main.css"
import {songs} from "./data";
import {DataLayerValue} from "./DataLayer";

const Main = () => {
    const [{curr},dispatch] = DataLayerValue();

    const loadSong=(key)=>{
          dispatch({
              type: 'SET_CURR',
              curr: key
          })
    }
    
    return (
        <div className="body">
            <div className="leftSide">

            <img src={songs[curr].imgsrc } alt="banner"></img>
                <div className="details">
                    <h2>{songs[curr].name}</h2>
                    <h6>{songs[curr].artists}</h6>
                </div>
            </div>

            <div className="playlist">
                <h2>PLAYLIST</h2><br/>
                <hr/>
                {
                    songs.map((song ,key)=>{
                        return <div className="item" onClick={()=>{loadSong(key)}} key={key}>
                                    <img src={song.imgsrc} alt=""/>
                                    <div className="item_details">
                                        <h6>{song.name}</h6>
                                        <h6>{song.artists}</h6>
                                    </div>
                                </div>
                             })
                }

            </div>
        </div>
    )
}

export default Main
