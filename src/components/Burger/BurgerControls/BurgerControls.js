import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';
import classes from './BurgerControls.module.css';
import PropTypes from 'prop-types';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BurgerControls = (props) => {
  return (
    <div className={classes.BuilderControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => {
        return (
          <BurgerControl
            ingredientAdded={props.ingredientAdded.bind(this, control.type)}
            ingredientRemoved={props.ingredientRemoved.bind(this, control.type)}
            shouldDisable={props.disableInfo[control.type]}
            key={control.label}
            label={control.label}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

BurgerControls.propTypes = {
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
  disableInfo: PropTypes.object,
  purchasable: PropTypes.bool,
  price: PropTypes.number,
  ordered: PropTypes.func,
};

export default BurgerControls;
