import Card from '@/reactives/card/Card'

// const SUITS = ['hearts', 'diamonds', 'clubs', 'spades', 'stars', 'bows']
export default class extends Card {
  constructor(suit, rank) {
    super('suited')

    this.suit = suit
    this.rank = rank

    if (this.suit === 'hearts' || this.suit === 'diamonds') {
      this.color = 'red'
    }

    if (this.suit === 'spades' || this.suit === 'clubs') {
      this.color = 'black'
    }

    if (this.suit === 'stars') {
      this.color = 'yellow'
    }
  }

  matchesSuit(card) {
     return (card.suit === this.suit)
  }

  matchesColor(card) {
    if (card.color === this.color) {
      return true
    }

    return false
  }

  oneRankBelow(card) {
    return (this.rank + 1 === card.rank)
  }

  oneRankAbove(card) {
    return (this.rank - 1 === card.rank)
  }
}
