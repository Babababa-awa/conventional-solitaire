<template>
  <div class="flex text-secondary-800 items-center space-x-0.5vw" @click="click">
    <div class="w-2vw h-2vw border-[0.25vw] border-secondary-800 p-0.125vw rounded-[0.125vw] cursor-pointer"
      :class="checked ? 'bg-secondary-800' : 'bg-transparent'"
    >
      <Icon
        v-if="checked"
        class="size-full text-primary-200"
        name="stars"
      />
    </div>
    <div class="text-base">
      <slot/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  checked: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'click',
])

function click() {
  emit('click')
}
</script>
