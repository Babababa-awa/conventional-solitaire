import CardCollection from '@/reactives/CardCollection'

export default class extends CardCollection {
  constructor(state) {
    super(state)
  }

  get isFull() {
    return this.length > 0
  }

  canAddCardAtIndex(card, index) {
    if (!super.canAddCardAtIndex(card, index)) {
      return false
    }

    if (card.type !== 'item') {
      return true
    }

    if (card.item.type === 'trap') {
      return false
    }

    if (card.item.type === 'consume') {
      return true
    }

    if (card.item.type === 'real' || card.item.type === 'fake') {
      if (this.state.score.lemons - card.item.price < 0) {
        useAudioStore().playAudio('deny')
        return false
      }

      return true
    }

    return true
  }

  canDragAtIndex(index) {
    if (index < 0 || index > this.length - 1) {
      return false
    }

    if (index < this.length - 1) {
      return false
    }

    return true
  }
}
