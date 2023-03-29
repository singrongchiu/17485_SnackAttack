import './Projects.css'
import React from 'react';
import Project from './Project';

export default function Projects(props){
    const [capacity, setCapacity] = useState(100)
    
    return(
        <div>
            <h1>Projects</h1>
            <table className='projectTable'>
                <tr className='projectRow'>
                    <Project projectId={1} capacity={capacity}/>
                </tr>
                <tr className='projectRow'>
                    <Project projectId={2} capacity={capacity}/>
                </tr>
                <tr className='projectRow'>
                    <Project projectId={3} capacity={capacity}/>
                </tr>
            </table>
        </div>
    )
}