class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }
}

class AbstractRule {
  constructor(product) {
    this.product = product;
  }

  execute(){
    this.product.sellIn--;
  }
}

class CommonRule extends AbstractRule {
  constructor(product) {
    super(product);
  }

  decreasePrice(){
    if (this.product.price > 0){
      this.product.price--;
    }
  }

  doubleDecrease(){
    if (this.product.price > 1 ){
      this.product.price -= 2
    } else {
      this.decreasePrice();
    }
  }

  execute() {
    super.execute()
    if (this.product.sellIn < 0){
      this.doubleDecrease()
    } else {
      this.decreasePrice()
    }
  }
}


class FullCoverageRule extends AbstractRule{
  constructor(product) {
    super(product);
  }

  static relatedProductName (){
    return 'Full Coverage';
  }

  increasePrice(){
    if (this.product.price < 50) {
      this.product.price++;
    }
  }

  doubleIncreasePrice(){
    if (this.product.price < 49) {
      this.product.price+= 2;
    } else {
      this.increasePrice();
    }
  }

  execute() {
    super.execute();
    if (this.product.sellIn < 0) {
      this.doubleIncreasePrice();
    } else {
      this.increasePrice();
    }
  }
}

class MegaCoverageRule extends AbstractRule{
  constructor(product) {
    super(product);
  }

  static relatedProductName (){
    return 'Mega Coverage';
  }

  execute() {}
}

class SpecialFullCoverageRule extends FullCoverageRule{
  constructor(product) {
    super(product);
  }

  static relatedProductName (){
    return 'Special Full Coverage';
  }

  execute() {
    this.product.sellIn--;
    this.increasePrice();
    if (this.product.sellIn < 11) {
      this.increasePrice();
    }
    if (this.product.sellIn < 6) {
      this.increasePrice();
    }
    if (this.product.sellIn <= 0)
      this.product.price = 0;
  }
}

class SuperSaleRule extends AbstractRule{
  constructor(product) {
    super(product);
  }

  static relatedProductName (){
    return 'Super Sale';
  }

  decreasePrice(){
    if (this.product.price > 1) {
      this.product.price -= 2;
    } else if (this.product.price === 1) {
      this.product.price -= 1;
    }
  }

  doubleDecreasePrice(){
    if (this.product.price > 3) {
      this.product.price -= 4;
    } else if (this.product.price === 1) {
      this.product.price -= 1;
    }
  }

  execute() {
    super.execute();
    if (this.product.sellIn >= 0) {
      this.decreasePrice();
    } else {
      this.doubleDecreasePrice();
    }
  }
}


class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }

  getRuleBy(product){
    switch (product.name){
      case FullCoverageRule.relatedProductName():
        return new FullCoverageRule(product);
      case MegaCoverageRule.relatedProductName():
        return new MegaCoverageRule(product);
      case SpecialFullCoverageRule.relatedProductName():
        return new SpecialFullCoverageRule(product);
      case SuperSaleRule.relatedProductName():
        return new SuperSaleRule(product);
      default:
        return new CommonRule(product);
    }
  }

  updatePrice() {
    this.products = this.products.map((product) => {
      const productRule = this.getRuleBy(product);
      productRule.execute();

      return product;
    });

    return this.products;
  }
}

module.exports = {
  Product,
  CarInsurance
}
