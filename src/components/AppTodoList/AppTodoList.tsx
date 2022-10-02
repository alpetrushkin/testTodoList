import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import Button from "../Button/Button";
import {FilterValueType} from "../../App";

type AppTodoListType = {
   deletedTask: (id: string) => void
   task: TaskType[]
   title: string
   addTitle: (newTitle: string) => void
   filterTasked: (filter: FilterValueType) => void
   changeStatus: (idNum: string, isDone: boolean) => void
   filter: FilterValueType
}

type TaskType = {
   id: string
   title: string
   isDone: boolean
}

export const AppTodoList: React.FC<AppTodoListType> = (props) => {
   const [newTitle, setNewTitle] = useState<string>('')
   const [error, setError] = useState<boolean>(false)

   const onClickDeletedHandler = (id: string) => {
      props.deletedTask(id)
   }

   const onClickInputHandler = (newTitle: string) => {
      const trimmedTitle = newTitle.trim()
      if (trimmedTitle) {
         props.addTitle(trimmedTitle)
      } else {
         setError(true)
      }
      setNewTitle('')
   }

   const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (error) setError(false)
         setNewTitle(event.currentTarget.value)
   }

   const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         onClickInputHandler(newTitle)
      }
   }
   const onClickFilteredHandler = (filter: FilterValueType) => {
      props.filterTasked(filter)
   }

   const errorMessage = <div style={{color: 'hotpink'}}>Title is error required!!!</div>

   return (
      <div>
         <h3>{props.title}</h3>
         <input
            className={error ? 'error' : ''}
            onKeyDown={onKeyDownHandler}
            value={newTitle}
            onChange={onChangeInputHandler}
         />
         <button onClick={() => onClickInputHandler(newTitle)}>+</button>
         {/*{error ? <div className='error-message'>Title is required!</div> : ''}*/}
         {error && errorMessage}
         <ul>
            {
               props.task.map((el) => {
                  return (
                     <li key={el.id} className={el.isDone ? 'isDon' : ''}>
                        <input
                           onChange={(event) => props.changeStatus(el.id, event.currentTarget.checked)}
                           type="checkbox"
                           checked={el.isDone}
                        />
                        <span>{el.title}</span>
                        <Button title={'x'} callBack={() => onClickDeletedHandler(el.id)}/>
                     </li>
                  )
               })
            }
         </ul>
         <Button className={props.filter === 'all' ? 'btn-active btn' : 'btn'} title={'All'} callBack={() => onClickFilteredHandler('all')}/>
         <Button className={props.filter === 'active' ? 'btn-active btn' : 'btn'} title={'Active'} callBack={() => onClickFilteredHandler('active')}/>
         <Button className={props.filter === 'completed' ? 'btn-active btn' : 'btn'} title={'Completed'} callBack={() => onClickFilteredHandler('completed')}/>
      </div>
   );
};

