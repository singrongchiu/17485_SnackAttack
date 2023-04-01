import './Project.css'
import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import HWSet from './HWSet';

export default function Project (props) {
    var [status, setStatus] = useState("Join")
    const [hwSet1Cap, setHwSet1Cap] = useState([])
    const [hwSet2Cap, setHwSet2Cap] = useState([])
    useEffect(() => {getCapacity("http://127.0.0.1/hwset1cap").then(setHwSet1Cap)},[]);
    useEffect(() => {getCapacity("http://127.0.0.1/hwset2cap").then(setHwSet2Cap)},[]);

    let myAsyncFunction = async (url) => {
        const response = await fetch(url)
        let responseJson = await response.json()
        console.log("response", responseJson)

        var action = url.split("/")
        action = action[3]

        if(action === "joinproject"){
            alert("Joined " + responseJson["id"])
        }else if (action === "leaveproject"){
            alert("Left " + responseJson["id"])
        }
    }

    let getCapacity = async (url) => {
        const response = await fetch(url)
        let responseJson = await response.json()
        console.log("response", responseJson)
        return responseJson["capacity"]
    }
    

    const handleChange = (event) => {
        var change;

        if(status === 'Join'){
            setStatus("Leave")
            change = "joinproject"
        }else{
            setStatus("Join")
            change = "leaveproject"
        }
        var url = "http://127.0.0.1/" + change + "/" + props.projectId
        myAsyncFunction(url)
    }

    
    return(
        <table>
            <tr>
                <td className='projectTD'>Project Name {props.projectId}</td>
                <td className='projectTD'>
                    <HWSet projectId={props.projectId} hwSetID={1} capacity={hwSet1Cap}/>
                    <HWSet projectId={props.projectId} hwSetID={2} capacity={hwSet2Cap}/>
                </td>
                <td className='projectTD'>
                    <Button variant="contained" onClick={handleChange}>{status}</Button>
                </td>
            </tr>
        </table>
    )

}