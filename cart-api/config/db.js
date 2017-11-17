module.exports = function() {
  return {
    cartList : [
      {cId : "1", products: []},
      {cId : "2", products: []}
    ],

    /* Retrieve all products of a customers cart */
    find(cId) {
      var cart = this.cartList.find(element => {
        return element.cId === cId;
      });
      if (cart) {
        return cart.products;
      } else {
        return 0;
      }
    },

    /* Save new product into cart inside the "db". */
    save(cId, cartproduct) {
      this.find(cId).push(cartproduct);
      return 1;
    },

    /* Update a product amount and price with the given id */
    update(cId, pId, cartproduct) {
      var productIndex = this.find(cId).findIndex(element => {
        return element.pId === pId;
      });
      if(productIndex !== -1) {
        this.find(cId)[productIndex].amount = cartproduct.amount;
        this.find(cId)[productIndex].price = cartproduct.price;
        return 1;
      }else {
        return 0;
      }
    },

    /* Delete a product of a customer with the given id. */
    remove(cId, pId) {
      var productIndex = this.find(cId).findIndex(element => {
        return element.pId === pId;
      });
      if(productIndex !== -1) {
        this.find(cId).splice(productIndex, 1);
        return 1;
      }else {
        return 0;
      }
    }
  }
};
