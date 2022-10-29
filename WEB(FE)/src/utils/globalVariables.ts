export const SERVER_URL: string = 'http://backend:8080';
// VM/실제 배포시에는 localhost가 아닌 그 서버의 url을 써야 한다. 
// fetch 등 ajax는 브라우저 단에서 받아오는 것이기 때문에 backend:8080으로 사용하지 않는다. localhost:8080 아니면 그 서버의 url 둘 중 하나다.  
// export const SERVER_URL: string = '/api'; // proxy에 Server URL 추가하여 CORS 해결, URL 겹치는 문제로 backend에는 /api PATH 추가

export const IMAGE_SERVER_URL: string = ''; // Goorm 이미지 서버 연결 불량으로 인해 WEB(FE)/public에 임시 보관
export const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
