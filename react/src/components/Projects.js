import './Projects.css'
import React, {Component} from 'react';
import { Project } from './Project';

export class Projects extends Component{
    render(){
        return(
            <div>
                <h1>Projects</h1>
                <table className='projectTable'>
                    <tr className='projectRow'>
                        <Project number={1}/>
                    </tr>
                    <tr className='projectRow'>
                        <Project number={2}/>
                    </tr>
                    <tr className='projectRow'>
                        <Project number={3}/>
                    </tr>
                </table>
            </div>
        )
    }
}