<template>
  <div class="flex space-x-1vw h-[10vw]">
    <template v-for="slot, slotIndex in board.stacks.slots">
      <CardSlot
          v-if="slot.length === 0"
          @mouseenter="mouseEnterCard(slotIndex)"
          @mouseleave="mouseLeaveCard(slotIndex)"
      />
      <CardSuited
        v-else-if="slot.lastCard.type === 'suited'"
        faceUp
        :suit="slot.lastCard.suit"
        :rank="slot.lastCard.rank"
        @mouseenter="mouseEnterCard(slotIndex)"
        @mouseleave="mouseLeaveCard(slotIndex)"
      />
      <CardItem
        v-else-if="slot.lastCard.type === 'item'"
        faceUp
        :item="slot.lastCard.item"
        @mouseenter="mouseEnterCard(slotIndex)"
        @mouseleave="mouseLeaveCard(slotIndex)"
      />
    </template>
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
  target: dragTarget,
} = storeToRefs(dragStore)

const emptySlots = computed(() => {
  const state = props.board.state.stacks

  let empty = []

  for (let i = state.currentSlots; i < state.maxSlots; ++i) {
    empty.push(i)
  }

  return empty
})

function mouseEnterCard(slotIndex) {
  dragTarget.value = {
    key: 'stacks',
    slotIndex,
    cardIndex: props.board.stacks.slots[slotIndex].length,
  }
}

function mouseLeaveCard(slotIndex) {
  dragTarget.value = null
}
</script>
