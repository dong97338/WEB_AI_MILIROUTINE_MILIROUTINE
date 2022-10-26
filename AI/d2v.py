import torch
import gensim
import json
import krpre
import numpy as np
import consql as cs
from cfg import open

komoran=krpre.komoran()
stopword=krpre.Stopword()

model=gensim.models.Word2Vec.load('./AI/kosql.bin')

routine=cs.ex('SELECT name FROM routine;')
routine=[r[0] for r in routine]  # ((ㅁ,),(ㅎ,),....)
# print(routine[125:135])
routine=[stopword.Remove(komoran.nouns(krpre.Clean_text(r),0))for r in routine]  # 전처리
tensor=torch.tensor([model.wv.get_vector(w)for w in routine[0]])
for r in routine[1:]:
	temp=torch.tensor([model.wv.get_vector(w)for w in r])
	temp=torch.mean(temp,0)
	# torch.stack(tensor,temp,0)
tensor=torch.stack([torch.mean(torch.tensor([model.wv.get_vector(w)for w in r]),0) if r!=[] else torch.rand(200) for r in routine],0)  # 

print(type(tensor))
# print(type(torch.FloatTensor(tensor[:-1])))
# print(type(torch.FloatTensor(np.array(tensor[:-1]))))
torch.save(torch.FloatTensor(tensor),'./AI/d2v_tensor.pt')

# with open('r5e_name.txt')as r,open('r5e_vector.txt','w')as w:
# 	r=[stopword.Remove(komoran.nouns(krpre.Clean_text(line),0))for line in r]
# 	for line in r:
# 		tensor=torch.tensor([model.wv.get_vector(word)for word in line])
# 		# l=[1,2,3]
# 		# w.write(*l)
# 		for x in torch.mean(tensor,0).tolist():
# 			w.write(str(x)+' ')
# 		w.write('\n')

# 		# w.write(*torch.mean(tensor,0))
# 		# w.write(*torch.mean(map(model.wv.get_vector,l)))
# 		# w.write('\n')
# l=[1,2,3]
# print(*l)

tt=torch.load('./AI/d2v_tensor.pt')
print(tt.size())