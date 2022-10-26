import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Button, Form } from '@/components/Element';
import storage from '@/utils/storage';
import { SERVER_URL } from '@/utils/globalVariables';

const verifyAccount = async (id: string, pw: string) => {
  const url: string = SERVER_URL + '/auth/login';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, pw }),
  });
  if (!response.ok) {
    throw new Error();
  }
  const json = await response.json();
  return json.token;
};

export const LoginPage = () => {
  const navigate = useNavigate();

  const goToHome = useCallback(() => {
    navigate('/');
  }, []);

  const goToSignup = useCallback(() => {
    navigate('/auth/signup');
  }, []);

  const loginUser = () => {
    verifyAccount(username, password)
      .then((token) => {
        storage.setToken(token);
        goToHome();
      })
      .catch(() => alert('로그인에 실패하였습니다'));
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setUsername(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setPassword(e.target.value);
  }, []);

  // const { mutate: loginUser, isLoading } = useMutation(
  //   (userData: LoginInput) => loginUserFn(userData),
  //   {}
  // );

  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="text-black font-bold text-4xl py-6 mt-10">로그인</h2>
        <h4 className="text-black text-medium mb-10">밀리루틴에 오신 것을 환영합니다</h4>
        <div className="container max-w-sm mb-10">
          <Form label="아이디" type="text" value={username} onChange={onChangeUsername} />
          <Form label="비밀번호" type="password" value={password} onChange={onChangePassword} />
        </div>
        <Button label="로그인" onClick={loginUser} />
        <div className="py-1 mb-24">
          <span className="text-xs text-gray-500">아직 회원이 아니신가요?</span>
          <span onClick={goToSignup} className="text-xs text-blue ml-1 cursor-pointer">
            회원가입
          </span>
        </div>
      </div>
    </>
  );
};
