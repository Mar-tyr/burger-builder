import React from 'react';
import classes from './BurgerControl.module.css';
import PropTypes from 'prop-types';

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.ingredientRemoved}
        disabled={props.shouldDisable}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.ingredientAdded}>
        More
      </button>
    </div>
  );
};

BuildControl.propTypes = {
  label: PropTypes.string,
  shouldDisable: PropTypes.bool,
  ingredientRemoved: PropTypes.func,
  ingredientAdded: PropTypes.func,
};

export default BuildControl;
