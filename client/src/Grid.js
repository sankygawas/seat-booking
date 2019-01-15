import React, { Component } from 'react';
import Seat from './Seat'

class Grid extends Component {

  state = {
      rows : []
  }

  componentDidMount =()=>{
    const arr = [
      {
          rowName : 'A',
          seats : { 'A1':{booked:false},'A2':{booked:false} ,'A3':{booked:false} ,'A4':{booked:false} ,'A5':{booked:false} ,'A6':{booked:false} ,'A7':{booked:false}  }
      },
      {
        rowName : 'B',
        seats : { 'B1':{booked:false},'B2':{booked:false} ,'B3':{booked:false} ,'B4':{booked:false} ,'B5':{booked:true} ,'B6':{booked:true} ,'B7':{booked:true}  }
    },
    ]
    this.setState({rows:arr})
    
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
