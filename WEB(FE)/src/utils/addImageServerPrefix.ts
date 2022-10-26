import { IMAGE_SERVER_URL } from './globalVariables';

const addImageServerPrefix = (url: string) => {
  const PATH: string = '/image/';
  return IMAGE_SERVER_URL + PATH + url;
};

export default addImageServerPrefix;
