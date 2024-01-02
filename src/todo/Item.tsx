import { useAppDispatch } from './redux/hooks';
import { removeItem, TodoItem } from './redux/todo_store'

function Item(props: {item: TodoItem}) {
    return (
        <tr>
            <td>{props.item.title}</td><td><DeleteButton id={props.item.id}/></td>
        </tr>);
}

function DeleteButton(props: {id: number}) {
    const dispatch = useAppDispatch();
    const deleteItem = (e: React.MouseEvent) => {
        dispatch(removeItem(props.id));
    }
    return (<button onClick={deleteItem}>X</button>)
}

export default Item;
