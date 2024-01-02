import React, { useEffect, useState } from 'react';
import Item from './Item'
import { todoSelector, addItem, TodoItem } from './redux/todo_store'
import { useAppDispatch, useAppSelector } from './redux/hooks'

function List() {
    const [_, setTodoItems] = useState<Array<TodoItem>>([]);
    const todoList = useAppSelector(todoSelector);

    useEffect(() => {
        setTodoItems(todoList);
    }, [todoList]);

    return (<table><tbody>
        <NewTask />
        {todoList.map((item) => {
            return <Item key={item.id} item={item}/>
        })}
    </tbody></table>)
}

function NewTask() {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const addTodoItem = (e: React.MouseEvent) => {
        if (title === "") {
            return;
        }
        dispatch(addItem(title));
        setTitle('');
    };

    return (<tr>
        <td><input onChange={changeInput} value={title}></input></td>
        <td><button onClick={addTodoItem}>Add</button></td>
    </tr>);
}

export default List;
