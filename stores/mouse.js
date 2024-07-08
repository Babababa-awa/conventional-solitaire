const offset = 5

export const useMouseStore = defineStore('mouse', () => {
  const x = ref(0)
  const y = ref(0)
  const storeX = ref(null)
  const storeY = ref(null)

  const hasMoved = computed(() => {
    if (storeX.value === null || storeY.value === null) {
      return true
    }

    if (storeX.value < x.value - offset || storeX.value > x.value + offset) {
      return true
    }

    if (storeY.value < y.value - offset || storeY.value > y.value + offset) {
      return true
    }

    return false
  })

  function store() {
    storeX.value = x.value
    storeY.value = y.value
  }

  function reset() {
    storeX.value = null
    storeY.value = null
  }

  return {
    x,
    y,
    store,
    reset,
    hasMoved,
  }
})
