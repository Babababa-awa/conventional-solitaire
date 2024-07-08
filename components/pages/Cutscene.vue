<template>
  <div class="page-cutscene relative size-full overflow-hidden">
    <img class="absolute bottom-0 -left-4vw w-40vw -mb-5vw"
      :class="aliceClassname"
      src="/image/alice.avif"
      alt="Alice"
      draggable="false"
    />

    <img v-show="sakanaImage === 'front'"
      class="absolute bottom-0 right-4vw w-20vw"
      :class="sakanaClassname"
      src="/image/sakana-front.avif"
      alt="Sakana"
      draggable="false"
    />

    <div class="absolute bottom-0 right-4vw w-20vw" :class="sakanaClassname">
      <img v-show="sakanaImage !== 'front'"
        class="absolute bottom-0 left-0 w-full"
        src="/image/sakana.avif"
        alt="Sakana"
        draggable="false"
      />

      <img
        v-if="line === 2"
        class="anime-tear absolute bottom-[28vw] right-[5.5vw] w-2vw"
        src="/image/tear.avif"
        alt="Sweet Sakana Tears"
      />

      <Icon
        v-if="line === 2"
        class="anime-blink absolute bottom-[32vw] -right-3vw size-8vw text-secondary-400"
        name="down-left-arrow"
      />
    </div>

    <DialogueBox :name="name" @next="next">
      {{ text }}
    </DialogueBox>

    <ActionButton class="absolute top-1vw right-1vw" icon="play" @click="skip" sounds>
      Skip
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

const audioStore = useAudioStore()

const lines = [
  {
    name: 'Sakana',
    text: 'Hey man, is Jelly ready to deploy to the upcoming convention? We need her in pristine condition!',
  },
  {
    name: 'Alice',
    text: 'I\'ve upped her dosage by 37%. She should be able to keep it together for at least five days.',
  },
  {
    name: 'Sakana',
    text: 'Excellent! I don\'t want a repeat of last time. My fins can\'t take another Tenma level breakdown.',
  },
  {
    name: 'Sakana',
    text: 'I\'ll send one of her Starknights to buy up her merch. We want her to feel sufficiently loved before her performance.',
  },
  {
    name: 'Sakana',
    text: 'She has the voice of an angel so long as she\'s not crying.',
  },
  {
    name: 'Alice',
    text: 'Might I suggest Starknight 157. Their engagement numbers have surpassed optimal. They have been very believable.',
  },
  {
    name: 'Sakana',
    text: 'Sure man.',
    view: 'front',
  },
]
const line = ref(0)

function skip() {
  line.value = 0
  audioStore.stopAudio('lair')
  audioStore.playAudio('main')
  audioStore.playAudio('beep')
  props.board.state.view = 'play'
}

function next() {
  if (line.value + 1 === lines.length) {
    line.value = 0
    audioStore.stopAudio('lair')
    audioStore.playAudio('main')
    audioStore.playAudio('beep')
    props.board.state.view = 'play'
  } else {
    ++line.value
  }
}

const aliceClassname = computed(() => {
  if (lines[line.value].name === 'Alice') {
    return 'anime-talk'
  }

  return ''
})

const sakanaClassname = computed(() => {
  if (lines[line.value].name === 'Sakana') {
    return 'anime-talk'
  }

  return ''
})

const sakanaImage = computed(() => {
  if (lines[line.value].name === 'Sakana') {
    return lines[line.value].view || 'default'
  }

  return 'default'
})

const name = computed(() => {
  return lines[line.value].name
})
const text = computed(() => {
  return lines[line.value].text
})
</script>

<style>
  .page-cutscene {
    background-image: url('/image/bg-coffee-lair.avif');
    background-size: cover;
    background-position: center center;
  }

  .anime-talk {
    animation: talk 1s infinite;
  }

  .anime-blink {
    animation: blink 1s infinite;
  }

  .anime-tear {
    animation: tear 1s infinite;
  }

  @keyframes talk {
    0%, 100% {
      bottom: 0;
    }
    50% {
      bottom: -2vw;
    }
  }

  @keyframes blink {
    0%, 100% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
  }

  @keyframes tear {
    0% {
      opacity: 1;
      bottom: 28vw;
    }
    100% {
      opacity: 0;
      bottom: 26vw;
    }
  }
</style>
