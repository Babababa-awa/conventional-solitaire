<template>
  <div v-if="active"
    class="absolute w-[8vw] h-[10vw] pointer-events-none z-20"
    :class="classname"
    :style="positionStyle"
  >
    <template v-for="card, cardIndex in cards">
      <CardSuited
        v-if="type === 'suited'"
        class="absolute"
        :style="getCardStyle(cardIndex)"
        faceUp
        :suit="card.suit"
        :rank="card.rank"
      />
      <CardItem
        v-else-if="type === 'item'"
        class="absolute"
        :style="getCardStyle(cardIndex)"
        faceUp
        :item="card.item"
      />
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

const mouseStore = useMouseStore()
const {
  x, y
} = storeToRefs(mouseStore)

const dragStore = useDragStore()
const {
  active,
  source,
  type,
  meta,
} = storeToRefs(dragStore)

const cards = computed(() => {
  let cards = []

  if (source.value.key === 'piles') {
    const pile = props.board.piles.slots[source.value.slotIndex]

    for (let i = source.value.cardIndex; i < pile.length; ++i) {
      cards.push(pile.cards[i].serialize())
    }
  } else {
    cards.push(meta.value.card)
  }

  return cards
})

function getCardStyle(cardIndex) {
  let top = 0

  for (let i = 0; i <= cardIndex; ++i) {
    if (i === cardIndex) {
      break
    }

    if (cards.value[i].faceUp) {
      top += 1.75
    } else {
      top += 0.5
    }
  }

  return 'top:' + top + 'vw'
}

const classname = computed(() => {
  if (active.value) {
      return ''
  }

  return 'hidden'
})

const positionStyle = computed(() => {
  if (!active.value) {
    return ''
  }

  return 'left:' + (x.value - meta.value.offset.x) + 'px;top:' + (y.value - meta.value.offset.y) + 'px'
})
</script>
