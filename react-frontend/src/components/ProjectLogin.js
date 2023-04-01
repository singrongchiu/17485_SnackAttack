import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './ProjectLogin.css'

function ProjectLogin(props)
{
    const handleNewProject = () => {
      console.log('New button clicked');
      // Perform some action here
    };

    const handleProjectLogin = () => {
      console.log('Login Button clicked');
      // Perform some action here
    };
  
    return (
        <div>
            <h1>{"Create New Project"}</h1>

            <TextField label="Name" variant="outlined" />
            <br />
            <TextField label="Description" variant="outlined" />
            <br />
            <TextField label="ProjectID" variant="outlined" />
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