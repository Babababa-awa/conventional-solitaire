export const useDragStore = defineStore('drag', () => {
  const active = ref(false)
  const source = ref(null)
  const type = ref(null)
  const meta = ref(null)
  const target = ref(null)
  const audio = ref(false)

  function startDrag(card, element, dragSource) {
    active.value = true
    source.value = dragSource
    type.value = card.type

    const rect = element.getBoundingClientRect()

    const mouseStore = useMouseStore()

    meta.value = {
      card: card.serialize(),
      offset: {
        x: mouseStore.x - rect.left,
        y: mouseStore.y - rect.top,
      },
    }
  }

  function endDrag(board) {
    active.value = false
    source.value = null
    type.vlaue = null
    meta.value = null
    audio.value = false
  }

  function reset() {
    active.value = false
    source.value = null
    type.vlaue = null
    meta.value = null
    target.value = null
    audio.value = false
  }

  return {
    active,
    source,
    type,
    meta,
    target,
    startDrag,
    endDrag,
    reset,
    audio,
  }
})
