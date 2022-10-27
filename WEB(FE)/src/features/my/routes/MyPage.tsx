import { RoutineBlock } from '@/components/Element/RoutineBlock';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MyContentProps {
  tab: string;
}

const MyRoutine = () => {
  let routines = [<RoutineBlock />, <RoutineBlock />, <RoutineBlock />];

  // 서버에서 받아오는 루틴들을 담았다고 가정한 배열

  return (
    <div className="mb-40">
      {routines.map((routine, idx) => {
        return (
          <div className="mb-4" key={idx}>
            {routine}
          </div>
        );
      })}
    </div>
  );
};

const FavoriteRoutine = () => {
  let favoriteRtns = [
    <RoutineBlock host="운동하자" name="벤치프레스 5세트 매일하기" category="건강" />,
    <RoutineBlock host="피터집단린치" name="1일 1경제기사 공부" auth_start={false} category="경제" />,
    <RoutineBlock host="갓생살자" name="식후 비타민 챙겨먹기" category="건강" auth_start={false} />,
    <RoutineBlock host="몰입캠프가고파" name="매일 코딩 연등 신청하기" category="학습" percentage={64} />,
  ];
  // 서버에서 받아오는 루틴들을 담았다고 가정한 배열

  return (
    <div className="mb-40">
      {favoriteRtns.map((routine, idx) => {
        return (
          <div className="mb-4" key={idx}>
            {routine}
          </div>
        );
      })}
    </div>
  );
};

const ParticipatedRoutine = () => {
  let participatedRtns = [
    <RoutineBlock host="tod" name="담배 한 개피 덜 피기" category="건강" />,
    <RoutineBlock host="한국사 1등급" name="매일 한능검 기출 1회 풀고 오답" auth_start={false} />,
    <RoutineBlock host="백준 브딱" name="백준 1일 1문제" />,
  ];
  // 서버에서 받아오는 루틴들을 담았다고 가정한 배열

  return (
    <div className="mb-40">
      {participatedRtns.map((routine, idx) => {
        return (
          <div className="mb-4" key={idx}>
            {routine}
          </div>
        );
      })}
    </div>
  );
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
    <div className="flex">
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
