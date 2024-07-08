export default class {
  constructor(type) {
    this.type = type
    this.faceUp = false
    this.suit = null
    this.rank = null
    this.item = null
    this.color = null
  }

  serialize() {
    return {
      type: this.type,
      faceUp: this.faceUp,
      suit: this.suit,
      rank: this.rank,
      item: this.item,
      color: this.color,
    }
  }
}
