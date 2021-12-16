import * as utils from './utils';

export class Moving {
    constructor(columns){
        this.columns = columns;
    }

    getMove(boardState, coordinates, isKing = false, hasJumped = false){
        if(boardState[coordinates] === null){
            return;
        }

        let moves = [];
        let jumps = [];

        let possibleMove = this.possibleMoves(coordinates);

        let kills = {};

        const row = utils.getRowAsInt(coordinates);
        const player = boardState[coordinates].player;

        const advanceRow = player === 'player1' ? row - 1 : row + 1;

        for(let key in possibleMove){
            if(!possibleMove.hasOwnProperty(key)){
                continue;
            }
            let possibleCoordinates = possibleMove[key];

            if(possibleCoordinates === null){
                continue;
            }

            if (!isKing && possibleCoordinates.indexOf(advanceRow) < 0) {
                continue;
            }

            if(boardState[possibleCoordinates] === null){
                moves.push(possibleCoordinates);
            }
            else{
                let neighborPiece = boardState[possibleCoordinates];

                if (neighborPiece.player === player) {
                    continue;
                }

                let opponentCorners = this.possibleMoves(possibleCoordinates);
                let potentialJump = opponentCorners[key];

                if (boardState[potentialJump] === null) {
                    kills[possibleCoordinates] = potentialJump;
                    jumps.push(potentialJump);
                }
            }
        }

        let movesOut;

        if (hasJumped === false) {
            movesOut = moves.concat(jumps);
        } else {
            // additional jump 
            movesOut = jumps;
        }

        let killJumpsOut = jumps.length > 0 ? kills : null;

        return [movesOut, killJumpsOut];
    }

    possibleMoves(coordinates){
        const col = utils.getColAsInt(this.columns, coordinates);
        const row = utils.getRowAsInt(coordinates);

        const columnLeft  = col -1 >= 0 ? utils.getColAsAlph(this.columns, col - 1) : false;
        const columnRight = col +1 <= 7 ? utils.getColAsAlph(this.columns, col + 1) : false;

        const rowUpper = row +1 < 9 ? row +1 : false;
        const rowLower = row -1 > 0 ? row -1 : false;

        let corners = {};

        corners.leftUpper  = columnLeft  !== false && rowUpper !== false ? columnLeft  + rowUpper : null;
        corners.rightUpper = columnRight !== false && rowUpper !== false ? columnRight + rowUpper : null;
        corners.leftLower  = columnLeft  !== false && rowLower !== false ? columnLeft  + rowLower : null;
        corners.rightLower = columnRight !== false && rowLower !== false ? columnRight + rowLower : null;

        return corners;
    }

    movePiece(coordinates, state){
        let currentState  = Object.assign({}, state.history[state.stepNumber]);
        let boardState = Object.assign({}, currentState.boardState);
        let movingPiece = Object.assign({}, boardState[state.activePiece]);

        let jumpArray = [];

        for(let key in state.kills){
            if(!state.kills.hasOwnProperty(key)){
                continue;
            }
            jumpArray.push(state.kills[key])
        }

        // Don't move if the coordinates don't match a moveable or jumpable square.
        if(state.moves.indexOf(coordinates) < 0 && jumpArray.indexOf(coordinates) < 0)
        {
            return null;
        }

        if (this.shouldKing(movingPiece, coordinates)) {
            movingPiece.isKing = true;
        }

        // Move piece to new coordinates
        boardState[state.activePiece] = null;
        boardState[coordinates] = movingPiece;

        // Remove opponent piece if jump is made
        const player = movingPiece.player;
        let hasJumped = null;
        let newMoves = [];
        let setCurrentPlayer = player === 'player2';
        let setActivePiece = null;

        if (jumpArray.indexOf(coordinates) > -1) {
            let opponentPosition = utils.getKeyByValue(state.jumpKills, coordinates);
            boardState[opponentPosition] = null;

            newMoves = this.getMove(boardState, coordinates, movingPiece.isKing, true);

            if (newMoves[0].length > 0) {
                hasJumped = true;
                setCurrentPlayer = currentState.currentPlayer;
                setActivePiece = coordinates;
            } else {
                hasJumped = null;
            }
        }

        if (hasJumped === true) {
            if (newMoves[0].length > 0) {
                setCurrentPlayer = currentState.currentPlayer;
                setActivePiece = coordinates;
            }
        }

        let stateOut = {};

        stateOut.boardState = boardState;
        stateOut.currentPlayer = setCurrentPlayer;
        stateOut.activePiece = setActivePiece;
        stateOut.moves = hasJumped === true ? newMoves[0] : [];
        stateOut.jumpKills = hasJumped === true ? newMoves[1] : null;
        stateOut.hasJumped = hasJumped === true ? player : null;
        stateOut.winner = this.evaluateWinner(boardState);

        return stateOut;
    }

    shouldKing(piece, coordinates){
        if (piece.isKing === true) {
            return false;
        }

        const row = utils.getRowAsInt(coordinates);
        const player = piece.player;

        return ( (row === 1 && player === 'player1') || (row === 8 && player === 'player2') );
    }

    evaluateWinner(boardState) {

        let player1Pieces = 0;
        let player1Moves  = 0;

        let player2Pieces = 0;
        let player2Moves  = 0;

        for (let coordinates in boardState) {
            if (!boardState.hasOwnProperty(coordinates) || boardState[coordinates] === null) {
                continue;
            }

            const movesData = this.getMove(boardState, coordinates, boardState[coordinates].isKing, false);
            const moveCount = movesData[0].length;

            if (boardState[coordinates].player === 'player1') {
                ++player1Pieces;
                player1Moves += moveCount;

            } else {
                ++player2Pieces;
                player2Moves += moveCount;
            }
        }

        if (player1Pieces === 0 ) {
            return 'player2pieces';
        }

        if (player2Pieces === 0 ) {
            return 'player1pieces';
        }

        if (player1Moves === 0) {
            return 'player2moves';
        }

        if (player2Moves === 0) {
            return 'player1moves';
        }

        return null;
    }
}