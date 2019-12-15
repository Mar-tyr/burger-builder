import React from 'react';
import Aux from '../../../hoc/Auxiliary';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingredient) => (
    <li>
      <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>{' '}
      {props.ingredients[ingredient]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
    </Aux>
  );
};

export default OrderSummary;
