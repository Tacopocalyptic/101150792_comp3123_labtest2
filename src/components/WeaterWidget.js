import React from "react";
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

export default class WeatherWidget extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      location: 'Toronto',
      data: {}
    }
  }

  getWeather = async() => {
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&appid=${API_KEY}`)
    .then(res => {
      // console.log(res.data);
      const weatherData = res.data;
      this.setState({data: weatherData})
      this.setState({isLoading: false})
      // console.log(weatherData)
    })
    .catch(e => {
      console.log(e)
    })
  }

  componentDidMount() {
    this.getWeather()
    // console.log(this.state.data.weather)
  }

  // should probably refactor to change loading state only when FULLY loaded but whatever
  render() {
    return this.state.isLoading ? <div>Loading...</div>
    :
    (
      <div className="row d-flex justify-content-center py-5">
      <div className="col-md-8 col-lg-6 col-xl-5">
      
      <div className="d-flex">
        <input className="form-control me-2" type="text" placeholder="Search by city..." 
        name="search" id="search" onChange={(e) => {this.setState({location: e.target.value})}}/>
        <button className="btn btn-primary" type="button" onClick={() => {this.setState({isLoading:true});this.getWeather()}}>Search</button>
      </div>
    
        <div className="card text-body">
          <div className="card-body p-4">
    
            <div className="d-flex">
              <h6 className="flex-grow-1">{this.state.data.name}</h6>
              <h6>{new Date().getHours()}:{new Date().getMinutes()}</h6>
            </div>
    
            <div className="d-flex flex-column text-center mt-5 mb-4">
              <h6 className="display-4 mb-0 font-weight-bold">
                {this.state.data.main ? Math.round(this.state.data.main.temp-273.15) : ""}°C
              </h6>
              <span className="small">{this.state.data.weather ? this.state.data.weather[0].main : ""}</span>
            </div>

            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <div><i className="fas fa-wind fa-fw"></i> <span className="ms-1">
                  {this.state.data.weather ? this.state.data.weather[0].description : ""}
                  </span>
                </div>
                <div><i className="fas fa-tint fa-fw"></i> <span className="ms-1"> 
                  Humidity: {this.state.data.main ? this.state.data.main.humidity : ""}%
                  </span></div>
                <div><i className="fas fa-sun fa-fw"></i> <span className="ms-1"> 
                  Wind Speed: {this.state.data.wind ? this.state.data.wind.speed : ""} m/s
                  </span></div>
              </div>
              <div>
                <img src={`https://openweathermap.org/img/wn/${this.state.data.weather ? 
                  this.state.data.weather[0].icon : ""}@2x.png`} width="100px"/>
              </div>
            </div>
    
          </div>
        </div>
    
      </div>
    </div>
    )
  }
}