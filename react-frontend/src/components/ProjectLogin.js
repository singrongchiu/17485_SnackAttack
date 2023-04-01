import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './ProjectLogin.css'

function ProjectLogin(props)
{
    const handleClick = () => {
      console.log('Button clicked');
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

            <button onClick={() => handleClick('New Project Button')}>SUBMIT</button>
            <br />

            <br />
            <h1>{"Use Existing Project"}</h1>
            <br />
            <TextField label="ProjectID" variant="outlined" />

            <br />
            <button onClick={() => handleClick('Existing Project Button')}>SUBMIT</button>
        </div>
    );
  }

export default ProjectLogin;