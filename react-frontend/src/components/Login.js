import React, {useState, Component} from 'react';
import history from '../History';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';


export default function Login(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsername = (event) => {
        setUsername(event.target.value)
        console.log(username)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
        console.log(password)
    }

    return(
        <div>
            <title>Login Page</title>
            <body>
                <div class="center">
                    <h1>Login</h1>
                    <form method="post">
                        <div class="txt_field">
                            <TextField id='outlined-basic' label='Username' variant="outlined" onInput={handleUsername}/>
                        </div>
                        <div class="txt_field">
                            <TextField id='outlined-basic' label='Password' variant="outlined" onChange={handlePassword}/>
                        </div>
                    </form>
                        <Button variant="contained" onClick={()=> history.push('/Project')} > Submit</Button>
                </div>
            </body>
        </div>
       )
}