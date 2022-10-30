import os
import json
import sys
import random

def r12n2(i,n,r):  # i번 유저에게 루틴 n개 추천(r번 새로고침)
    with open(os.path.join(os.path.dirname(__file__),'r12n.json'))as f:
        r12n=json.load(f)
        try:
            l=len(r12n[i])
            return r12n[i][(r*n)%l:][:n]
        except:
            return r12n[random.randrange(1,301)][:n]


if __name__ == '__main__':
    r12n2(sys.argv[1], sys.argv[2], sys.argv[3])

