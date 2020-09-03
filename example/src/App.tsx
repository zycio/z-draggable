import React from 'react';
import { Draggable } from 'z-react-draggable';
import classes from './App.module.css';

const App = () => {
  return (
    <Draggable initialPosition={{ x: 100, y: 100 }}>
      <div className={classes.MyDiv}>
        MOVE ME
      </div>
    </Draggable>
  );
}

export default App
