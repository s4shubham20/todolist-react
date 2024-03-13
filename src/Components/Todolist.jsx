import { useState , useEffect} from "react";

export default function Todolist() {
	let [todoList ,setTodoList] = useState([]);
	useEffect(() => {
		console.log(todoList)
	}, [todoList]);	
	const todolisthandler = (evt) => {
		evt.preventDefault();
		const todolist = evt.target.todolist.value;
		if(!todoList.includes(todolist)){
			let finalData = [...todoList, todolist];
			setTodoList(finalData);
			evt.target.reset();
		}else{
			alert(todolist+' this is alrady in queued!')
		}
	}
	
	let items = todoList.map((item,idx) => {
		let todoItems = {
			item, idx, todoList, setTodoList
		}
		return(<ItemList key={idx} todoItems={todoItems}/>)
	})

	return(
			<>
				<div className="todolist">
					<h2>To Do List</h2>
					<form onSubmit={todolisthandler}>
						<input type="text" name="todolist" placeholder="Enter anything here!"/>
						<button>Add</button>
					</form>
					<ul>
						{items}
					</ul>
				</div>
			</>
		);
}

const ItemList = ({todoItems}) => {
	let [status ,setStatus] = useState(false);
	let {item , idx, todoList ,setTodoList} = todoItems;
	const deleteItemHandler = () => {
		let finalData = todoList.filter((v, i) => i!=idx);
		setTodoList(finalData);
	}

	const statusHandler = () => {
		setStatus(!status);
	}
	return(
		<li className={status ? "isActive":""}>
			<span className={status ? "isChecked" :""} onClick={statusHandler}>{item}</span>
			<span className="cross" onClick={deleteItemHandler}>&times;</span>
		</li>
	)
}