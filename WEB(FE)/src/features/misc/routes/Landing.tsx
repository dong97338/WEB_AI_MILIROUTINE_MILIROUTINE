import { useState, useCallback, useRef, useEffect } from 'react';
import { Jumbotron, RoutineItem, Carousel, Segment } from '@/components/Element';
import { MainLayout } from '@/components/Layout';
import { fetchRankedRoutine } from '@/components/Element/RankedRoutineRow';
import translateCategory from '@/utils/translateCategory';
import addImageServerPrefix from '@/utils/addImageServerPrefix';
import { SERVER_URL } from '@/utils/globalVariables';
import storage from '@/utils/storage';
import { UserProps } from '@/components/Element/Header';

export const LandingPage = () => {
  //  const [activeTab, setTab] = useState<string>();
  const [isLogin, setIsLogin] = useState<boolean>(storage.getToken());
  const [user, setUser] = useState<UserProps>({
    no: 0,
    id: '',
    pw: '',
    salt: '',
    email: '',
    nickname: '회원',
    profile_img: 'default_profile.png',
    background_img: 'default_background.jpeg',
    point: 0,
    exp: 0,
  });
  const [recommendRoutines, setRecommendRoutines] = useState<any[]>([]);
  const [popularRoutines, setPopularRoutines] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    const fetchBasicInfo = async () => {
      const url: string = SERVER_URL + '/';
      const response = storage.getToken()
        ? await fetch(url, {
            headers: {
              Authorization: `token ${storage.getToken()}`,
            },
          })
        : await fetch(url);
      const json = await response.json();
      return [json.isLogin, json.user, json.recommendRoutine];
    };
    fetchBasicInfo().then(([a, b, c]) => {
      setIsLogin(a);
      setUser(b);
      setRecommendRoutines(c);
    });
    fetchRankedRoutine(1, 10).then(setPopularRoutines);
  }, []);

  useEffect(() => {
    const fetchRecommendRefreshRoutines = async () => {
      if (!refresh) {
        return;
      }
      const url: string = SERVER_URL + `/?refresh=${refresh}`;
      const response = storage.getToken()
        ? await fetch(url, {
            headers: {
              Authorization: `token ${storage.getToken()}`,
            },
          })
        : await fetch(url);
      const json = await response.json();
      return json.recommendRoutine;
    };
    fetchRecommendRefreshRoutines().then(setRecommendRoutines);
  }, [refresh]);

  //  const onSelectedTab = useCallback((value: string) => setTab(value), []);

  return (
    <MainLayout>
      <Jumbotron isLogin={isLogin} />

      <section className="w-screen flex flex-col items-center justify-center my-24">
        <div className="container max-w-screen-lg flex flex-row items-center">
          <h2 className="text-black text-2xl font-bold">AI 추천 밀리루틴</h2>
          <button
            className="text-sm text-gray-500 py-2 px-6 cursor-pointer"
            onClick={() => {
              setRefresh((cur) => cur + 1);
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </div>

        <div className="container max-w-screen-lg flex flex-row items-center mt-2 text-black">
          {isLogin ? `${user?.nickname}님이 좋아할 만한 밀리루틴을 모아봤어요 😀` : '회원가입을 하시면, 더 알맞은 밀리루틴을 추천해드려요!'}
        </div>

        {/* <div className="container max-w-screen-lg flex flex-row items-center my-4">
          <Segment
            name="group-1"
            callback={onSelectedTab}
            controlRef={useRef()}
            segments={[
              {
                label: '학습',
                value: 'a',
                ref: useRef(),
              },
            ]}
          />
        </div> */}

        <Carousel>
          {recommendRoutines?.map((routine, idx) => (
            <RoutineItem
              key={idx}
              id={routine.id}
              host={routine.hostName}
              name={routine.name}
              thumbnail_img={addImageServerPrefix(routine.thumbnail_img)}
              category={translateCategory(routine.category)}
              auth_cycle={routine.auth_cycle}
              participant={routine.participants}
            />
          ))}
        </Carousel>
      </section>

      <section className="w-screen flex flex-col items-center justify-center my-24">
        <div className="container max-w-screen-lg flex flex-row items-center">
          <h2 className="text-black text-2xl font-bold">인기 밀리루틴</h2>
          <a href="/popular" className="text-sm text-gray-500 py-2 px-6 cursor-pointer">
            전체
          </a>
        </div>

        <Carousel>
          {popularRoutines.map((routine, idx) => (
            <RoutineItem
              key={idx}
              id={routine.id}
              host={routine.hostName}
              name={routine.name}
              thumbnail_img={addImageServerPrefix(routine.thumbnail_img)}
              category={translateCategory(routine.category)}
              auth_cycle={routine.auth_cycle}
              participant={routine.participants}
            />
          ))}
        </Carousel>
      </section>
    </MainLayout>
  );
};
