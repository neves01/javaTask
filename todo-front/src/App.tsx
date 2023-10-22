import React, { useEffect, useState } from 'react';

import { Header } from './components/Header';
import { Task } from './components/Task';
import { Input } from './components/Input';

import styles from './App.module.css';
import './global.css';

import clipboard from './assets/clipboard.svg';
import axiosApiInstance from './http';

interface Task {
  id?: number;
  title: string;
  description: string;
  status?: string;
}

function App() {

  const [todoList, setTodoList] = useState(new Array<Task>);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const getAllTasks = () => {
    axiosApiInstance
      .get<Task[]>('/list',)
      .then((res) => {
        const taskList = res.data;
        setTodoList(taskList);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    getAllTasks();
  }, []);


  const handleAddTask = (e: React.MouseEvent<HTMLButtonElement>) => {

    const newTask: Task = { description: taskDescription, title: taskTitle };

    axiosApiInstance
      .post('/add', newTask)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          getAllTasks();
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  const handleFinishTask = (id: number) => {
    axiosApiInstance
      .put('/finish/' + id)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          getAllTasks();
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  const handlePendingTask = (id: number) => {
    axiosApiInstance
      .put('/pending/' + id)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          getAllTasks();
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  const handleOnChangeTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  }

  const handleOnChangeTaskDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  }

  const handleDeleteTask = (id: number) => {
    axiosApiInstance
      .delete('/delete/' + id)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          getAllTasks();
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  if (todoList?.length > 0)
    return (
      <>
        <Header />
        <Input title={taskTitle} description={taskDescription} onChangeTitle={handleOnChangeTaskTitle} onChangeDescription={handleOnChangeTaskDescription} onClick={handleAddTask} />
        <div className={styles.wrapper}>
          <div className={styles.taskContainer}>
            <header>
              <a className={styles.created}>Created Tasks <span className={styles.spanCount}>{todoList.length}</span></a>
              <a className={styles.done}>Finished <span className={styles.spanCount}>{todoList ? todoList.filter(task => task.status === 'COMPLETED').length + ' of ' + todoList.length : '0'}</span></a>
            </header>
            <div className={styles.taskContent}>
              {todoList.map((t: Task) => (
                <Task key={t.id} id={t.id} title={t.title} description={t.description} status={t.status} deleteTask={handleDeleteTask} finishTask={handleFinishTask} pendingTask={handlePendingTask} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  else return (
    <>
      <Header />
      <Input title={taskTitle} description={taskDescription} onChangeTitle={handleOnChangeTaskTitle} onChangeDescription={handleOnChangeTaskDescription} onClick={handleAddTask} />
      <div className={styles.wrapper}>
        <div className={styles.taskContainer}>
          <header>
            <a className={styles.created}>Created Tasks <span className={styles.spanCount}>{todoList.length}</span></a>
            <a className={styles.done}>Finished <span className={styles.spanCount}>0</span></a>
          </header>
          <div className={styles.taskContainerEmpty}>
            <img src={clipboard} />
            <p>Empty todo list.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
