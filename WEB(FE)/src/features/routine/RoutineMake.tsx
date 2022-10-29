import React, { useState, useCallback, ChangeEvent } from "react";
import { Form, Select, DropdownItem, Label, Button } from "@/components/Element";


export const RoutineMakePage = () => {
  const [categories, setCategories] = useState([
    { label: "학습1", value: "0" },
    { label: "학습2", value: "1" },
  ]);
  const [intervals, setIntervals] = useState([
    { label: "주기1", value: "0" },
    { label: "주기2", value: "1" },
  ]);
  const [periods, setPeriods] = useState([
    { label: "기간1", value: "0" },
    { label: "기간2", value: "1" },
  ]);

  const [title, setTitle] = useState<string | undefined>("");
  const [category, setCategory] = useState<DropdownItem | undefined>();
  const [interval, setInterval] = useState<DropdownItem | undefined>();
  const [period, setPeriod] = useState<DropdownItem | undefined>();
  const [uploadedImage, setUploadedImage] = useState(null);
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
          placeholder="10자 이내로 입력해주세요"
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
                  setUploadedImage((e.target as HTMLElement).files[0]);
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
      </div>


      <div>
        {authWays.map((authWay, idx)=>{
          let tmp = idx + 1 + "단계";

          return(
            <div key={idx} className="flex mb-20 ">
              <Label label={tmp} margin="mr-2" />

              <input className="border-x-0 border-t-0 border-b-2 focus:outline-none" onChange={(e)=>{
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
        console.log(authWays);
      }} />
    </div>

  );
};


