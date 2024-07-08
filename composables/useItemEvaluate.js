export function useItemEvaluate(board, target) {
  const audioStore = useAudioStore()
  const sourceCard = board.getCardFromSource(target)

  if (sourceCard === null) {
    return false
  }

  if (sourceCard.type !== 'item') {
    return false
  }

  if (target.key === 'backpack') {
    if (sourceCard.item.type === 'real' || sourceCard.item.type === 'fake') {
      audioStore.playAudio('ka-ching')
      board.state.score.lemons -= sourceCard.item.price
    }

    return true
  }

  if (target.key === 'stock') {
    board.stock.removeCardAtIndex(target.cardIndex)
    board.stock.removeCardAtIndex(target.cardIndex - 1)

    --board.state.stock.currentIndex
  } else {
    board[target.key].removeCardFromSource(target)
    --target.cardIndex
    board[target.key].removeCardFromSource(target)
  }

  return true
}
