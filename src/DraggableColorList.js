import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';


const DraggableColorList = SortableContainer(({ colors, handleDelete }) => {
    return (
    <div style={{ height: '100%' }}>
        {colors.map((c,i) => (
            <DraggableColorBox
                index={i}
                color={c.color}
                key={c.name}
                name={c.name}
                handleClick={() => handleDelete(c.name)}
            />
        ))}
    </div>)
});

export default DraggableColorList;