import Backpack from '@/reactives/Backpack'
import Deck from '@/reactives/Deck'
import Items from '@/reactives/Items'
import Piles from '@/reactives/Piles'
import State from '@/reactives/State'
import Stacks from '@/reactives/Stacks'
import Stock from '@/reactives/Stock'

export default class {
  constructor() {
    this.restart()
  }

  restart() {
    this.state = new State()
    this.items = new Items(this.state)
    this._deck = new Deck(this.state, this.items)

    this.piles = new Piles(this.state)
    this.stacks = new Stacks(this.state)
    this.backpack = new Backpack(this.state)
    this.stock = new Stock(this.state)

    this._setupBoard()
  }

  reset() {
    this.state.reset()

    this.items = new Items(this.state)
    this._deck = new Deck(this.state, this.items)

    this.piles = new Piles(this.state)
    this.stacks = new Stacks(this.state)
    this.backpack = new Backpack(this.state)
    this.stock = new Stock(this.state)

    this._setupBoard()
  }

  _setupBoard() {
    for (let i = 0; i < this.piles.length; ++i) {
      for (let j = 0; j <= i; ++j) {
        const card = this._deck.getNextCard()

        if (j === i) {
          card.faceUp = true
        }

        this.piles.slots[i].addCard(card)
      }
    }

    let remaining = this._deck.length

    for (let i = 0; i < remaining; ++i) {
      const card = this._deck.getNextCard()
      card.faceUp = true
      this.stock.addCard(card)
    }
  }

  _prependDeck() {
    this._deck.prepend()

  }

  removeCard(source) {
    this[source.key].removeCardFromSource(source)
  }

  getCardFromSource(source) {
    return this[source.key].getCardFromSource(source)
  }

  moveCard(source, target) {
    if (source.key === target.key &&
      source.slotIndex === target.slotIndex &&
      source.cardIndex === target.cardIndex - 1
    ) {
      return false
    }

    // Special case for moving multiple cards at once between piles
    if (source.key === 'piles') {
      if (!this.piles.isValidSource(source)) {
        return false
      }

      // If more than one card being moved
      if (source.cardIndex !== this.piles.slots[source.slotIndex].length - 1) {
        return this.piles.moveCards(source, target)
      }
    }

    const card = this.getCardFromSource(source)

    if (!card) {
      return false
    }

    // Special case for adding consumable items to trap cards in stock
    if (target.key === 'stock') {
      if (this.stock.canAddCardAtIndex(card, target.cardIndex)) {
        this.stock.addCardAtIndex(card, target.cardIndex)
        this[source.key].removeCardFromSource(source)

        useItemEvaluate(this, target)

        this.checkWinLoseConditions()

        return true
      }

      return false
    }

    // Allow moving items around backpack without triggering evaluation
    if (target.key === 'backpack' &&
      source.key === 'backpack' &&
      !this.backpack.slots[target.slotIndex].isFull
    ) {
      this[target.key].addCardToTarget(card, target)
      this[source.key].removeCardFromSource(source)
      return true
    }

    // Main card moving handler
    if (this[target.key].canAddCardToTarget(card, target)) {
      this[target.key].addCardToTarget(card, target)
      this[source.key].removeCardFromSource(source)

      // Has completed a stack
      if (target.key === 'stacks' &&
        this.stacks.slots[target.slotIndex].length === this.state.card.maxRank
      ) {
        let suit = this.stacks.slots[target.slotIndex].getSuit()

        this.stacks.slots[target.slotIndex].reset()

        // Stars path complete, reset
        if (suit === 'stars') {
          this.stacks.decreaseSlots()
          this.state.endStars()
        }

        this.hotelRun()
        this.dealNext()
      } else {
        useItemEvaluate(this, target)
      }

      this.checkWinLoseConditions()

      return true
    }

    return false
  }

  checkWinLoseConditions() {
    if (this.state.score.happiness >= 100) {
      useAudioStore().stopAudio('main')
      useAudioStore().playAudio('cheer')
      this.state.view = 'win'
    }

    if (this.state.score.happiness <= 0) {
      useAudioStore().stopAudio('main')
      useAudioStore().playAudio('jelly-cry')
      this.state.view = 'lose'
    }
  }

  hotelRun() {
    ++this.state.score.stacks

    this.state.hotel.real = 0
    this.state.hotel.fake = 0
    this.state.hotel.happiness = 0
    this.state.hotel.lemons = 2

    for (let i = 0; i < this.backpack.length; ++i) {
      const card = this.backpack.slots[i].lastCard

      if (card === null) {
        continue
      }

      if (card.type !== 'item') {
        continue
      }

      if (card.item.type === 'real') {
        this.state.score.happiness += card.item.happiness
        this.state.hotel.happiness += card.item.happiness
        this.state.hotel.lemons += 2
        ++this.state.hotel.real

        this.backpack.slots[i].removeCard()
      } else if (card.item.type === 'fake') {
        this.state.score.happiness += card.item.happiness
        this.state.hotel.happiness += card.item.happiness
        this.state.hotel.lemons -= 1
        ++this.state.hotel.fake

        this.backpack.slots[i].removeCard()
      }
    }

    if (this.state.hotel.real !== 0 || this.state.hotel.fake !== 0) {
      this.state.hotel.stats = true
    }

    if (this.state.hotel.lemons > 0 &&
      this.state.score.happiness > 0 &&
      this.state.score.happiness < 100
    ) {
      useAudioStore().playAudio('lemon')
      this.state.score.lemons += this.state.hotel.lemons
    }
  }

  dealNext() {
    if (this._deck.length === 0) {
      this._deck.prepend()
    }

    let total = 52

    if (this._deck.suits === 5) {
      total += 13
    }

    total += this.state.deck.itemCount

    let partial = Math.floor(total / 4)

    let pattern

    // Generate pattern to evenly distribute a deck in 4 deals
    switch (this.state.deck.deals) {
      case 0:
        if (this._deck.suits === 5) {
          pattern = [0, 0, 0, 1, 3, 3, 3];
        } else {
          pattern = [0, 0, 0, 0, 1, 2, 4];
        }
        break
      case 1:
        if (this._deck.suits === 5) {
          pattern = [0, 0, 1, 1, 2, 2, 2];
        } else {
          pattern = [0, 0, 0, 2, 2, 2, 1];
        }
        break
      case 2:
        if (this._deck.suits === 5) {
          pattern = [0, 2, 2, 2, 1, 1, 1];
        } else {
          pattern = [0, 1, 2, 1, 1, 1, 1];
        }
        break
      case 3:
        if (this._deck.suits === 5) {
          pattern = [2, 1, 1, 1, 1, 1, 1];
        } else {
          pattern = [1, 1, 1, 1, 1, 1, 1];
        }

        partial = total - (3 * partial)
        break
    }

    for (let i = 0; i < pattern.length; ++i) {
      for (let j = 0; j < pattern[i]; ++j) {
        const card = this._deck.getNextCard()

        if (this.piles.slots[i].isEmpty) {
          card.faceUp = true
        }

        this.piles.slots[i].addCardAtIndex(card, 0)
        --partial
      }
    }

    for (let i = 0; i < partial; ++i) {
      const card = this._deck.getNextCard()
      card.faceUp = true
      this.stock.addCard(card)
    }

    if (this.state.deck.deals === 3) {
      this.state.deck.deals = 0
    } else {
      ++this.state.deck.deals
    }
  }

  autoStack() {
    let automated = false

    while(true) {
      let found = false

      for (let i = 0; i < this.piles.length; ++i) {
        const card = this.piles.slots[i].lastCard
        if (card === null || card.faceUp === false) {
          continue
        }

        let source = {
          key: 'piles',
          slotIndex: i,
          cardIndex: this.piles.slots[i].length - 1,
        }

        for (let j = 0; j < this.stacks.length; ++j) {
          // Do not auto place aces and kings
          if (this.stacks.slots[j].length === 0 ||
            this.stacks.slots[j].length === this.state.card.maxRank - 1
          ) {
            continue;
          }

          let target = {
            key: 'stacks',
            slotIndex: j,
            cardIndex: this.stacks.slots[j].length,
          }

          if (this.stacks.canAddCardToTarget(card, target)) {
            this.stacks.addCardToTarget(card, target)
            this.piles.removeCardFromSource(source)
            automated = true
            found = true
            break
          }
        }
      }

      if (!found) {
        break
      }
    }

    return automated
  }

  changeSort(optimal) {
    if (optimal) {
      if (this.state.piles.sort === 'alternating') {
        this.state.piles.sort = 'color'
      } else {
        this.state.piles.sort = 'alternating'
      }

      return
    }

    let sort

    const rng = Math.floor(Math.random() * 3)

    if (rng === 0) {
      sort = 'alternating'
    } else if (rng === 1) {
      sort = 'suit'
    } else {
      sort = 'color'
    }

    if (sort === this.state.piles.sort) {
      this.changeSort()
      return
    }

    this.state.piles.sort = sort
  }
}
