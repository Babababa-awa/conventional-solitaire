<template>
  <div class="w-[9vw] h-[11vw] rounded-[0.5vw] bg-white border-[0.125vw] border-black cursor-pointer overflow-hidden"
    :class="cardClassname()"
  >
    <div class="relative w-[9vw] h-[11vw] -mt-0.125vw -ml-0.125vw group text-black">
      <slot/>

      <div
        class="flex space-x-0.25vw items-center absolute left-0.5vw top-0.5vw text-sm text-secondary-600"
        :class="flipIconClassname()"
      >
        <Icon class="size-1.5vw" name="flip"/>

        <span v-if="turnCount">
          {{ turnCount }}x
        </span>
      </div>

      <img
        v-if="drool"
        class="
          absolute left-0.5vw top-2.5vw size-1.5vw
          opacity-0 transition group-hover:opacity-100
        "
        src="/image/drool.avif"
        alt="ONE TURN"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  faceUp: {
    type: Boolean,
    default: false,
  },
  canFlip: {
    type: Boolean,
    default: false,
  },
  turnCount: {
    type: Number,
    default: null
  },
  drool: {
    type: Boolean,
    default: false
  },
  isDragging: {
    type: Boolean,
    default: false,
  }
})

function cardClassname() {
  if (props.isDragging) {
    return 'opacity-0'
  }

  if (props.faceUp) {
    return ''
  } else {
    return 'card-back shadow-inner shadow-secondary-400'
  }
}

function flipIconClassname() {
  if (props.faceUp || !props.canFlip) {
      return 'opacity-0'
  }

  return 'opacity-0 transition group-hover:opacity-100'
}
</script>

<style>
.card-back {
  background-image: url('/image/card-back.avif');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
