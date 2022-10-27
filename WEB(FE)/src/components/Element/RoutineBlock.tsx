import { Button } from './Button';
import { Label } from './Label';
import { useNavigate } from 'react-router-dom';
import { getDateDiff } from '@/utils/getDateDiff';

export interface RoutineBlockProps {
  host?: string;
  id?: number;
  name?: string;
  thumbnail_img?: string;
  category?: string;
  auth_cycle?: number;
  percentage?: number;
  start_date?: Date;
  auth_start?: boolean;
}

export const RoutineBlock = ({
  host = '검은연필',
  id = 1,
  name = '하루 30분 공부하기',
  thumbnail_img = 'http://dummyimage.com/214x631.png/5fa2dd/ffffff',
  category = '학습',
  auth_cycle = 5,
  percentage = 30,
  start_date = new Date(),
  auth_start = true,
}: RoutineBlockProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white-200 p-5 mb-5 rounded-xl">
      <div className="flex items-center">
        <a href={`/routine/${id}`}>
          <img className="rounded-3xl mb-2 w-40 h-40 object-cover bg-white-200 shadow-lg" src={thumbnail_img} />
        </a>
        <div className="ml-10">
          <span className="text-sm text-gray-500">{host}</span>
          <h4 className="text-2xl text-black font-bold mb-4 mt-2">{name}</h4>
          <Label text="text-xs" label={category} />
          <div className="flex items-end mt-6">
            <p>주 {auth_cycle}회 인증</p>

            {auth_start ? (
              <div className="ml-12">
                <span>오늘 인증하면</span>
                <span className="text-xl text-orange font-bold ml-1">1주차 1회차</span>
              </div>
            ) : (
              <div className="ml-24">
                <span>루틴 시작일까지</span>
                <span className="text-xl text-orange font-bold ml-1">{`D-${getDateDiff(new Date(), start_date)}`}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center ml-20">
          <div className="flex flex-col items-center bg-[#FFF] w-36 h-36 rounded-full justify-center">
            <p className="text-2xl font-bold">{percentage}%</p>
          </div>
          <div>
            <Button
              label="인증하기"
              margin="mt-3"
              onClick={() => {
                navigate('/user/my/routine/:routineId/auth');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
