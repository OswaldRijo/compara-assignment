const fs = require('fs');

const { Product, CarInsurance } = require('./coTest');


const buildFile = (content) => {
  fs.writeFile("./products_after_30_days.txt", content, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

}

const productsAtDayZero = [
  new Product('Medium Coverage', 10, 20),
  new Product('Full Coverage', 2, 0),
  new Product('Low Coverage', 5, 7),
  new Product('Mega Coverage', 0, 80),
  new Product('Mega Coverage', -1, 80),
  new Product('Special Full Coverage', 15, 20),
  new Product('Special Full Coverage', 10, 49),
  new Product('Special Full Coverage', 5, 49),
  new Product('Super Sale', 3, 6),
];
let prod = '';

const carInsurance = new CarInsurance(productsAtDayZero);
const productPrinter = function (product) {

  prod += `${product.name}, ${product.sellIn}, ${product.price}\n`;
};

for (let i = 1; i <= 30; i += 1) {
  prod += `--------------Day ${i}-------------\n`;
  prod += 'name , sellIn  , price \n';
  carInsurance.updatePrice().forEach(productPrinter);
  prod += '\n';
}
console.log(prod);

buildFile(prod);
