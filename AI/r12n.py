# import gensim
# import torch
import sys
import consql as cs
from u2v import u2v  # user벡터와 유사한 루틴을 순서대로 나열

# def user(i):
#     return 'SELECT * FROM user_routine WHERE user_no='+str(i)+';'

def r12n(i,n):  # i번 유저한테 루틴 n개 추천
    # print(u2v(i))
    ret=u2v(i).tolist()
    # print(ret)
    # cs.ex('SELECT * FROM user_routine WHERE user_no='+str(i)+';')
    checked=cs.ex('SELECT routine_id FROM user_routine WHERE user_no = '+str(i)+';')  # 이미 좋아요를 누르거나 등록한 루틴
    checked=[c[0] for c in checked]
    cat=cs.ex('SELECT category FROM user_category WHERE user_no='+str(i)+';')  # user_category에 category가 왜 중복되어 있는지?
    cat=[c[0] for c in cat]
    cat=list(set(cat))  #중복 제거
    # q=[[]for _ in range(len(cat))]
    # print(cat)
    # ret=[i+1 for i in range(30)]  # 30을 루틴 개수로 바꿔야 or 텐서 개수
    # ret: 루틴번호
    id=[0 for i in range(len(ret)+1)]
    # print(ret)
    # print(id)
    cd={c:1 for c in cat}  # category->숫자 dictionary
    for c in cat:
        routine=cs.ex('SELECT id FROM routine WHERE category = "'+str(c)+'";')
        routine=[r[0] for r in routine]  # ((ㅁ,),(ㅎ,),....)
        # rid=[0 for i in range(len(routine))]
        # print(routine)
        for r in ret:
            if r in routine:
                id[r]=cd[c]
                cd[c]+=1 
                # ret.append(r)
    id=[100 if i==0 else i for i in id]
    ret.sort(key=lambda x:id[x])
    # print(id)
    # print(ret[:n])
    for c in checked:
        ret.remove(c)
    return ret[:n]
    
if __name__ =='__main__':
    r12n(sys.argv[1], sys.argv[2])

# for i in range(1,11):
print(11,"번 유저 추천 루틴 번호",r12n(11,10))