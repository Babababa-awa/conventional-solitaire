<template>
  <div class="
      w-[9vw] h-[11vw] group
      rounded-lg
      border-[0.125vw]
      border-secondary-200
      border-dashed
      text-secondary-200
    "
  >
    <div class="
      relative size-full flex items-center justify-center
      border-[0.125vw]
      border-secondary-200
      border-dashed
    ">
      <slot/>
        <Icon v-if="icon" class="size-5vw opacity-0 transition group-hover:opacity-50" :name="icon"/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: null
  },
})
</script>
