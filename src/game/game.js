import React, { useState } from 'react';
import AlertMessage from '../alertmessage/alertmessage';
import './game.css';

const WordSearchGame = () => {
  const words = [
    'BLOGVISTA', 'LONDON', 'NODE', 'CITY', 'COMMAND',
    'BOOK', 'CHENNAI', 'TECHNOLOGY', 'BUTTON', 'REFRESH','SEA'
  ];
  const [alert, setAlert] = useState(null);

  const wordSearchGrid = [
    ['B', 'L', 'O', 'G', 'V', 'I', 'S', 'T', 'A', 'M', 'Z', 'C'],
    ['L', 'O', 'S', 'D', 'O', 'N', 'E', 'Z', 'T', 'E', 'L', 'R'],
    ['G', 'N', 'O', 'D', 'E', 'R', 'C', 'I', 'T', 'O', 'O', 'T'],
    ['R', 'O', 'T', 'Y', 'X', 'E', 'H', 'C', 'N', 'O', 'P', 'I'],
    ['C', 'O', 'M', 'M', 'A', 'N', 'D', 'D', 'L', 'O', 'L', 'E'],
    ['B', 'O', 'O', 'K', 'F', 'I', 'O', 'D', 'T', 'E', 'C', 'N'],
    ['C', 'P', 'E', 'N', 'N', 'N', 'I', 'S', 'E', 'A', 'I', 'C'],
    ['T', 'G', 'C', 'H', 'N', 'O', 'L', 'O', 'G', 'N', 'T', 'H'],
    ['Y', 'G', 'O', 'L', 'O', 'N', 'H', 'C', 'E', 'T', 'Y', 'E'],
    ['B', 'R', 'E', 'F', 'R', 'E', 'S', 'H', 'A', 'D', 'E', 'N'],
    ['K', 'O', 'D', 'E', 'Z', 'R', 'C', 'I', 'T', 'E', 'O', 'T'],
    ['A', 'O', 'Z', 'D', 'C', 'H', 'E', 'N', 'N', 'A', 'I', 'R'],
  ];

  const [selectedCells, setSelectedCells] = useState([]);

  const handleCellClick = (row, col) => {
    const cell = { row, col };
    setSelectedCells((prevSelected) => [...prevSelected, cell]);
  };

  const checkWords = () => {
    const selectedWord = selectedCells.map((cell) => wordSearchGrid[cell.row][cell.col]).join('');

    if (words.includes(selectedWord)) {
      setAlert({ type: 'success', message: `Congratulations! You found the word "${selectedWord}"!`});
      setSelectedCells([]);
    }else{
        setAlert({ type: 'error', message: `This is not a word "${selectedWord}"!`});
    }
  };
  const resetSelectedCells = () => {
    setSelectedCells([]);
  };
  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <div className="word-search-container">
      <h2>Word Search Game</h2>
      {alert && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={handleCloseAlert}
          />
        )}
      <div className="word-search-grid">
        {wordSearchGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`cell ${selectedCells.some(
                  (selectedCell) => selectedCell.row === rowIndex && selectedCell.col === colIndex
                ) ? 'selected' : ''}`}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="check-button" onClick={checkWords}>
          Check Words
        </button>
        <button className="reset-button" onClick={resetSelectedCells}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default WordSearchGame;
