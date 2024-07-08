<template>
  <div class="page-play relative size-full overflow-hidden">
    <div class="absolute inset size-full bg-black/50">
      <BoardStacks class="absolute top-1vw left-1vw" :board="board"/>
      <BoardStock class="absolute top-1vw left-[51vw]" :board="board"/>
      <BoardPiles class="absolute top-13vw left-1vw" :board="board"/>
      <BoardBackpack class="absolute top-[13vw] left-[71vw]" :board="board"/>
      <BoardScore class="absolute top-1vw left-[81vw] w-9vw h-11vw" :board="board"/>
      <BoardHappiness class="absolute top-1vw bottom-[4.5vw] right-1vw" :board="board"/>

      <ActionButton class="absolute bottom-1vw right-1vw w-8vw"
        sounds
        thin
        @click="board.state.menu = true"
      >
        Menu
      </ActionButton>

      <ActionButton class="absolute bottom-1vw left-1vw"
        sounds
        thin
        @click="autoStack"
      >
       Auto Stack
      </ActionButton>

      <BoardDragCard :board="board"/>

      <BoardTutorial
        class="absolute top-0 left-0 size-full"
        v-if="showTutorial"
        @complete="tutorialCompleted"
      />

      <BoardItem :board="board"/>

      <BoardStats :board="board" v-if="board.state.hotel.stats"/>
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

const audioStore = useAudioStore()

if (process.client) {
  useEventListener(document, 'mouseup', event => {
    if (dragSource.value) {
      audioStore.stopAudio('grr')

      if (dragTarget.value) {
        if (props.board.moveCard(dragSource.value, dragTarget.value)) {
          audioStore.playAudio('roof')
        }
      }

      dragStore.endDrag()
    }

  })
}

const showTutorial = computed(() => {
  if (props.board.state.skip) {
    return false
  }

  return props.board.state.tutorial
})
function tutorialCompleted() {
  props.board.state.tutorial = false
}

function autoStack() {
  if (props.board.autoStack()) {
    audioStore.playAudio('automation')
  } else {
    audioStore.playAudio('deny')
  }
}
</script>

<style>
  .page-play{
    background-image: url('/image/bg-convention.avif');
    background-size: cover;
    background-position: center center;
  }
</style>
