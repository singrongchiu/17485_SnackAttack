import './Projects.css'
import React, {Component} from 'react';
import Project from './Project';

export default function Projects(props){
    return(
        <div>
            <h1>Projects</h1>
            <table className='projectTable'>
                <tr className='projectRow'>
                    <Project projectId={1}/>
                </tr>
                <tr className='projectRow'>
                    <Project projectId={2}/>
                </tr>
                <tr className='projectRow'>
                    <Project projectId={3}/>
                </tr>
            </table>
        </div>
    )
}