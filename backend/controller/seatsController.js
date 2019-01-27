import fs from 'fs';

let rowsArray = [
    {
        rowName : 'A',
        seats : { 'A1':{booked:false},'A2':{booked:false} ,'A3':{booked:false} ,'A4':{booked:false} ,'A5':{booked:false} ,'A6':{booked:false} ,'A7':{booked:false}  }
    },
    {
      rowName : 'B',
      seats : { 'B1':{booked:false},'B2':{booked:false} ,'B3':{booked:false} ,'B4':{booked:false} ,'B5':{booked:false} ,'B6':{booked:false} ,'B7':{booked:false}  }
  },{
    rowName : "C",
    seats : { "C1":{booked:false},"C2":{booked:false} ,"C3":{booked:false} ,"C4":{booked:false} ,"C5":{booked:false} ,"C6":{booked:false} ,"C7":{booked:false}  }
},
{
  rowName : "D",
  seats : { "D1":{booked:false},"D2":{booked:false} ,"D3":{booked:false} ,"D4":{booked:false} ,"D5":{booked:true} ,"D6":{booked:true} ,"D7":{booked:true}  }
}
]

exports.getCurentSeats = (req, res) => {
    res.json({ rowsArray: rowsArray });
}


exports.doSeatbook  =(req,res)=>{
    const {rowName,seatId,sessionId} = req.body;
    console.log(sessionId);

    let errorMessage = ``;
    
    const newRows = rowsArray.map(row=>{
        if(row.rowName === rowName){

            //if not booked, book the seat with its sessionId
            if(!row.seats[seatId].booked){
                row.seats[seatId].booked =true;
                row.seats[seatId].sessionId = sessionId;
            }
            //else if booked and same session user is editing,allow he user to unbook
            else if(row.seats[seatId].booked && row.seats[seatId].sessionId === sessionId){
                row.seats[seatId].booked = false;
                delete row.seats[seatId].sessionId 
            }
            //else if booked and some other ession user eidting, throw error
            else{
                errorMessage = 'This seat is recently booked. Please look for an alternative seat.'
            }
            return row;
        } else 
        return row;
      })

      console.log(JSON.stringify(newRows));
      
    if(errorMessage)
        res.json({ rowsArray: newRows,errorMessage});
    else
        res.json({ rowsArray: newRows});
}