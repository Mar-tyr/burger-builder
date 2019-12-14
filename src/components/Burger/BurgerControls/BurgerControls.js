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
      {controls.map((control) => {
        return <BurgerControl key={control.label} label={control.label} />;
      })}
    </div>
  );
};

export default burgerControls;
