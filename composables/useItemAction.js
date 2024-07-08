export function useItemAction(board, action) {
  const itemStore = useItemStore()
  const audioStore = useAudioStore()

  const {
    item,
    source,
  } = storeToRefs(useItemStore())

  let target
  let withItem = null

  if (typeof action === 'object') {
    withItem = action.with
    action = action.action
  }

  switch (action) {
    case 'accept':
      if (item.value.actionAudio) {
        audioStore.playAudio(item.value.actionAudio)
      } else if (item.value.type === 'trap') {
        audioStore.playAudio('punishment')
      }

      board.state.score.happiness += item.value.happiness

      let lemons

      if (item.value.priceMultiplyer) {
        lemons = Math.round(board.state.score.lemons * item.value.price)
      } else {
        lemons = item.value.price
      }

      board.state.score.lemons -= lemons

      if (item.value.priceZero && board.state.score.lemons < 0) {
        board.state.score.lemons = 0
      }

      let stock = board.state.stock.currentTurnCount + item.value.stock
      if (stock >= 1 && stock <= board.state.stock.maxTurnCount) {
        board.state.stock.currentTurnCount = stock
      }

      switch (item.value.action) {
        case 'stars':
          if (board.stacks.length !== board.state.stacks.maxSlots) {
            board.stacks.increaseSlots()
          }
          board.state.startStars(lemons)
          break
        case 'sort':
          board.changeSort()
          break
        case 'sort-optimal':
          board.changeSort(true)
          break
        case 'hotel':
          board.hotelRun()
          break
      }

      board.removeCard(source.value)
      board.checkWinLoseConditions()
      break
    case 'dispose':
      if (withItem) {
        console.log(withItem)
        const item = board.items.getItemFromName(withItem)
        console.log(item)
        if (item && item.actionAudio) {
          audioStore.playAudio(item.actionAudio)
        }
        board.backpack.removeItem(withItem)
      }
      board.removeCard(source.value)
      break
    case 'sell':
      audioStore.playAudio('lemon')

      board.state.score.lemons += Math.floor(item.value.price / 2)
      board.removeCard(source.value)
      break;
    case 'buy':
    case 'backpack':
      target = board.backpack.emptySlotTarget
      board.moveCard(source.value, target)
      break
    case 'wallet':
      audioStore.playAudio('lemon')

      if (item.value.priceMultiplyer) {
        board.state.score.lemons = Math.round(board.state.score.lemons * item.value.price)
      } else {
        board.state.score.lemons -= item.value.price
      }
      board.removeCard(source.value)
      break
  }

  source.value = null
  item.value = null
}
