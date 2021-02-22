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

  describe('Mega Coverage', ()=>{
    it("should not change sellIn and price", ()=>{
      const carInsurance = new CarInsurance([ new Product('Mega Coverage', 1, 80) ]);
      const products = carInsurance.updatePrice()

      expect(products[0].sellIn).equal(1);
      expect(products[0].price).equal(80);


      const carInsurance_1 = new CarInsurance([ new Product('Mega Coverage', 0, 80) ]);
      const products_1 = carInsurance_1.updatePrice()

      expect(products_1[0].sellIn).equal(0);
      expect(products_1[0].price).equal(80);
    })
  })

  describe('Special Full Coverage', ()=>{
    it("should decrease sellIn and increase price by one", ()=>{
      const carInsurance = new CarInsurance([ new Product('Special Full Coverage', 12, 10) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(11);
      expect(products[0].price).equal(11);
    })

    it("should decrease sellIn and increase price by two", ()=>{
      const carInsurance = new CarInsurance([ new Product('Special Full Coverage', 11, 10) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(10);
      expect(products[0].price).equal(12);
    })

    it("should decrease sellIn and increase price by three", ()=>{
      const carInsurance = new CarInsurance([ new Product('Special Full Coverage', 6, 10) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(5);
      expect(products[0].price).equal(13);
    })

    it("should decrease sellIn and should set price as zero", ()=>{
      const carInsurance = new CarInsurance([ new Product('Special Full Coverage', -1, 49) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(-2);
      expect(products[0].price).equal(0);
    })
  })

  describe('Super Sale', ()=>{
    it("should decrease sellIn and price", ()=>{
      const carInsurance = new CarInsurance([ new Product('Super Sale', 10, 20) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(9);
      expect(products[0].price).equal(18);
    })
    it("should decrease sellIn and price twice faster", ()=>{
      const carInsurance = new CarInsurance([ new Product('Super Sale', 0, 20) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(-1);
      expect(products[0].price).equal(16);
    })

    it("should decrease sellIn and should not decrease price", ()=>{
      const carInsurance = new CarInsurance([ new Product('Super Sale', -1, 0) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(-2);
      expect(products[0].price).equal(0);

      const carInsurance_1 = new CarInsurance([ new Product('Super Sale', 5, 0) ]);
      const products_1 = carInsurance_1.updatePrice()
      expect(products_1[0].sellIn).equal(4);
      expect(products_1[0].price).equal(0);
    })

    it("should decrease sellIn and should decrease price by 1", ()=>{
      const carInsurance = new CarInsurance([ new Product('Super Sale', -1, 1) ]);
      const products = carInsurance.updatePrice()
      expect(products[0].sellIn).equal(-2);
      expect(products[0].price).equal(0);
    })
  })
});
