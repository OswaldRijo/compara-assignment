const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;

describe("Co Test", function() {

  describe('Common Coverage', ()=>{
    it("should decrease sellIn and price", ()=>{
      const carInsurance = new CarInsurance([ new Product('Medium Coverage', 10, 20) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(9);
      expect(products[0].price).equal(19);
    })
    it("should decrease sellIn and price twice faster", ()=>{
      const carInsurance = new CarInsurance([ new Product('Medium Coverage', 0, 20) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(-1);
      expect(products[0].price).equal(18);
    })

    it("should decrease sellIn and should not decrease price", ()=>{
      const carInsurance = new CarInsurance([ new Product('Medium Coverage', -1, 0) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(-2);
      expect(products[0].price).equal(0);
    })
  })


});
