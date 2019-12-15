import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.5,
  meat: 0.8,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 4,
    purchasable: false,
  };

  updatePurchasable = (ingredients) => {
    let ingredientCnt = 0;
    for (const ingredient in ingredients) {
      ingredientCnt += ingredients[ingredient];
    }
    this.setState({ purchasable: ingredientCnt > 0 });
  };

  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredients[type] + 1;
    const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice,
    });
    this.updatePurchasable(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredients[type] - 1;
    const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice,
    });
    this.updatePurchasable(updatedIngredients);
  };

  render() {
    const disableInfo = {};
    for (let ingredient in this.state.ingredients) {
      disableInfo[ingredient] = this.state.ingredients[ingredient] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disableInfo={disableInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
