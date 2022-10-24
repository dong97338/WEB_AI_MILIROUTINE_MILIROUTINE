import { Button } from "./Button";
import { Label } from "./Label";
import { useNavigate } from "react-router-dom";


export interface RoutineBlockProps {
    host?: string;
    name?: string;
    thumbnail_img?: string;
    category?: string;
    auth_cycle?: number;
    percentage?: number;
}


export const RoutineBlock = (
    {
        host = '검은연필',
        name = '하루 30분 공부하기',
        thumbnail_img = 'http://dummyimage.com/214x631.png/5fa2dd/ffffff',
        category = '학습',
        auth_cycle = 5,
        percentage = 30,
    }: RoutineBlockProps
) => {
    const navigate = useNavigate()
    
    return (
        <div className="bg-gray-300 rounded-xl">
            <div className="flex px-4 pt-5 pb-3">
                <img className="border rounded-xl border-black mb-2 w-40 h-40 object-cover bg-white-200 shadow-lg" src={thumbnail_img} />

                <div className="ml-4">
                    <span className="text-sm text-gray-500">{host}</span>
                    <h4 className="text-2xl text-black font-bold mb-4 mt-2">{name}</h4>
                    <Label text="text-xs" label={category} />
                    <div className="flex mt-6">
                        <p>주 {auth_cycle}회 인증</p>

                        <p className="ml-16">오늘 인증하면&nbsp;
                            <span className="text-xl text-orange font-bold" >
                                2주차 2회차 {/* 인증주차 기록 추후 개발 */}
                            </span>
                        </p>
                    </div>

                </div>

                <div className="flex flex-col items-center ml-20">
                    <div className="flex flex-col items-center bg-white-200 w-28 h-28 rounded-full justify-center">
                        <p className="text-3xl font-bold">{percentage}%</p>
                    </div>
                    <div>
                        <Button label="인증하기" margin="mt-3" onClick={() => {
                            navigate("/user/my/routine/:routineId/auth")
                        }} />
                    </div>
                </div>

            </div>
        </div>
    )
};
