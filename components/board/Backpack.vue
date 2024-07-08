<template>
  <div class="flex flex-wrap gap-1vw w-19vw">
    <div class="relative w-[9vw] h-[11vw]" v-for="slot, slotIndex in board.backpack.slots">
      <CardSlot
        v-if="showEmptyCard(slotIndex)"
        @mouseenter="mouseEnterCard(slotIndex)"
        @mouseleave="mouseLeaveCard(slotIndex)"
      />

      <template v-if="slot.lastCard">
        <CardSuited
          class="absolute top-0 left-0"
          v-if="slot.lastCard.type === 'suited'"
          faceUp
          :suit="slot.lastCard.suit"
          :rank="slot.lastCard.rank"
          :isDragging="isDragging(slotIndex)"
          @mousedown="mouseDownCard($event, slotIndex)"
          @mouseup="mouseUpCard($event, slotIndex)"
          @mouseenter="mouseEnterCard(slotIndex)"
          @mouseleave="mouseLeaveCard(slotIndex)"
        />
        <CardItem
          class="absolute top-0 left-0"
          v-else-if="slot.lastCard.type === 'item'"
          faceUp
          :item="slot.lastCard.item"
          :isDragging="isDragging(slotIndex)"
          @mousedown="mouseDownCard($event, slotIndex)"
          @mouseup="mouseUpCard($event, slotIndex)"
          @mouseenter="mouseEnterCard(slotIndex)"
          @mouseleave="mouseLeaveCard(slotIndex)"
        />
      </template>
    </div>

    <template v-for="slot in emptySlots">
      <CardEmpty icon="block"/>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  board: {
    type: Object,
    required: true,
  },
})

const dragStore = useDragStore()
const {
  source: dragSource,
  target: dragTarget,
} = storeToRefs(dragStore)

const mouseStore = useMouseStore()
const {
  hasMoved: mouseHasMoved,
} = storeToRefs(mouseStore)

const itemStore = useItemStore()
const {
  item,
  source: itemSource,
} = storeToRefs(itemStore)

function showEmptyCard(slotIndex) {
  const slot = props.board.backpack.slots[slotIndex]

  if (slot.length === 0) {
    return true
  }

  if (dragSource.value &&
    dragSource.value.key === 'backpack' &&
    dragSource.value.slotIndex === slotIndex &&
    dragSource.value.cardIndex === 0
  ) {
    return true
  }

  return false
}

const emptySlots = computed(() => {
  const state = props.board.state.backpack

  let empty = []

  for (let i = state.currentSlots; i < state.maxSlots; ++i) {
    empty.push(i)
  }

  return empty
})

function canCardDrag(slotIndex) {
  const slot = props.board.backpack.slots[slotIndex]

  return slot.canDrag()
}

function isDragging(slotIndex) {
  const cardIndex = props.board.backpack.slots[slotIndex].length - 1

  if (dragSource.value &&
    dragSource.value.key === 'backpack' &&
    dragSource.value.slotIndex === slotIndex &&
    dragSource.value.cardIndex <= cardIndex
  ) {
    return true
  }

  return false
}

function mouseDownCard(event, slotIndex) {
  mouseStore.store()

  if (!canCardDrag(slotIndex)) {
    return
  }

  const card = props.board.backpack.slots[slotIndex].lastCard
  const cardIndex = props.board.backpack.slots[slotIndex].length - 1

  dragStore.startDrag(
    card,
    event.currentTarget,
    {
      key: 'backpack',
      slotIndex,
      cardIndex,
    }
  )
}

function mouseUpCard(event, slotIndex) {
  if (!mouseHasMoved.value) {
    const card = props.board.backpack.slots[slotIndex].lastCard

    if (card.type === 'item') {
      itemSource.value = {
        key: 'backpack',
        slotIndex,
        cardIndex: props.board.backpack.slots[slotIndex].length - 1
      }

      item.value = card.item
    }

    mouseStore.reset()
  }
}

function mouseEnterCard(slotIndex) {
  dragTarget.value = {
    key: 'backpack',
    slotIndex,
    cardIndex: props.board.backpack.slots[slotIndex].length,
  }
}

function mouseLeaveCard(slotIndex) {
  dragTarget.value = null
}
</script>
