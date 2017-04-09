export const resetGame = (boardSize) => ({
  type: 'RESET_GAME',
  boardSize: (typeof boardSize) === 'number' ? boardSize : undefined
})

export const clickCell = (index) => ({
  type: 'CELL_CLICK',
  index: index
})

export const selectBoardSize = (size) => ({
  type: 'SELECT_BOARD_SIZE',
  boardSize: size
})
