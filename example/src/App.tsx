import React from 'react'
import { Draggable } from 'z-draggable'
import 'z-draggable/dist/index.css'
import classes from './App.module.css';

const App = () => {
  return (
    <Draggable>
      <div className={classes.MyDiv}>
        MOVE ME
      </div>
    </Draggable>
  );
}

export default App
