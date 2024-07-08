import SlotCollection from '@/reactives/SlotCollection'
import Stack from '@/reactives/Stack'

export default class extends SlotCollection {
  constructor(state) {
    super(state, 'stacks')
  }

  _initSlot() {
    return new Stack(this.state)
  }
}
