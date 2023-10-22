import styles from './Task.module.css';

import check from '../assets/check.svg';
import trash from '../assets/trash.svg';

interface Task {
    id?: number;
    title: string;
    description: string;
    status?: string;
    deleteTask: any;
    finishTask: any;
    pendingTask: any;
}

export function Task(props: Task) {

    return (
        <div className={styles.task}>
            {props.status === 'PENDING' ?
                <div className={styles.checkbox} id="check" onClick={() => props.finishTask(props.id)} /> :
                <div className={styles.checked} id="check" onClick={() => props.pendingTask(props.id)} />}
            <label htmlFor="check" />
            <h6>{props.title}</h6>
            <a className={styles.text}>{props.description}</a>
            <img src={trash} className={styles.trash} onClick={() => props.deleteTask(props.id)} />
        </div>
    );
}