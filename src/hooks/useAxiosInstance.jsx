import axios from 'axios';
const API_SERVER = 'https://todo-api.frontendschool.shop/api';

function useAxiosInstance(){
  // axios 공통 설정을 추가한 axios 인스턴스를 생성해서 반환한다.
  const instance = axios.create({
    baseURL: API_SERVER,  // 기본 URL
    timeout: 1000*5,  // 지정한 시간이 지나도록 응답이 완료되지 않으면 timeout 에러 발생
    headers: {
      'content-type': 'application/json', // request의 데이터 타입
      accept: 'application/json'  // response의 데이터 타입
    },
  });
    
  return instance;
}

export default useAxiosInstance;