import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import BurgerControls from './BurgerControls/BurgerControls';
import classes from './Burger.module.css';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredient) => {
      return [...Array(props.ingredients[ingredient])].map((_, i) => {
        return (
          <BurgerIngredient type={ingredient} key={ingredient + '_' + i} />
        );
      });
    })
    .reduce((arr, ele) => {
      return arr.concat(ele);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
      <BurgerControls />
    </div>
  );
};

export default burger;
