import chroma from 'chroma-js';
import sizes from './sizes';

const styles = {
    DraggableColorBox: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-5px',
        opacity: '1',
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.5)',
            transition: 'all 0.3s ease-in-out'
        },
        [sizes.down("lg")]: {
            width: '25%',
            height:"20%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "10%"
        },
        [sizes.down("sm")]: {
            width: "100%",
            height: "5%"
        }
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0px',
        padding: '10px',
        color: props=> 
            chroma(props.color).luminance() <= 0.2573 ? 
                'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between'
    }
}

export default styles;