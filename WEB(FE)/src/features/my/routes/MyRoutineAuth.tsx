import { Label, Button } from "@/components/Element";
import { useState } from "react";


interface AuthBlockProps {
  auth: boolean;
  date: string;
  NthWeek: string;
}


const AuthBlock = ({ auth, date, NthWeek }: AuthBlockProps) => {

  let [authed, setAuthed] = useState(auth);

  return (
    <div className="bg-gray-300 rounded-xl p-4 w-[640px]">
      <div className="flex justify-between">
        <div>
          <p>{NthWeek}</p>
          <h4 className="font-bold text-2xl">{date}</h4>
        </div>

        <div className="flex items-center">
          <p className="mr-4 cursor-pointer" onClick={() => {
            //이미지 업로드 기능
          }}>이미지 업로드</p>

          <p className="mr-4 cursor-pointer" onClick={() => {
            //글올리기 기능, 루틴에 대한 짧은 메모형식이니 CRUD 중 수정, 삭제 배제해서 추가로 읽기 기능만이라도 필요할 듯한데..
          }}>글 올리기</p>

          {authed ?
            <p className="mr-4 font-bold text-gray-400">인증 완료</p>
            :
            <Button label="인증하기" onClick={() => {
              setAuthed(true);
            }} />}
        </div>
      </div>
    </div>
  )
};


export const MyRoutineAuthPage = () => {

  let authBlocks = [
    <AuthBlock auth = {true} date = "2022.09.13. (화)" NthWeek="1주차 1회차" />,
    <AuthBlock auth = {true} date = "2022.09.13. (화)" NthWeek="1주차 1회차" />,
    <AuthBlock auth = {true} date = "2022.09.13. (화)" NthWeek="1주차 1회차" />
  ];
  // 서버 결과물 받아오는 배열 가정


  return (
    <div className="flex flex-col items-center basis-[640px]">
      <div className="flex px-4 pt-5 pb-3 mt-10">
        <img className="border rounded-xl border-black mb-2 w-40 h-40 object-cover bg-white-200 shadow-lg" src='http://dummyimage.com/214x631.png/5fa2dd/ffffff' />
        <div className="ml-4">
          <span className="text-sm text-gray-500">검은연필</span>
          <h4 className="text-2xl text-black font-bold mb-4 mt-2">하루 5컵 물 마시기</h4>
          <Label text="text-xs" label={"학습"} />
          <div className="flex mt-3">
            <div>
              <p>주 {5}회 인증</p>
              <p>2022.09.13. (화) 시작</p>
              {/* 루틴 시작일 서버에서 받아오면 수정해야함 */}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center ml-20 justify-center">
          <div className="flex flex-col items-center bg-white-200 w-28 h-28 rounded-full justify-center">
            <p className="text-3xl font-bold">{24}%</p>
          </div>
        </div>
      </div>

      <div className="w-[30%] text-center border-b mt-8" />

      <div className="mt-12">
        {authBlocks.map((authBlock, idx) => {
          return(
            <div className="mb-4" key={idx}>
              {authBlock}
            </div>
          )
        })}
      </div>

    </div>
  );
};


