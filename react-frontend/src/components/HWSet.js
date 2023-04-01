import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import "./HWSet.css"

export default function HWSet(props) {
    const [capacity, setCapacity] = useState([])
    var [available, setAvailable] = useState([])
    var [checkedout, setCheckedOut] = useState([])
    var [entered, setEntered] = useState(0)
    useEffect(() => {setCapacity(props.capacity)}, [props.capacity])
    useEffect(() => {setAvailable(props.availability)},[props.availability])
    const getcheckedouturl = "http://127.0.0.1/getcheckedout/" + props.projectId
    const hwsetid = props.hwSetID
    useEffect(() => {getCheckedOut(getcheckedouturl, hwsetid).then(setCheckedOut)},[getcheckedouturl, hwsetid])

    let getCheckedOut = async (url, hwsetid) => {
        const response = await fetch(url)
        let responseJson = await response.json()
        console.log("Checked Out", responseJson)
        setCheckedOut(responseJson[hwsetid])
        return responseJson[hwsetid]
    }

    const handleChange = (event) => {
        setEntered((Number) (event.target.value))
    }

    let myAsyncFunction = async (url) => {
        const response = await fetch(url)
        let responseJson = await response.json()
        setAvailable(responseJson["availability"])
        alert(responseJson["message"])
        console.log("response", responseJson)
    }

    const checkOut = (event) =>{
        var checkedOut = entered

        if(checkedOut > available){
            checkedOut = available
        }

        var new_available = available - checkedOut
        setAvailable(new_available)
        event.preventDefault();

        var url = "http://127.0.0.1/checkout/" + props.projectId + "/" + props.hwSetID + "/" + checkedOut
        myAsyncFunction(url) 
        
        getCheckedOut(getcheckedouturl, hwsetid)

        console.log("capacity " + capacity)
        console.log("availability " + available)
    }

    const checkIn = (event) => {
        var checkedIn = entered

        if(checkedIn < 0){
            checkedIn = 0
        }
        event.preventDefault();

        var url = "http://127.0.0.1/checkin/" + props.projectId + "/" + props.hwSetID + "/" + checkedIn
        myAsyncFunction(url)

        getCheckedOut(getcheckedouturl, hwsetid)

        console.log("capacity " + capacity)
        console.log("availability " + available)
    }

    return(
        <table className='hwSetTable'>
            <tr>
                <td className='title'>
                    {props.hwSetID}
                </td>
                <td className='amount'>
                    <tr>Checked Out: {checkedout}</tr>
                </td>
                <td className='amount'>
                    <tr>Capacity: {capacity}</tr>
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
