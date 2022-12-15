import Button from 'react-bootstrap/Button';

function CalcButton(props) {

    return (
        <Button 
            className={props.className} 
            variant={props.variant}
            onClick={props.onClick}
        >
            {props.value}
        </Button>
    );
}

export default CalcButton;