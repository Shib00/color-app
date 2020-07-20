import React, {PureComponent} from 'react';
import { withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';

class MiniPalette extends PureComponent {
    constructor(props){
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
    }
    deletePalette(e) {
        e.stopPropagation();
        this.props.openDialog(this.props.id);
    }
    render(){
        const {classes, paletteName, emoji, colors, handleClick, id} = this.props;
        const miniColorBoxes = colors.map(c=> (
            <div
                key={c.name} 
                className={classes.miniColor}
                style={{backgroundColor: c.color}}
                onClick={() => handleClick(id)}
            >
            </div>
        ));
        return (
            <div className={classes.root} onClick={() => handleClick(id)}>
                <DeleteIcon 
                    className={classes.deleteIcon} 
                    onClick={this.deletePalette} 
                    style={{transition: 'all 0.2s ease-in-out'}} 
                />
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>
                    {paletteName} 
                    <span className={classes.emoji}>{emoji}</span>
                </h5>   
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette);