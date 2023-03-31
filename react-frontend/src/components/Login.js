import React, {useState, Component} from 'react';
import { useNavigate } from 'react-router-dom';
import history from '../History';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';


export default function Login(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleUsername = (event) => {
        setUsername(event.target.value)
        // console.log(username)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
        // console.log(password)
    }

    const myAsyncFunctionLogin = async (url) => {
        console.log(username)
        console.log(password)
        const response = await fetch(url)
        let responseJson = await response.json()

        console.log("response", responseJson)
        alert(responseJson["message"])

        if(responseJson["success"] === "Y") {
            navigate("/Project");
        }
    }

    const HandleEnter = (event) => {
        // /login/<username>/<password>
        var url = "http://127.0.0.1" + "/login/" + username + "/" + password
        myAsyncFunctionLogin(url)
    }

    const createUser = (event) => {
        navigate("/newuser")
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
                        <p>

                        </p>
                        <div class="txt_field">
                            <TextField id='outlined-basic' label='Password' variant="outlined" onChange={handlePassword}/>
                        </div>
                    </form>
                    <p>
                            
                    </p>
                    <Button variant="contained" onClick={HandleEnter} >Submit</Button>
                </div>
                <p>

                </p>
                <div>
                    <Button variant="contained" onClick={createUser}>Create User</Button>
                </div>
            </body>
        </div>
       )
}