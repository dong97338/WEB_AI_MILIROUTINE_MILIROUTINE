import os
import json
import sys
import save_r12n

def r12n2(i,n,r):  # i번 유저에게 루틴 n개 추천(r번 새로고침)
    with open(os.path.join(os.path.dirname(__file__),'r12n.json'),'r+')as f:
        r12n=json.load(f)
        try:
            l=len(r12n[i])
            print(ret:=r12n[i][(r*n)%l:][:n])
            return ret
        except:
            save_r12n.ex(i-1,i)
            r12n=json.load(f)
            l=len(r12n[i])
            print(ret:=r12n[i][(r*n)%l:][:n])
            return ret

# if __name__ == '__main__':
#     r12n2(sys.argv[1], sys.argv[2], sys.argv[3])

r12n2(12,10,0)