import { Label, Button } from '@/components/Element';
import { fetchRoutine, RoutineProps } from '@/features/routine/RoutineDetail';
import addImageServerPrefix from '@/utils/addImageServerPrefix';
import { SERVER_URL, WEEKDAY } from '@/utils/globalVariables';
import storage from '@/utils/storage';
import translateCategory from '@/utils/translateCategory';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDateDiff, getDateStr } from '@/utils/getDateDiff';

interface AuthProps {
  week: number;
  day: number;
  date: string; // 변환 필요
  img?: string;
  text?: string;
  postUrl?: string;
}

interface AuthBlockProps extends AuthProps {
  isToday?: boolean;
}

const AuthBlock = ({ week, day, date, img, text, isToday, postUrl }: AuthBlockProps) => {
  const newDate: Date = new Date(String(date));

  const [imageButtonClicked, setImageButtonClicked] = useState<boolean>();
  const [descriptionButtonClicked, setDescriptionButtonClicked] = useState<boolean>();
  const [descriptionUploadButtonClicked, setDescriptionUploadButtonClicked] = useState<boolean>();
  const [description, setDescription] = useState<string>("");
  const uploadImageRef = useRef<HTMLInputElement | null>(null);
  const onUploadImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0].name);

    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    // 이미지 업로드에 파일을 올리는 즉시 일단 이미지 저장은 해둬야됨. 
    // https://velog.io/@yeogenius/React-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80%EC%97%90-%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C-%ED%95%98%EA%B8%B0
    // axios({
    //   baseURL: API_HOST,
    //   url: '/images/:username/thumbnail',
    //   method: 'POST',
    //   data: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    }, []);

    const submitAuth = () => {
      const postAuth = async () => {
        if (!postUrl) {
          return;
        }
        const tmpDate = new Date(date)
        const data = { week, day, date: `${tmpDate.getFullYear()}-${tmpDate.getMonth()+1}-${tmpDate.getDate()}`, img: null, text: description };
        console.log(data);
        const response = await fetch(postUrl, {
          method: 'POST',
          headers: {
            'Authorization': `token ${storage.getToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          const json = await response.json();
          throw new Error(json.err);
        }
      };

      postAuth()
      .then(() => {
        alert("인증에 성공하였습니다!");
        location.reload();
      })
      .catch((e) => {
        alert(String(e));
      });
    }

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
              <label className="ml-20 cursor-pointer">
                이미지 업로드
                <input type="file" accept="image/*" ref={uploadImageRef} onChange={onUploadImageChange} className="hidden" multiple />
              </label>
            </div>
            <div className="flex flex-col justify-center">
              <button className="ml-5" onClick={() => setDescriptionUploadButtonClicked(true)}>글 업로드</button>
              {descriptionUploadButtonClicked ? 
              <div className="fixed shadow-modal z-50">
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white-100 shadow-2xl p-7">
                  <textarea rows={20} cols={50} className="resize-none outline-none bg-white-100" value={description} onChange={(e)=> setDescription(e.target.value) }></textarea>
                  <div className="flex justify-between">
                    <button 
                      className="text-red"
                      onClick={() => {
                        setDescription("");
                        setDescriptionUploadButtonClicked(false);
                    }}>내용 삭제하고 종료</button>
                    <Button label="저장" onClick={() => setDescriptionUploadButtonClicked(false)} />
                  </div>
                </div>
              </div>
              : null
              }
            </div>
            <Button label="인증하기" margin="ml-10" onClick={submitAuth} />
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
  const [weekOfToday, setWeekOfToday] = useState<number>(1);
  const [dayOfToday, setDayOfToday] = useState<number>(1);


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
    });
  }, []);

  useEffect(() => {
    if (authList.length == 0 || routine.id === 0 || !authList[0].day) {
      return;
    }
    const [latestWeek, latestDay] = [authList[0].week, authList[0].day];
    let [tmpWeek, tmpDay] = [Math.floor(getDateDiff(routine.start_date, new Date()) / 7) + 1, 1];
    if (latestWeek === tmpWeek) {
      tmpDay = latestDay + 1;
    }
    setWeekOfToday(tmpWeek);
    setDayOfToday(tmpDay);
  }, [authList]);

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
        {authList.length !== 0 && getDateStr(new Date(authList[0].date)) === getDateStr(new Date()) ?
          null :
          <AuthBlock key={String(weekOfToday) + String(dayOfToday)} week={weekOfToday} day={dayOfToday} date={String(new Date())} isToday={true} postUrl={SERVER_URL + `/user/routine/${routineId}/auth`}/>
        }
        {authList.map((auth, idx) => (
          <AuthBlock key={String(auth.week) + String(auth.day)} week={auth.week} day={auth.day} date={auth.date} img={auth.img} text={auth.text} isToday={false} />
        ))}
      </div>
    </div>
  );
};
