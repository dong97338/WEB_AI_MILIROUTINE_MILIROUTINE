# import gensim
import os
import torch
import json
import consql as cs
from u2v import u2v  # user벡터와 유사한 루틴을 순서대로 나열

user=cs.ex('SELECT no FROM user')
user=[u[0] for u in user]
n=len(user)+1  # 유저 번호를 key로 리스트 initialize하기 위함
ret=[[]for _ in range(n)]

temp=cs.ex('SELECT user_no, category FROM user_category')
u2c=[[]for _ in range(n)]
for u,c in temp:
    u2c[u].append(c)
# print(u2c)

temp=cs.ex('SELECT user_no, routine_id FROM user_routine')
checked=[[]for _ in range(n)]
for u,r in temp:
    checked[u].append(r)
checked=[[*range(1,101)]if c==[] else c for c in checked]  # 301번 유저 등록하거나 좋아요 누른 루틴이 없음

temp=cs.ex('SELECT id, category FROM routine ORDER BY id')  # id 최고값 구하기 위해, o(n) 대신 o(nlogn)이지만 별 차이 안날듯
n=temp[-1][0]+1  # 루틴 개수
r2c=['']*n  # 비어있는 id있을수도 있으니, ['']대신 []쓰면 안됨
for i,c in temp:
    r2c[i]=c
# print(r2c)

d2v=torch.load(os.path.join(os.path.dirname(__file__),'d2v_tensor.pt'))
for u in user:
    tensor=torch.stack([*(d2v[r-1] for r in checked[u])], 0)
    tensor=torch.mean(tensor,0)
    temp=torch.inner(d2v,tensor)
    _, id=torch.sort(temp,descending=True)
    ret[u]=(torch.add(id,1)).tolist()

    id=[0 for _ in range(n)]
    cd={c:1 for c in u2c[u]}
    for r in ret[u]:
        if(c:=r2c[r])in u2c[u]:
            id[r]=cd[c]
            cd[c]+=1
    id=[100 if i==0 else i for i in id]
    ret[u].sort(key=lambda x:id[x])
    for c in checked[u]:  # 사실 정렬하기 전에 지워야 골고루 나옴
        if c in ret[u]:  # checked에 중복 있음
            ret[u].remove(c)
    # print(u,ret[u])
with open(os.path.join(os.path.dirname(__file__),'r12n.json'),'w')as f:
    json.dump(ret,f)