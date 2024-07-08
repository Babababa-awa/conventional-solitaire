<template>
  <div class="">
    <div class="flex space-x-[1vw]">
      <template v-for="pile, slotIndex in board.piles.slots">
        <div class="relative w-[9vw]">
          <CardEmpty
            v-if="showEmptyCard(slotIndex)"
            icon="deck"
            @mouseenter="mouseEnterCard(slotIndex, -1)"
            @mouseleave="mouseLeaveCard(slotIndex, -1)"
          />

          <template v-for="(card, cardIndex) in pile.cards">
            <CardSuited
              v-if="card.type === 'suited'"
              class="absolute left-0"
              :style="getCardStyle(slotIndex, cardIndex)"
              :faceUp="card.faceUp"
              :suit="card.suit"
              :rank="card.rank"
              :canFlip="canCardFlip(slotIndex, cardIndex)"
              :isDragging="isDragging(slotIndex, cardIndex)"
              @mousedown="mouseDownCard($event, slotIndex, cardIndex)"
              @mouseup="mouseUpCard($event, slotIndex, cardIndex)"
              @mouseenter="mouseEnterCard(slotIndex, cardIndex)"
              @mouseleave="mouseLeaveCard(slotIndex, cardIndex)"
            />
            <CardItem
              v-if="card.type === 'item'"
              class="absolute left-0"
              :style="getCardStyle(slotIndex, cardIndex)"
              :faceUp="card.faceUp"
              :item="card.item"
              :canFlip="canCardFlip(slotIndex, cardIndex)"
              :isDragging="isDragging(slotIndex, cardIndex)"
              @mousedown="mouseDownCard($event, slotIndex, cardIndex)"
              @mouseup="mouseUpCard($event, slotIndex, cardIndex)"
              @mouseenter="mouseEnterCard(slotIndex, cardIndex)"
              @mouseleave="mouseLeaveCard(slotIndex, cardIndex)"
            />
          </template>
        </div>
      </template>
    </div>
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
  const pile = props.board.piles.slots[slotIndex]

  if (pile.length === 0) {
    return true
  }

  if (dragSource.value &&
    dragSource.value.key === 'piles' &&
    dragSource.value.slotIndex === slotIndex &&
    dragSource.value.cardIndex === 0
  ) {
    return true
  }

  return false
}

function getCardStyle(slotIndex, cardIndex) {
  const pile = props.board.piles.slots[slotIndex]

  let top = 0

  for (let i = 0; i < pile.length; ++i) {
    if (i === cardIndex) {
      break
    }

    if (pile.cards[i].faceUp) {
      top += 1.75
    } else {
      top += 0.5
    }
  }

  return 'top:' + top + 'vw'
}

function canCardFlip(slotIndex, cardIndex) {
  const pile = props.board.piles.slots[slotIndex]

  return pile.canFlipAtIndex(cardIndex)
}

function canCardDrag(slotIndex, cardIndex) {
  const pile = props.board.piles.slots[slotIndex]

  return pile.canDragAtIndex(cardIndex)
}

function isDragging(slotIndex, cardIndex) {
  if (dragSource.value &&
    dragSource.value.key === 'piles' &&
    dragSource.value.slotIndex === slotIndex &&
    dragSource.value.cardIndex <= cardIndex
  ) {
    return true
  }

  return false
}

function mouseDownCard(event, slotIndex, cardIndex) {
  const pile = props.board.piles.slots[slotIndex]
  const card = pile.cards[cardIndex]

  mouseStore.store()

  if (!canCardDrag(slotIndex, cardIndex)) {
    return
  }

  dragStore.startDrag(
    card,
    event.currentTarget,
    {
      key: 'piles',
      slotIndex,
      cardIndex,
    }
  )
}
function mouseUpCard(event, slotIndex, cardIndex) {
  if (!mouseHasMoved.value) {
    const pile = props.board.piles.slots[slotIndex]
    const card = pile.cards[cardIndex]

    if (card.faceUp) {
      if (card.type === 'item') {
        itemSource.value = {
          key: 'piles',
          slotIndex,
          cardIndex,
        }

        item.value = card.item
      }
    } else if (cardIndex === pile.length - 1) {
      card.faceUp = true
    }

    mouseStore.reset()
  }
}

function mouseEnterCard(slotIndex, cardIndex) {
  dragTarget.value = {
    key: 'piles',
    slotIndex,
    cardIndex: cardIndex + 1,
  }
}

function mouseLeaveCard(slotIndex, cardIndex) {
  dragTarget.value = null
}
</script>
