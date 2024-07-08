<template>
  <div class="absolute inset-0 bg-black/70">
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

      <ActionButton
        class="mt-1vw"
        sounds
        @click="board.state.hotel = false"
      >
        OK
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

</script>
