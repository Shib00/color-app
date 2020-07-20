import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteStyles';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = { format: 'hex' }
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeFormat(val) {
        this.setState({ format: val })
    }

    gatherShades(palette, color) {
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(allColors[key].filter(c => c.id === color))
        }
        return shades.slice(1);
    }
    render() {
        const { paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const { format } = this.state;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                key={color.name} 
                name={color.name} 
                background={color[format]} 
                showingFullPalette={false} 
            />
        ));
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} showingAllColors={false} />
                <div className={classes.PaletteColors}>
                    {colorBoxes}
                    <Link to={`/palette/${id}`} >
                        <div className={classes.goBack}>
                            <p>Go Back</p>
                        </div>
                    </Link>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);