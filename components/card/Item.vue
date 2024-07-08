<template>
  <CardBase :faceUp="faceUp" :canFlip="canFlip" :isDragging="isDragging">
    <template v-if="faceUp">
      <div class="
          absolute top-0.5vw left-0.5vw right-0.5vw
          flex items-center justify-center text-sm
        "
        :class="typeClassname"
      >
        {{ cardTitle }}
      </div>

      <div class="absolute left-1vw top-2vw right-1vw bottom-2vw inset-1.5vw">
        <img class="size-full object-contain" :src="item.image" />
      </div>

      <div v-if="item.type !== 'real' && item.type !== 'fake'"
        class="absolute bottom-0.5vw left-0.5vw right-0.5vw flex items-center justify-center text-sm"
        :class="typeClassname"
      >
          {{ cardTitle }}
      </div>

      <div class="absolute size-full" :class="cardClass"></div>

      <div v-if="item.type === 'real' || item.type === 'fake'"
        class="absolute bottom-0.5vw left-0.5vw right-0.5vw flex items-center justify-center text-sm"
        :class="typeClassname"
      >
        <div class="relative flex text-xs items-center justify-center space-x-1vw">
          <div class="flex items-center">
            <img class="size-1vw mr-0.25vw" src="/image/lemon.svg" alt="Lemons"/>
            <span>{{ item.price }}</span>
          </div>
          <div class="flex items-center">
            <img class="size-1vw mr-0.25vw" src="/image/happiness.svg" alt="Happiness"/>
            <span>{{ displayHappiness }}</span>
          </div>
        </div>
      </div>
    </template>
  </CardBase>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: false,
  },
  faceUp: {
    type: Boolean,
    default: false,
  },
  canFlip: {
    type: Boolean,
    default: false,
  },
  isDragging: {
    type: Boolean,
    default: false,
  }
})

const displayHappiness = computed(() => {
  if (props.item.type === 'fake') {
      return props.item.happiness * -1
  }

  return props.item.happiness
})

const cardTitle = computed(() => {
  if ('cardTitle' in props.item) {
    return props.item.cardTitle
  }

  if (props.item.type === 'real' || props.item.type === 'fake') {
    return 'Merch'
  }

  if (props.item.type === 'consume') {
    return 'Consumable'
  }

  return 'Threat'
})

const cardIcon = computed(() => {
  if (props.item.type === 'real' || props.item.type === 'fake') {
    return 'merch'
  }

  if (props.item.type === 'consume') {
    return 'merch'
  }

  return 'merch'
})

const typeClassname = computed(() => {
  if (props.item.type === 'real' || props.item.type === 'fake') {
    return 'text-black'
  }

  if (props.item.type === 'consume') {
    return 'text-black'
  }

  return 'text-red'
})

const cardClass = computed(() => {
  if (props.item.type === 'real' || props.item.type === 'fake') {
    if (props.item.price < 0) {
      return 'shadow-inner shadow-green opacity-50'
    }

    return 'shadow-inner shadow-primary-400'
  }

  if (props.item.type === 'consume') {
      return 'shadow-inner shadow-green opacity-50'
  }

  if (props.item.type === 'trap') {
    return 'shadow-inner shadow-red opacity-50'
  }

  return ''
})
</script>
