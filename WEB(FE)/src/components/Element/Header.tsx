import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavItem } from '@/components/Element/NavItem';
import { Button } from '@/components/Element/Button';
import Logo from '@/assets/Logo.svg';
import storage from '@/utils/storage';
import { SERVER_URL } from '@/utils/globalVariables';
import { ProfileButton } from './ProfileButton';

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

  const [isProfileClicked, toggleProfileClicked] = useState(); // 개발 중

  useEffect(() => {
    const fetchIsLogin = async () => {
      console.log('fetchIsLogin');
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
            <ProfileButton
              nickname={user.nickname}
              profile_img={user.profile_img}
              background_img={user.background_img}
              point={user.point}
              exp={user.exp}
              margin={'mx-4'}
              onClick={() => {}}
            />
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
