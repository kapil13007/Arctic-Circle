require("dotenv").config();
const prisma = require("../lib/prisma");

// Demo catalog for Arctic Circle: ACs from the brands supplied by the business,
// plus sample stabilizers from Vortex and V-Guard. AC tonnage ranges from
// 0.5 to 3 tons; higher tonnage is represented with a higher sample price.
const PRODUCTS = [
  { brand: "O-General", modelName: "Inverter Split AC 0.5 Ton", tonnage: 0.5, starRating: 3, type: "SPLIT", price: 29990, imageUrl: "/products/01.jpg" },
  { brand: "O-General", modelName: "Inverter Split AC 1.5 Ton", tonnage: 1.5, starRating: 5, type: "SPLIT", price: 45990, imageUrl: "/products/02.jpg" },
  { brand: "Mitsubishi Electric", modelName: "Inverter Split AC 1 Ton", tonnage: 1, starRating: 5, type: "SPLIT", price: 41990, imageUrl: "/products/03.jpg" },
  { brand: "Mitsubishi Electric", modelName: "Inverter Split AC 2 Ton", tonnage: 2, starRating: 5, type: "SPLIT", price: 64990, imageUrl: "/products/04.jpg" },
  { brand: "Daikin", modelName: "Inverter Split AC 1.5 Ton", tonnage: 1.5, starRating: 5, type: "SPLIT", price: 48990, imageUrl: "/products/05.jpg" },
  { brand: "Daikin", modelName: "Window AC 1 Ton", tonnage: 1, starRating: 3, type: "WINDOW", price: 32990, imageUrl: "/products/11.jpg" },
  { brand: "Voltas", modelName: "Inverter Split AC 1.5 Ton", tonnage: 1.5, starRating: 5, type: "SPLIT", price: 38990, imageUrl: "/products/06.jpg" },
  { brand: "Voltas", modelName: "Window AC 1 Ton", tonnage: 1, starRating: 3, type: "WINDOW", price: 27990, imageUrl: "/products/12.jpg" },
  { brand: "Carrier", modelName: "Inverter Split AC 2 Ton", tonnage: 2, starRating: 5, type: "SPLIT", price: 57990, imageUrl: "/products/07.jpg" },
  { brand: "Carrier", modelName: "Window AC 1.5 Ton", tonnage: 1.5, starRating: 3, type: "WINDOW", price: 33990, imageUrl: "/products/13.jpg" },
  { brand: "Blue Star", modelName: "Inverter Split AC 1 Ton", tonnage: 1, starRating: 5, type: "SPLIT", price: 36990, imageUrl: "/products/08.jpg" },
  { brand: "Blue Star", modelName: "Window AC 1.5 Ton", tonnage: 1.5, starRating: 3, type: "WINDOW", price: 34990, imageUrl: "/products/14.jpg" },
  { brand: "Panasonic", modelName: "Inverter Split AC 2.5 Ton", tonnage: 2.5, starRating: 5, type: "SPLIT", price: 69990, imageUrl: "/products/09.jpg" },
  { brand: "Panasonic", modelName: "Window AC 1 Ton", tonnage: 1, starRating: 3, type: "WINDOW", price: 29990, imageUrl: "/products/15.jpg" },
  { brand: "Hitachi", modelName: "Inverter Split AC 3 Ton", tonnage: 3, starRating: 5, type: "SPLIT", price: 79990, imageUrl: "/products/10.png" },
  { brand: "Hitachi", modelName: "Window AC 1.5 Ton", tonnage: 1.5, starRating: 3, type: "WINDOW", price: 36990, imageUrl: "/products/16.jpg" },

  { brand: "Vortex", modelName: "Digital AC Voltage Stabilizer 1.5 Ton", tonnage: 0, starRating: 0, type: "STABILIZER", price: 3490, imageUrl: "/products/17.jpg" },
  { brand: "Vortex", modelName: "Digital AC Voltage Stabilizer 2 Ton", tonnage: 0, starRating: 0, type: "STABILIZER", price: 4290, imageUrl: "/products/18.jpg" },
  { brand: "V-Guard", modelName: "AC Voltage Stabilizer 1.5 Ton", tonnage: 0, starRating: 0, type: "STABILIZER", price: 3190, imageUrl: "/products/19.jpg" },
  { brand: "V-Guard", modelName: "AC Voltage Stabilizer 2 Ton", tonnage: 0, starRating: 0, type: "STABILIZER", price: 3990, imageUrl: "/products/20.jpg" },
];

async function main() {
  for (const p of PRODUCTS) {
    const existing = await prisma.product.findFirst({ where: { brand: p.brand, modelName: p.modelName } });
    if (existing) {
      console.log(`Skipping (already exists): ${p.brand} ${p.modelName}`);
      continue;
    }
    await prisma.product.create({ data: p });
    console.log(`Created: ${p.brand} ${p.modelName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
