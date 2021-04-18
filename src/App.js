import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
//import React from 'react'

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false)


  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  },  [])

  //Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Add Task
  const addTask = async (task) => {
    
    const res = await fetch('http://localhost:5000/tasks', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    
    setTasks([...tasks, data])
    //const id = Math.floor(Math.random() * 10000) + 1
    //const newTask = {id, ...task}

    //setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle remider
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => 
        task.id === id
        ? {...task, reminder: data.reminder} : task )
      )
  }



  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)}
                showAdd={showAddTask}/>
        
        <Route path='/' exact render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask}/>}
              {tasks.length > 0 ? 
                  <Tasks tasks={tasks} 
                        onDelete={deleteTask}
                        onToggle={toggleReminder} />
              : <h2>No tasks</h2>}
            </>
          )} 
        />


        <Route path='/about' component={About}/>
        <Footer/> 
      </div>
    </Router>
  );
}

// ... - any number of parameters
// === - strict equality e.g 'hello' === "hello" is false 
      // where in == is true


/*class App extends React.Component {

  render() {
    return <h1>Hello from a class</h1>
  }
}*/

export default App;
