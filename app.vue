<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: 'Conventional Solitaire',
  bodyAttrs: {
    class: 'bg-secondary-800 text-base font-sans text-white select-none'
  }
})

const mouseStore = useMouseStore()
const {
  x,
  y,
  hasMoved,
} = storeToRefs(mouseStore)

const dragStore = useDragStore()
const {
  active,
  audio,
} = storeToRefs(dragStore)

const audioStore = useAudioStore()

if (process.client) {
  useEventListener(document, 'mousemove', event => {
    x.value = event.clientX
    y.value = event.clientY

    if (active.value &&
      audio.value === false &&
      hasMoved.value
    ) {
      audio.value = true
      audioStore.playAudio('grr')
    }
  })
}
</script>
