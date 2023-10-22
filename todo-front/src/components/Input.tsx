import { PlusCircle } from 'phosphor-react';

import styles from './Input.module.css';

interface TaskEvent {
    description: string;
    title: string;
    onChangeDescription?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeTitle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Input(props: TaskEvent) {
    return (
        <div className={styles.inputField}>
            <input placeholder='title' type='text' value={props.title} onChange={props.onChangeTitle} />
            <input placeholder='description' type='text' value={props.description} onChange={props.onChangeDescription} />
            <button onClick={props.onClick}>
                Create
                <PlusCircle size={16} />
            </button>
        </div>
    );
}