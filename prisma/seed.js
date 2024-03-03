const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { productData } = require("./watchData");

const brandData = [
  {  name: "Rolex" },
  {  name: "Omega" },
  {  name: "Seiko" },
  {  name: "Cartier" },
  {  name: "Hublot" },
  {  name: "Casio" },
];

const newProduct = productData.map((e) => {
    delete e.id
  return {
    ...e,
    watchImage:
      "https://cdn.pixabay.com/photo/2014/07/31/23/00/wristwatch-407096_1280.jpg",
  };
});

const generateData = async () => {
//   await prisma.brand.createMany({
//     data: brandData,
//   });
//   await prisma.watch.createMany({
//     data: newProduct,
//   });
};

// generateData();
