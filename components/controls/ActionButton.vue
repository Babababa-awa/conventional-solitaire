<template>
  <ButtonBase class="
      flex space-x-0.125vw
      text-secondary-800
      bg-secondary-200
      bg-gradient-to-b
      from-secondary-200
      to-primary-200
      border-[0.25vw]
      border-secondary-800
      hover:bg-none
      hover:bg-secondary-200
      focus:ring-secondary-400
      focus:ring-offset-secondary-600
      group
      rounded-full
    "
    :class="[thin ? 'h-2.5vw px-1vw' : 'h-[3.5vw] px-1.5vw']"
    @mouseenter="playSounds"
  >
    <Icon class="transition group-hover:scale-150 size-2vw -ml-2" :name="icon" aria-hidden="true"/>
    <span class="block -mb-1"><slot/></span>

    <audio ref="monkey1">
      <source src="/audio/monkey1.flac">
    </audio>
    <audio ref="monkey2">
      <source src="/audio/monkey2.flac">
    </audio>
    <audio ref="monkey3">
      <source src="/audio/monkey3.flac">
    </audio>
  </ButtonBase>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: 'play',

  },
  thin: {
    type: Boolean,
    default: false,
  },
  sounds: {
    type: Boolean,
    default: false,
  }
})

const settingsStore = useSettingsStore()
const {
  noSfx,
} = storeToRefs(settingsStore)

const monkey1 = ref(null)
const monkey2 = ref(null)
const monkey3 = ref(null)

function playSounds() {
  if (!props.sounds || noSfx.value) {
    return
  }

  let rng = Math.floor(Math.random() * 3)

  if (rng === 0) {
    monkey1.value.play()
  } else if (rng === 1) {
    monkey2.value.play()
  } else {
    monkey3.value.play()
  }
}
</script>
