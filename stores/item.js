export const useItemStore = defineStore('item', () => {
  const item = ref(null)
  const source = ref(null)

  function reset() {
    item.value = null
    source.value = null
  }

  return {
    item,
    source,
    reset,
  }
})
