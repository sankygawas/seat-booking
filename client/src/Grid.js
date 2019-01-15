import React, { Component } from 'react';
import Seat from './Seat'
import axios from 'axios';

class Grid extends Component {

  state = {
      rows : []
  }

  //initialize the state of the componenent be getting data from server
  async componentDidMount(){
    const data = await this.loadAvailableSeatsFromServer();
    this.setState({rows:data}) 
   
  }

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

  handleBooking = (seatId,rowName)=>{
    const newRows = this.state.rows.map(row=>{
      if(row.rowName === rowName){
          row.seats[seatId].booked = !row.seats[seatId].booked;
          return row;
      } else 
      return row;
    })
    this.setState(newRows);
  }

  render() {
    return (
      <div className="container">
        <div className="mt-5 w-50 mx-auto">
            {this.state.rows.map(row=>{
              const rowSeats = Object.keys(row.seats).map(seatId=>{
                    return <Seat key={seatId} row={row} seatId={seatId} booked={row.seats[seatId].booked} onBook={this.handleBooking}/>
                })
                rowSeats.push(<br/>) 
                return rowSeats;
            })}
        </div>
      </div>
    );
  }
}

export default Grid;
