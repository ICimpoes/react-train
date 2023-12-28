import { TodoItem } from './redux/todo_store'

function Item(props: TodoItem, dispatch: (id: number) => void) {
    return (
        <tr key={props.id}>
            <td>{props.title}</td><td>{DeleteButton(props.id, dispatch)}</td>
        </tr>);
}

function DeleteButton(id: number, dispatch: (id: number) => void) {
    const deleteItem = (e: React.MouseEvent) => {
        dispatch(id);
        console.log("delete", id);
    }
    return (<button onClick={deleteItem}>X</button>)
}

export default Item;
