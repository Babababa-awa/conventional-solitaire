<template>
  <div class="absolute inset-0 bg-black/70 z-20">
    <div class="
        absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[21vw] border-[0.25vw] border-secondary-800 rounded-[1vw]
        text-secondary-800
        text-xs
        bg-secondary-200
        p-1vw
        flex flex-col
      "
    >
      <CancelButton
        sounds
        @click="quit"
      >
        Quit
      </CancelButton>

      <CancelButton
        class="mt-1vw"
        sounds
        @click="restart"
      >
        Restart
      </CancelButton>

      <ActionButton
        class="mt-1vw"
        sounds
        @click="board.state.menu = false"
      >
        Return To Game
      </ActionButton>
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

const audioStore = useAudioStore()
const dragStore = useDragStore()
const mouseStore = useMouseStore()
const itemStore = useItemStore()

function quit() {
  audioStore.stopAudio('cheer')
  audioStore.stopAudio('main')
  audioStore.playAudio('jelly-hate')
  props.board.restart()
}

function restart() {
  audioStore.stopAudio('cheer')

  itemStore.reset()
  dragStore.reset()
  mouseStore.reset()
  props.board.reset()
  props.board.state.menu = false
  props.board.state.view = 'play'
}
</script>
