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

  describe('Full Coverage', ()=>{
    it("should decrease sellIn and increase price", ()=>{
      const carInsurance = new CarInsurance([ new Product('Full Coverage', 1, 10) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(0);
      expect(products[0].price).equal(11);
    })

    it("should decrease sellIn and increase price twice faster", ()=>{
      const carInsurance = new CarInsurance([ new Product('Full Coverage', 0, 20) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(-1);
      expect(products[0].price).equal(22);
    })

    it("should decrease sellIn and should not increase price", ()=>{
      const carInsurance = new CarInsurance([ new Product('Full Coverage', -1, 50) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(-2);
      expect(products[0].price).equal(50);
    })

    it("should decrease sellIn and should increase price by 1", ()=>{
      const carInsurance = new CarInsurance([ new Product('Full Coverage', -1, 49) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(-2);
      expect(products[0].price).equal(50);
    })
  })

});
