<template>
  <div class="page-lose relative size-full overflow-hidden z-20">
    <img class="absolute left-1/2 -translate-x-1/2 bottom-7vw w-10vw"
      src="/image/jelly-lose.avif"
      draggable="false"
    />

    <div class="relative bg-black/50 mt-4vw max-w-[32vw] mx-auto p-1vw rounded-[1vw]">
      <h2 class="text-center text-2xl text-secondary-600">
        You Are A Failure
      </h2>

      <p class="mx-auto mt-1vw leading-snug text-sm">
        Jelly Hoshiumi ended up balling her eyes out during her performance causing everyone to become uncomfortable and leave.
        <br><br>
        Phase Connect became a laughing stock and was forced to shutter its doors forever. Nobody has seen Sakana since...
        <br><br>
        Jelly Hoshiumi now works in IT for a medium sized conglomerate.
        <br><br>
        Starknight 157 tragically ended his own life in despair.
      </p>
    </div>

    <ActionButton class="absolute bottom-1vw right-1vw w-8vw"
      sounds
      thin
      @click="board.state.menu = true"
    >
      Menu
    </ActionButton>
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

<style>
  .page-lose {
    background-image: url('/image/bg-lose.avif');
    background-size: cover;
    background-position: center bottom;
  }
</style>
