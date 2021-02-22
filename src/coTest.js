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
    super.execute();
    this.increasePrice();
    if (this.product.sellIn < 11) {
      this.increasePrice();
    }
    if (this.product.sellIn < 6) {
      this.increasePrice();
    }
  }
}

class SuperSaleRule extends Rule{
  constructor(product) {
    super(product);
  }

  static relatedProductName (){
    return 'Super Sale';
  }

  execute() {
    super.execute();

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

    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].name != 'Full Coverage' && this.products[i].name != 'Special Full Coverage') {
        if (this.products[i].price > 0) {
          if (this.products[i].name != 'Mega Coverage') {
            this.products[i].price = this.products[i].price - 1;
          }
        }
      } else {
        if (this.products[i].price < 50) {
          this.products[i].price = this.products[i].price + 1;
          if (this.products[i].name == 'Special Full Coverage') {
            if (this.products[i].sellIn < 11) {
              if (this.products[i].price < 50) {
                this.products[i].price = this.products[i].price + 1;
              }
            }
            if (this.products[i].sellIn < 6) {
              if (this.products[i].price < 50) {
                this.products[i].price = this.products[i].price + 1;
              }
            }
          }
        }
      }
      if (this.products[i].name != 'Mega Coverage') {
        this.products[i].sellIn = this.products[i].sellIn - 1;
      }
      if (this.products[i].sellIn < 0) {
        if (this.products[i].name != 'Full Coverage') {
          if (this.products[i].name != 'Special Full Coverage') {
            if (this.products[i].price > 0) {
              if (this.products[i].name != 'Mega Coverage') {
                this.products[i].price = this.products[i].price - 1;
              }
            }
          } else {
            this.products[i].price = this.products[i].price - this.products[i].price;
          }
        } else {
          if (this.products[i].price < 50) {
            this.products[i].price = this.products[i].price + 1;
          }
        }
      }
    }

    return this.products;
  }
}

module.exports = {
  Product,
  CarInsurance
}
