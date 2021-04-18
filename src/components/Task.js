import { FaTimes } from 'react-icons/fa'


const Task = ({task, onDelete, onToggle}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} 
            onDoubleClick={() => onToggle(task.id)}>

            <h3>
                {task.text}{' '} 
                <FaTimes style={{ color:'red', 
                        cursor:'pointer'}} 
                        onClick={() => onDelete(task.id)}/>  
            </h3>
            <p>{task.day}</p>
        </div>
        
    )
}

//info about className
//https://stackoverflow.com/questions/48992609/what-do-dollar-and-colon-represent-in-react


export default Task