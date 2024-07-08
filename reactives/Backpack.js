import SlotCollection from '@/reactives/SlotCollection'
import Slot from '@/reactives/Slot'

export default class extends SlotCollection {
  constructor(state) {
    super(state, 'backpack')
  }

  _initSlot() {
    return new Slot(this.state)
  }

  get isEmpty() {
    for (const slot of this.slots) {
      if (!slot.isEmpty) {
        return false
      }
    }

    return true
  }

  get isFull() {
    for (const slot of this.slots) {
      if (!slot.isFull) {
        return false
      }
    }

    return true
  }

  get emptySlotTarget() {
    for (let slotIndex = 0; slotIndex < this.slots.length; ++slotIndex) {
      if (!this.slots[slotIndex].isFull) {
        return {
          key: 'backpack',
          slotIndex,
          cardIndex: this.slots[slotIndex].length,
        }
      }
    }

    return null
  }

  containsItem(item) {
    for (const slot of this.slots) {
      for (const card of slot.cards) {
        if (card.type === 'item' && card.item.key === item) {
          return true
        }
      }
    }

    return false
  }

  removeItem(item) {
    for (const slot of this.slots) {
      for (const cardIndex in slot.cards) {
        const card = slot.cards[cardIndex]
        if (card.type === 'item' && card.item.key === item) {
          return slot.removeCard(cardIndex)
        }
      }
    }

    return null
  }
}
