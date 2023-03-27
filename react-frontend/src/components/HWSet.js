import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import "./HWSet.css"

export default function HWSet(props) {
    var [qty, setQty] = useState(0)
    var [available, setAvailable] = useState(100)
    var [entered, setEntered] = useState(0)

    const handleChange = (event) => {
        setEntered((Number) (event.target.value))
    }

    let myAsyncFunction = async (url) => {
        // console.log("count")
        // let dict = {
        //     method : "POST",
        //     mode: "cors",
        //     body: JSON.stringify({
        //         total : count
        //     })
        // }

        const response = await fetch(url)
        let responseJson = await response.json()
        console.log("response", responseJson)

        var action = url.split("/")
        action = action[3]

        if (action == "checkout"){
            alert(responseJson["count"] + " hardware checked out")
        }else if (action == "checkin"){
            alert(responseJson["count"] + " hardware checked in")
        }
    }

    const checkOut = (event) =>{
        var count = entered + qty
        var checkedOut = entered

        if(count > available){
            count = available
            checkedOut = available - qty
        }
        setQty(count)
        event.preventDefault();
        var url = "http://127.0.0.1/checkout/" + props.projectId + "/" + checkedOut
        myAsyncFunction(url)
    }

    const checkIn = (event) => {
        var count = qty - entered
        var checkedIn = entered

        if(count < 0){
            count = 0
            checkedIn = qty
        }
        setQty(count)
        event.preventDefault();
        var url = "http://127.0.0.1/checkin/" + props.projectId + "/" + checkedIn
        myAsyncFunction(url, " hardware checked in.")
    }

    return(
        <table className='hwSetTable'>
            <tr>
                <td className='title'>
                    HW Set {props.number}
                </td>
                <td className='amount'>
                    {qty}/{available}
                </td>
                <td>
                    <TextField id="outlined-basic" label="Enter quantity" variant="outlined" onChange={handleChange}/>
                </td>
                <td>
                    <Button variant="contained" onClick={checkOut}>Check Out</Button>
                </td>
                <td>
                    <Button variant="contained" onClick={checkIn}>Check In</Button>
                </td>
            </tr>
        </table>
    )
}
