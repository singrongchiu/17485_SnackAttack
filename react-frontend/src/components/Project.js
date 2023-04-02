import './Project.css'
import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import HWSet from './HWSet';

export default function Project (props) {
    // TO CHANGE
    const projectname = "newproject123"
    
    var [status, setStatus] = useState("Join")
    const [hwSet1Cap, setHwSet1Cap] = useState([])
    const [hwSet2Cap, setHwSet2Cap] = useState([])
    var [hwset1Avail, setHwSet1Avail] = useState([])
    var [hwset2Avail, setHwSet2Avail] = useState([])
    var [checkedouthwset1, setCheckedOutHwset1] = useState([])
    var [checkedouthwset2, setCheckedOutHwset2] = useState([])
    useEffect(() => {getCapacity("http://127.0.0.1/hwset1cap").then(setHwSet1Cap)},[])
    useEffect(() => {getCapacity("http://127.0.0.1/hwset2cap").then(setHwSet2Cap)},[])
    useEffect(() => {getAvailability("http://127.0.0.1/gethwset1availability").then(setHwSet1Avail)},[])
    useEffect(() => {getAvailability("http://127.0.0.1/gethwset2availability").then(setHwSet2Avail)},[])
    const getcheckedouturl = "http://127.0.0.1/getcheckedout/" + projectname
    useEffect(() => {getCheckedOutHWset1(getcheckedouturl).then(setCheckedOutHwset1)},[getcheckedouturl])
    useEffect(() => {getCheckedOutHWset2(getcheckedouturl).then(setCheckedOutHwset2)},[getcheckedouturl])

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

    let getCheckedOutHWset1 = async (url) => {
        const response = await fetch(url)
        let responseJson = await response.json()
        setCheckedOutHwset1(responseJson["HWSet1"])
        console.log("Checked Out hwset 2", responseJson["HWSet1"])
        return responseJson["HWSet1"]
    }

    let getCheckedOutHWset2 = async (url) => {
        const response = await fetch(url)
        let responseJson = await response.json()
        setCheckedOutHwset1(responseJson["HWSet2"])
        console.log("Checked Out hwset 2", responseJson["HWSet2"])
        return responseJson["HWSet2"]
    }

    let getCapacity = async (url) => { 
        const response = await fetch(url)
        let responseJson = await response.json()
        console.log("getCapacity", responseJson)
        return responseJson["capacity"]
    }

    let getAvailability = async (url) => {
        const response = await fetch(url)
        let responseJson = await response.json()
        console.log("getAvailability", responseJson)
        return responseJson["availability"]
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

    // NOTE: FOR NOW, project id is newproject123, project page will pass in project id later
    
    return(
        <table>
            <tr>
                <td className='projectTD'>Project Name {props.projectId}</td>
                <td className='projectTD'>
                    <HWSet projectId={projectname} hwSetID={"HWSet1"} checkedout={checkedouthwset1} capacity={hwSet1Cap} availability={hwset1Avail}/>
                    <HWSet projectId={projectname} hwSetID={"HWSet2"} checkedout={checkedouthwset2} capacity={hwSet2Cap} availability={hwset2Avail}/>
                    {/* <HWSet projectId={props.projectId} hwSetID={"HWSet1"} capacity={hwSet1Cap} availability={hwset1Avail}/>
                    <HWSet projectId={props.projectId} hwSetID={"HWSet1"} capacity={hwSet2Cap} availability={hwset2Avail}/> */}
                </td>
                <td className='projectTD'>
                    <Button variant="contained" onClick={handleChange}>{status}</Button>
                </td>
            </tr>
        </table>
    )

}