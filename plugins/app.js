export default defineNuxtPlugin(async _nuxtApp => {
  const settingsStore = useSettingsStore()
  const {
    forceOneTurn,
    noBgm,
    noSfx,
  } = storeToRefs(settingsStore)

  forceOneTurn.value = window.localStorage.getItem('jellymode') === '1'
  noBgm.value = window.localStorage.getItem('nobgm') === '1'
  noSfx.value = window.localStorage.getItem('nosfx') === '1'
})
