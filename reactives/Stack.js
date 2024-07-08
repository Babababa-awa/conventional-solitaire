import CardCollection from '@/reactives/CardCollection'

export default class extends CardCollection {
  constructor(state) {
    super(state)
  }

  get isFull() {
    return (this.length === this.state.card.maxRank)
  }

  canAddCardAtIndex(card, index) {
    if (!super.canAddCardAtIndex(card, index)) {
      return false
    }

    if (card.type !== 'suited') {
      return false
    }

    if (this.length) {
      if (this.lastCard.type === 'suited') {
        if (!this.lastCard.matchesSuit(card)) {
          return false
        }

        if (!this.lastCard.oneRankBelow(card)) {
          return false
        }
      }
    } else {
      if (card.rank !== 1) {
        return false
      }
    }

    return true
  }

  getSuit() {
    for (let i = 0; i < this.length; ++i) {
      if (this.cards[i].type !== 'suited') {
        continue
      }

      return this.cards[i].suit
    }

    return null
  }
}
