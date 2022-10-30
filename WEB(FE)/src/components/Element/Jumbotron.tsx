import { Button } from '@/components/Element';
import { RoutineProps } from '@/features/routine/RoutineDetail';
import addImageServerPrefix from '@/utils/addImageServerPrefix';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface JumbotronProps {
  isLogin?: boolean;
  currentRoutines?: RoutineProps[];
}

export const Jumbotron = ({ isLogin = false, currentRoutines = [] }: JumbotronProps) => {
  const navigate = useNavigate();

  const goToSignup = useCallback(() => {
    navigate('auth/signup');
  }, []);

  const goToMyRoutine = useCallback(() => {
    navigate('user/my');
  }, []);

  return (
    <section className="w-screen flex items-center justify-center bg-beige py-24">
      <div className="container max-w-screen-lg flex flex-row justify-between items-center">
        <div className="flex flex-col items-start justify-center flex-1">
          <h3 className="text-black text-2xl font-bold mb-4">군대에서 시작하는</h3>
          <h1 className="text-black text-4xl font-bold">나의 사소한 루틴 쌓기</h1>
        </div>

        {isLogin ? (
          <div className="flex flex-col items-start justify-center flex-1">
            <h4 className="text-black text-lg">현재 참여중인 밀리루틴</h4>
            <div className="flex mt-3">
              {currentRoutines.map((cur, idx) => (
                <div key={idx} className="w-16 h-16 bg-gray-300 rounded-xl shadow-md mr-3">
                  <a href={`/routine/${cur.id}`}><img className="w-16 h-16 rounded-xl" src={addImageServerPrefix(cur.thumbnail_img)} /></a>
                </div>)
              )}

              {[...Array(4 - currentRoutines.length)].map((_, idx) => (
                <div key={idx} className="w-16 h-16 bg-gray-300 rounded-xl shadow-md mr-3"></div>
              ))}

              <div onClick={goToMyRoutine} className="cursor-pointer text-gray-400 w-16 h-16 rounded-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start justify-center flex-1">
            <p className="text-black text-lg font-normal leading-9">
              지키고 싶은 밀리루틴을 만들고
              <br />
              함께 인증해보세요!
            </p>

            <Button text="text-xl" label="지금 시작하기" margin="mt-4" onClick={goToSignup} />
          </div>
        )}
      </div>
    </section>
  );
};
