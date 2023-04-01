import React, {useState, Component} from 'react';
import { useNavigate } from 'react-router-dom';
import history from '../History';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';


export default function CreateUser(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleUsername = (event) => {
        setUsername(event.target.value)
        // console.log(username)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
        // console.log(password)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const myAsyncFunctionLogin = async (url) => {
        console.log(username)
        console.log(password)
        const response = await fetch(url)
        let responseJson = await response.json()

        console.log("response", responseJson)
        alert(responseJson["message"])

        if(responseJson["success"] === "Y") {
            navigate("/Login");
        }else{
            alert("Could not create user. Try another username.")
        }
    }

    const HandleEnter = (event) => {
        var url = "http://127.0.0.1" + "/createuser/" + email + "/" + username + "/" + password
        myAsyncFunctionLogin(url)
    }

    const handleBack = (event) => {
        navigate("/Login")
    }

    return(
        <div>
            <title>Login Page</title>
            <body>
                <div class="center"
                    style={{
                    textAlign: "center"
                    }}
                    >
                    <h1>Create New User</h1>
                    <form method="post">
                        <div class="txt_field">
                            <TextField id='outlined-basic' label='Email' variant="outlined" onInput={handleEmail}/>
                        </div>
                        <div class="txt_field">
                            <TextField id='outlined-basic' label='Username' variant="outlined" onInput={handleUsername}/>
                        </div>
                        <div class="txt_field">
                            <TextField id='outlined-basic' label='Password' variant="outlined" onChange={handlePassword}/>
                        </div>
                    </form>
                    <Button variant="contained" onClick={HandleEnter} >Submit</Button>
                    <Button variant="contained" onClick={handleBack}>Back</Button>

                </div>
            </body>
        </div>
       )
}