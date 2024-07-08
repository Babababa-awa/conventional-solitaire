<template>
  <div class="overflow-hidden z-20">
    <div class="absolute top-0 left-0.5vw right-0.5vw h-0.5vw bg-black/70"></div>
    <div class="absolute top-0 left-0 w-0.5vw h-full bg-black/70"></div>
    <div class="absolute top-0 right-0 w-0.5vw h-full bg-black/70"></div>
    <div class="absolute bottom-0 left-0.5vw right-0.5vw h-0.5vw bg-black/70"></div>

    <div class="absolute top-[36.5vw] left-0.5vw bottom-0.5vw right-[9.5vw] bg-black/70"></div>
    <div class="absolute top-[27.5vw] left-0.5vw w-70vw h-9vw bg-black/70"></div>
    <div class="absolute bottom-0.5vw right-0.5vw h-[3.5vw] w-9vw bg-black/70"></div>

    <div class="absolute top-0.5vw left-0.5vw w-[50vw] h-12vw bg-black/70" v-if="view !== 'stacks'"></div>
    <div class="absolute top-[12.5vw] left-0.5vw w-[70vw] h-15vw bg-black/70" v-if="view !== 'piles'"></div>
    <div class="absolute top-0.5vw left-[50.5vw] w-[30vw] h-12vw bg-black/70" v-if="view !== 'stock'"></div>
    <div class="absolute top-[12.5vw] left-[70.5vw] w-[20vw] h-[24vw] bg-black/70" v-if="view !== 'backpack'"></div>

    <div class="absolute top-[0.5vw] left-[80.5vw] w-[10vw] h-[12vw] bg-black/70" v-if="view !== 'score'"></div>
    <div class="absolute top-[0.5vw] right-[0.5vw] bottom-[4vw] w-[9vw] bg-black/70" v-if="view !== 'happiness'"></div>

    <img class="absolute bottom-0 -left-2.5vw w-15vw -mb-5vw"
      :class="starknight157Classname"
      src="/image/starknight-157.avif"
      alt="Starknight 157"
      draggable="false"
    />

    <img class="absolute bottom-0 left-1/2 -translate-x-1/2 w-40vw -mb-5vw transition duration-300 ease-in-out"
      :class="dizzyClassname"
      src="/image/dizzy.avif"
      alt="Dizzy"
      draggable="false"
    />

    <DialogueBox :name="name" @next="next" :lines="3">
      {{ text }}
    </DialogueBox>

    <ActionButton
      v-if="view !== 'happiness'"
      class="absolute top-1vw right-1vw"
      icon="play"
      @click="skip"
      sounds
    >
      Skip
    </ActionButton>
  </div>
</template>

<script setup>
const emit = defineEmits([
  'complete',
])

const audioStore = useAudioStore()

const starknight157Classname = computed(() => {
  if (lines[line.value].name === 'Starknight 157') {
    return 'anime-talk'
  }

  return ''
})

const showDizzy = ref(false)
const dizzyClassname = computed(() => {
  if (showDizzy.value) {
      return 'opacity-30'
  }

  return 'opacity-0'
})

const lines = [
  {
    name: 'Starknight 157',
    text: 'I\'ve arrived, I better contact Phase Command.',
    view: null,
  },
  {
    name: 'Starknight 157',
    text: 'Phase Command, I\'ve arrived at the convention and am awaiting orders.',
    view: null,
  },
  {
    name: 'Phase Command',
    text: 'Punctual as always, we will begin breifing you on the mission.',
    view: null,
  },
  {
    name: 'Phase Command',
    text: 'Your primary objective is to purchase as much Jelly Hoshiumi merch as you can in order to increase the princess\' happiness before her performance. You know how she can get.',
    view: null,
  },
  {
    name: 'Phase Command',
    text: 'Your watch is equipped with a happiness monitor to measure your progress. She currently sits at 50%.',
    view: 'happiness',
  },
  {
    name: 'Phase Command',
    text: 'Merch can be found at various vendor stalls throughout the merchant hall.',
    view: 'piles',
  },
  {
    name: 'Phase Command',
    text: 'If something is out of stock, you can always ask the vendor if they have more in the back.',
    view: 'stock',
  },
  {
    name: 'Phase Command',
    text: 'Be careful though, there are a lot of seedy individuals, scammers, and degenerates willing to take you for a ride. It\'s up to you to decide if you want to browse a stall.',
    view: null,
  },
  {
    name: 'Phase Command',
    text: 'For optimal results we advise you to visit the vendor stalls in sequence, you can keep track of the stalls you visited on your watch.',
    view: 'stacks',
  },
  {
    name: 'Phase Command',
    text: 'Items you have purchased can be placed in your backpack. You can also place the business cards of vendors you wish to revisit later.',
    view: 'backpack',
  },
  /*{
    name: 'Phase Command',
    text: 'You may also decide to purchase a larger one to carry more items.',
    view: 'backpack',
  },*/
  {
    name: 'Phase Command',
    text: 'Once a sequence of vendor stalls has been completed, you can return to your hotel to drop of your items, and then head back to the merchant hall.',
    view: null,
  },
  {
    name: 'Phase Command',
    text: 'Every time you return to the hotel, we will provide you with additonal lemon coins based on your performance.',
    view: null,
  },
  {
    name: 'Phase Command',
    text: 'You can see your current balance on your watch, as well as how many trips you have taken and the current optimal route.',
    view: 'score',
  },
  {
    name: 'Phase Command',
    text: 'Good luck Starknight, you were born for this!',
    view: null,
  },
  {
    name: 'Starknight 157',
    text: 'Awawawa!',
    view: null,
  },
]

const line = ref(0)

function skip() {
  audioStore.stopAudio('beep')
  audioStore.stopAudio('dizzy')
  emit('complete')
}

function next() {
  if (line.value + 1 === lines.length) {
    emit('complete')
  } else {
    ++line.value

    if (line.value === 7) {
      audioStore.playAudio('dizzy')
      showDizzy.value = true
    } else {
      showDizzy.value = false
    }

    if (line.value === lines.length - 1) {
      audioStore.playAudio('awawawa')
    }
  }
}

const name = computed(() => {
  return lines[line.value].name
})
const text = computed(() => {
  return lines[line.value].text
})
const view = computed(() => {
  return lines[line.value].view || null
})

</script>

<style>
  .anime-talk {
    animation: talk 1s infinite;
  }

  @keyframes talk {
    0%, 100% {
      bottom: 0;
    }
    50% {
      bottom: -2vw;
    }
  }
</style>
