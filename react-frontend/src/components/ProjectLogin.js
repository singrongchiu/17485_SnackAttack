import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
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

            <label htmlFor="myTextBox">Name: </label>    
            <input
                type="text"
                id="myTextBox"
            />
            <br />

            <label htmlFor="myTextBox">Description: </label>    
            <input
                type="text"
                id="myTextBox"
            />
            <br />

            <label htmlFor="myTextBox">ProjectID:  </label>    
            <input
                type="text"
                id="myTextBox"
            />
            <br />
        

            <button onClick={() => handleClick('New Project Button')}>SUBMIT</button>
            <br />

            <br />
            <h1>{"Use Existing Project"}</h1>

            <label htmlFor="myTextBox">ProjectID: </label>    
            <input
                type="text"
                id="myTextBox"
            />
            <br />
            <button onClick={() => handleClick('Existing Project Button')}>SUBMIT</button>
        </div>
    );
  }

export default ProjectLogin;