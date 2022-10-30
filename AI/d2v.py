import os
import torch
import gensim
import krpre
import consql as cs

komoran=krpre.komoran()
stopword=krpre.Stopword()

model=gensim.models.Word2Vec.load(os.path.join(os.path.dirname(__file__),'kosql.bin'))
with cs.ex() as ce:
	routine=ce.q('SELECT name FROM routine;')
	routine=[r[0] for r in routine]  # ((ㅁ,),(ㅎ,),....)
	# print(routine[125:135])
	routine=[stopword.Remove(komoran.nouns(krpre.Clean_text(r),0))for r in routine]  # 전처리

	tensor=torch.tensor([model.wv.get_vector(w)for w in routine[0]])
	tensor=torch.stack([torch.mean(torch.tensor([model.wv.get_vector(w)for w in r]),0) if r!=[] else torch.rand(200) for r in routine],0)  # 

	print(type(tensor))
	torch.save(torch.FloatTensor(tensor),os.path.join(os.path.dirname(__file__),'d2v_tensor.pt'))

tt=torch.load(os.path.join(os.path.dirname(__file__),'d2v_tensor.pt'))
print(tt.size())