class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }
}

class Rule {
  constructor(product) {
    this.product = product;
  }

  execute(){
  }
}

class CommonRule extends Rule {
  constructor(product) {
    super(product);
  }

  execute() {}
}


class FullCoverageRule extends Rule{
  constructor(product) {
    super(product);
  }

  static relatedProductName (){
    return 'Full Coverage';
  }

  execute() {
    super.execute();
  }
}

class MegaCoverageRule extends Rule{
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
