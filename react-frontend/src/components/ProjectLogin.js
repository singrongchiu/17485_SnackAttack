import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './ProjectLogin.css'

function ProjectLogin(props){
    const navigate = useNavigate()

    const handleNewProject = () => {
      console.log('New button clicked');
      const projName = document.getElementById("projName").value
      const projID = document.getElementById("projID").value
      const projDescription = document.getElementById("projDescription").value

      var url = "http://127.0.0.1" + "/newproject/" + projName + "/" + projID + "/" + projDescription
      myAsyncFunctionProjLogin(url)
      // Perform some action here
    };

    const handleProjectLogin = () => {
      console.log('Login Button clicked');
      const loginProjID = document.getElementById("loginProjID").value
      var url = "http://127.0.0.1" + "/projlogin/" + loginProjID
      myAsyncFunctionProjLogin(url)
    };

    const handleLogOut = () => {
      navigate("/login")
    }

    const myAsyncFunctionProjLogin = async (url) => {
      const response = await fetch(url)
      let responseJson = await response.json()

      console.log("response", responseJson)
      alert(responseJson["message"])

      if(responseJson["success"] === "Y") {
        var loginProjID = document.getElementById("loginProjID").value
        if (loginProjID === "") {
          loginProjID = document.getElementById("projID").value
        }
        navigate("/project", {state: {projectid: loginProjID}});
      }
    }
  
    return (
        <div>
            <h1>{"Create New Project"}</h1>

            <TextField label="Name" variant="outlined" id="projName"/>
            <br />
            <TextField label="Description" variant="outlined" id="projDescription"/>
            <br />
            <TextField label="ProjectID" variant="outlined" id="projID"/>
            <br />

            <Button variant="contained" color="primary" onClick={handleNewProject}>Submit</Button>
            <br />

            <br />
            <h1>{"Use Existing Project"}</h1>
            <br />
            <TextField label="ProjectID" variant="outlined" id="loginProjID"/>

            <br />
            <Button variant="contained" color="primary" onClick={handleProjectLogin}> Submit</Button>
            <br />

            <br />
            <div>
            <Button variant="contained" color="primary" onClick={handleLogOut}> Logout </Button>
            </div>
        </div>
    );
  }

export default ProjectLogin;