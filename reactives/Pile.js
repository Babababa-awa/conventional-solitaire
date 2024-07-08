import CardCollection from '@/reactives/CardCollection'

export default class extends CardCollection {
  constructor(state) {
    super(state)
  }

  canAddCardAtIndex(card, index) {
    if (!super.canAddCardAtIndex(card, index)) {
      return false
    }

    if (card.type === 'item') {
      return this._canAddItemCard(card)
    }

    if (card.type !== 'suited') {
      return false
    }

    if (this.length) {
      if (this.lastCard.type !== 'suited') {
        //TODO: Wild cards?
        return false
      }

      if (!this.lastCard.oneRankAbove(card)) {
        return false
      }

      if (this.state.piles.sort === 'alternating') {
        if (this.lastCard.matchesColor(card)) {
          return false
        }
      }

      if (this.state.piles.sort === 'suit') {
        if (!this.lastCard.matchesSuit(card)) {
          return false
        }
      }

      if (this.state.piles.sort === 'color') {
        if (this.lastCard.matchesSuit(card)) {
          return false
        }

        if (!this.lastCard.matchesColor(card)) {
          return false
        }
      }
    }

    return true
  }

  _canAddItemCard(card) {
    if (card.type !== 'item') {
      return false
    }

    if (card.item.type === 'real' || card.item.type === 'fake') {
      return false
    }

    if (!this.length) {
      return false
    }

    return useItemApply(this.state, card, this.lastCard)
  }

  canFlipAtIndex(index) {
    if (index < 0 || index > this.length - 1) {
      return false
    }

    if (this.cards[index].faceUp) {
      return false
    }

    if (index < this.length - 1) {
      return false
    }

    return true
  }

  canDragAtIndex(index) {
    if (index < 0 || index > this.length - 1) {
      return false
    }

    if (!this.cards[index].faceUp) {
      return false
    }

    if (this.cards[index].type === 'item' &&
      this.cards[index].item.type === 'trap'
    ) {
      return false
    }

    if (index < this.length - 1) {
      if (this.state.piles.sort === 'alternating') {
        return this._isSortedByAlternating(index)
      }

      if (this.state.piles.sort === 'suit') {
        return this._isSortedBySuit(index)
      }

      if (this.state.piles.sort === 'color') {
        return this._isSortedByColor(index)
      }
    }

    return true
  }

  _isSortedByAlternating(index) {
    let lastSuit = null
    let lastRank = null

    for (let i = index; i < this.length; ++i) {
      if (!this.cards[i].faceUp) {
        return false
      }

      // TODO: Should stars be incuded in this?
      if (lastSuit !== null && lastSuit === this.cards[i].suit) {
        return false
      }

      if (lastRank !== null && lastRank !== this.cards[i].rank + 1) {
        return false
      }

      lastSuit = this.cards[i].suit
      lastRank = this.cards[i].rank
    }

    return true
  }

  _isSortedBySuit(index) {
    let lastSuit = null
    let lastRank = null

    for (let i = index; i < this.length; ++i) {
      if (!this.cards[i].faceUp) {
        return false
      }

      if (lastSuit !== null && lastSuit !== this.cards[i].suit) {
        return false
      }

      if (lastRank !== null && lastRank !== this.cards[i].rank + 1) {
        return false
      }

      lastSuit = this.cards[i].suit
      lastRank = this.cards[i].rank
    }

    return true
  }

  _isSortedByColor(index) {
    let lastColor = null
    let lastRank = null

    for (let i = index; i < this.length; ++i) {
      if (!this.cards[i].faceUp) {
        return false
      }

      if (lastColor !== null && lastColor !== this.cards[i].color) {
        return false
      }

      if (lastRank !== null && lastRank !== this.cards[i].rank + 1) {
        return false
      }

      lastColor = this.cards[i].color
      lastRank = this.cards[i].rank
    }

    return true
  }

  removeCard() {
    const result = super.removeCard()

    if (this.lastCard) {
      this.lastCard.faceUp = true
    }

    return result
  }

  removeCardAtIndex(index) {
    const result = super.removeCardAtIndex(index)

    if (this.lastCard) {
      this.lastCard.faceUp = true
    }

    return result
  }
}
