<template>
  <audio ref="mainAudio" loop>
    <source src="/audio/luminary-cryhai-mix.flac">
  </audio>

  <audio ref="lairAudio" loop>
    <source src="/audio/lair.flac">
  </audio>

  <audio ref="creditsAudio" loop>
    <source src="/audio/credits.flac">
  </audio>

  <audio ref="jellyCryAudio" @ended="trackEnded('jelly-cry')">
    <source src="/audio/jelly-cry.flac">
  </audio>

  <audio ref="deny1Audio" @ended="trackEnded('deny')">
    <source src="/audio/deny1.flac">
  </audio>
  <audio ref="deny2Audio" @ended="trackEnded('deny')">
    <source src="/audio/deny2.flac">
  </audio>
  <audio ref="deny3Audio" @ended="trackEnded('deny')">
    <source src="/audio/deny3.flac">
  </audio>

  <audio ref="lemonAudio" @ended="trackEnded('lemon')">
    <source src="/audio/lemon.flac">
  </audio>

  <audio ref="kaChing1Audio" @ended="trackEnded('ka-ching')">
    <source src="/audio/ka-ching1.flac">
  </audio>
  <audio ref="kaChing2Audio" @ended="trackEnded('ka-ching')">
    <source src="/audio/ka-ching2.flac">
  </audio>
  <audio ref="kaChing3Audio" @ended="trackEnded('ka-ching')">
    <source src="/audio/ka-ching3.flac">
  </audio>
  <audio ref="kaChing4Audio" @ended="trackEnded('ka-ching')">
    <source src="/audio/ka-ching4.flac">
  </audio>

  <audio ref="automationAudio" @ended="trackEnded('automation')">
    <source src="/audio/automation.flac">
  </audio>

  <audio ref="awawawaAudio" @ended="trackEnded('awawawa')">
    <source src="/audio/awawawa.flac">
  </audio>

  <audio ref="beepAudio" @ended="trackEnded('beep')">
    <source src="/audio/beep.flac">
  </audio>

  <audio ref="dizzyAudio" @ended="trackEnded('dizzy')">
    <source src="/audio/dizzy-ferral.flac">
  </audio>

  <audio ref="arf1Audio" @ended="trackEnded('arf')">
    <source src="/audio/arf1.flac">
  </audio>
  <audio ref="arf2Audio" @ended="trackEnded('arf')">
    <source src="/audio/arf2.flac">
  </audio>
  <audio ref="arf3Audio" @ended="trackEnded('arf')">
    <source src="/audio/arf3.flac">
  </audio>
  <audio ref="arf4Audio" @ended="trackEnded('arf')">
    <source src="/audio/arf4.flac">
  </audio>
  <audio ref="arf5Audio" @ended="trackEnded('arf')">
    <source src="/audio/arf5.flac">
  </audio>
  <audio ref="arf6Audio" @ended="trackEnded('arf')">
    <source src="/audio/arf6.flac">
  </audio>

  <audio ref="burnAudio" @ended="trackEnded('burn')">
    <source src="/audio/burn.flac">
  </audio>

  <audio ref="punishment1Audio" @ended="trackEnded('punishment')">
    <source src="/audio/punishment1.flac">
  </audio>
  <audio ref="punishment2Audio" @ended="trackEnded('punishment')">
    <source src="/audio/punishment2.flac">
  </audio>
  <audio ref="punishment3Audio" @ended="trackEnded('punishment')">
    <source src="/audio/punishment3.flac">
  </audio>

  <audio ref="cheerAudio" @ended="trackEnded('cheer')">
    <source src="/audio/cheer.flac">
  </audio>

  <audio ref="jellyHateAudio" @ended="trackEnded('jelly-hate')">
    <source src="/audio/jelly-hate.flac">
  </audio>

  <audio ref="grr1Audio" @ended="trackEnded('grr')">
    <source src="/audio/grr1.flac">
  </audio>
  <audio ref="grr2Audio" @ended="trackEnded('grr')">
    <source src="/audio/grr2.flac">
  </audio>

  <audio ref="roof1Audio" @ended="trackEnded('roof')">
    <source src="/audio/roof1.flac">
  </audio>
  <audio ref="roof2Audio" @ended="trackEnded('roof')">
    <source src="/audio/roof2.flac">
  </audio>
</template>

<script setup>
// This is some yandere dev level code right here

const active = ref([])

const mainAudio = ref(null)
const lairAudio = ref(null)
const creditsAudio = ref(null)
const jellyCryAudio = ref(null)
const deny1Audio = ref(null)
const deny2Audio = ref(null)
const deny3Audio = ref(null)
const lemonAudio = ref(null)
const kaChing1Audio = ref(null)
const kaChing2Audio = ref(null)
const kaChing3Audio = ref(null)
const kaChing4Audio = ref(null)
const automationAudio = ref(null)
const awawawaAudio = ref(null)
const beepAudio = ref(null)
const dizzyAudio = ref(null)
const arf1Audio = ref(null)
const arf2Audio = ref(null)
const arf3Audio = ref(null)
const arf4Audio = ref(null)
const arf5Audio = ref(null)
const arf6Audio = ref(null)
const burnAudio = ref(null)
const punishment1Audio = ref(null)
const punishment2Audio = ref(null)
const punishment3Audio = ref(null)
const cheerAudio = ref(null)
const jellyHateAudio = ref(null)
const grr1Audio = ref(null)
const grr2Audio = ref(null)
const roof1Audio = ref(null)
const roof2Audio = ref(null)

const audioStore = useAudioStore()

const {
  audioTracks
} = storeToRefs(audioStore)

const settingsStore = useSettingsStore()
const {
  noBgm,
  noSfx,
} = storeToRefs(settingsStore)

watch(audioTracks, (value) => {
  for (const track of active.value) {
    if (value.includes(track)) {
      continue
    }

    stopTrack(track)
  }

  for (const track of value) {
    if (active.value.includes(track)) {
      continue
    }

    active.value.push(track)
    playTrack(track)
  }
})

function stopTrack(name) {
  switch (name) {
    case 'main':
      mainAudio.value.pause()
      mainAudio.value.currentTime = 0
      break
    case 'lair':
      lairAudio.value.pause()
      lairAudio.value.currentTime = 0
      break
    case 'credits':
      creditsAudio.value.pause()
      creditsAudio.value.currentTime = 0
      break
    case 'jelly-cry':
      jellyCryAudio.value.pause()
      jellyCryAudio.value.currentTime = 0
      break
    case 'deny':
      deny1Audio.value.pause()
      deny1Audio.value.currentTime = 0

      deny2Audio.value.pause()
      deny2Audio.value.currentTime = 0

      deny3Audio.value.pause()
      deny3Audio.value.currentTime = 0
      break
    case 'lemon':
      lemonAudio.value.pause()
      lemonAudio.value.currentTime = 0
      break
    case 'ka-ching':
      kaChing1Audio.value.pause()
      kaChing1Audio.value.currentTime = 0

      kaChing2Audio.value.pause()
      kaChing2Audio.value.currentTime = 0

      kaChing3Audio.value.pause()
      kaChing3Audio.value.currentTime = 0

      kaChing4Audio.value.pause()
      kaChing4Audio.value.currentTime = 0
      break
    case 'automation':
      automationAudio.value.pause()
      automationAudio.value.currentTime = 0
      break
    case 'awawawa':
      awawawaAudio.value.pause()
      awawawaAudio.value.currentTime = 0
      break
    case 'beep':
      beepAudio.value.pause()
      beepAudio.value.currentTime = 0
      break
    case 'dizzy':
      dizzyAudio.value.pause()
      dizzyAudio.value.currentTime = 0
      break
    case 'arf':
      arf1Audio.value.pause()
      arf1Audio.value.currentTime = 0

      arf2Audio.value.pause()
      arf2Audio.value.currentTime = 0

      arf3Audio.value.pause()
      arf3Audio.value.currentTime = 0

      arf4Audio.value.pause()
      arf4Audio.value.currentTime = 0

      arf5Audio.value.pause()
      arf5Audio.value.currentTime = 0

      arf6Audio.value.pause()
      arf6Audio.value.currentTime = 0
      break
    case 'burn':
      burnAudio.value.pause()
      burnAudio.value.currentTime = 0
      break
    case 'punishment':
      punishment1Audio.value.pause()
      punishment1Audio.value.currentTime = 0

      punishment2Audio.value.pause()
      punishment2Audio.value.currentTime = 0

      punishment3Audio.value.pause()
      punishment3Audio.value.currentTime = 0
      break
    case 'cheer':
      cheerAudio.value.pause()
      cheerAudio.value.currentTime = 0
      break
    case 'jelly-hate':
      jellyHateAudio.value.pause()
      jellyHateAudio.value.currentTime = 0
      break
    case 'grr':
      grr1Audio.value.pause()
      grr1Audio.value.currentTime = 0

      grr2Audio.value.pause()
      grr2Audio.value.currentTime = 0
      break
    case 'roof':
      roof1Audio.value.pause()
      roof1Audio.value.currentTime = 0

      roof2Audio.value.pause()
      roof2Audio.value.currentTime = 0
      break
  }

  const index = active.value.indexOf(name)

  if (index >= 0) {
    active.value = active.value.slice(0, index)
  }
}

function playTrack(name) {
  if (noSounds(name)) {
    return
  }

  let rng

  switch (name) {
    case 'main':
      mainAudio.value.volume = 0.15
      mainAudio.value.play()
      break
    case 'lair':
      lairAudio.value.volume = 0.35
      lairAudio.value.play()
      break
    case 'credits':
      creditsAudio.value.play()
      break
    case 'jelly-cry':
      jellyCryAudio.value.play()
      break
    case 'deny':
      rng = Math.floor(Math.random() * 3)

      if (rng === 0) {
        deny1Audio.value.play()
      } else if (rng === 1) {
        deny2Audio.value.play()
      } else {
        deny3Audio.value.play()
      }
      break
    case 'lemon':
      lemonAudio.value.play()
      break
    case 'ka-ching':
      rng = Math.floor(Math.random() * 4)

      if (rng === 0) {
        kaChing1Audio.value.play()
      } else if (rng === 1) {
        kaChing2Audio.value.play()
      } else if (rng === 2) {
        kaChing3Audio.value.play()
      } else {
        kaChing4Audio.value.play()
      }
      break
    case 'automation':
      automationAudio.value.play()
      break
    case 'awawawa':
      awawawaAudio.value.play()
      break
    case 'beep':
      beepAudio.value.play()
      break
    case 'dizzy':
      dizzyAudio.value.play()
      break
    case 'arf':
      rng = Math.floor(Math.random() * 6)

      if (rng === 0) {
        arf1Audio.value.volume = 0.35
        arf1Audio.value.play()
      } else if (rng === 1) {
        arf2Audio.value.volume = 0.35
        arf2Audio.value.play()
      } else if (rng === 2) {
        arf3Audio.value.volume = 0.35
        arf3Audio.value.play()
      } else if (rng === 4) {
        arf4Audio.value.volume = 0.35
        arf4Audio.value.play()
      } else if (rng === 5) {
        arf5Audio.value.volume = 0.35
        arf5Audio.value.play()
      } else {
        arf6Audio.value.volume = 0.35
        arf6Audio.value.play()
      }
      break
    case 'burn':
      burnAudio.value.play()
      break
    case 'punishment':
      rng = Math.floor(Math.random() * 3)

      if (rng === 0) {
        punishment1Audio.value.play()
      } else if (rng === 1) {
        punishment2Audio.value.play()
      } else {
        punishment3Audio.value.play()
      }
      break
    case 'cheer':
      cheerAudio.value.play()
      break
    case 'jelly-hate':
      jellyHateAudio.value.play()
      break
    case 'grr':
      rng = Math.floor(Math.random() * 2)

      if (rng === 0) {
        grr1Audio.value.volume = 0.35
        grr1Audio.value.play()
      } else {
        grr2Audio.value.volume = 0.35
        grr2Audio.value.play()
      }
      break
    case 'roof':
      rng = Math.floor(Math.random() * 2)

      if (rng === 0) {
        roof1Audio.value.volume = 0.35
        roof1Audio.value.play()
      } else {
        roof2Audio.value.volume = 0.35
        roof2Audio.value.play()
      }
      break
  }
}

function noSounds(name) {
  switch (name) {
    case 'main':
    case 'lair':
    case 'credits':
      if (noBgm.value) {
        return true
      }

      return false
  }

  return noSfx.value
}

function trackEnded(name) {
   audioStore.stopAudio(name)
}
</script>
