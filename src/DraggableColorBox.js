import React from 'react';
import { withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc';
import styles from './styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement((props) => {
    const {color, classes, handleClick} = props;
    return(
        <div className={classes.DraggableColorBox} style={{backgroundColor: color}}>
            <div className={classes.boxContent}>
                <span>{props.name}</span>
                <DeleteIcon onClick={handleClick} />
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox);