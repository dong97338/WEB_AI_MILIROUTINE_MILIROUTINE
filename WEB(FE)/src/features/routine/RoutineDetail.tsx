import { Button, Label } from '@/components/Element';
import addImageServerPrefix from '@/utils/addImageServerPrefix';
import { SERVER_URL } from '@/utils/globalVariables';
import translateCategory from '@/utils/translateCategory';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const fetchRoutine = async (routineId: number) => {
  const url: string = SERVER_URL + `/routine/${routineId}`;
  const response = await fetch(url);
  const json = await response.json();
  return json.routine;
};

const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

export interface RoutineProps {
  id: number;
  host: number;
  name: string;
  category: string;
  thumbnail_img: string;
  auth_cycle: number;
  auth_description_list: any[]; //
  start_date: Date;
  duration: number;
  point_info_list: any[];
  hostName: string;
  participants: number;
}

export const RoutineDetailPage = () => {
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

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <img src={addImageServerPrefix(routine.thumbnail_img)} className="w-72 h-72 object-cover" />
        <div className="ml-20">
          <section>
            <p className="text-gray-500 text-sm">{routine.hostName}</p>
            <div className="flex mt-2">
              <h2 className="text-black font-bold text-2xl">{routine.name}</h2>
              <Label margin="ml-5" label={translateCategory(routine.category)} />
            </div>
            <p className="text-black mt-5">주 {routine.auth_cycle}회 인증</p>
          </section>
          <hr className="border-1 mt-5" />
          <section className="flex flex-col items-center mt-5">
            <table className="text-center w-full leading-8">
              <tbody>
                <tr>
                  <td>시작일</td>
                  <td>
                    {routine.start_date.getFullYear()}. {routine.start_date.getMonth() + 1}. {routine.start_date.getDate()}. (
                    {WEEKDAY[routine.start_date.getDay()]})
                  </td>
                </tr>
                <tr>
                  <td>기간</td>
                  <td>{routine.duration}주</td>
                </tr>
                <tr className="mt-2">
                  <td>참여 인원</td>
                  <td>{routine.participants}명</td>
                </tr>
              </tbody>
            </table>
          </section>
          <hr className="border-1 mt-5" />
          <section className="flex flex-col items-center mt-5">
            <h3 className="text-black font-bold text-xl mt-5">포인트</h3>
            <table className="text-center w-full leading-10 mt-2">
              <tbody>
                {routine.point_info_list.map((info, idx) => (
                  <tr key={idx}>
                    {info.type === 'every_week' ? (
                      <>
                        <td>1주 달성 시마다</td>
                        <td>
                          <Label label={`+ ${info.point}`} />
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{`참여율 ${info.number * 100}% 달성 시`}</td>
                        <td>
                          <Label label={`+ ${info.point}`} />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <hr className="border-1 w-1/2 mt-16" />
      <div className="flex flex-col items-center mt-16">
        <h2 className="text-black font-bold text-4xl">참여 방법</h2>
        {routine.auth_description_list.map((description, idx) => (
          <div key={idx} className="flex flex-col items-center mt-16">
            <Label label={`${idx + 1}단계`} />
            <p className="text-lg mt-5">{description}</p>
          </div>
        ))}
        <Button margin="my-24" text="text-xl" label={'참여하기'} />
      </div>
    </div>
  );
};
