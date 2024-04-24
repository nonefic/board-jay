import { useState, useEffect } from "react";
import { useParams, useNavigate,useOutletContext } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useForm } from "react-hook-form";

function TodoEdit() {
  const { _id } = useParams();
  const [item, setItem] = useState(null);
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const setData = useOutletContext();
  const { reFetch } = useOutletContext();

  // API 서버로부터 상세 정보 조회
  const fetchDetail = async () => {
    const response = await axios.get(`/todolist/${_id}`);
    setItem(response.data.item);
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async formData => {
    try{
      await axios.patch(`/todolist/${_id}`, formData);
      alert('할일을 수정했습니다.');
      setData({ item: { ...item, ...formData }});
      navigate('..', { relative: 'path' }); // 상대 경로 사용
      reFetch();
    }catch(err){
      console.error(err);
      alert('할일 수정에 실패했습니다.');
    }
  };
useEffect(() => {
    // item이 변경되면 form 값을 변경된 item으로 초기화 한다.
    if (item)
      reset({
        title: item.title,
        content: item.content,
        done: item.done,
      });
  }, [item]);

  useEffect(() => {
    // useEffect의 setup 함수를 async로 만들면 의존성이 변경될 때 함수의 흐름을 제어하기 힘들어 디버깅이 이려워질 수 있어서 권장하지 않음.
    fetchDetail();
  }, []);

  return (
    <div id="main">
      <h2>할일 수정</h2>
        { item && (
          <div className="todo">
            <form onSubmit={ handleSubmit(onSubmit) }>
              <label htmlFor="title">제목 :</label>
              <input type="text" id="title" autoFocus { ...register('title', {
                  required: '제목을 입력하세요.',
                }) } />
              <br/>
              <label htmlFor="content">내용 :</label>
              <textarea rows="5" cols="23" id="content" { ...register('content', {
                required: '내용을 입력하세요.',
              }) } />
              <br/>
              <label htmlFor="done">완료 :</label>
              <input type="checkbox" id="done" defaultChecked={ item.done } { ...       register('done') } />
              <br/>
              <button type="submit">수정</button>
              <button type="reset" onClick={ () => navigate(-1) }>취소</button>
            </form>
          </div>
  ) }
    </div>
  );
}

export default TodoEdit;