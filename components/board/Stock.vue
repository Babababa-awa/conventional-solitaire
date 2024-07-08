<template>
  <div class="w-[29vw] h-10vw">
    <CardAction
       class="absolute top-0 right-0"
      v-if="endOfStock && props.board.stock.length"
      @click="turnStock"
    >
      <Icon class="size-5vw transition group-hover:rotate-90" name="refresh"/>
    </CardAction>
    <CardSlot
      class="absolute top-0 right-0"
      v-else-if="endOfStock && ! props.board.stock.length"
    >
      <Icon class="size-5vw" name="block"/>
    </CardSlot>

    <CardBase
      v-else
      class="absolute top-0 right-0"
      @click="turnStock"
      canFlip
      :turnCount="turnCount"
      :drool="forceOneTurn"
    />

    <template v-for="card, cardIndex in displayCards">
      <CardSuited
        class="absolute top-0"
        :style="getCardStyle(cardIndex)"
        v-if="card.type === 'suited'"
        faceUp
        :suit="card.suit"
        :rank="card.rank"
        :isDragging="isDragging(cardIndex)"
        @mousedown="mouseDownCard($event, cardIndex)"
        @mouseup="mouseUpCard($event, cardIndex)"
        @mouseenter="mouseEnterCard(cardIndex)"
        @mouseleave="mouseLeaveCard(cardIndex)"
      />
      <CardItem
        class="absolute top-0"
        :style="getCardStyle(cardIndex)"
        v-if="card.type === 'item'"
        faceUp
        :item="card.item"
        :isDragging="isDragging(cardIndex)"
        @mousedown="mouseDownCard($event, cardIndex)"
        @mouseup="mouseUpCard($event, cardIndex)"
        @mouseenter="mouseEnterCard(cardIndex)"
        @mouseleave="mouseLeaveCard(cardIndex)"
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

const settingsStore = useSettingsStore()
const {
  forceOneTurn,
} = storeToRefs(settingsStore)

const audioStore = useAudioStore()

function getCardStyle(cardIndex) {
  return 'left:' + (cardIndex * 2.5) + 'vw'
}

const turnCount = computed(() => {
  if (forceOneTurn.value) {
    return 1
  }

  return props.board.state.stock.currentTurnCount
})

const displayCards = computed(() => {
  let cards = []

  let index = props.board.state.stock.currentIndex - props.board.state.stock.maxTurnCount

  for (let i = 0; i < props.board.state.stock.maxTurnCount; ++i) {
    ++index

    if (index < 0) {
      continue
    }

    if (index === props.board.stock.length) {
      break
    }

    cards.push(props.board.stock.cards[index])
  }

  return cards
})

const endOfStock = computed(() => {
  return (props.board.state.stock.currentIndex >= props.board.stock.length - 1)
})

const isThreat = computed(() => {
  const card = props.board.stock.currentCard
  if (card === null || card.type !== 'item' || card.item.type !== 'trap') {
    return false
  }

  return true
})

const isMerch = computed(() => {
  const card = props.board.stock.currentCard
  if (card === null || card.type !== 'item') {
    return false
  }

  return (card.item.type === 'real' || card.item.type === 'fake')
})

function turnStock() {
  const state = props.board.state.stock

  if (isThreat.value || isMerch.value) {
    audioStore.playAudio('deny')
    return
  }

  audioStore.playAudio('arf')

  if (endOfStock.value) {
    state.currentIndex = -1
    return
  }

  let next = state.currentIndex + turnCount.value

  if (next >= props.board.stock.length - 1) {
    state.currentIndex = props.board.stock.length - 1
  } else {
    state.currentIndex += turnCount.value
  }
}

function canCardDrag(cardIndex) {
  if (cardIndex !== displayCards.value.length - 1) {
    return false
  }

  if (displayCards.value[cardIndex].type === 'item' &&
    displayCards.value[cardIndex].item.type === 'trap'
  ) {
    return false
  }

  return true
}

function isDragging(cardIndex) {
  const realCardIndex = props.board.state.stock.currentIndex - (displayCards.value.length - 1 - cardIndex)

  if (dragSource.value &&
    dragSource.value.key === 'stock' &&
    dragSource.value.cardIndex === realCardIndex
  ) {
    return true
  }

  return false
}

function mouseDownCard(event, cardIndex) {
  mouseStore.store()

  if (!canCardDrag(cardIndex)) {
    return
  }

  const realCardIndex = props.board.state.stock.currentIndex - (displayCards.value.length - 1 - cardIndex)
  const card = props.board.stock.cards[realCardIndex]

  dragStore.startDrag(
    card,
    event.currentTarget,
    {
      key: 'stock',
      cardIndex: realCardIndex,
    }
  )
}

function mouseUpCard(event, cardIndex) {
  if (!mouseHasMoved.value) {
    const realCardIndex = props.board.state.stock.currentIndex - (displayCards.value.length - 1 - cardIndex)

    if (realCardIndex === props.board.state.stock.currentIndex) {
      const card = props.board.stock.cards[realCardIndex]

      if (card.type === 'item') {
        itemSource.value = {
          key: 'stock',
          cardIndex: realCardIndex
        }

        item.value = card.item
      }
    }

    mouseStore.reset()
  }
}

function mouseEnterCard(cardIndex) {
  const realCardIndex = props.board.state.stock.currentIndex - (displayCards.value.length - 1 - cardIndex)
  dragTarget.value = {
    key: 'stock',
    cardIndex: realCardIndex + 1,
  }
}

function mouseLeaveCard(cardIndex) {
  dragTarget.value = null
}
</script>
