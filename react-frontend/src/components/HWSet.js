import React, {useState, Component} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import "./HWSet.css"

export default function HWSet(props) {
    const [qty, setQty] = useState(0)
    const [available, setAvailable] = useState(100)
    const [entered, setEntered] = useState(0)

    const handleChange = (event) => {
        setEntered((Number) (event.target.value))
    }

    let myAsyncFunction = async (url, count) => {
        console.log("count", count)
        let dict = {
            method : "POST",
            mode: "cors",
            body: JSON.stringify({
                total : count
            })
        }
        const response = await fetch(url, dict)
        console.log("response", await response.json())
    }

    const checkOut = (event) =>{
        var count = entered + qty

        if(count > available){
            count = available
        }
        setQty(count)
        event.preventDefault();
        myAsyncFunction('http://127.0.0.1/checkout', count)
    }
    
    const checkIn = (event) => {
        var count = qty - entered;

        if(count < 0){
            count = 0
        }
        setQty(count)
        event.preventDefault();
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
