<template>
  <div class="page-index flex flex-col space-y-1vw items-center justify-start size-full pt-4vw">
    <div class="flex flex-col space-y-1vw items-center justify-center mb-1.5vw">
      <img class="max-w-80vw h-8vw"
        src="/image/logo.avif"
        alt="Solitairium"
        draggable="false"
      />
    </div>

    <div class="w-30vw flex flex-col space-y-1vw">
      <ActionButton icon="play" @click="play(false)" sounds>
          Play With Lore
      </ActionButton>

      <ActionButton icon="play" @click="play(true)" sounds>
          Instant Play
      </ActionButton>
    </div>

    <img class="anime-shake absolute rotate-[-65deg] bottom-2vw max-h-[25vw] max-w-17vw"
      :class="{'anime-shake-fast': awawaPlaying}"
      src="/image/jelly-not-crazy.avif"
      draggable="false"
      @click="awawa"
    />

    <ActionButton
      class="absolute bottom-1vw right-1vw"
      icon="play"
      @click="showSettings"
      sounds
    >
        Settings
    </ActionButton>

    <ActionButton
      class="absolute bottom-1vw left-1vw"
      icon="play"
      @click="showCredits"
      sounds
    >
      Credits
    </ActionButton>

    <audio ref="audioAwawa" @ended="awawaEnded">
      <source src="/audio/awawawawaaaaaaaa.flac">
    </audio>

    <audio ref="lore1">
      <source src="/audio/what-lore-1.flac">
    </audio>
    <audio ref="lore2">
      <source src="/audio/what-lore-2.flac">
    </audio>
    <audio ref="lore3">
      <source src="/audio/there-is-no-lore.flac">
    </audio>
    <audio ref="lore4">
      <source src="/audio/the-lore.flac">
    </audio>

    <audio ref="settings">
      <source src="/audio/settings.flac">
    </audio>
  </div>
</template>

<script setup>
const props = defineProps({
  board: {
    type: Object,
    required: true,
  },
})

const settingsStore = useSettingsStore()
const {
  noSfx,
} = storeToRefs(settingsStore)

const audioStore = useAudioStore()

const audioAwawa = ref(null)
const awawaPlaying = ref(false)

const lore1 = ref(null)
const lore2 = ref(null)
const lore3 = ref(null)
const lore4 = ref(null)
const settings = ref(null)

function awawa() {
  if (!noSfx.value) {
    audioAwawa.value.play()
  }
  awawaPlaying.value = true
}
function awawaEnded() {
  awawaPlaying.value = false
}

function play(skip) {
  if (skip) {
    let rng = Math.floor(Math.random() * 3)

    if (!noSfx.value) {
      if (rng === 0) {
        lore1.value.play()
      } else if (rng === 1) {
        lore2.value.play()
      } else {
        lore3.value.play()
      }
    }

    props.board.state.skip = true

    audioStore.playAudio('main')
    props.board.state.view = 'play'
  } else {
    if (!noSfx.value) {
      lore4.value.play()
    }

    props.board.state.skip = false
    audioStore.playAudio('lair')
    props.board.state.view = 'cutscene'
  }
}

function showSettings() {
  if (!noSfx.value) {
    settings.value.play()
  }

  props.board.state.settings = true
}

function showCredits() {
  audioStore.playAudio('credits')
  props.board.state.view = 'credits'
}
</script>

<style scoped>
  .page-index {
    background-image: url('/image/bg.avif');
    background-size: cover;
    background-position: center center;
  }

  .anime-shake {
    animation: shake 1s infinite;
  }
  .anime-shake-fast {
    animation-duration: 0.25s;
  }

  @keyframes shake {
    0%, 90%, 100% {
      transform: rotate(-63deg);
    }
    50% {
      transform: rotate(-67deg);
    }
    60% {
      transform: rotate(-67deg);
    }
  }
  .anime-shadow {
    animation: moveShadow 5s infinite ease-in-out;
  }

  @keyframes moveShadow {
    0%, 100% {
      text-shadow: 0.25rem 0.25rem 0 rgba(0,0,0,0.4), -0.25rem 0.25rem 0 rgba(0,0,0,0.4), -0.25rem -0.25rem 0 rgba(0,0,0,0.4), 0.25rem -0.25rem 0 rgba(0,0,0,0.4);
    }
    25% {
      text-shadow: -0.25rem 0.25rem 0 rgba(0,0,0,0.4), -0.25rem -0.25rem 0 rgba(0,0,0,0.4), 0.25rem -0.25rem 0 rgba(0,0,0,0.4), 0.25rem 0.25rem 0 rgba(0,0,0,0.4);
    }
    50% {
      text-shadow: -0.25rem -0.25rem 0 rgba(0,0,0,0.4), 0.25rem -0.25rem 0 rgba(0,0,0,0.4), 0.25rem 0.25rem 0 rgba(0,0,0,0.4), -0.25rem 0.25rem 0 rgba(0,0,0,0.4);
    }
    75% {
      text-shadow: 0.25rem -0.25rem 0 rgba(0,0,0,0.4), 0.25rem 0.25rem 0 rgba(0,0,0,0.4), -0.25rem 0.25rem 0 rgba(0,0,0,0.4), -0.25rem -0.25rem 0 rgba(0,0,0,0.4);
    }
  }
</style>
