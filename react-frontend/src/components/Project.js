import './Project.css'
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import HWSet from './HWSet';

export default function Project (props) {
    var [status, setStatus] = useState("Join")

    let myAsyncFunction = async (url) => {
        const response = await fetch(url)
        let responseJson = await response.json()
        console.log("response", responseJson)

        var action = url.split("/")
        action = action[3]

        if(action == "joinproject"){
            alert("Joined " + responseJson["id"])
        }else if (action == "leaveproject"){
            alert("Left " + responseJson["id"])
        }
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
        var url = "http://127.0.0.1" + change + "/" + props.projectId
        myAsyncFunction(url)
    }

    
    return(
        <table>
            <tr>
                <td className='projectTD'>Project Name {props.projectId}</td>
                <td className='projectTD'>list of authorized users</td>
                <td className='projectTD'>
                    <HWSet projectId={props.projectId} hwSetID={1}/>
                    <HWSet projectId={props.projectId} hwSetID={2}/>
                </td>
                <td className='projectTD'>
                    <Button variant="contained" onClick={handleChange}>{status}</Button>
                </td>
            </tr>
        </table>
    )

}