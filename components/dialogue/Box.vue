<template>
  <div class="
      absolute left-10vw right-10vw bottom-2vw
      text-lg leading-normal bg-black/70 rounded-xl p-1vw
    "
    :class="lines == 2 ? 'h-8vw' : 'h-11vw'"
  >
    <span class="text-primary-600" v-if="name">{{ name }}: </span>

    <slot/>

    <ActionButton
      class="absolute bottom-1vw right-1vw"
      icon="play"
      thin
      @click="next"
    >
      Continue
    </ActionButton>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  lines: {
    type: Number,
    default: 2,
  },
})

const emit = defineEmits([
  'next',
])

function next() {
  emit('next')
}
</script>
