import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import "./HWSet.css"

export default function HWSet(props) {
    const [capacity, setCapacity] = useState([])
    var [qty, setQty] = useState(0)
    var [available, setAvailable] = useState([])
    var [entered, setEntered] = useState(0)
    useEffect(() => {setCapacity(props.capacity)}, [props.capacity])
    useEffect(() => {setAvailable(props.availability)},[props.availability])

    const handleChange = (event) => {
        setEntered((Number) (event.target.value))
    }

    let myAsyncFunction = async (url) => {
        const response = await fetch(url)
        let responseJson = await response.json()
        console.log("response", responseJson)
    }

    const checkOut = (event) =>{
        var checkedOut = entered

        if(checkedOut > available){
            checkedOut = available
        }

        var new_available = available - checkedOut
        setQty(checkedOut + qty)
        setAvailable(new_available)
        event.preventDefault();
    
        var url = "http://127.0.0.1/sethwset" + props.hwSetID + "availability/" + available + "/" + new_available
        myAsyncFunction(url)
        var url = "http://127.0.0.1/checkout/" + props.projectId + "/" + checkedOut
        myAsyncFunction(url)

        alert(checkedOut + " hardware checked out")
        console.log("capacity " + capacity)
        console.log("availability " + available)
    }

    const checkIn = (event) => {
        var count = qty - entered
        var checkedIn = entered

        if(count < 0){
            count = 0
            checkedIn = qty
        }
        setQty(count)
        var new_available = available + checkedIn
        setAvailable(new_available)
        event.preventDefault();

        var url = "http://127.0.0.1/sethwset" + props.hwSetID + "availability/" + available + "/" + new_available
        myAsyncFunction(url)
        var url = "http://127.0.0.1/checkin/" + props.projectId + "/" + checkedIn
        myAsyncFunction(url, " hardware checked in.")

        alert(checkedIn + " hardware checked in")
        console.log("capacity " + capacity)
        console.log("availability " + available)
    }

    return(
        <table className='hwSetTable'>
            <tr>
                <td className='title'>
                    HW Set {props.number}
                </td>
                <td className='amount'>
                    <tr>Checked Out: {qty}</tr>
                    <tr>Available: {available}</tr>
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
