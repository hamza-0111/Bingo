// import React, { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import bingoStore from '../store/store';

// const BingoBoard: React.FC = () => {
//   const {
//     board,
//     player1Selected,
//     player2Selected,
//     bingo,
//     gameStarted,
//     timer,
//     // currentPlayer,
//     startGame,
//     resetGame,
//     selectNumber
//   } = bingoStore;

//   useEffect(() => {
//     return () => {
//       bingoStore.stopGame();
//     };
//   }, []);

//   return (
//     <div className="relative h-screen bg-gray-700 bg-cover bg-no-repeat bg-center">
//       <div className="flex items-center justify-center h-full bg-gray-700 bg-opacity-75">
//         <div className="flex flex-col items-center gap-4 p-4 bg-white rounded shadow-md">
//           {!gameStarted && (
//             <div className="text-xl font-semibold text-center mb-4">
//               𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓶𝔂 𝓰𝓪𝓶𝓮. 𝓛𝓮𝓽𝓼 𝓼𝓽𝓪𝓻𝓽 𝓽𝓱𝓮 𝓰𝓪𝓶𝓮!
//             </div>
//           )}
//           {gameStarted ? (
//             <>
//               {board.map((row, rowIndex) => (
//                 <div key={rowIndex} className="flex gap-2">
//                   {row.map((number, colIndex) => (
//                     <button
//                       key={colIndex}
//                       className={`w-10 h-10 flex items-center justify-center border ${
//                         player1Selected[rowIndex][colIndex]
//                           ? 'bg-green-500 text-white'
//                           : player2Selected[rowIndex][colIndex]
//                           ? 'bg-red-500 text-white'
//                           : 'bg-white text-black'
//                       }`}
//                       onClick={() => selectNumber(rowIndex, colIndex)}
//                     >
//                       {number}
//                     </button>
//                   ))}
//                 </div>
//               ))}
//               {bingo !== null && (
//                 <div
//                   className={`text-2xl font-bold mt-4 ${
//                     bingo === 1 ? 'text-green-500' : 'text-red-500'
//                   }`}
//                 >
//                   Bingo!
//                 </div>
//               )}
//               <button
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//                 onClick={resetGame}
//               >
//                 Reset Game
//               </button>
//             </>
//           ) : (
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//               onClick={startGame}
//             >
//               Start Game
//             </button>
//           )}
//         </div>
//         <div className="absolute top-0 right-0 m-4 bg-gray-600 p-4 rounded-md shadow-md">
//           <div className="text-xl font-semibold">Timer</div>
//           <div className="text-3xl">{timer} seconds</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default observer(BingoBoard);


import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import bingoStore from '../store/store';

const BingoBoard: React.FC = () => {
  const {
    board,
    player1Selected,
    player2Selected,
    bingo,
    gameStarted,
    timer,
    currentNumber,
    startGame,
    resetGame,
    selectNumber
  } = bingoStore;

  useEffect(() => {
    return () => {
      bingoStore.stopGame();
    };
  }, []);

  return (
    <div className="relative h-screen bg-gray-700 bg-cover bg-no-repeat bg-center">
      <div className="flex items-center justify-center h-full bg-gray-700 bg-opacity-75">
        <div className="flex flex-col items-center gap-4 p-4 bg-white rounded shadow-md">
          {!gameStarted && (
            <div className="text-xl font-semibold text-center mb-4">
              𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓶𝔂 𝓰𝓪𝓶𝓮. 𝓛𝓮𝓽𝓼 𝓼𝓽𝓪𝓻𝓽 𝓽𝓱𝓮 𝓰𝓪𝓶𝓮!
            </div>
          )}
          {gameStarted ? (
            <>
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                  {row.map((number, colIndex) => (
                    <button
                      key={colIndex}
                      className={`w-10 h-10 flex items-center justify-center border ${
                        player1Selected[rowIndex][colIndex]
                          ? 'bg-green-500 text-white'
                          : player2Selected[rowIndex][colIndex]
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-black'
                      }`}
                      onClick={() => selectNumber(rowIndex, colIndex)}
                    >
                      {number}
                    </button>
                  ))}
                </div>
              ))}
              {bingo !== null && (
                <div
                  className={`text-2xl font-bold mt-4 ${
                    bingo === 1 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  Bingo!
                </div>
              )}
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={resetGame}
              >
                Reset Game
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={startGame}
            >
              Start Game
            </button>
          )}
        </div>
        <div className="absolute top-0 right-0 m-4 bg-gray-800 p-4 rounded-md shadow-md">
          <div className="text-xl font-semibold">Timer</div>
          <div className="text-3xl">{timer} seconds</div>
        </div>
        {gameStarted && currentNumber !== null && (
          <div className="absolute center-0 right-0 m-4 bg-gray-900 p-4 rounded-md shadow-md text-white">
            <div className="text-xl  font-semibold text-white">Current Number</div>
            <div className="text-3xl">{currentNumber}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(BingoBoard);
