export function useItemApply(state, sourceCard, targetCard) {
  if (sourceCard.type !== 'item' || targetCard.type !== 'item') {
    return false
  }

  if (targetCard.item.type === 'trap') {
    if (sourceCard.item.type !== 'consume') {
      return false
    }

    if (!targetCard.item.clear.includes(sourceCard.item.key)) {
      return false
    }

    return true
  }

  return false
}
