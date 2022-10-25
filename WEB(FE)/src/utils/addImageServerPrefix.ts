const addImageServerPrefix = (url: string) => {
  const IMAGE_SERVER_IP: string = 'http://52.79.92.84:52187';
  const PATH: string = '/image/';
  console.log(IMAGE_SERVER_IP + PATH + url);
  return IMAGE_SERVER_IP + PATH + url;
};

export default addImageServerPrefix;
