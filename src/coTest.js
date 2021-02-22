class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }

  getSellIn(){
    return this.sellIn;
  }

  decreaseSellIn(){
    return this.sellIn --;
  }

  setPrice( n ){
    this.price = n;
  }

  getPrice () {
    return this.price;
  }

  decreasePriceBy( n ){
    this.price -= n;
  }

  increasePriceBy ( n ) {
    this.price += n
  }
}

class AbstractRule {
  constructor(product) {
    this.product = product;
  }

  decreaseSellIn(){
    this.product.decreaseSellIn()
  }

  execute(){
    this.decreaseSellIn();
  }
}

class CommonRule extends AbstractRule {
  constructor(product) {
    super(product);
  }

  decreasePrice(){
    if (this.product.getPrice() > 0){
      this.product.decreasePriceBy( 1 );
    }
  }

  doubleDecrease(){
    if (this.product.getPrice() > 1 ){
      this.product.decreasePriceBy(2)
    } else {
      this.decreasePrice();
    }
  }

  execute() {
    super.execute()
    if (this.product.getSellIn() < 0){
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
    if (this.product.getPrice() < 50) {
      this.product.increasePriceBy( 1 );
    }
  }

  doubleIncreasePrice(){
    if (this.product.getPrice() < 49) {
      this.product.increasePriceBy(2);
    } else {
      this.increasePrice();
    }
  }

  execute() {
    super.execute();
    if (this.product.getSellIn() < 0) {
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
    this.decreaseSellIn();
    this.increasePrice();
    if (this.product.getSellIn() < 11) {
      this.increasePrice();
    }
    if (this.product.getSellIn() < 6) {
      this.increasePrice();
    }
    if (this.product.getSellIn() <= 0)
      this.product.setPrice(0);
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
    if (this.product.getPrice() > 1) {
      this.product.decreasePriceBy(2);
    } else {
      this.product.decreasePriceBy(this.product.getPrice());
    }
  }

  doubleDecreasePrice(){
    if (this.product.getPrice() > 3) {
      this.product.decreasePriceBy(4);
    } else {
      this.product.decreasePriceBy(this.product.getPrice());
    }
  }

  execute() {
    super.execute();
    if (this.product.getSellIn() >= 0) {
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
