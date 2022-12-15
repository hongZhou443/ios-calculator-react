import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from "react";

import Card from 'react-bootstrap/Card';
import CalcButton from './components/CalcButton';
import Screen from './components/Screen';

const BTN_MAP = {
  "C": "light",
  "A/C": "light",
  "+/-": "light",
  "%": "light",
  "/": "warning",
  "X": "warning",
  "-": "warning",
  "+": "warning",
  "=": "warning",
  9: "secondary",
  8: "secondary",
  7: "secondary",
  6: "secondary",
  5: "secondary",
  4: "secondary",
  3: "secondary",
  2: "secondary",
  1: "secondary",
  0: "secondary",
  ".": "secondary"
}

function App() {

  const [calc, setCalc] = useState({
    op: "",
    val: 0,
    res: 0,
  });

  const btns = [
    [calc.val || calc.op ? "C" : "A/C", "+/-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  function handleCalculation() {
    console.log("Make Calculations");
    if (calc.op === "+") {
      return Number(calc.res) + Number(calc.val);
    } else if (calc.op === "-") {
      return Number(calc.res) - Number(calc.val);
    } else if (calc.op === "X") {
      return Number(calc.res) * Number(calc.val);
    } else if (calc.op === "/") {
      if (!Number(calc.val)) {
        window.alert("Divide By Zero");
      } else {
        return Number(calc.res) / Number(calc.val);
      }
    } else if (calc.op === "-") {
      return Number(calc.res) - Number(calc.val);
    }

    return calc.res;

  }

  function handleNumClick(event) {
    event.preventDefault();
    const newVal = event.target.innerHTML;
    if (calc.val.toString().length < 9) {
      setCalc(({
        ...calc,
        res: calc.op ? calc.res : 0,
        val:
          calc.val === 0 && newVal === "0"
            ? newVal
            : calc.val % 1 === 0
              ? Number(calc.val + newVal)
              : calc.val + newVal
      }));
    }
  }

  function handleOperation(event) {
    event.preventDefault();
    const newOp = event.target.innerHTML;
    setCalc(({
      ...calc,
      op: newOp,
      res: !calc.val ? calc.res : !calc.res ? calc.val : handleCalculation(),
      val: 0,
    }));
  }

  function handleClear(event) {
    event.preventDefault();
    console.log(`${event.target.innerHTML} pressed`)
    setCalc({ ...calc, val: 0, op: "" });
  }

  function handleAllClear(event) {
    event.preventDefault();
    console.log(`${event.target.innerHTML} pressed`)
    setCalc({
      op: "",
      val: 0,
      res: 0,
    });
  }

  function handleSign(event) {
    event.preventDefault();
    console.log(`${event.target.innerHTML} pressed`)
    setCalc({
      ...calc,
      val: calc.val ? calc.val * -1 : 0,
      res: calc.res ? calc.res * -1 : 0
    })
  }

  function handlePercent(event) {
    event.preventDefault();
    console.log(`${event.target.innerHTML} pressed`)
    setCalc({
      ...calc,
      val: calc.val ? calc.val / 100 : 0,
      res: !calc.res ? 0 : calc.val ? calc.res : calc.res / 100
    })
  }

  function handleEquals(event) {
    event.preventDefault();
    if (calc.op && calc.val) {
      setCalc({ op: "", res: handleCalculation(), val: 0 });
    }

    console.log(`${calc.val} ${calc.res} ${calc.op}`);
  }

  function handlePointClick(event) {
    event.preventDefault();
    console.log(`${event.target.innerHTML} pressed`)

    setCalc({
      ...calc,
      val: calc.val.toString().includes(".") ? calc.val : calc.val + "."
    });
  }

  const BTN_FUNC_MAP = {
    "C": handleClear,
    "A/C": handleAllClear,
    "+/-": handleSign,
    "%": handlePercent,
    "/": handleOperation,
    "X": handleOperation,
    "-": handleOperation,
    "+": handleOperation,
    "=": handleEquals,
    9: handleNumClick,
    8: handleNumClick,
    7: handleNumClick,
    6: handleNumClick,
    5: handleNumClick,
    4: handleNumClick,
    3: handleNumClick,
    2: handleNumClick,
    1: handleNumClick,
    0: handleNumClick,
    ".": handlePointClick
  }

  const btnlist = btns.flat().map((btn) => (
    <CalcButton
      value={btn}
      className={btn === 0 ? "buttonCalculator_wide" : "buttonCalculator"}
      variant={BTN_MAP[btn]}
      onClick={BTN_FUNC_MAP[btn]}
    />
  ))

  return (
    <div className="wrapper">
      <Card className="inner bg-dark text-white">

        <Card className="body bg-dark text-white">
          <Screen val={calc.val ? calc.val : calc.res}/>

          <Card className="buttonPanelOuter bg-dark text-white">

            <div className='buttonPanelInner'>
              {btnlist}
            </div>

          </Card>
        </Card>
      </Card>
    </div>
  );
}

export default App;
