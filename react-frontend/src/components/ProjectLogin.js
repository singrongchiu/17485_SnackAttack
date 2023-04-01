import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './ProjectLogin.css'

function ProjectLogin(props){
    const [projName, setProjName] = useState("")
    const [projID, setProjID] = useState("")
    const [projDescription, setProjDescription] = useState("")

    const handleProjName = (event) => {
      setProjName(event.target.value)
      //console.log(projName)
    }

    const handleProjDes = (event) => {
      setProjDescription(event.target.value)
      //console.log(projDescription)
    }

    const handleProjID = (event) => {
      setProjID(event.target.value)
      //console.log(projID)
    }

    const handleNewProject = () => {
      console.log('New button clicked');
      var url = "http://127.0.0.1" + "/newproj/" + projName + "/" + projID + "/" + projDescription
      let responseJson = myAsyncFunctionProjLogin(url)
      // Perform some action here
    };

    const handleProjectLogin = () => {
      console.log('Login Button clicked');
      var url = "http://127.0.0.1" + "/projlogin/" + projID
      let responseJson = myAsyncFunctionProjLogin(url)
    };

    const myAsyncFunctionProjLogin = async (url) => {
      const response = await fetch(url)
      let responseJson = await response.json()

      console.log("response", responseJson)
      alert(responseJson["message"])

      // if(responseJson["success"] === "Y") {
      //   //navigate("/projectlogin");
      //}

    }
  
    return (
        <div>
            <h1>{"Create New Project"}</h1>

            <TextField label="Name" variant="outlined" onInput={handleProjName}/>
            <br />
            <TextField label="Description" variant="outlined" onInput={handleProjDes}/>
            <br />
            <TextField label="ProjectID" variant="outlined" onInput={handleProjID}/>
            <br />

            <Button variant="contained" color="primary" onClick={handleNewProject}>Submit</Button>
            <br />

            <br />
            <h1>{"Use Existing Project"}</h1>
            <br />
            <TextField label="ProjectID" variant="outlined" />

            <br />
            <Button variant="contained" color="primary" onClick={handleProjectLogin}> Submit</Button>
        </div>
    );
  }

export default ProjectLogin;