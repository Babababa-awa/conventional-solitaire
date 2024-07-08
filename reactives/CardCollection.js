export default class {
  constructor(state) {
    this.state = state
    this.cards = []
  }

  get isFull() {
    return false
  }

  get isEmpty() {
    return this.cards.length === 0
  }

  get length () {
    return this.cards.length
  }

  get lastCard() {
    if (this.length === 0) {
      return null
    }

    return this.cards[this.length - 1]
  }

  reset() {
    this.cards = []
  }

  addCard(card) {
    this.cards.push(card)
    return true
  }

  removeCard() {
    return this.cards.pop()
  }

  canFlip() {
    return this.canFlipAtIndex(this.length - 1)
  }

  canFlipAtIndex(index) {
    return false
  }

  canDrag() {
    return this.canDragAtIndex(this.length - 1)
  }

  canDragAtIndex(index) {
    return false
  }

  addCardAtIndex(card, index) {
    if (index < 0 || index > this.cards.length) {
      return false
    }

    if (index === this.cards.length) {
      this.cards.push(card)
    } else {
      this.cards.splice(index, 0, card)
    }

    return true
  }

  canAddCard(card) {
    return this.canAddCardAtIndex(card, this.cards.length)
  }

  canAddCardAtIndex(card, index) {
    if (index !== this.length || this.isFull) {
      return false
    }

    return true
  }

  getCardFromSource(source) {
    if (!this._validSource(source)) {
      return null
    }

    return this.cards[source.cardIndex]
  }

  removeCardFromSource(source) {
    if (!this._validSource(source)) {
      return false
    }

    this.removeCardAtIndex(source.cardIndex)

    return true
  }

  removeCardAtIndex(index) {
    return this.cards.splice(index, 1)[0]
  }

  _validSource(source) {
    if (!('cardIndex' in source)) {
      return false
    }

    if (this.cards.length === 0) {
      return false
    }

    if (this.cards.length < source.cardIndex + 1) {
      return false
    }

    return true
  }
}
