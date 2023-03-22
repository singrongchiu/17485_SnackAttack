import './Project.css'
import React, {Component} from 'react';
import Button from '@mui/material/Button';
import  HWSet from './HWSet';

export class Project extends Component{
    constructor(props){
        super(props)
        this.state = {status: 'Join'}

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        if(this.state.status === 'Join'){
            this.setState({status: 'Leave'})
        }else{
            this.setState({status: 'Join'})
        }
    }

    render(){
        return(
            <table>
                <tr>
                    <td className='projectTD'>Project Name {this.props.number}</td>
                    <td className='projectTD'>list of authorized users</td>
                    <td className='projectTD'>
                        <HWSet number={1}/>
                        <HWSet number={2}/>
                    </td>
                    <td className='projectTD'>
                        <Button variant="contained" onClick={this.handleChange}>{this.state.status}</Button>
                    </td>
                </tr>
            </table>
        )
    }
}