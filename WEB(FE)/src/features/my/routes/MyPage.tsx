import { RoutineBlock } from '@/components/Element/RoutineBlock';
import { RoutineProps } from '@/features/routine/RoutineDetail';
import addImageServerPrefix from '@/utils/addImageServerPrefix';
import { SERVER_URL } from '@/utils/globalVariables';
import storage from '@/utils/storage';
import translateCategory from '@/utils/translateCategory';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MyContentProps {
  tab: string;
}

interface RoutinePropsWithParticipationRate extends RoutineProps{
  participationRate: number;
}

const MyRoutine = () => {
  const [routines, setRoutines] = useState<RoutinePropsWithParticipationRate[]>([]);

  useEffect(() => {
    const fetchMyRoutine = async () => {
      const url: string = SERVER_URL + '/user/my';
      if (!storage.getToken()) {
        throw new Error('비회원 유저는 나의 밀리루틴을 볼 수 없습니다');
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${storage.getToken()}`,
        },
      });
      const json = await response.json();
      return json.routine;
    };
    fetchMyRoutine().then(setRoutines);
  }, []);

  return (
    <div className="ml-40 mb-40">
      {routines.map((routine, idx) => (
        <RoutineBlock
          key={idx}
          id={routine.id}
          host={routine.hostName}
          name={routine.name}
          thumbnail_img={addImageServerPrefix(routine.thumbnail_img)}
          category={translateCategory(routine.category)}
          auth_cycle={routine.auth_cycle}
          percentage={Number(routine.participationRate * 100)}
          start_date={new Date(String(routine.start_date))}
          auth_start={new Date(String(routine.start_date)) < new Date()}
        />
      ))}
    </div>
  );
};

const FavoriteRoutine = () => {
  const [routines, setRoutines] = useState<RoutinePropsWithParticipationRate[]>([]);

  useEffect(() => {
    const fetchLikeRoutine = async () => {
      const url: string = SERVER_URL + '/user/my/like';
      if (!storage.getToken()) {
        throw new Error('비회원 유저는 나의 밀리루틴을 볼 수 없습니다');
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${storage.getToken()}`,
        },
      });
      const json = await response.json();
      return json.routine;
    };
    fetchLikeRoutine().then(setRoutines);
  }, []);

  return (
    <div className="ml-40 mb-40">
      {routines.map((routine, idx) => (
        <RoutineBlock
          key={idx}
          id={routine.id}
          host={routine.hostName}
          name={routine.name}
          thumbnail_img={addImageServerPrefix(routine.thumbnail_img)}
          category={translateCategory(routine.category)}
          auth_cycle={routine.auth_cycle}
          percentage={Number(routine.participationRate * 100)}
          start_date={new Date(String(routine.start_date))}
          auth_start={new Date(String(routine.start_date)) < new Date()}
        />
      ))}
    </div>
  );
};

const ParticipatedRoutine = () => {
  return <></>; // 추후 개발
};

const MyContent = ({ tab }: MyContentProps) => {
  const navigate = useNavigate();

  switch (tab) {
    case 'a':
      return <MyRoutine />;
    case 'b':
      return <FavoriteRoutine />;
    case 'c':
      return <ParticipatedRoutine />;
    case 'd':
      navigate('/routine/make');
  }

  return <></>;
};

export const MyPage = () => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setTab((event.target as HTMLInputElement).value);
  };

  const [tab, setTab] = useState('a');

  return (
    <div className="flex mb-40">
      <nav className="flex flex-col content-center text-lg mt-10 ml-20">
        <button
          value="a"
          onClick={handleClick}
          className={`px-10 py-5 my-5${tab === 'a' ? ' bg-orange text-white-100 font-bold rounded-full' : ''}`}>
          나의 밀리루틴
        </button>
        <button
          value="b"
          onClick={handleClick}
          className={`px-10 py-5 my-5${tab === 'b' ? ' bg-orange text-white-100 font-bold rounded-full' : ''}`}>
          좋아요한 밀리루틴
        </button>
        <button
          value="c"
          onClick={handleClick}
          className={`px-10 py-5 my-5${tab === 'c' ? ' bg-orange text-white-100 font-bold rounded-full' : ''}`}>
          참여했던 밀리루틴
        </button>
        <button
          value="d"
          onClick={handleClick}
          className={`px-10 py-5 my-5${tab === 'd' ? ' bg-orange text-white-100 font-bold rounded-full' : ''}`}>
          밀리루틴 개설하기
        </button>
      </nav>

      <main className="ml-20 mt-10">
        <div>
          <MyContent tab={tab} />
        </div>
      </main>
    </div>
  );
};
