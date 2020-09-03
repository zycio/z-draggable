import React, { Component, RefObject, Children, isValidElement, cloneElement, Fragment } from 'react';
import { DraggableProps, DraggableState } from './index.model';

export class Draggable extends Component<DraggableProps, DraggableState> {
    state = {
        dragging: false,
        position: { x: 0, y: 0 },
        relativePosition: { x: 0, y: 0}
    };

    elementRef: RefObject<HTMLDivElement>;

    constructor(props: DraggableProps) {
        super(props);

        this.elementRef = React.createRef();

        this.state.position = {
            x: this.props.initialPosition?.x || 0,
            y: this.props.initialPosition?.y || 0
        };
    }

    componentDidUpdate(_props: DraggableProps, state: DraggableState) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
        }
    }

    onMouseDown = (event: MouseEvent) => {
        if (event.button !== 0) return; // only left mouse button allowed

        const offset = {
            left: this.elementRef.current?.offsetLeft || 0,
            top: this.elementRef.current?.offsetTop || 0
        };

        this.setState({
            dragging: true,
            relativePosition: {
                x: event.pageX - offset.left,
                y: event.pageY - offset.top
            }
        });

        event.stopPropagation();
    }

    onMouseUp = (event: MouseEvent) => {
        this.setState({ dragging: false });

        event.stopPropagation();
        event.preventDefault();
    }

    onMouseMove = (event: MouseEvent) => {
        if (!this.state.dragging) return;

        this.setState(prevState => {
            const xPosition = event.pageX - prevState.relativePosition.x;
            const yPosition = event.pageY - prevState.relativePosition.y;
            const maxXPosition = window.innerWidth - (this.elementRef.current?.clientWidth || 0);
            const maxYPosition = window.innerHeight - (this.elementRef.current?.clientHeight || 0);

            const newXPosition = xPosition > 0 && xPosition < maxXPosition ? event.pageX - prevState.relativePosition.x : prevState.position.x;
            const newYPosition = yPosition > 0 && yPosition < maxYPosition ? event.pageY - prevState.relativePosition.y : prevState.position.y;
            
            return {
                position: {
                    x: newXPosition,
                    y: newYPosition
                }
            };
        });

        event.stopPropagation();
        event.preventDefault();
    }

    render() {
        const props = {
            onMouseDown: this.onMouseDown,
            style: {
                position: 'absolute',
                left: `${this.state.position.x}px`,
                top: `${this.state.position.y}px`
            },
            ref: this.elementRef
        };
        const childrenWithProps = Children.map(this.props.children, child => {
            if (isValidElement(child)) {
                return cloneElement(child, props);
            }

            return child;
        });
        return (
            <Fragment>
                { childrenWithProps }
            </Fragment>
        );
    }
}