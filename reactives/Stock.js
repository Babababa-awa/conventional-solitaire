import CardCollection from '@/reactives/CardCollection'

export default class extends CardCollection {
  constructor(state) {
    super(state)
  }

  removeCardFromSource(source) {
    if (super.removeCardFromSource(source)) {
      if (source.cardIndex <= this.state.stock.currentIndex) {
        --this.state.stock.currentIndex
      }
    }
  }

  get currentCard() {
    if (this.state.stock.currentIndex < 0) {
        return null
    }

    return this.cards[this.state.stock.currentIndex]
  }

  canAddCardAtIndex(card, index) {
    if (index !== this.state.stock.currentIndex + 1) {
      return false
    }

    if (card.type !== 'item') {
      return false
    }

    if (card.item.type !== 'consume') {
      return false
    }

    if (!this.length) {
      return false
    }

    return useItemApply(this.state, card, this.currentCard)
  }
}
