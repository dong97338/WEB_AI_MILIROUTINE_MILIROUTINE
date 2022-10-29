import { Label, Button } from '@/components/Element';
import { fetchRoutine, RoutineProps } from '@/features/routine/RoutineDetail';
import addImageServerPrefix from '@/utils/addImageServerPrefix';
import { SERVER_URL, WEEKDAY } from '@/utils/globalVariables';
import storage from '@/utils/storage';
import translateCategory from '@/utils/translateCategory';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface AuthProps {
  week?: number;
  day?: number;
  date?: string; // 변환 필요
  img?: string;
  text?: string;
}

interface AuthBlockProps extends AuthProps {
  isToday?: boolean;
}

const AuthBlock = ({
  week = 1,
  day = 2,
  date = String(new Date()),
  img = 'default_background.jpeg',
  text = '언제쯤 전역할 수 있을까요?',
  isToday = false,
}: AuthBlockProps) => {
  const newDate: Date = new Date(String(date));

  const [imageButtonClicked, setImageButtonClicked] = useState<boolean>();
  const [descriptionButtonClicked, setDescriptionButtonClicked] = useState<boolean>();
  const [descriptionUploadButtonClicked, setDescriptionUploadButtonClicked] = useState<boolean>();


  return (
    <div className="bg-gray-300 rounded-xl px-6 py-4 my-5">
      <div className="flex justify-between">
        <div>
          <p className="text-black text-sm">{!isToday ? `${week}주차 ${day}회차` : `오늘(${week}주차 ${day}회차)`}</p>
          <h4 className="text-black font-bold text-2xl mt-2">
            {newDate.getFullYear()}. {newDate.getMonth() + 1}. {newDate.getDate()}. ({WEEKDAY[newDate.getDay()]})
          </h4>
        </div>
        {
          !isToday ? 
          <>        
            <div className="flex flex-col justify-center">
              <button className="ml-20" onClick={() => setImageButtonClicked((cur) => !cur)}>이미지 보기</button>
              {imageButtonClicked && img ? 
                  <div className="absolute bg-white-100 p-5 left-20 rounded-2xl shadow-lg max-md border-2 border-orange">
                    <img src={addImageServerPrefix(img)} />
                  </div>
                : null
              }
            </div>
            <div className="flex flex-col justify-center">
              <button className="ml-5" onClick={() => setDescriptionButtonClicked((cur) => !cur)}>글 보기</button>
              {descriptionButtonClicked && text ? 
                <div className="absolute bg-white-100 p-5 right-20 rounded-2xl shadow-lg max-w-md border-2 border-orange">
                  <p>{text}</p>
                </div>
                : null
              }
            </div>
            <button className="ml-10 mr-5 font-bold text-gray-500" disabled>인증 완료</button>
          </>
           : 
          <>
            <div className="flex flex-col justify-center">
              <label htmlFor='file' className="ml-20">이미지 업로드</label>
              <input type="file" id="file" name="file" className="hidden" multiple />
            </div>
            <div className="flex flex-col justify-center">
              <button className="ml-5" onClick={() => setDescriptionUploadButtonClicked((cur) => !cur)}>글 업로드</button>
              {descriptionUploadButtonClicked && text ? 
                <div className="absolute bg-white p-5 right-28 outline-none rounded-2xl shadow-lg w-[300px] h-[600px] border-2 border-orange">
                  <textarea cols={30} rows={23}></textarea>
                </div>
                : null
              }
            </div>
            <Button label="인증하기" margin="ml-10" />
          </>
        }
      </div>
    </div>
  );
};

export const MyRoutineAuthPage = () => {
  const { routineId } = useParams<{ routineId: string }>();
  const [routine, setRoutine] = useState<RoutineProps>({
    id: 0, // fetch 이전 초기화 값을 이렇게 설정하는 게 맞는지 의문이네요
    host: 0,
    name: '',
    category: '',
    thumbnail_img: 'routine-1.jpeg',
    auth_cycle: 0,
    auth_description_list: [],
    start_date: new Date(),
    duration: 0,
    point_info_list: [],
    hostName: '',
    participants: 0,
  });
  const [authList, setAuthList] = useState<AuthProps[]>([]);
  const [participationRate, setParticipationRate] = useState<number>(0);

  useEffect(() => {
    fetchRoutine(Number(routineId)).then(
      ({
        id,
        host,
        name,
        category,
        thumbnail_img,
        auth_cycle,
        auth_description_list,
        start_date,
        duration,
        point_info_list,
        hostName,
        participants,
      }) => {
        setRoutine({
          id,
          host,
          name,
          category,
          thumbnail_img,
          auth_cycle,
          auth_description_list: JSON.parse(auth_description_list),
          start_date: new Date(String(start_date)),
          duration,
          point_info_list: JSON.parse(point_info_list),
          hostName,
          participants,
        });
      }
    );
  }, []);

  useEffect(() => {
    const fetchAuthList = async () => {
      const url: string = SERVER_URL + `/user/routine/${routineId}/auth`;
      if (!storage.getToken()) {
        throw new Error('비회원 유저는 나의 밀리루틴을 볼 수 없습니다');
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${storage.getToken()}`,
        },
      });
      const json = await response.json();
      return [json.routine.participationRate, json.authRoutine];
    };

    fetchAuthList().then(([rate, list]) => {
      setParticipationRate(Number(rate * 100));
      setAuthList(list);
   }).then(() => console.log(authList)); // for debug
  }, []);

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="flex">
        <img src={addImageServerPrefix(routine.thumbnail_img)} className="rounded-xl w-48 h-48 object-cover bg-white-200 shadow-lg" />
        <div className="ml-6">
          <span className="text-sm text-gray-500">{routine.hostName}</span>
          <h4 className="text-2xl text-black font-bold my-2">{routine.name}</h4>
          <Label text="text-xs" label={translateCategory(routine.category)} />
          <div className="mt-8">
            <p>주 {routine.auth_cycle}회 인증</p>
            <p className="mt-2">
              {routine.start_date.getFullYear()}. {routine.start_date.getMonth() + 1}. {routine.start_date.getDate()}. (
              {WEEKDAY[routine.start_date.getDay()]}) 시작
            </p>
          </div>
        </div>

        <div className="ml-24 justify-center">
          <div className="flex flex-col items-center bg-white-200 w-48 h-48 rounded-full justify-center">
            <p className="text-black text-3xl font-bold">{participationRate}%</p>
          </div>
        </div>
      </div>

      <hr className="border-1 w-1/2 mt-16" />

      <div className="mt-16 mb-40">
        <AuthBlock key={0} week={1} day={1} isToday={true}/>
        {authList.map((auth, idx) => (
          <AuthBlock key={idx} week={auth.week} day={auth.day} date={auth.date} img={auth.img} text={auth.text} isToday={false} />
        ))}
      </div>
    </div>
  );
};
