import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';
import day from "../assets/img/day.svg"
import night from "../assets/img/night.svg"

import { useStyle } from "./main-css";
import {data} from './data'


const Main = () => {
  const classes = useStyle();
  const [citySearch, setCity] = useState("");
  const [cityName,setCityName]=useState("")
  const [weather,setWeather]=useState("")
  const [temperature,setTemperature]=useState("")
  const [weatherIcon,setWeatherIcon]=useState("")

  const [timeImageUrl, setTiemUrl]=useState(null)
  const [loading,setLoading]=useState(false)
  const [loaded ,setLoaded]=useState(false)
  
  let cityData,weatherData

  const submitHandler=async ()=>{
    
    try {
      setLoaded(false)
      setLoading(true)
      let response =await data(citySearch)
      cityData=response.cityData.data[0]
      weatherData=response.weatherData.data[0]
      setCityName(cityData.EnglishName)
      setWeather(weatherData.WeatherText)
      setTemperature(weatherData.Temperature.Metric.Value)
      setWeatherIcon(weatherData.WeatherIcon)
      setLoading(false)
      setLoaded(true)
     
      weatherData.IsDayTime ? setTiemUrl(day) : setTiemUrl(night)
      window.scrollTo(0,document.body.scrollHeight);
    } catch (error) {
      
    }
   
    
  }

  const onChange = (event) => {
    setCity(event.target.value);
  };

let weatherDetails= (
  <Grid container direction="column" alignItems="center" style={{padding:"0em 0em 2em"}}>
    <Grid item>
      <img src={timeImageUrl} alt="time" style={{width:"400px"}}/>
      </Grid>
      <Grid  item className={classes.iconContainer} align="center">
   {weatherIcon &&  <img src={require(`../assets/img/icons/${weatherIcon}.svg`)} alt="" className={classes.icon} />}
    </Grid>
    <Grid item >
      <Typography variant="h2" style={{color:"grey",textDecoration:"underline",fontFamily:"Raleway",marginBottom:"0.6em"}}>
        {cityName}
      </Typography>
      <Typography variant="h4" style={{color:"grey",marginBottom:"0.2em"}}>
        {weather}
      </Typography>
      <Typography variant="h4" style={{color:"grey"}}>
        {temperature} C°
      </Typography>
    </Grid>
  </Grid>
)
 



  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      align="center"
      className={classes.container}
      style={{height:loaded ? "auto" :"50em" }}
    >
      <Grid item md>
        <Typography variant="h3" className={classes.title}>
          The Weather App
        </Typography>
      </Grid>
      <Grid item md>
        <Grid
          contanier
          direction="column"
          className={classes.textContainer}
          alignItems="center"
        >
          <Grid item>
            <TextField
              id="city"
              label="enter the city name"
              // error={phoneHelper.length !== 0}
              helperText={cityName}
              fullWidth
              value={citySearch}
              onChange={onChange}
              className={classes.text}
            />
          </Grid>
          <Grid item>
          {loading ? <CircularProgress />:
            <Button variant="contained" className={classes.Button} onClick={submitHandler} disabled={citySearch.length<=1}>
              Submit 
          </Button> }
          </Grid>
          
        </Grid>
      </Grid>
      <Grid item md  className={classes.weatherInfo}> 
      {loaded && weatherDetails}
      </Grid>
     
    </Grid>
  );
};

export default Main;
