# from numpy import indices
import os
import torch
import gensim
import json
import consql as cs
from cfg import open


def u2v(u):
    model=gensim.models.Word2Vec.load(os.path.join(os.path.dirname(__file__),'kosql.bin'))

    d2v=torch.load(os.path.join(os.path.dirname(__file__),'d2v_tensor.pt'))

    routine=cs.ex('SELECT routine_id FROM user_routine WHERE user_no = '+str(u)+';')
    routine=[r[0] for r in routine]  # ((ㅁ,),(ㅎ,),....)


    tensor=[]
    tensor=torch.stack([*(d2v[r-1] for r in routine)], 0)
    tensor=torch.mean(tensor,0)
    ret=torch.inner(d2v,tensor)
    sorted, indices=torch.sort(ret,descending=True)
    return torch.add(indices,1)
