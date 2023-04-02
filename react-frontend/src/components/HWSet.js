import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import "./HWSet.css"

export default function HWSet(props) {
    const [capacity, setCapacity] = useState([])
    var [available, setAvailable] = useState([])
    var [entered, setEntered] = useState(0)
    var [checkedout, setCheckedOut] = useState([])
    useEffect(() => {setCapacity(props.capacity)}, [props.capacity])
    useEffect(() => {setAvailable(props.availability)},[props.availability])
    useEffect(() => {setCheckedOut(props.checkedout)},[props.checkedout])

    const handleChange = (event) => {
        setEntered((Number) (event.target.value))
    }

    let myAsyncFunction = async (url) => {
        const response = await fetch(url)
        let responseJson = await response.json()
        setAvailable(responseJson["availability"])
        alert(responseJson["message"])
        console.log("response", responseJson)
        console.log(typeof responseJson["checkedout"])
        return parseInt(responseJson["checkedout"])
    }

    const checkOut = async(event) =>{
        var checkedOut = entered

        if(checkedOut > available){
            checkedOut = available
        }

        var new_available = available - checkedOut
        setAvailable(new_available)
        event.preventDefault();

        var url = "http://127.0.0.1/checkout/" + props.projectId + "/" + props.hwSetID + "/" + checkedOut
        let response = await myAsyncFunction(url)

        console.log(response)
        setCheckedOut(response)
    }

    const checkIn = async(event) => {
        var checkedIn = entered

        if(checkedIn < 0){
            checkedIn = 0
        }
        event.preventDefault();

        var url = "http://127.0.0.1/checkin/" + props.projectId + "/" + props.hwSetID + "/" + checkedIn
        let response = await myAsyncFunction(url)

        console.log(response)
        setCheckedOut(response)
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
                </td>
                <td className='amount'>
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
