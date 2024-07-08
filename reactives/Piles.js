import SlotCollection from '@/reactives/SlotCollection'
import Pile from '@/reactives/Pile'

export default class extends SlotCollection {
  constructor(state) {
    super(state, 'piles')
  }

  _initSlot() {
    return new Pile(this.state)
  }

  moveCards(source, target) {
    if (source.key !== 'piles' ||
      source.key !== target.key ||
      source.slotIndex === target.slotIndex
    ) {
      return false
    }

    let card = this.getCardFromSource(source)

    if (!this.canAddCardToTarget(card, target)) {
      return false
    }

    while (card) {
      this.addCardToTarget(card, target)
      this.removeCardFromSource(source)

      ++target.cardIndex

      card = this.getCardFromSource(source)
    }

    return true
  }
}
