import fs from 'fs';

let rowsArray = [
    {
        rowName : 'A',
        seats : { 'A1':{booked:true},'A2':{booked:false} ,'A3':{booked:false} ,'A4':{booked:false} ,'A5':{booked:false} ,'A6':{booked:false} ,'A7':{booked:false}  }
    },
    {
      rowName : 'B',
      seats : { 'B1':{booked:false},'B2':{booked:false} ,'B3':{booked:false} ,'B4':{booked:false} ,'B5':{booked:true} ,'B6':{booked:true} ,'B7':{booked:true}  }
  },
]

exports.getCurentSeats = (req, res) => {
    res.json({ rowsArray: rowsArray });
}