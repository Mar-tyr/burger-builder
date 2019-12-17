import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.5,
  meat: 0.8,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

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

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Can Xia',
        address: {
          street: 'Test Street 1',
          zipCode: '94043',
          country: 'United States',
        },
        email: 'martyr0807@gmail.com',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post('/orders.json', order)
      .then((order) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  render() {
    const disableInfo = {};
    for (let ingredient in this.state.ingredients) {
      disableInfo[ingredient] = this.state.ingredients[ingredient] <= 0;
    }
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;
    if (this.state.ingredients !== null) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disableInfo={disableInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = this.state.loading ? (
        <Spinner />
      ) : (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCanceled={this.purchaseCancelHandler}
          price={this.state.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
