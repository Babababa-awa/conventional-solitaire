<template>
  <div class="flex flex-col space-y-1vw items-center">
    <div class="size-8vw rounded-[1vw] border-[0.125vw] border-black overflow-hidden">
      <img class="size-full" src="/image/jelly-happy.avif" alt="Jelly Happy"/>
    </div>
    <div class="relative grow w-[3.5vw] rounded-[3vw] border-[0.25vw] border-secondary-800 bg-secondary-800/70 overflow-hidden">
      <div class="absolute bottom-0 left-0 w-full rounded-t-[0.25vw] bg-primary-600 w-full" :style="meterStyle">
      </div>
      <div class="absolute top-1vw bottom-1vw left-0 w-full flex flex-col items-end justify-between">
        <div class="w-1/2 h-0.125vw rounded-l-full bg-secondary-600"></div>
        <div class="w-1/2 h-0.125vw rounded-l-full bg-secondary-600"></div>
        <div class="w-1/2 h-0.125vw rounded-l-full bg-secondary-600"></div>
        <div class="w-1/2 h-0.125vw rounded-l-full bg-secondary-600"></div>
        <div class="w-1/2 h-0.125vw rounded-l-full bg-secondary-600"></div>
        <div class="w-1/2 h-0.125vw rounded-l-full bg-secondary-600"></div>
        <div class="w-1/2 h-0.125vw rounded-l-full bg-secondary-600"></div>
      </div>
    </div>
    <div class="size-8vw rounded-[1vw] border-[0.125vw] border-black overflow-hidden">
      <img class="size-full" src="/image/jelly-sad.avif" alt="Jelly Sad"/>
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

const meterStyle = computed(() => {
  return 'height:' + props.board.state.score.happiness + '%';
})
</script>
