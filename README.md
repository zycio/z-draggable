# z-draggable

> Draggable component.

[![NPM](https://img.shields.io/npm/v/z-draggable.svg)](https://www.npmjs.com/package/z-draggable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save z-draggable
```

## Usage

```tsx
import React, { Component } from 'react'
import { Draggable } from 'z-draggable'

class Example extends Component {
  render() {
    return (
      <Draggable>
        <div>
          my div
        </div>
      </Draggable>
    )
  }
}
```

## Usage with initial position

```tsx
import React, { Component } from 'react'
import { Draggable } from 'z-draggable'

class Example extends Component {
  render() {
    const initialPosition = {
      x: 100,
      y: 200
    };
    
    return (
      <Draggable initialPosition={initialPosition}>
        <div>
          my div
        </div>
      </Draggable>
    )
  }
}
```

## License

MIT © [zycio](https://github.com/zycio)
