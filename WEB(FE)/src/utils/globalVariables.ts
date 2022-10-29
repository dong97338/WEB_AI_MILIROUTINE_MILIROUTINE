export const SERVER_URL: string = 'http://localhost:8080'; // VM/실제 배포시에는 그 서버의 url을 써야 한다. 
// fetch 등 ajax는 브라우저 단에서 받아오는 것이기 때문에 backend:8080으로 사용하지 않는다. localhost:8080 아니면 그 서버의 url 둘 중 하나다.  
// CORS 문제로 "proxy" : "SERVER_URL"을 사용하는 경우에는 그냥 ''으로 비워두면 된다. 

export const IMAGE_SERVER_URL: string = ''; // Goorm 이미지 서버 연결 불량으로 인해 WEB(FE)/public에 임시 보관
export const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
