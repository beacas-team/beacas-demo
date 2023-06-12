export const fetchProducts = async (params: { productIds: string[] }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const images = [
    "http://res.cloudinary.com/dwkp0e1yo/image/upload/v1683815715/nqqreectuzi3lxv7dxsp.png",
    "http://res.cloudinary.com/dwkp0e1yo/image/upload/v1683815875/mevpkdxft8z6cyjicnd6.png",
    "http://res.cloudinary.com/dwkp0e1yo/image/upload/v1683815891/g4qmdcgiyiuyqmdlchuo.png",
    "http://res.cloudinary.com/dwkp0e1yo/image/upload/v1683815911/tceeidvpn9cwtrufgbe3.png",
    "http://res.cloudinary.com/dwkp0e1yo/image/upload/v1683815945/zpvioce6toyi96areynk.png",

    "http://res.cloudinary.com/dwkp0e1yo/image/upload/v1683815958/tyod0t3w1gkkfvmbzk1x.png",
    "http://res.cloudinary.com/dwkp0e1yo/image/upload/v1683815971/jpepahf0d7jxarq43rvz.png",
    "http://res.cloudinary.com/dwkp0e1yo/image/upload/v1683815992/ls5phak8tcd6hs0xiaez.png",
    "http://res.cloudinary.com/dwkp0e1yo/image/upload/v1683816008/thdrnjh4ijlt4dkbvlnm.png",
    "http://res.cloudinary.com/dwkp0e1yo/image/upload/v1683816103/elrzimj2j80tu3rrjiz8.png",
  ];
  const list = params.productIds.map((id, index) => {
    return {
      id: id.toString(),
      title: `Product #${id}`,
      price: "$" + (+id + 10 * (index + 50)).toString(),
      comparePrice: "$" + (+id + 10 * (index + 50) + 50).toString(),
      image: images[+id % 10],
    };
  });
  return list;
};
