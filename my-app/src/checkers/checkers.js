import React from 'react';
// import './checkers/checkers.css';

import { createBrowserHistory } from "history";
import { Router } from 'react-router-dom';
import Board from './board';
import {returnPlayerName} from './utils';
import { Moving } from './moving';

const browserHistory = createBrowserHistory();

export class Checkers extends React.Component {
    constructor(props){
        super(props);
        this.columns = this.setColumns();
        this.state = {
            stepNumber: 0,
            history: [{
                boardState: this.createBoard(),
                currentPlayer: true
            }],
            moves: [],
            activePiece: false,
            hasJumped: false,
            kill: false,
            winner: null
        }
    }

    setColumns(){
        const columns = {};
        columns.a = 0;
        columns.b = 1;
        columns.c = 2;
        columns.d = 3;
        columns.e = 4;
        columns.f = 5;
        columns.g = 6;
        columns.h = 7;
        return columns;
    }

    createBoard(){
        let board = {}
        for(let key in this.columns){
            if(this.columns.hasOwnProperty(key)){
                for(let i = 1; i <= 8; i++){
                    let row = key + i;
                    board[row] = null;
                }
            }
        }
        board = this.initPlayers(board);
        return board;
    }

    initPlayers(board){
        const player1 = ['b3', 'd3', 'f3', 'h3', 'a2', 'c2', 'e2', 'g2', 'b1', 'd1', 'f1', 'h1'];
        const player2 = ['a8', 'c8', 'e8', 'g8', 'b7', 'd7', 'f7', 'h7', 'a6', 'c6', 'e6', 'g6'];

        let self = this;

        player1.forEach(function(i){
            board[i] = self.createPiece(i, 'player1');
        });

        player2.forEach(function(i){
            board[i] = self.createPiece(i, 'player2');
        });

        return board;
    }

    createPiece(location, player){
        let piece = {};

        piece.location = location;
        piece.player = player;
        piece.isKing = false;

        return piece;
    }

    getCurrentState() {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        return history[history.length - 1];
    }

    handleClick(coordinates){
        if (this.state.winner !== null) {
            return;
        }

        const currentState = this.getCurrentState;
        const boardState = currentState.boardState;
        const clickedSquare = boardState[coordinates];

        if(clickedSquare !== null){
            // Can't select opponents pieces
            if(clickedSquare.player !== returnPlayerName(currentState.currentPlayer))
                return;

            // Unset active piece if it's clicked
            if(this.state.activePiece === coordinates && this.state.hasJumped === null){
                this.setState({
                    activePiece: null,
                    moves: [],
                    kill: null
                });
                return;
            }

            // Can't choose a new piece if player has already jumped.
            if(this.state.hasJumped !== null && boardState[coordinates] !== null){
                return;
            }

            // Set active piece
            let move = Moving.getMove(boardState, coordinates, clickedSquare.isKing, false);

            this.setState({
                activePiece: coordinates,
                moves: move[0],
                kill: move[1]
            });

            return;
        }

        if(clickedSquare === null)
            return;
        
        // Moving a piece
        if(this.state.moves.length > 0){
            const postMoveState = Moving.movePiece(coordinates, this.state);

            if (postMoveState === null) {
                return;
            }

            this.updatePostMoveState(postMoveState);
        }
    }

    back(){
        const backStep = parseInt(this.state.stepNumber) - 1;
        if(backStep < 0){
            return;
        }
        const previousHistory = this.state.history.slice(0, backStep + 1)
        this.setState({
            history: previousHistory,
            activePiece: null,
            moves: [],
            kill: null,
            hasJumped: null,
            stepNumber: backStep,
            winner: null,
        });
    }

    updatePostMoveState(move){
        this.setState({
            history: this.state.history.concat([{
                boardState: move.boardState,
                currentPlayer: move.currentPlayer
            }]),
            activePiece: move.activePiece,
            moves: move.moves,
            hasJumped: move.hasJumped,
            kill: move.kill,
            stepNumber: this.state.history.length,
            winner: move.winner
        });
    }

    render(){
        const stateHistory = this.state.history;
        const currentState = stateHistory[this.state.stepNumber];
        const currentPlayer = currentState.currentPlayer;
        const boardState = currentState.boardState;
        const activePiece = this.state.activePiece;
        const columns = this.columns;
        const moves = this.state.moves;

        let backClass = "back";
        let gameStatus;

        if (this.state.stepNumber < 1)
            backClass += "disabled"; 

        switch(this.state.winner){
            case "player1piece": gameStatus = "Player 1 wins"; break;
            case "player2piece": gameStatus = "Player 2 wins"; break;
            case "player1moves": gameStatus = "Player 2 can't move. Player 1 wins"; break;
            case "player2moves": gameStatus = "Player 1 can't move. Player 2 wins"; break;
            default: gameStatus = currentPlayer ? "Player 1" : "Player 2"; break;
        }
        return(
            <Router history={browserHistory} basename={'react-checkers'}>
                <div className='game'>
                    <div className='board'>
                        <Board
                            boardState = {boardState}
                            currentPlayer = {currentPlayer}
                            activePiece = {activePiece}
                            moves = {moves}
                            columns = {columns}
                            onClick = {(coordinates) => this.handleClick(coordinates)}
                        />
                    </div>
                    <div className="game-info">
                        <div>{gameStatus}</div>
                        <ol>{moves}</ol>
                    </div>
                    <div className='travel'>
                        <button className={backClass} onClick={()=>this.back()}>Back</button>
                    </div>
                </div>
            </Router>
        );
    }
}