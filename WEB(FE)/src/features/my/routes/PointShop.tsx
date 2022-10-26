import { GoodsItem } from '@/components/Element/GoodsItem';
import { SERVER_URL } from '@/utils/globalVariables';
import storage from '@/utils/storage';
import { useEffect, useState } from 'react';

const fetchGoods = async () => {
  const url: string = SERVER_URL + `/user/pointshop`;
  const response = storage.getToken()
    ? await fetch(url, {
        headers: {
          Authorization: `token ${storage.getToken()}`,
        },
      })
    : await fetch(url);
  const json = await response.json();
  return [json.userPoint, json.goods];
};

export const PointShopPage = () => {
  const [point, setPoint] = useState<number>();
  const [goods, setGoods] = useState<any[]>([]);

  useEffect(() => {
    fetchGoods().then(([userPoint, goods]) => {
      setPoint(userPoint);
      setGoods(goods);
    });
  }, []);

  return (
    <div className="ml-40 mt-20 mb-40">
      <h1 className="text-black text-4xl font-bold">포인트샵</h1>
      <div className="flex items-center mt-5 mb-10">
        <span className="text-orange">현재 이용 가능한 포인트</span>
        <span className="text-orange text-2xl font-bold ml-2">{point?.toLocaleString()}</span>
      </div>
      <div className="flex flex-wrap">
        {goods.map((good, idx) => (
          <GoodsItem
            key={idx}
            id={good.id}
            name={good.name}
            description={good.description}
            thumbnail_img={good.thumbnail_img}
            price={good.price}
          />
        ))}
      </div>
    </div>
  );
};
