import * as React from "react";
import * as ReactDOM from "react-dom";
import './calculatorStyles.css';

console.log('App has been started..');


const NumberedButton = (props: { value: string, buttonPressedCallback: (value:string) => void } ) => {
    const updateScreen = () => {
        props.buttonPressedCallback(props.value);
    };

    return <div className = "numberButtons" onClick = {updateScreen} >
            {props.value}

    </div>
};
const OperationButton = (props: { value: string, buttonPressedCallback: (value:string) => void } ) => {
    const updateScreen = () => {
        props.buttonPressedCallback(props.value);
    };

    return <div onClick = {updateScreen} >
            {props.value}
    </div>
};
const DisplayValue = (props: {quantity: string}) => {
    return <div className="displayScreen">
        {props.quantity}
    </div>
};

const CalcNumbers = (props: {updateScreenCallback: (quantity: string) => void} ) => {

    const pressedButton = (value:string) => {
        props.updateScreenCallback(value)
    };

    return <div className="keyboard">
        
        <div className="toprowKeyboard">
            <NumberedButton value={'7'} buttonPressedCallback={pressedButton} />
            <NumberedButton value={'8'} buttonPressedCallback={pressedButton} />
            <NumberedButton value={'9'} buttonPressedCallback={pressedButton} />
        </div>
        <div className="topmiddleKeyboard">
            <NumberedButton value={'4'} buttonPressedCallback={pressedButton} />
            <NumberedButton value={'5'} buttonPressedCallback={pressedButton} />
            <NumberedButton value={'6'} buttonPressedCallback={pressedButton} />
        </div>
        <div className="bottommiddleKeyboard">
            <NumberedButton value={'1'} buttonPressedCallback={pressedButton} />
            <NumberedButton value={'2'} buttonPressedCallback={pressedButton} />
            <NumberedButton value={'3'} buttonPressedCallback={pressedButton} />
        </div>
        <div className="bottomrowKeyboard">
            <NumberedButton value={'0'} buttonPressedCallback={pressedButton} />
        </div>
    </div>
};

const CalcOperations = (props: {updateScreenCallback: (operation: string) => void} ) => {

    const pressedButton = (value:string) => {
        props.updateScreenCallback(value)
    };

    return <div className = "commandButtons">
        <OperationButton value={'/'} buttonPressedCallback={pressedButton} />
        <OperationButton value={'x'} buttonPressedCallback={pressedButton} />
        <OperationButton value={'-'} buttonPressedCallback={pressedButton} />
        <OperationButton value={'+'} buttonPressedCallback={pressedButton} />
        <OperationButton value={'='} buttonPressedCallback={pressedButton} />
        <OperationButton value={'clear'} buttonPressedCallback={pressedButton} />
    </div>
};

class Calculator extends React.Component{


    state = { displayValue: '0',
              memoryValue: 0,
              operation: '' };

    updateValues = (quantity: string) => {
            var currentValue = this.state.displayValue
            if (currentValue == '0') currentValue = quantity
            else  currentValue += quantity
            this.setState({displayValue: currentValue})
    };

    conductOperations = (operation: string) => {
        var display = this.state.displayValue
        var memory = this.state.memoryValue
        var action = this.state.operation

        console.log(action + memory)
        if (operation === '+') {
            memory += Number(display)
            display = '0'
            action = '+'
        }
        else if (operation === '=' && action === '+') {
            memory += Number(display)
            console.log(memory)
            display = String(memory)
            memory = 0 
            action = ''
        }
        else if (operation === '-' || operation === '/' || operation === 'x' && memory == 0) {
            memory += Number(display)
            display = '0'
            action = operation
        }
        else if (operation === '-') {
            memory -= Number(display)
            display = '0'
            action = '-'
        }
        else if (operation === '=' && action === '-') {
            memory -= Number(display)
            console.log(memory)
            display = String(memory)
            memory = 0 
            action = ''
        }
        else if (operation === '/') {
            memory /= Number(display)
            display = '0'
            action = '/'
        }
        else if (operation === '=' && action === '/') {
            memory /= Number(display)
            console.log(memory)
            display = String(memory)
            memory = 0 
            action = ''
        }
        else if (operation === 'x') {
            memory *= Number(display)
            display = '0'
            action = 'x'
        }
        else if (operation === '=' && action === 'x') {
            memory *= Number(display)
            console.log(memory)
            display = String(memory)
            memory = 0 
            action = ''
        }
        else if (operation === 'clear') {
            display = '0'
            memory = 0
            action = ''
        }

        this.setState({displayValue: display, memoryValue: memory, operation: action})
    };

    render() {
        return (
            <div className="container">
                <DisplayValue quantity = {this.state.displayValue} />
                <CalcNumbers updateScreenCallback={this.updateValues}/>
                <CalcOperations updateScreenCallback={this.conductOperations}/>
            </div>
        );
    };
};

ReactDOM.render( <div>
    <Calculator />
    </div>,

    document.getElementById("reactApp")
);