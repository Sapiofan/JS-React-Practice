import React from 'react';
import Row from './components/row';
import './checkers.css';
import Black from './pieces/black';
import White from './pieces/white';

let data = [
    [null, Black, null, Black, null, Black, null, Black],
    [Black, null, Black, null, Black, null, Black, null],
    [null, Black, null, Black, null, Black, null, Black],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [White, null, White, null, White, null, White, null],
    [null, White, null, White, null, White, null, White],
    [White, null, White, null, White, null, White, null]
]

function Board() {
    // const data = [
    //     [null, Black, null, Black, null, Black, null, Black],
    //     [Black, null, Black, null, Black, null, Black, null],
    //     [null, Black, null, Black, null, Black, null, Black],
    //     [null, null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null, null],
    //     [White, null, White, null, White, null, White, null],
    //     [null, White, null, White, null, White, null, White],
    //     [White, null, White, null, White, null, White, null]
    // ]
    return (
        <table className='no-border'>
            <thead>
                <tr>
                    <th></th>
                    <th>a</th>
                    <th>b</th>
                    <th>c</th>
                    <th>d</th>
                    <th>e</th>
                    <th>f</th>
                    <th>g</th>
                    <th>h</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((rowData, index) => {
                    const number = data.length - index;
                    return <Row key={number.toString()} number={number} data={rowData} />
                })}
            </tbody>
            <tfoot>
            <tr>
                <th></th>
                <th>a</th>
                <th>b</th>
                <th>c</th>
                <th>d</th>
                <th>e</th>
                <th>f</th>
                <th>g</th>
                <th>h</th>
                <th></th>
            </tr>
            </tfoot>
        </table>
    );
}


// class Game extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             history: [
//             {
//                 squares: Array(64).fill(null)
//             }
//             ],
//             stepNumber: 0,
//             wIsNext: true
//         };
//     }

//     handleClick(i) {
//         const history = this.state.history.slice(0, this.state.stepNumber + 1);
//         const current = history[history.length - 1];
//         const squares = current.squares.slice();
//         if (calculateWinner(squares) || squares[i]) {
//             return;
//         }
//         squares[i] = this.state.wIsNext ? "W" : "B";
//         this.setState({
//         history: history.concat([
//             {
//             squares: squares
//             }
//         ]),
//         stepNumber: history.length,
//         wIsNext: !this.state.wIsNext
//         });
//     }

//     jumpTo(step) {
//         this.setState({
//         stepNumber: step,
//         wIsNext: (step % 2) === 0
//         });
//     }

//     render() {
//         const history = this.state.history;
//         const current = history[this.state.stepNumber];
//         const winner = calculateWinner(current.squares);

//         const moves = history.map((step, move) => {
//         const desc = move ?
//             'Go to move #' + move :
//             'Go to game start';
//         return (
//             <li key={move}>
//             <button id="move" onClick={() => this.jumpTo(move)}>{desc}</button>
//             </li>
//         );
//         });

//         let status;
//         if (winner) {
//         status = "Winner: " + winner;
//         } else {
//         status = "Next player: " + (this.state.wIsNext ? "X" : "O");
//         }

//         return (
//         <div className="game">
//             <div className="game-board">
//             <Board
//                 squares={current.squares}
//                 onClick={i => this.handleClick(i)}
//             />
//             </div>
//             <div className="game-info">
//             <div>{status}</div>
//             <ol>{moves}</ol>
//             </div>
//         </div>
//         );
//     }
// }

// function calculateWinner(squares) {
//     return null;
// }


// ReactDOM.render(<Game />, document.getElementById("root"));

export default Board;