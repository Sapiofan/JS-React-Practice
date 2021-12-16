import React from 'react';
import ReactDOM from 'react-dom';
import './checkers/checkers.css'
import {Checkers} from './checkers/checkers'
// import Row from './checkers/components/row';
// import './checkers/checkers.css';
// import Black from './checkers/pieces/black';
// import White from './checkers/pieces/white';

// class Checkers extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             stepNumber: 0,
//             whiteIsNext: true,
//             history: [{
//                 squares: data
//             }],
//             whiteCheckers: 12,
//             blackCheckers: 12
//         }
//     }

//     handleClick(i){
//         const history = this.state.history.slice(0, this.state.stepNumber + 1);
//         const current = history[history.length - 1];
//         const squares = current.squares.slice();
//         if (calculateWinner(squares) || squares[i]) {
//             return;
//         }
//         squares[i] = this.state.whiteIsNext ? "White" : "Black";
//         this.setState({
//         history: history.concat([
//             {
//             squares: squares
//             }
//         ]),
//         stepNumber: history.length,
//         whiteIsNext: !this.state.whiteIsNext
//         });
//     }

//     jumpTo(step) {
//         this.setState({
//         stepNumber: step,
//         whiteIsNext: (step % 2) === 0
//         });
//     }

//     render(){
//         const history = this.state.history;
//         const current = history[this.state.stepNumber];
//         const winner = calculateWinner(this.state.whiteCheckers, this.state.blackCheckers);
//         const moves = history.map((step, move) => {
//             const desc = move ?
//                 'Go to move #' + move :
//                 'Go to game start';
//             return (
//                 <li key={move}>
//                 <button id="move" onClick={() => this.jumpTo(move)}>{desc}</button>
//                 </li>
//             );
//         });
//         let status;
//         if (winner) {
//             status = "Winner: " + winner;
//         } else {
//             status = "Next player: " + (this.state.whiteIsNext ? "White" : "Black");
//         }
//         return(
//             <div className='game'>
//                 <div className='board'>
//                     <Board
//                         squares={current.squares}
//                         onClick={i => this.handleClick(i)}
//                     />
//                 </div>
//                 <div className="game-info">
//                     <div>{status}</div>
//                     <ol>{moves}</ol>
//                 </div>
//             </div>
//         );
//     }
// }

// let data = [
//     [null, Black, null, Black, null, Black, null, Black],
//     [Black, null, Black, null, Black, null, Black, null],
//     [null, Black, null, Black, null, Black, null, Black],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [White, null, White, null, White, null, White, null],
//     [null, White, null, White, null, White, null, White],
//     [White, null, White, null, White, null, White, null]
// ]

// class Board extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             board: data
//         };
//     }
//     render(){
//         const board = this.state.board;
//         return (
//             <table className='no-border'>
//                 <thead>
//                     <tr>
//                         <th></th>
//                         <th>a</th>
//                         <th>b</th>
//                         <th>c</th>
//                         <th>d</th>
//                         <th>e</th>
//                         <th>f</th>
//                         <th>g</th>
//                         <th>h</th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {board.map((rowData, index) => {
//                         const number = board.length - index;
//                         return <Row key={number.toString()} number={number} data={rowData} />
//                     })}
//                 </tbody>
//                 <tfoot>
//                 <tr>
//                     <th></th>
//                     <th>a</th>
//                     <th>b</th>
//                     <th>c</th>
//                     <th>d</th>
//                     <th>e</th>
//                     <th>f</th>
//                     <th>g</th>
//                     <th>h</th>
//                     <th></th>
//                 </tr>
//                 </tfoot>
//             </table>
//         );
//     }
// }

// function calculateWinner(white, black){
//     if(white === 0){
//         return "Black";
//     }
//     else if (black === 0){
//         return "White";
//     }
//     return null;
// }

ReactDOM.render(<Checkers />, document.getElementById('root'));