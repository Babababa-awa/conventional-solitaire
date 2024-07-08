<template>
  <div class="
      flex items-center bg-primary-200 p-0.25vw
      text-base
      rounded-[0.25vw] border-[0.125vw] border-secondary-800
    "
  >
    <slot/>
  </div>
</template>

<script setup>
const props = defineProps({
  positive: {
    type: Boolean,
    default: false,
  },
  negative: {
    type: Boolean,
    default: false,
  }
})
</script>
