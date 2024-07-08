export default class {
  constructor(state, key) {
    this.state = state
    this._key = key

    this.reset()
  }

  get length () {
    return this.slots.length
  }

  get currentSlots() {
    return this.state[this._key].currentSlots
  }

  get minSlots() {
    return this.state[this._key].minSlots
  }

  get maxSlots() {
    return this.state[this._key].maxSlots
  }

  increaseSlots() {
    if (this.state[this._key].currentSlots < this.maxSlots) {
      this.slots.push(this._initSlot())
      ++this.state[this._key].currentSlots
    }
  }

  decreaseSlots() {
    if (this.state[this._key].currentSlots > this.minSlots) {

      for (let i = 0; i < this.slots.length; ++i) {
        if (this.slots[i].isEmpty) {
          --this.state[this._key].currentSlots
          this.slots.splice(i, 1);
        }
      }
    }
  }

  _initSlot() {
    return null
  }

  reset() {
    this.slots = []

    for (let i = 0; i < this.currentSlots; ++i) {
      this.slots.push(this._initSlot())
    }
  }

  getCardFromSource(source) {
    if (!this.isValidSource(source)) {
      return null
    }

    return this.slots[source.slotIndex].getCardFromSource(source)
  }

  removeCardFromSource(source) {
    if (!this.isValidSource(source)) {
      return false
    }

    return this.slots[source.slotIndex].removeCardFromSource(source)
  }

  canAddCardToTarget(card, target) {
    if (!this.isValidSource(target)) {
      return false
    }

    return this.slots[target.slotIndex].canAddCardAtIndex(card, target.cardIndex)
  }

  addCardToTarget(card, target) {
    if (!this.isValidSource(target)) {
      return false
    }

    return this.slots[target.slotIndex].addCardAtIndex(card, target.cardIndex)
  }

  isValidSource(source) {
    if (!('slotIndex' in source)) {
      return false
    }

    if (this.slots.length === 0) {
      return false
    }

    if (this.slots.length < source.slotIndex + 1) {
      return false
    }

    return true
  }
}
