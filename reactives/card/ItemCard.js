import Card from '@/reactives/card/Card'

export default class extends Card {
  constructor(item) {
    super('item')

    this.item = item
  }

  matchesSuit(card) {
    return false
  }

  matchesColor(card) {
    return false
  }

  oneRankBelow(card) {
    return false
  }

  oneRankAbove(card) {
    return false
  }
}
