<template>
  <div class="absolute inset-0 bg-black/70 z-20">
    <div class="
        absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[28vw] border-[0.25vw] border-secondary-800 rounded-[1vw]
        text-secondary-800
        text-xs
        bg-secondary-200
        p-1vw
        flex flex-col
      "
    >
      <div class="flex flex-col space-y-0.5vw">
        <BoardItemStat>
          Real Merch Aquired: {{ board.state.hotel.real }}
        </BoardItemStat>

        <BoardItemStat>
          Fake Merch Aquired: {{ board.state.hotel.fake }}
        </BoardItemStat>

        <BoardItemStat>
          Change In Happiness: {{ signed(board.state.hotel.happiness) }}
        </BoardItemStat>

        <BoardItemStat>
          <span>Lemons Earned: {{ board.state.hotel.lemons }}</span>
          <img class="size-1.5vw ml-0.25vw" src="/image/lemon.svg" alt="Lemons"/>
        </BoardItemStat>
      </div>

      <ActionButton
        class="mt-1vw"
        sounds
        @click="board.state.hotel.stats = false"
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
