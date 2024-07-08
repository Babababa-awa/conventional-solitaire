export const useSettingsStore = defineStore('settings', () => {
  const forceOneTurn = ref(false)
  const noBgm = ref(false)
  const noSfx = ref(false)

  return {
    forceOneTurn,
    noBgm,
    noSfx,
  }
})
