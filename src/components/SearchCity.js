import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeatherInfo } from '../actions';

// Presentation comps
import { Grid, Row, Col, FormGroup, FormControl,
        InputGroup, Button, Glyphicon, Modal } from 'react-bootstrap';

class SearchCity extends Component{

    constructor(props){
        super(props);

        this.state = {
            city: '',
            showModal: false,
            weatherInfo: {}
        }

        this._search = this._search.bind(this);
        this._updateCity = this._updateCity.bind(this);
        this._close = this._close.bind(this);
    }

    _search(){
        if(this.state.city.length === 0){
          return false;
        }
        this.setState({
          showModal: true,
        }, ()=>{
          this.props.dispatch(fetchWeatherInfo(this.state.city));
        });
    }

    _updateCity(e){
        this.setState({
          city: e.target.value
        });
    }

    _close(){
        this.setState({
          showModal: false
        }, ()=>{
          console.log(this.state)
        });
    }

    render(){
        let cityModal = null;

        if(this.props.weatherInfo){
            let weatherIcon = null,
                currentTime = new Date().getTime(),
                sunrise = this.props.weatherInfo.sys.sunrise,
                sunset = this.props.weatherInfo.sys.sunset;

            weatherIcon = `owf owf-5x animate owf-${this.props.weatherInfo.weather[0].id}`;
            weatherIcon += (currentTime > sunrise && currentTime<sunset)? `-d` : `-n`;

            cityModal = <Modal show={this.state.showModal} onHide={this._close} dialogClassName="resizeModal">
                          <Modal.Header><h2>{this.props.weatherInfo.name}</h2></Modal.Header>
                          <Modal.Body>
                              <Row>
                                <Col md={2}>
                                  <i className={weatherIcon}></i>
                                </Col>
                                <Col md={5}>
                                  <p>Current Temp:</p>
                                  <div className="weatherTemp">
                                    {this.props.weatherInfo.main.temp}
                                    <span>&#8457;</span>
                                  </div>
                                  <p>...and {this.props.weatherInfo.weather[0].description}</p>
                                </Col>
                                <Col md={5} className="weatherDetails">
                                  <h3>Details</h3>
                                  <p>Max Temp: {this.props.weatherInfo.main.temp_max}&#8457;</p>
                                  <p>Min Temp: {this.props.weatherInfo.main.temp_min}&#8457;</p>
                                  <p>Humidity: {this.props.weatherInfo.main.humidity}%</p>
                                  <p>Pressure: {this.props.weatherInfo.main.pressure} hPa</p>
                                </Col>
                              </Row>
                          </Modal.Body>
                        </Modal>
        }

        return(<Grid fluid={true} id="searchBar">
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <InputGroup>
                        <InputGroup.Addon><Glyphicon glyph="glyphicon glyphicon-search" /></InputGroup.Addon>
                        <FormControl type="text" placeholder="enter city name here..." value={this.state.city}
                            onChange={e => this._updateCity(e)} autoFocus />
                        <InputGroup.Button>
                          <Button onClick={this._search}>Search</Button>
                        </InputGroup.Button>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                {cityModal}
              </Grid>);
    }

}

function mapStateToProps(state){
    return {
      weatherInfo: state.weatherInfo.data
    }
}

SearchCity = connect(mapStateToProps)(SearchCity);

export default SearchCity;
