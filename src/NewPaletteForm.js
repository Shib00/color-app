import React, { Component } from "react";
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import DraggableColorList from "./DraggableColorList";
import ColorPickerForm from './ColorPickerForm';
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import styles from './styles/NewPaletteFormStyles';
import classNames from "classnames";
import seedColors from './seedColors';

class NewPaletteForm extends Component {
    static defaultProps = { maxColors: 20 }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            newPaletteName: '',
            colors: seedColors[0].colors
        }
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
        newPalette.colors = this.state.colors;
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    }



    addNewColor(newColor) {
        this.setState({ colors: [...this.state.colors, newColor], newColorName: "" });
    }

    clearColors = () => {
        this.setState({ colors: [] })
    }

    addRandomColor = () => {
        const allColors = this.props.palettes.map(p => p.colors).flat();
        let rand;
        let randomColor;
        let isDuplicateColor = true;
        while (isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[rand];
            isDuplicateColor = this.state.colors.some(
            // eslint-disable-next-line    
            color => color.name === randomColor.name);
        }
        this.setState({ colors: [...this.state.colors, randomColor] });
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleDelete = (colorName) => {
        this.setState(
            {
                colors: this.state.colors.filter(c => c.name !== colorName)
            }
        )
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex)
        }));
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const isPaletteFull = colors.length >= maxColors;

        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                    handleDrawerClose={this.handleDrawerClose}
                />
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant='h4' gutterBottom>
                            Design your Palette
                    </Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant='contained' 
                                color='secondary' 
                                onClick={this.clearColors}
                                className={classes.button}
                            >
                                Clear Palette
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={isPaletteFull}
                                onClick={this.addRandomColor}
                                className={classes.button}
                            >
                                {isPaletteFull ? 'Palette Full' : 'Random Color'}
                            </Button>
                        </div>
                        <ColorPickerForm isPaletteFull={isPaletteFull} addNewColor={this.addNewColor} colors={colors} />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={colors}
                        handleDelete={this.handleDelete}
                        axis='xy'
                        onSortEnd={this.onSortEnd}
                        distance= {20}
                    />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);