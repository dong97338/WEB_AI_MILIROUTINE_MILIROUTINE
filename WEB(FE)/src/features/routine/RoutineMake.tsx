import React, { useState, useCallback, ChangeEvent } from "react";
import { Form, Select, DropdownItem, Label, Button } from "@/components/Element";


export const RoutineMakePage = () => {
  const [categories, setCategories] = useState([
    { label: "학습", value: "study" },
    { label: "운동", value: "workout" },
    { label: "모닝루틴", value: "morningroutine" },
    { label: "경제", value: "economy" },
    { label: "셀프케어", value: "selfcare" },
    { label: "진로", value: "dream" },
    { label: "취미", value: "hobby" },
    { label: "정서", value: "emotion" },
    { label: "건강(식습관)", value: "health" },
  ]);
  const [intervals, setIntervals] = useState([
    { label: "매일", value: "7" },
    { label: "주 6일", value: "6" },
    { label: "주 5일", value: "5" },
    { label: "주 4일", value: "4" },
    { label: "주 3일", value: "3" },
    { label: "주 2일", value: "2" },
    { label: "주 1일", value: "1" },
  ]);
  const [periods, setPeriods] = useState([
    { label: "1주", value: "1" },
    { label: "2주", value: "2" },
    { label: "3주", value: "3" },
    { label: "4주", value: "4" },
    { label: "5주", value: "5" },
    { label: "6주", value: "6" },
    { label: "7주", value: "7" },
    { label: "8주", value: "8" },
  ]);

  const [title, setTitle] = useState<string | undefined>("");
  const [category, setCategory] = useState<DropdownItem | undefined>();
  const [interval, setInterval] = useState<DropdownItem | undefined>();
  const [period, setPeriod] = useState<DropdownItem | undefined>();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [authWays, setAuthWays] = useState<String[]>(['']);
  const [tmpInput, setTmpInput] = useState('');


  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setTitle(e.target.value);
  }, []);


  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <h2 className="text-black font-bold text-4xl py-6 mt-10">
          밀리루틴 개설하기
        </h2>
      </div>

      <div className="container max-w-xs mb-24">
        <Form
          label="밀리루틴 이름"
          placeholder="15자 이내로 입력해주세요"
          type="text"
          value={title}
          onChange={onChangeTitle}
        />
        <Select
          label="밀리루틴 카테고리"
          items={categories}
          value={category}
        />
        <Select label="인증 주기" items={intervals} value={interval} />
        <Select label="루틴 진행 기간" items={periods} value={period} />


        <div>
          {uploadedImage &&
            (<div>
              <img alt="Thumbnail" src={URL.createObjectURL(uploadedImage)} />
              <div className="flex justify-end">
                <button onClick={() => setUploadedImage(null)}>이미지 삭제</button>
              </div>
            </div>)
          }

          <br />
          <br />

          <div>
            <form method="post" encType="multipart/form-data">
              <div className="flex justify-between">
                <p className="text-sm pr-1">루틴 대표 이미지를 업로드해주세요</p>
                <label htmlFor="ThumbnailUpload" className="cursor-pointer">
                  <Label label="업로드" />
                </label>
              </div>
              <input
                id="ThumbnailUpload"
                className="invisible"
                type="file"
                name="ThumbnailUpload"
                onChange={(e) => {
                  // setUploadedImage((e.target as HTMLElement).files[0]); yarn run dev에서는 되는데 yarn build에서 오류 발생하여 제외
                }}
              />
            </form>
          </div>
        </div>
      </div>


      <div className="flex justify-between mb-10">
        <p className="pr-52">참여 및 인증 방법을 설명해주세요</p>
        <button className="text-sm" onClick={() => {
          setAuthWays(prev => [...prev, tmpInput]);
        }}>단계 추가</button>
        <button className="text-sm ml-2" onClick={() => {
          setAuthWays(prev => {
            const now = [...prev];
            now.pop();
            return now;
          });
        }}>단계 삭제</button>
      </div>

      <div className="w-[500px]">
        {authWays.map((authWay, idx)=>{
          let tmp = idx + 1 + "단계";

          return(
            <div key={idx} className="flex mb-10 ">
              <Label label={tmp} margin="mr-2" />

              <input className="border-x-0 border-t-0 border-b-2 focus:outline-none w-full max-w-sm" onChange={(e)=>{
                setTmpInput(e.target.value);
                let cpyAuthWay = [...authWays];
                cpyAuthWay[idx] = tmpInput;

                setAuthWays(cpyAuthWay);
              }}/> 
            </div>
          )
        })}
      </div>

      {/* authWay 배열에는 사용자가 기술한 각 인증 방법들이 담겨있음.*/}



      <div className="flex flex-col justify-center mt-20">
        <p className="text-[14px]">· 포인트는 밀리루틴의 난이도, 인증 방법의 신뢰성을 고려하여 운영 측에서 산정할 예정입니다.</p>
        <p className="text-[14px] mb-6">· 개설 신청 후 48시간 이내에 결과를 메일과 알림으로 알려드려요.</p>
      </div>


      <Button label="개설 신청하기" margin="mb-20" text="text-xl" onClick={() => {
        // 개설 신청
        alert('개설 신청이 완료되었습니다.')
        
      }} />
    </div>

  );
};


