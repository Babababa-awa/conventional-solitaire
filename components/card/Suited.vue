<template>
  <CardBase :faceUp="faceUp" :canFlip="canFlip" :isDragging="isDragging">
    <template v-if="faceUp">
      <div class="absolute top-0.5vw left-0.5vw flex items-center justify-center text-sm" :class="rankClassname">
        {{ visualRank }}
        <Icon class="size-1vw ml-0.125vw" :class="rankClassname" :name="suit"/>
      </div>

      <div class="absolute left-2vw top-2.5vw right-2vw bottom-2.5vw inset-1.5vw">
        <Icon class="absolute" :class="suitClassname(1)" :name="suit"/>
        <Icon class="absolute" :class="suitClassname(2)" :name="suit"/>
        <Icon class="absolute" :class="suitClassname(3)" :name="suit"/>
        <Icon class="absolute" :class="suitClassname(4)" :name="suit"/>
        <Icon class="absolute" :class="suitClassname(5)" :name="suit"/>
        <Icon class="absolute" :class="suitClassname(6)" :name="suit"/>
        <Icon class="absolute" :class="suitClassname(7)" :name="suit"/>
        <Icon class="absolute" :class="suitClassname(8)" :name="suit"/>
        <Icon class="absolute" :class="suitClassname(9)" :name="suit"/>
        <Icon class="absolute" :class="suitClassname(10)" :name="suit"/>

        <img v-if="isFace"
          class="absolute -top-1vw left-0.5vw size-[4vw]"
          :src="faceSrc"
          alt="Face"
          draggable="false"
        />
        <img v-if="isFace"
          class="absolute -bottom-1vw left-0.5vw rotate-180 size-[4vw]"
          :src="faceSrc"
          alt="Face"
          draggable="false"
        />
      </div>

      <div class="absolute bottom-0.5vw right-0.5vw flex items-center justify-center text-sm" :class="rankClassname">
        <Icon class="size-1vw mr-0.125vw" :class="rankClassname" :name="suit"/>
        {{ visualRank }}
      </div>
    </template>
  </CardBase>
</template>

<script setup>
const props = defineProps({
  suit: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
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

const rankClassname = computed(() => {
  if (props.suit === 'diamonds' || props.suit === 'hearts') {
    return 'text-red'
  }

  if (props.suit === 'clubs' || props.suit === 'spades') {
    return 'text-black'
  }

  return 'text-primary-600'
})

function suitClassname(index) {
  let classname = rankClassname.value

  // Ace
  if (props.rank === 1) {
    if (index === 1) {
      return classname + ' size-3vw top-[1.5vw] left-[1vw]'
    }

    return 'hidden'
  }

  // Face cards
  if (props.rank >= 11) {
    /*if (index === 1) {
      return classname + ' size-1.5vw top-0 -left-1vw'
    }

    if (index === 2) {
      return classname + ' size-1.5vw top-[4.5vw] left-[4.5vw]'
    }*/

    return 'hidden'
  }

  if (index > props.rank) {
      return 'hidden'
  }

  if (props.rank === 2) {
      if (index === 1) {
        return classname + ' size-1.5vw top-0 left-[1.75vw]'
      }

      if (index === 2) {
        return classname + ' size-1.5vw top-[4.5vw] left-[1.75vw]'
      }
  }

  if (props.rank === 3) {
      if (index === 1) {
        return classname + ' size-1.5vw top-0 left-[1.75vw]'
      }

      if (index === 2) {
        return classname + ' size-1.5vw top-[2.25vw] left-[1.75vw]'
      }

      if (index === 3) {
        return classname + ' size-1.5vw top-[4.5vw] left-[1.75vw]'
      }
  }

  if (props.rank === 4) {
      if (index === 1) {
        return classname + ' size-1.5vw top-0 left-0'
      }

      if (index === 2) {
        return classname + ' size-1.5vw top-0 left-[3.5vw]'
      }

      if (index === 3) {
        return classname + ' size-1.5vw top-[4.5vw] left-0'
      }

      if (index === 4) {
        return classname + ' size-1.5vw top-[4.5vw] left-[3.5vw]'
      }
  }

  if (props.rank === 5) {
      if (index === 1) {
        return classname + ' size-1.5vw top-0 left-0'
      }

      if (index === 2) {
        return classname + ' size-1.5vw top-0 left-[3.5vw]'
      }

      if (index === 3) {
        return classname + ' size-1.5vw top-[4.5vw] left-0'
      }

      if (index === 4) {
        return classname + ' size-1.5vw top-[4.5vw] left-[3.5vw]'
      }

      if (index === 5) {
        return classname + ' size-1.5vw top-[2.25vw] left-[1.75vw]'
      }
  }

  if (props.rank === 6) {
      if (index === 1) {
        return classname + ' size-1.5vw top-0 left-0'
      }

      if (index === 2) {
        return classname + ' size-1.5vw top-0 left-[3.5vw]'
      }

      if (index === 3) {
        return classname + ' size-1.5vw top-[2.25vw] left-0'
      }

      if (index === 4) {
        return classname + ' size-1.5vw top-[2.25vw] left-[3.5vw]'
      }

      if (index === 5) {
        return classname + ' size-1.5vw top-[4.5vw] left-0'
      }

      if (index === 6) {
        return classname + ' size-1.5vw top-[4.5vw] left-[3.5vw]'
      }
  }

  if (props.rank === 7 || props.rank === 8) {
      if (index === 1) {
        return classname + ' size-1.5vw top-0 left-0'
      }

      if (index === 2) {
        return classname + ' size-1.5vw top-0 left-[3.5vw]'
      }

      if (index === 3) {
        return classname + ' size-1.5vw top-[2.25vw] left-0'
      }

      if (index === 4) {
        return classname + ' size-1.5vw top-[2.25vw] left-[3.5vw]'
      }

      if (index === 5) {
        return classname + ' size-1.5vw top-[4.5vw] left-0'
      }

      if (index === 6) {
        return classname + ' size-1.5vw top-[4.5vw] left-[3.5vw]'
      }

      if (index === 7) {
        return classname + ' size-1.5vw top-[1vw] left-[1.75vw]'
      }

      if (index === 8 && props.rank === 8) {
        return classname + ' size-1.5vw top-[3.5vw] left-[1.75vw]'
      }
  }

  if (props.rank === 9) {
      if (index === 1) {
        return classname + ' size-1.5vw top-0 left-0'
      }

      if (index === 2) {
        return classname + ' size-1.5vw top-0 left-[1.75vw]'
      }

      if (index === 3) {
        return classname + ' size-1.5vw top-0 left-[3.5vw]'
      }

      if (index === 4) {
        return classname + ' size-1.5vw top-[2.25vw] left-0'
      }

      if (index === 5) {
        return classname + ' size-1.5vw top-[2.25vw] left-[1.75vw]'
      }

      if (index === 6) {
        return classname + ' size-1.5vw top-[2.25vw] left-[3.5vw]'
      }

      if (index === 7) {
        return classname + ' size-1.5vw top-[4.5vw] left-0'
      }

      if (index === 8) {
        return classname + ' size-1.5vw top-[4.5vw] left-[1.75vw]'
      }

      if (index === 9) {
        return classname + ' size-1.5vw top-[4.5vw] left-[3.5vw]'
      }
  }

  if (props.rank === 10) {
      if (index === 1) {
        return classname + ' size-1.5vw top-0 left-0'
      }

      if (index === 2) {
        return classname + ' size-1.5vw top-0 left-[3.5vw]'
      }

      if (index === 3) {
        return classname + ' size-1.5vw top-1.5vw left-0'
      }

      if (index === 4) {
        return classname + ' size-1.5vw top-1.5vw left-[3.5vw]'
      }

      if (index === 5) {
        return classname + ' size-1.5vw top-3vw left-0'
      }

      if (index === 6) {
        return classname + ' size-1.5vw top-3vw left-[3.5vw]'
      }

      if (index === 7) {
        return classname + ' size-1.5vw top-[4.5vw] left-0'
      }

      if (index === 8) {
        return classname + ' size-1.5vw top-[4.5vw] left-[3.5vw]'
      }

      if (index === 9) {
        return classname + ' size-1.5vw top-[1vw] left-[1.75vw]'
      }

      if (index === 10) {
        return classname + ' size-1.5vw top-[3.5vw] left-[1.75vw]'
      }
  }

  return 'hidden'
}

const isFace = computed(() => {
  if (props.rank >= 11) {
    return true
  }

  return false
})

const faceSrc = computed(() => {
  if (props.rank === 11) {
    return '/image/jack-' + props.suit + '.avif'
  }

  if (props.rank === 12) {
    return '/image/queen-' + props.suit + '.avif'
  }

  return '/image/king-' + props.suit + '.avif'
})

const visualRank = computed(() => {
  if (props.rank === 1) {
    return 'A'
  }

  if (props.rank === 11) {
    return 'J'
  }

  if (props.rank === 12) {
    return 'Q'
  }

  if (props.rank === 13) {
    return 'K'
  }

  if (props.rank === 14) {
    return 'S'
  }

  return props.rank
})
</script>
