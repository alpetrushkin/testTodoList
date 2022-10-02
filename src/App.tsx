import React, {useState} from 'react';
import './App.css';
import {AppTodoList} from "./components/AppTodoList/AppTodoList";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
   const [task, setTask] = useState([
      {id: v1(), title: "JS", isDone: false},
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "HTML", isDone: true},
      {id: v1(), title: "REACT", isDone: false},
   ])

   const changeStatus = (idNum: string, isDone: boolean) => {
      setTask(task.map(el => el.id === idNum ? {...el, isDone: isDone} : el))
   }

   const addTitle = (newTitle: string) => {
      const newTasks = {id: v1(), title: newTitle, isDone: false}
      setTask([newTasks, ...task])
   }

   const deletedTask = (idNum: string) => {
      // setTask(task.filter(idSas => idSas.id !== idNum))
      const remTasks = task.filter(idSas => idSas.id !== idNum)
      setTask(remTasks)
   }

   const [filter, setFilter] = useState<FilterValueType> ('all')

   let collapsed = task
   if (filter === 'active') {
      collapsed = task.filter(el => el.isDone)
   }
   if (filter === 'completed') {
      collapsed = task.filter(el => !el.isDone)
   }

   const filterTasked = (filter: FilterValueType) => {
      setFilter(filter)
   }

  return (
    <div className="App">
     <AppTodoList
        filter={filter}
        task={collapsed}
        title={'What to learn'}
        deletedTask={deletedTask}
        addTitle={addTitle}
        filterTasked={filterTasked}
        changeStatus={changeStatus}
     />
    </div>
  );
}

export default App;
