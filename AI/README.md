# 밀리루틴 AI

안녕하세요! 밀리루틴 팀의 AI README입니다.  
사용자가 좋아할만한 루틴을 추천하는 모델을 제작하고 있어요.

## ☝️ **프로젝트 실행 방법**

```shell
$ cd AI/
$
```

## 👋 **AI를 만든 사람들**

| 이름   | 역할      | 이메일              | 깃허브 ID                                                                                                                                                           |
| ------ | --------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 이동현 | 모델 제작 | dong97338@gmail.com | <a href="https://github.com/dong97338" target="_blank"><img src="https://img.shields.io/badge/dong97338-181717?style=flat-square&logo=github&logoColor=white"/></a> |

## 📚 **기술 스택**

- `Python 3.8.10` : gensim 3.8.3과의 호환 이슈
- NLP
  - `torch 1.6.0`
  - `gensim 3.8.3` : ko.bin과의 호환 이슈로 이전 버전 사용
- 전처리
  - `konlpy 0.5.2` : Komoran
  - `py-hanspell 1.1`
  - `emoji 1.7.0` : 멤버함수 get_emoji_regexp()가 최신버전에서 사용되지 않음

## 📂 **핵심 폴더 구조**

```
📄 d2v.py
📄 u2v.py
📄 w2vsqlver.py
```

## API

1. `GET /?no=17` : 17번 유저에 대한 r12n 10개 반환
2. `GET /?no=17$refresh=1` : 17번 유저가 새로고침 1번 했을 때, r12n2 10개 반환
3. `GET /?no=17&count=10` : 이렇게 count를 특정할 수도 있다.

## 🤖 **모델 설명**

### Pre-trianed word vector: 스킵 그램(Skip gram)
<br/>
- 중심 단어로 주변 단어를 예측

![스그1](https://user-images.githubusercontent.com/32699584/198874777-6fdf40cb-36d1-4610-9cac-c2d5e2698f0c.png)
<br/>
### Pre-trianed word vector: Word2Vec
<br/>
- 중심단어에 해당하는 원 핫 벡터와 임베딩 벡터를 곱해 중심단어에 해당하는 워드 벡터를 계산
<br/>

![워드1](https://user-images.githubusercontent.com/32699584/198874553-f4ff59fa-c7be-4294-aa9b-51657b22e5e6.png)
<br/>
### Pre-trianed word vector: Negative sampling
<br/>
- 계산량을 줄이기 위해 모든 단어 중 일부를 랜덤으로 골라 negative case로 훈련
<br/>
- 예측 값과 실제 값의 차이로 계산한 손실함수 값을 최소화
<br/>

![워드2](https://user-images.githubusercontent.com/32699584/198874776-e1978d34-c308-4a8b-9160-070901bc3eff.png)
<br/>
### 루틴 임베딩과 유저 임베딩 계산
<br/>
- 루틴 임베딩 계산
<br/>

![루벡](https://user-images.githubusercontent.com/32699584/198874778-3181e4ad-7b59-472e-afd2-cfcc6e800f58.png)
<br/>
- 유저 임베딩 계산
<br/>

![유벡](https://user-images.githubusercontent.com/32699584/198874779-62a385e3-a63e-40e2-b114-6a57ca07893f.png)

### 추천 점수 계산
<br/>
- 유저 임베딩과 모든 루틴 임베딩 사이의 코사인 유사도를 계산하여 유사도가 높은 순으로 추천
<br/>

![유사도](https://user-images.githubusercontent.com/32699584/198877409-37195c22-1115-4a96-86f9-13984f1b4a7e.png)
