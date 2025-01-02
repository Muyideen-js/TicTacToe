import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

type Player = 'X' | 'O' | null;
type Board = Player[];
type WinningLine = number[] | null;

const TicTacToe = () => {
    // alert("NOTE: This is buit by Muyideen.jsx")
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winningLine, setWinningLine] = useState<WinningLine>(null);
  
  const { winner, line } = calculateWinner(board);
  
  useEffect(() => {
    if (line) {
      setWinningLine(line);
    }
  }, [line]);

  const status = winner 
    ? `Winner: ${winner}` 
    : board.every(square => square) 
    ? "It's a draw!" 
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
  };

  return (
    <GameContainer>
      <Title>TicTacToe</Title>
      <Status>{status}</Status>
      <Board>
        {board.map((square, index) => (
          <Square 
            key={index} 
            onClick={() => handleClick(index)}
            isWinning={winningLine?.includes(index)}
          >
            <AnimatePresence>
              {square && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0,
                    ...((winningLine?.includes(index)) && {
                      scale: [1, 1.2, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 1,
                      }
                    })
                  }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {square}
                </motion.div>
              )}
            </AnimatePresence>
          </Square>
        ))}
      </Board>
      <ResetButton onClick={resetGame}>Reset Game</ResetButton>
    </GameContainer>
  );
};

const calculateWinner = (squares: Board): { winner: Player; line: number[] | null } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
};

export default TicTacToe;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #2a0845 0%, #6441A5 100%);
  padding: 2rem;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const Status = styled.div`
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 0 30px rgba(138, 43, 226, 0.3);
`;

const Square = styled.button<{ isWinning?: boolean }>`
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${props => props.isWinning 
    ? 'rgba(138, 43, 226, 0.8)' 
    : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 10px;
  font-size: 3rem;
  color: ${props => props.isWinning ? '#ffd700' : '#fff'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.isWinning 
    ? '0 0 15px rgba(138, 43, 226, 0.5)' 
    : 'none'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.2);
  }
`;

const ResetButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: rgba(138, 43, 226, 0.6);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(138, 43, 226, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
  }
`; 