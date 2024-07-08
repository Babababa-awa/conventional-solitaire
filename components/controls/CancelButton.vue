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

    <audio ref="no1">
      <source src="/audio/no1.flac">
    </audio>
    <audio ref="no2">
      <source src="/audio/no2.flac">
    </audio>
    <audio ref="no3">
      <source src="/audio/no3.flac">
    </audio>
  </ButtonBase>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: 'no',
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

const no1 = ref(null)
const no2 = ref(null)
const no3 = ref(null)

function playSounds() {
  if (!props.sounds || noSfx.value) {
    return
  }

  let rng = Math.floor(Math.random() * 3)

  if (rng === 0) {
    no1.value.play()
  } else if (rng === 1) {
    no2.value.play()
  } else {
    no3.value.play()
  }
}
</script>
