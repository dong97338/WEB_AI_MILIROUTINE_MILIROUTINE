/* SERVER_URL에 대하여
** localhost가 사용 가능할 때 -> 'http://localhost:8080/api'
** localhost가 사용 불가능할 때 -> Proxy를 사용하여 CORS 우회. -> '/api'
** http://backend:8080/api 이런 건 없다. 프론트엔드에서 fetch할 때는 브라우저 단에서 통신하는 것이므로, 전혀 container 내부 ip를 활용하지 않는다. 
*/

// export const SERVER_URL: string = 'http://backend:8080/api';
export const SERVER_URL: string = '/api';

export const IMAGE_SERVER_URL: string = ''; // Goorm 이미지 서버 연결 불량으로 인해 WEB(FE)/public에 임시 보관
export const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
