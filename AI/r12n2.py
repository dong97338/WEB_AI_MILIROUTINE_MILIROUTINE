import os
import json
import consql as cs

def r12n2(i,n,r):  # i번 유저에게 루틴 n개 추천(r번 새로고침)
    with open(os.path.join(os.path.dirname(__file__),'r12n.json'))as f:
        r12n=json.load(f)
        l=len(r12n[i])
        return r12n[i][(r*n)%l:][:10]
    
print(r12n2(11,10,0))