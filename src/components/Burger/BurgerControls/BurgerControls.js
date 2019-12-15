import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';
import classes from './BurgerControls.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const burgerControls = (props) => {
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
    </div>
  );
};

export default burgerControls;
