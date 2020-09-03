export interface DraggablePosition {
    x: number;
    y: number;
}

export interface DraggableProps {
    initialPosition?: DraggablePosition;
}

export interface DraggableState {
    dragging: boolean;
    position: DraggablePosition;
    relativePosition: DraggablePosition; //position relative to cursor
}
