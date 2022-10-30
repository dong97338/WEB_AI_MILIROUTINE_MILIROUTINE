import sys
import consql as cs
from u2v import u2v  # user벡터와 유사한 루틴을 순서대로 나열


def r12n(i,n):  # i번 유저한테 루틴 n개 추천
    ret=u2v(i).tolist()
    checked=cs.ex('SELECT routine_id FROM user_routine WHERE user_no = '+str(i)+';')  # 이미 좋아요를 누르거나 등록한 루틴
    checked=[c[0] for c in checked]
    cat=cs.ex('SELECT category FROM user_category WHERE user_no='+str(i)+';')  # user_category에 category가 왜 중복되어 있는지?
    cat=[c[0] for c in cat]
    cat=list(set(cat))  #중복 제거
    id=[0 for i in range(len(ret)+1)]
    cd={c:1 for c in cat}  # category->숫자 dictionary
    for c in cat:
        routine=cs.ex('SELECT id FROM routine WHERE category = "'+str(c)+'";')
        routine=[r[0] for r in routine]  # ((ㅁ,),(ㅎ,),....)
        for r in ret:
            if r in routine:
                id[r]=cd[c]
                cd[c]+=1 
    id=[100 if i==0 else i for i in id]
    ret.sort(key=lambda x:id[x])
    for c in checked:
        ret.remove(c)
    print(ret[:n])
    return ret[:n]
    
if __name__ =='__main__':
    r12n(sys.argv[1], sys.argv[2])
