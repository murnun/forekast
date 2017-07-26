import React, { Component } from 'react';

// Presentation comps
import { Grid, Row, Col, Glyphicon, Modal, Media } from 'react-bootstrap';

class CityInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
          showModal: true
        }
        this._close = this._close.bind(this);
    }

    _close(){
        this.setState({
          showModal: false
        });
    }

    render(){

        return(<Modal show={this.state.showModal} onHide={this._close}>
                <Modal.Body>
                    <Row>
                      <Media>
                          <Media.Left align="top">
                            <img width={64} height={64} src="#" alt="Image"/>
                          </Media.Left>
                          <Media.Body>
                            <Media.Heading>{this.props.weatherInfo.name}</Media.Heading>
                            <p>{}</p>
                            <p>Donec sed odio dui.</p>
                          </Media.Body>
                        </Media>
                    </Row>
                    <Row>
                    </Row>
                </Modal.Body>
              </Modal>);

    }
}

export default CityInfo;
