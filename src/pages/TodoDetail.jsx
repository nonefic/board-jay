import { Link, Outlet, useParams } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useEffect, useState } from "react";

function TodoDetail() {
  // URL의 파라미터 추출
  // 라우터에 'list/:_id'로 등록된 컴포넌트가 호출되는 경우
  // URL이 list/3일 때 params는 { _id: 3 }이 된다.
  const params = useParams();
  // API 서버 호출
  const axios = useAxiosInstance();
  const [item, setItem] = useState();

  const fetchDetail = async () => {
    const response = await axios.get(`/todolist/${params._id}`);
    setItem(response.data.item);
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  // API 서버의 응답 데이터


  return (
    <div id="main">
      <h2>할일 상세 보기</h2>
      {item && ( // 조건부 출력
        <div className="todo">
          <div>제목 : {item.title}</div>
          <div>내용 : {item.content}</div>
          <div>상태 : {item.done ? "완료" : "미완료"}</div>
          <div>작성일 : {item.createdAt}</div>
          <div>수정일 : {item.updatedAt}</div>
          <Link to="edit">수정</Link>
          <Link to="/list">목록</Link>
        </div>
      )}
      <Outlet context={ { reFetch: fetchDetail } } />
    </div>
  );
}

export default TodoDetail;
