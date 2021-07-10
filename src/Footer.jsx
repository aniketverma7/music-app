import React,{useState,useRef, useEffect} from 'react'
import "./footer.css"
import { songs } from './data'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import {DataLayerValue} from "./DataLayer";
const Footer = () => {

    const [{curr},dispatch] = DataLayerValue();
    const audioEl = useRef(songs[curr]);
    const nextSong=()=>{
        dispatch({
            type:'SET_CURR',
            curr: (curr+1)%songs.length
        })
    };

    const prevSong=()=>{
        if(curr > 0 && curr <songs.length){
            dispatch({
                type:'SET_CURR',
                curr: curr-1
            })
        }
        else {
            dispatch(
                {
                    type:'SET_CURR',
                    curr: songs.length-1
                }
            )
        }    
    }

    
    
    useEffect(()=>{
       if(isPlaying){
           audioEl.current.play()
           return;
       }
    },[curr])

    const[isPlaying ,setIsPlaying]= useState(false);
    
    const handlePlaying=()=>{
        if(isPlaying===true){
            audioEl.current.pause();
            setIsPlaying(false);
            
        }
        else{
            audioEl.current.play();
            setIsPlaying(true);
            
        }
    }
   

   


    return (
        <div className="footer">

            <audio ref={audioEl} src={songs[curr].src} onEnded={nextSong}></audio>
            <Slider 
                className="duration_slider"
                step={1}
                onChange={(e , val)=>{ 
                    if((audioEl.current.duration)){
                        (audioEl.current.currentTime = audioEl.current.duration * (val/100) )
                    }
                }}
            />
            <div className="song_details">
                <img src={songs[curr].imgsrc} alt="songImage"/>
                <div className="details">
                    <p className="song_name">{songs[curr].name}</p>
                    <p className="artists">{songs[curr].artists}</p>
                </div>
            </div>
            <div className="controls">
                <div className="left">
                    <SkipPreviousIcon onClick={()=> prevSong()} className="icons"/>
                    
                    
                    {
                        !isPlaying ?<PlayCircleOutlineIcon onClick={()=>{handlePlaying()}} className="icons" fontSize="large"/>:
                        <PauseCircleOutlineIcon onClick={()=>{handlePlaying()}} className="icons" fontSize="large"/>
                    }

                    <SkipNextIcon onClick={()=> nextSong()} className="icons"/>
                </div>
                <div className="right">
                <Grid container spacing={2}>
                    <Grid item>
                    <VolumeDown className="icons" />
                    </Grid>
                    <Grid item xs>
                    <Slider 
                        className="slider" 
                        aria-labelledby="continuous-slider"
                        min={0}
                        onChange={(e , val)=>{audioEl.current.volume = val/100}}
                        defaultValue={100}
                        step={1}
                        max={100} 
                        valueLabelDisplay="auto"
                    />
                    </Grid>
                    <Grid item>
                    <VolumeUp className="icons" />
                    </Grid>
                </Grid>
                </div>
            </div>
        </div>
    )
}

export default Footer
