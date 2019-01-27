import React, { Component } from 'react';
import Seat from './Seat'
import axios from 'axios';
import uuid from "uuid";

import ErrorView from './ErrorView'

class Grid extends Component {
  constructor(){
    super();
    this.sessionId = uuid.v4();
  }

  state = {
      rows : [],
      showError : ``
  }

  //API calls

 //async call to get data from the server
  loadAvailableSeatsFromServer = ()=>{
    return new Promise(resolve=>{
        axios.get('/api/currentSeats')
        .then(function (response) {
          resolve(response.data.rowsArray);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  //async call to book the desired Seat
  requestSeatBooking=(seatId,rowName)=>{
      return new Promise(resolve=>{
        axios.post('/api/bookSeat', {
          rowName,
          seatId,
          sessionId:this.sessionId
        })
        .then(function (response) {
          
          let data = response.data.rowsArray
          if(response.errorMessage !== undefined)
            resolve({data});
          else
            resolve({data,errorMessage:response.data.errorMessage})
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  //initialize the state of the componenent after getting data from server
  async componentDidMount(){
    const data = await this.loadAvailableSeatsFromServer();
    this.setState({rows:data}) 
   
  }

   //set state after booking th seat
   handleBooking = async (seatId,rowName)=>{
    const {data,errorMessage} = await this.requestSeatBooking(seatId,rowName);
    if(errorMessage !== undefined)
      this.setState({rows:data,showError:errorMessage}) 
    else
      this.setState({rows:data}) 

  }


  render() {
    return (
      <div className="container">
      {this.state.error}
        <ErrorView showError={this.state.showError}/>
        <div className="mt-5 w-50 mx-auto">
            {this.state.rows.map((row,i)=>{
              const rowSeats = Object.keys(row.seats).map(seatId=>{
                    return <Seat key={seatId} row={row} seatId={seatId} mySession={this.sessionId === row.seats[seatId].sessionId} booked={row.seats[seatId].booked} onBook={this.handleBooking}/>
                })
                rowSeats.push(<br key={i}/>) 
                return rowSeats;
            })}
        </div>
							<div className="text-center mt-5">All eyes this way please!</div>
      </div>
    );
  }
}

export default Grid;
