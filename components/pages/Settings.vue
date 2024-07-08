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
      <CheckBox :checked="forceOneTurn" @click="setJellyMode">
        Jelly Mode
      </CheckBox>

      <p class="mt-0.5vw">When checked, the stock will always be turn one.</p>

      <CheckBox class="mt-1vw" :checked="noBgm" @click="setNoBgm">
        No BGM
      </CheckBox>

      <CheckBox class="mt-1vw" :checked="noSfx" @click="setNoSfx">
        No SFX
      </CheckBox>

      <ActionButton
        class="mt-1vw"
        sounds
        @click="board.state.settings = false"
        icon="play"
      >
        OK
      </ActionButton>
    </div>

    <audio ref="forceOneTurnSound">
      <source src="/audio/no-turn-three.flac">
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
  forceOneTurn,
  noBgm,
  noSfx,
} = storeToRefs(settingsStore)

const forceOneTurnSound = ref(null)

function setJellyMode() {
  forceOneTurn.value = !forceOneTurn.value

  if (forceOneTurn.value && !noSfx.value) {
    forceOneTurnSound.value.play()
  }

  try {
    window.localStorage.setItem('jellymode', (forceOneTurn.value ? 1 : 0))
  } catch {
    // Do nothing
  }
}

function setNoBgm() {
  noBgm.value = !noBgm.value
  window.localStorage.setItem('nobgm', (noBgm.value ? 1 : 0))
}

function setNoSfx() {
  noSfx.value = !noSfx.value
  window.localStorage.setItem('nosfx', (noSfx.value ? 1 : 0))
}
</script>
