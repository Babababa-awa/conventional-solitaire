import CardCollection from '@/reactives/CardCollection'
import ItemCard from '@/reactives/card/ItemCard'
import SuitedCard from '@/reactives/card/SuitedCard'

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades', 'stars', 'bows']

export default class extends CardCollection {
  constructor(state, items) {
    super(state)

    this.suits = 4
    this.items = items
  }

  reset() {
    this.cards = this._build()
  }

  prepend() {
    let cards = this.cards
    console.log('build from prepend')
    this.cards = this._build()
    this.cards.push(...cards)
  }

  getNextCard() {
    if (this.length === 0) {
      console.log('build from next')
      this.cards = this._build()
    }

    return this.cards.pop()
  }

  _build() {
    let deck = []

    this.suits = 0

    for (let suit of SUITS) {
      if (!this.state.deck[suit]) {
        continue;
      }

      ++this.suits

      for (let rank = 1; rank <= this.state.card.maxRank; ++rank) {
        deck.push(new SuitedCard(suit, rank))
      }
    }

    let items = this.items.getItems(this.state.deck.itemCount)

    for (let i = 0; i < items.length; ++i) {
      deck.push(new ItemCard(items[i]))
    }

    // Reset stars action
    if (this.state.stars.active) {
      this.state.deck.stars = false
    }

    return this._shuffleDeck(deck)
  }

  _shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))

      let temp = deck[i]
      deck[i] = deck[j]
      deck[j] = temp
    }

    return deck;
  }
}
