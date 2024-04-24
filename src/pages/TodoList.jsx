import TodoListItem from "@pages/TodoListItem";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function TodoList() {
  // API 서버 호출
  const [items, setItems] = useState();
  
  const fetchList = async () => {
    const response = await axios.get("/todolist");
    setItems(response.data.items);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleDelete = async _id => {
    try{
      await axios.delete(`/todolist/${_id}`);
      alert('할일이 삭제 되었습니다.');
      fetchList();
    }catch(err){
      console.error(err);
      alert('할일 삭제에 실패했습니다.');
    }
  }
  // 할일 목록 구성
  const itemList = items?.map(item => <TodoListItem key={ item._id } item={ item } handleDelete={ handleDelete }/>);

  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        <a href="/add">추가</a>
        <br />
        <div className="search">
          <input type="text" autoFocus />
          <button type="button">검색</button>
        </div>
        <ul className="todolist">
          {/* 할일 목록 출력 */}
          {itemList}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
