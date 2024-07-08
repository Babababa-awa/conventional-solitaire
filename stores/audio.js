export const useAudioStore = defineStore('audio', () => {
  const audioTracks = ref([])

  function playAudio(name) {
    if (!audioTracks.value.includes(name)) {
      audioTracks.value = [...audioTracks.value, name]
    }
  }

  function stopAudio(name) {
    const index = audioTracks.value.indexOf(name)

    if (index >= 0) {
      audioTracks.value = audioTracks.value.slice(0, index)
    }
  }

  function isAudioPlaying(name) {
    audioTracks.value.includes(name)
  }

  return {
    audioTracks,
    playAudio,
    stopAudio,
    isAudioPlaying,
  }
})
