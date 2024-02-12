import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'
import logoReact from '../Assets/logo192.png'
import DeleteIcon from '@mui/icons-material/Delete';



const Todo = () => {
    const [dateValue, setDateValue] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [tasks, setTasks] = useState([]);


      // Load tasks from local storage when component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to local storage whenever tasks state changes
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

  const handleonChange= (event)=>{
    setInputValue(event.target.value)
  }

    const handledateChange =(event)=>{
      setDateValue(event.target.value)
    }

    const handleTask = () => {
      if (inputValue && dateValue) {
        setTasks([...tasks, { task: inputValue, details: dateValue }]);
        setInputValue('');
        setDateValue('');
      }
    };

    const handleRemove = (index) => {
      setTasks(tasks.filter((_, i) => i !== index));
    };
  return (
    <>
      
    <div className="App">
      <div className="container">

        <div className="header">
          <img src={logoReact} alt='logo'/>
          <span>Username</span>
        </div>

        <div className="main">
         <div className="input-section">
            <div className="task-input">
              <span>
                Enter your task
              </span>
              <input 
              type="text" 
              value={inputValue}
              placeholder="Enter here"
              onChange={handleonChange}
               />
            </div>
            <div className="details">
            <span>
               Date and time
              </span>
            <input
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
                value={dateValue}
                min="1800-06-07T00:00"
                max="2999-06-14T00:00"
                placeholder='Select date and time'
                onChange={handledateChange}
                 />
              
              </div>

              
         </div>
              <div className='button-space'>
              <button onClick={handleTask}>Assign task</button>
              </div>
         <div className="display-section">
          <div className='heading'>

          <div>Task</div>
          <div>Date and Time</div>
          </div>
          <div className='display-main'>


          {tasks.map((task, index) => (
                <div key={index} className="task-details">
                  <div className="task">{task.task}</div>
                  <div className="date-and-time">{task.details}</div>
                  <div><button onClick={() => handleRemove(index)}><DeleteIcon /></button></div>
                </div>
              ))}
          </div>
         </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Todo
