import { useCallback, useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from '@/components/Element';
import { Category } from '@/components/Element/Category';
import { PreferMiliroutine } from '@/components/Element/PreferMiliroutine';
import { ReactComponent as Check_green } from '@/assets/check_green.svg';
import Logo from '@/assets/Logo.svg';
import { SERVER_URL } from '@/utils/globalVariables';
import { RoutineProps } from '@/features/routine/RoutineDetail';
import storage from '@/utils/storage';

export const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [likeRoutine, setLikeRoutine] = useState<number[]>([]);
  const [recommendRoutines, setRecommendRoutines] = useState<RoutineProps[]>([]);

  const toggleCategory = (s: string) => {
    const newCategory: string[] = [...category];
    const result = newCategory.indexOf(s);
    if (result === -1) {
      newCategory.push(s);
    } else {
      newCategory.splice(result, 1);
    }
    setCategory(newCategory);
  };

  const toggleLikeRoutine = (routine_id: number) => {
    const newLikeRoutine: number[] = [...likeRoutine];
    const result = newLikeRoutine.indexOf(routine_id);
    if (result === -1) {
      newLikeRoutine.push(routine_id);
    } else {
      newLikeRoutine.splice(result, 1);
    }
    setLikeRoutine(newLikeRoutine);
  };

  useEffect(() => {
    const fetchRecommendRoutines = async () => {
      const url: string = SERVER_URL + '/'; // GET /auth/signup에 랜덤으로 불러오는 API가 있어야 되는데 없어서 임시로 GET / 로 대신함
      const response = await fetch(url);
      const json = await response.json();
      return json.recommendRoutine;
    };
    fetchRecommendRoutines().then(setRecommendRoutines);
  }, []);

  const goToLogin = useCallback(() => {
    navigate('/auth/login');
  }, []);

  const goToNext = useCallback(() => {
    setStep(1);
  }, []);

  const goToHome = useCallback(() => {
    navigate('/');
  }, []);

  const createAccount = async () => {
    const data = { id: username, pw: password, email, name: nickname, category, likeRoutine };
    const url: string = SERVER_URL + '/auth/signup';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.err);
    }
    const json = await response.json();
    return json.token;
  };

  const signupUser = () => {
    createAccount()
      .then((token) => {
        storage.setToken(token);
        goToHome();
      })
      .catch((e) => {
        setStep(0);
        alert(String(e));
      });
  };

  const onChangeUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setUsername(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setPassword(e.target.value);
  }, []);

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setEmail(e.target.value);
  }, []);

  const onChangeNickname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setNickname(e.target.value);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-black font-bold text-4xl py-6 mt-10">{step === 0 ? '회원가입' : '처음이신가요?'}</h2>
          <h4 className="text-black text-medium">{step === 0 ? '밀리루틴에 오신 것을 환영합니다' : '추가 정보를 입력해주세요'}</h4>
          {step === 0 ? (
            <div className="py-1 mb-10">
              <span className="text-xs text-gray-500">이미 가입하셨나요?</span>
              <span onClick={goToLogin} className="text-xs text-blue ml-1 cursor-pointer">
                로그인
              </span>
            </div>
          ) : null}
        </div>

        <div className="container max-w-sm mb-24">
          {step === 0 ? (
            <>
              <Form label="아이디" type="text" value={username} onChange={onChangeUsername} />
              <Form label="비밀번호" type="password" value={password} onChange={onChangePassword} />
              <Form label="이메일" type="email" value={email} onChange={onChangeEmail} />
              <Form label="닉네임" help="밀리루틴 사이트에서 표시될 이름입니다" type="text" value={nickname} onChange={onChangeNickname} />
            </>
          ) : null}

          {step === 1 ? (
            <>
              <h2 className="text-black font-bold text-2xl py-6 mt-10">관심 카테고리 설정</h2>
              <div className="flex flex-col">
                <div className="flex">
                  <Category label="학습" clicked={category.indexOf('study') !== -1} onClick={() => toggleCategory('study')} />
                  <Category label="운동" clicked={category.indexOf('workout') !== -1} onClick={() => toggleCategory('workout')} />
                  <Category
                    label="모닝루틴"
                    clicked={category.indexOf('morningroutine') !== -1}
                    onClick={() => toggleCategory('morningroutine')}
                  />
                </div>
                <div className="flex">
                  <Category label="경제" clicked={category.indexOf('economy') !== -1} onClick={() => toggleCategory('economy')} />
                  <Category label="자기관리" clicked={category.indexOf('selfcare') !== -1} onClick={() => toggleCategory('selfcare')} />
                  <Category label="진로" clicked={category.indexOf('dream') !== -1} onClick={() => toggleCategory('dream')} />
                </div>
                <div className="flex">
                  <Category label="취미" clicked={category.indexOf('hobby') !== -1} onClick={() => toggleCategory('hobby')} />
                  <Category label="정서" clicked={category.indexOf('emotion') !== -1} onClick={() => toggleCategory('emotion')} />
                  <Category label="건강" clicked={category.indexOf('health') !== -1} onClick={() => toggleCategory('health')} />
                </div>
              </div>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <h2 className="text-black font-bold text-2xl py-1 mt-10">어떤 밀리루틴을 선호하시나요?</h2>
              <h4 className="text-xs text-gray-500 pb-6">회원가입 후 [좋아요한 밀리루틴] 탭에서 변경할 수 있습니다</h4>
              <div className="flex flex-col items-stretch">
                {recommendRoutines?.map((routine, idx) => (
                  <PreferMiliroutine
                    key={idx}
                    label={routine.name}
                    clicked={likeRoutine.indexOf(routine.id) !== -1}
                    onClick={() => toggleLikeRoutine(routine.id)}
                  />
                ))}
              </div>
            </>
          ) : null}

          <div className="flex justify-center items-center mt-20">
            {step === 0 ? <Button label="다음 단계로" onClick={goToNext} /> : <Button label="계정 생성" onClick={signupUser} />}
          </div>
        </div>
      </div>
    </>
  );
};
