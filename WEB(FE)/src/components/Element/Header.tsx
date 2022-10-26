import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavItem } from '@/components/Element/NavItem';
import { Button } from '@/components/Element/Button';
import Logo from '@/assets/Logo.svg';
import storage from '@/utils/storage';
import { SERVER_URL } from '@/utils/globalVariables';
import addImageServerPrefix from '@/utils/addImageServerPrefix';
import { LevelBar } from './LevelBar';

export interface UserProps {
  no: number;
  id: string;
  pw: string;
  salt: string;
  email: string;
  nickname: string;
  profile_img: string;
  background_img: string;
  point: number;
  exp: number;
}

export const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(storage.getToken()); // 일단 token 있으면 로그인했다고 가정.
  const [user, setUser] = useState<UserProps>({
    no: 0,
    id: '',
    pw: '',
    salt: '',
    email: '',
    nickname: '',
    profile_img: 'default_profile.png',
    background_img: 'default_background.jpeg',
    point: 0,
    exp: 0,
  });

  const [isProfileClicked, setIsProfileClicked] = useState<boolean>(false); // 개발 중

  useEffect(() => {
    const fetchIsLogin = async () => {
      const url: string = SERVER_URL + '/';
      const response = storage.getToken()
        ? await fetch(url, {
            headers: {
              Authorization: `token ${storage.getToken()}`,
            },
          })
        : await fetch(url);

      if (!response.ok) {
        throw new Error();
      }
      const json = await response.json();
      return [json.isLogin, json.user];
    };
    fetchIsLogin()
      .then(([isLogin, user]) => {
        setIsLogin(isLogin);
        setUser(user);
      })
      .catch(console.log);
  }, []);

  const navigate = useNavigate();

  const goToHome = useCallback(() => {
    navigate('/');
  }, []);

  const goToSignup = useCallback(() => {
    navigate('/auth/signup');
  }, []);

  const goToLogin = useCallback(() => {
    navigate('/auth/login');
  }, []);

  const goToAbout = useCallback(() => {
    navigate('/about');
  }, []);

  const goToPopular = useCallback(() => {
    navigate('/popular');
  }, []);

  const goToMyPage = useCallback(() => {
    navigate('/user/my');
  }, []);

  const goToLogout = useCallback(() => {
    storage.clearToken();
    setIsLogin(false);
    navigate('/');
  }, []);

  const goToSetting = useCallback(() => {
    navigate('/user/setting');
  }, []);
  const goToPointshop = useCallback(() => {
    navigate('/user/pointshop');
  }, []);

  return (
    <header className="w-screen flex items-center justify-center bg-white">
      <div className="container max-w-screen-xl flex flex-row items-center justify-between py-4">
        <div className="flex flex-row items-center justify-center">
          <img src={Logo} onClick={goToHome} className="cursor-pointer" />
          <NavItem label="밀리루틴 소개" margin="ml-12" onClick={goToAbout} />
          <NavItem label="인기" margin="mx-6" onClick={goToPopular} />
        </div>
        {isLogin ? (
          <div className="flex flex-row items-center justify-center">
            <NavItem label="나의 밀리루틴" text="font-bold" margin="mx-4" onClick={goToMyPage} />
            <div className="relative">
              <button className="mx-4" onClick={() => setIsProfileClicked((cur) => !cur)}>
                <img src={addImageServerPrefix(user.profile_img)} className="w-10 h-10 rounded-full" />
              </button>
              {isProfileClicked ? (
                <div className="absolute w-48 h-72 top-14 -left-14 rounded-2xl bg-white-200">
                  <img src={addImageServerPrefix(user.background_img)} className="w-full h-24 rounded-t-2xl" />
                  <img
                    src={addImageServerPrefix(user.profile_img)}
                    className="w-14 h-14 absolute left-16 top-14 rounded-full bg-white-100 "
                  />
                  <section className="flex flex-col items-center mt-6">
                    <div className="text-black font-bold text-xl">{user.nickname}</div>
                    <LevelBar margin="my-2" exp={user.exp} />
                    <div>
                      <span className="text-orange font-bold text-xl">{user.point}</span>
                      <span className="text-black text-sm ml-1">포인트</span>
                    </div>
                  </section>
                  <section className="flex justify-evenly mt-5 text-sm">
                    <NavItem label="설정" onClick={goToSetting} />
                    <NavItem label="포인트샵" onClick={goToPointshop} />
                  </section>
                </div>
              ) : null}
            </div>
            <NavItem label="로그아웃" margin="ml-4" onClick={goToLogout} />
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <Button label="회원가입" margin="mx-4" onClick={goToSignup} />
            <NavItem label="로그인" onClick={goToLogin} />
          </div>
        )}
      </div>
    </header>
  );
};
