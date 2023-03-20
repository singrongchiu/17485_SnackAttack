import React, {Component} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import "./HWSet.css"

export class HWSet extends Component{
    constructor(props){
        super(props)
        this.state = {qty: 0, available: 100, entered: 0}
        this.handleChange = this.handleChange.bind(this);
        this.checkOut = this.checkOut.bind(this);
        this.checkIn = this.checkIn.bind(this);
    }

    handleChange(event){
        this.setState({entered: (Number)(event.target.value)});
    }

    checkOut(event) {
        var count = this.state.entered + this.state.qty

        if(count > this.state.available){
            count = this.state.available
        }
        this.setState({qty: count})
        event.preventDefault();
    }
    
    checkIn(event){
        var count = this.state.qty - this.state.entered;

        if(count < 0){
            count = 0
        }
        this.setState({qty: count})
        event.preventDefault();
    }

    render(){
        return(
            <table className='hwSetTable'>
                <tr>
                    <td className='title'>
                        HW Set {this.props.number}
                    </td>
                    <td className='amount'>
                        {this.state.qty}/{this.state.available}
                    </td>
                    <td>
                        <TextField id="outlined-basic" label="Enter quantity" variant="outlined" onChange={this.handleChange}/>
                    </td>
                    <td>
                        <Button variant="contained" onClick={this.checkOut}>Check Out</Button>
                    </td>
                    <td>
                        <Button variant="contained" onClick={this.checkIn}>Check In</Button>
                    </td>
                </tr>
            </table>
        )
    }
}