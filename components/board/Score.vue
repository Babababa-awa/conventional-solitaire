<template>
  <div class="flex flex-col">
    <div class="flex space-x-0.5vw h-6.5vw">
      <div class="flex flex-col items-center">
        <img class="size-4vw mb-0.5vw" src="/image/lemon.svg" alt="Lemon"/>
        <span class="text-primary-200">{{ board.state.score.lemons }}</span>
      </div>

      <div class="flex flex-col items-center">
        <img class="size-4vw mb-0.5vw" src="/image/hotel.svg" alt="Completed Stacks"/>
        <span class="text-primary-200">{{ board.state.score.stacks }}</span>
      </div>
    </div>

    <div class="absolute top-[6.5vw] bottom-0 left-0 right-0 overflow-hidden border-b-[0.125vw] border-black">
      <CardSuited class="absolute top-0 left-0" faceUp :suit="suit1" :rank="10"/>
      <CardSuited class="absolute top-[2vw] left-0" faceUp :suit="suit2" :rank="9"/>
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

const suit1 = computed(() => {
  return 'hearts'
})

const suit2 = computed(() => {
  if (props.board.state.piles.sort === 'alternating') {
    return 'clubs'
  } else if (props.board.state.piles.sort === 'suit') {
    return 'hearts'
  } else {
    return 'diamonds'
  }
})

</script>
