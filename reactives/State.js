export default class {
  constructor() {
    this.skip = false
    this.tutorial = true
    this.view = 'start'

    this.reset()
  }

  reset() {
    this.settings = false
    this.menu = false

    this.deck = {
      itemCount: 10,
      hearts: true,
      diamonds: true,
      clubs: true,
      spades: true,
      stars: false,
      deals: 0,
    }

    this.stars = {
      active: false,
      stolenLemons: 0,
    }

    this.backpack = {
      currentSlots: 4,
      minSlots: 1,
      maxSlots: 4,
    }

    this.piles = {
      // suit, color, alternating
      sort: 'alternating',
      currentSlots: 7,
      minSlots: 7,
      maxSlots: 7,
    }

    this.stacks = {
      currentSlots: 4,
      minSlots: 4,
      maxSlots: 5,
    }

    this.stock = {
      currentTurnCount: 3,
      maxTurnCount: 5,
      currentIndex: -1,
    }

    this.card = {
      maxRank: 13,
    }

    this.score = {
      happiness: 50,
      lemons: 10,
      stacks: 0,
    }

    this.hotel = {
      stats: false,
      real: 0,
      fake: 0,
      happiness: 0,
      lemons: 0,
    }
  }

  startStars(lemons) {
    if (!this.stars.active) {
      this.deck.stars = true
      this.stars.active = true
    }
    this.stars.stolenLemons += lemons
  }

  endStars() {
    this.score.lemons += this.stars.stolenLemons
    this.stars.stolenLemons = 0
    this.stars.active = false

    useAudioStore().playAudio('lemon')
  }
}
