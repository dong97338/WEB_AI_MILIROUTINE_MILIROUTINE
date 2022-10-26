import addImageServerPrefix from '@/utils/addImageServerPrefix';
import { Button } from './Button';

export interface GoodsItemProps {
  id: number;
  name: string;
  description: string;
  thumbnail_img: string;
  price: number;
}

export const GoodsItem = ({ id, name, description, thumbnail_img, price }: GoodsItemProps) => {
  return (
    <div className="flex basis-1/2 my-5 pr-40">
      <img className="rounded-xl w-48 h-48 object-cover" src={addImageServerPrefix(thumbnail_img)} />
      <div className="ml-5">
        <h3 className="text-black text-xl font-bold">{name}</h3>
        <p className="text-black mt-2">{description}</p>
        <div className="flex items-end mt-5">
          <span className="text-orange text-2xl font-bold">{price.toLocaleString()}</span>
          <span className="ml-1 text-gray-500 text-sm">포인트</span>
          <Button label="구매" margin="ml-5" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
