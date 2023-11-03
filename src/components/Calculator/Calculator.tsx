import React, { useState , useEffect} from 'react';
import { evaluate } from 'mathjs'
import './calculator.scss';

type Operators = '+' | '-' | '+/-' | '*' | '/' | '^' | 'sqrt' | '.'

export const Calculator = () => {
  const [input, setInput] = useState('')

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.replace(/[^0-9.]/g, ''))
  }

  const backspace = () => {
    setInput(prev => prev.slice(0, -1))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && !document.activeElement?.tagName?.toLowerCase().includes('input')) {
        backspace()
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const number = (number: string) => {
    setInput((prev => prev + number))
  }

  const operator = (operator: Operators) => {
    if (operator === '+/-') {
      setInput(prev => String(-Number(prev)))

    } else if (operator === '^') {
      setInput(prev => String(Math.pow(+prev, 2)))

    } else if (operator === 'sqrt') {
      setInput(prev => String(Math.sqrt(+prev)))

    } else {
      setInput( prev => {
        const lastOperator = prev.charAt(prev.length - 1)
        const operators = ['+' , '-', '*' , '/', '.']

        if (operators.includes(lastOperator)) {
          return prev.slice(0, -1) + operator

        } else {
          return prev + operator;
        }
      })
    }
  }

  const result = () => {
    try {
     setInput(evaluate(input))
    } catch (error) {
      setInput('Error')
    }
  }

    return (
        <div className="calculator">
          <div className="calculator__body">
            <div className="calculator__top">
              <span className="calculator__circle calculator__circle--red"></span>
              <span className="calculator__circle calculator__circle--yellow"></span>
              <span className="calculator__circle calculator__circle--green"></span>
            </div>
            <div className="calculator__middle">
              <input
                type="text"
                className='calculator__input'
                placeholder='0'
                value={input}
                onChange={inputHandler}
              />
            </div>
            <div className="calculator__bottom">
              <ul className='value'>
                <li className="value__item"><button className='value__button value__button--hide'>%</button></li>
                <li className="value__item"><button className='value__button value__button--hide'>CE</button></li>
                <li className="value__item"><button className='value__button' onClick={() => setInput('')}>C</button></li>
                <li className="value__item">
                  <button
                    className='value__button value__button--backspace'
                    onClick={() => backspace()}
                  >
                    clear
                  </button>
                </li>
                <li className="value__item"><button className='value__button value__button--hide'><sup>1</sup><span>/</span><sub>x</sub></button></li>
                <li className="value__item"><button className='value__button' onClick={() => operator('^')}>x<sup>2</sup></button></li>
                <li className="value__item"><button className='value__button' onClick={() => operator('sqrt')}><sup>2</sup>&#8730;x</button></li>
                <li className="value__item"><button className='value__button' onClick={() => operator('/')}>/</button></li>
                <li className="value__item"><button className='value__button value__button--color' onClick={() => number('7')}>7</button></li>
                <li className="value__item"><button className='value__button value__button--color' onClick={() => number('8')}>8</button></li>
                <li className="value__item"><button className='value__button value__button--color' onClick={() => number('9')}>9</button></li>
                <li className="value__item"><button className='value__button' onClick={() => operator('*')}>x</button></li>
                <li className="value__item"><button className='value__button value__button--color' onClick={() => number('4')}>4</button></li>
                <li className="value__item"><button className='value__button value__button--color' onClick={() => number('5')}>5</button></li>
                <li className="value__item"><button className='value__button value__button--color' onClick={() => number('6')}>6</button></li>
                <li className="value__item"><button className='value__button' onClick={() => operator('-')}>-</button></li>
                <li className="value__item"><button className='value__button value__button--color' onClick={() => number('1')}>1</button></li>
                <li className="value__item"><button className='value__button value__button--color' onClick={() => number('2')}>2</button></li>
                <li className="value__item"><button className='value__button value__button--color' onClick={() => number('3')}>3</button></li>
                <li className="value__item"><button className='value__button' onClick={() => operator('+')}>+</button></li>
                <li className="value__item"><button className='value__button value__button--color' onClick={() => operator('+/-')}><sup>+</sup><span>/</span><sub>-</sub></button></li>
                <li className="value__item"><button className='value__button value__button--color' onClick={() => number('0')}>0</button></li>
                <li className="value__item"><button className='value__button value__button--color' onClick={() => operator('.')}>,</button></li>
                <li className="value__item"><button className='value__button value__button--equally' onClick={() => result()}>=</button></li>
              </ul>
            </div>
          </div>
        </div>
    )
}