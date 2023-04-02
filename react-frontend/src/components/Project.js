import './Project.css'
import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import HWSet from './HWSet';

export default function Project (props) {
    const {state} = useLocation();
    const { projectid } = state; // Read values passed on state
    
    const navigate = useNavigate()
    const [hwSet1Cap, setHwSet1Cap] = useState([])
    const [hwSet2Cap, setHwSet2Cap] = useState([])
    var [hwset1Avail, setHwSet1Avail] = useState([])
    var [hwset2Avail, setHwSet2Avail] = useState([])
    var [checkedouthwset1, setCheckedOutHwset1] = useState([])
    var [checkedouthwset2, setCheckedOutHwset2] = useState([])
    var [projectDescription, setProjectDescription] = useState([])
    useEffect(() => {getCapacity("http://127.0.0.1/hwset1cap").then(setHwSet1Cap)},[])
    useEffect(() => {getCapacity("http://127.0.0.1/hwset2cap").then(setHwSet2Cap)},[])
    useEffect(() => {getAvailability("http://127.0.0.1/gethwset1availability").then(setHwSet1Avail)},[])
    useEffect(() => {getAvailability("http://127.0.0.1/gethwset2availability").then(setHwSet2Avail)},[])
    const getcheckedouturl = "http://127.0.0.1/getcheckedout/" + projectid
    useEffect(() => {getCheckedOutHWset1(getcheckedouturl).then(setCheckedOutHwset1)},[getcheckedouturl])
    useEffect(() => {getCheckedOutHWset2(getcheckedouturl).then(setCheckedOutHwset2)},[getcheckedouturl])
    useEffect(() => {getDescription("http://127.0.0.1/projectdescription/" + projectid).then(setProjectDescription)})

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
        setCheckedOutHwset2(responseJson["HWSet2"])
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

    let getDescription = async (url) => {
        const response = await fetch(url)
        let responseJson = await response.json()
        console.log("description: " + responseJson)
        return responseJson["description"]
    }

    const handleChange = (event) => {
        navigate("/projectlogin")
    }

    const handleLogOut = () => {
        navigate("/login")
    }

    // NOTE: FOR NOW, project id is newproject123, project page will pass in project id later
    
    return(
        <div>
            <td className='projectTD'>
                Project Name
                <p>

                </p>
                {projectid}
            </td>
            <table>
                <tr>
                    <td className='projectTD'>Description: {projectDescription}</td>
                    <td className='projectTD'>
                        <HWSet projectId={projectid} hwSetID={"HWSet1"} checkedout={checkedouthwset1} capacity={hwSet1Cap} availability={hwset1Avail}/>
                        <HWSet projectId={projectid} hwSetID={"HWSet2"} checkedout={checkedouthwset2} capacity={hwSet2Cap} availability={hwset2Avail}/>
                    </td>
                    <td className='projectTD'>
                        <Button variant="contained" onClick={handleChange}>Leave</Button>
                    </td>
                </tr>
                <td>
                    <Button variant="contained" color="primary" onClick={handleLogOut}> Logout </Button>
                </td>
            </table>
        </div>
    )

}