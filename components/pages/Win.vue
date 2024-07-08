<template>
  <div class="page-win relative size-full overflow-hidden z-20">
    <img class="absolute left-1/2 -translate-x-1/2 bottom-4vw w-12vw"
      src="/image/jelly-win.avif"
      draggable="false"
    />

    <div class="relative bg-black/70 mt-4vw max-w-[32vw] mx-auto p-1vw rounded-[1vw]">
      <h2 class="text-center text-2xl text-primary-600">
        You Saved Her
      </h2>

      <p class="mx-auto mt-1vw leading-snug text-sm">
        Jelly Hoshiumi ended up giving the performance of a lifetime.
        <br><br>
        Her amazing voice touched the hearts and souls of everyone who was at the convention.
        <br><br>
        Starknight 157 still supports her to this very day!
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
  .page-win {
    background-image: url('/image/bg-win.avif');
    background-size: cover;
    background-position: center bottom;
  }
</style>
