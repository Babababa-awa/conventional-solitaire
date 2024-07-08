<template>
  <div class="absolute inset-0 bg-black/70 z-20" v-if="item">
    <div class="
        absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-50vw border-[0.25vw] rounded-[1vw]
        text-secondary-800
        text-sm
        bg-secondary-200
        p-1vw
        flex items-stretch
      "
      :class="classname"
    >
      <Icon class="absolute top-1vw right-1vw size-2vw cursor-pointer hover:scale-150" name="no" @click="closeItem"/>

      <div class="flex items-center w-12vw shrink-0 bg-white p-0.5vw rounded-[0.25vw]">
        <img class="size-full max-h-[25vw] rounded-[0.25vw]"
          :class="item.imageCover ? 'object-cover' : 'object-contain'"
          :src="item.image"
        />
      </div>
      <div class="flex flex-col space-y-1vw w-full ml-1vw">
        <div class="grow">
          <h2 class="text-lg">{{ item.title }}</h2>
          <p class="mt-0.75vw leading-snug">{{ item.description }}</p>

          <div class="mt-1vw">
            <BoardItemDescription class="mb-0.5vw" v-if="item.actionDescription">
              {{ item.actionDescription }}
            </BoardItemDescription>

            <div class="flex space-x-0.5vw text-base">
              <template v-if="item.type === 'fake'">
                <BoardItemStat v-if="item.happiness" negative
                  :positive="item.stock < 0"
                  :negative="item.stock > 0"
                >
                  <span>Happiness: {{ signed(item.happiness * -1) }}</span>
                  <img class="size-1.5vw ml-0.25vw" src="/image/happiness.svg" alt="Happiness"/>
                </BoardItemStat>
              </template>
              <template v-else>
                <BoardItemStat v-if="item.happiness"
                  :positive="item.stock > 0"
                  :negative="item.stock < 0"
                >
                  <span>Happiness: {{ signed(item.happiness) }}</span>
                  <img class="size-1.5vw ml-0.25vw" src="/image/happiness.svg" alt="Happiness"/>
                </BoardItemStat>
              </template>

              <BoardItemStat v-if="item.stock && !forceOneTurn"
                :positive="item.stock < 0"
                :negative="item.stock > 0"
              >
                  Stock Turn: {{ signed(item.stock) }}
              </BoardItemStat>

              <BoardItemStat v-if="item.slot"
                :positive="item.slot < 0"
                :negative="item.slot > 0"
              >
                  Backpack Slot: {{ signed(item.slot) }}
              </BoardItemStat>

              <BoardItemStat v-if="item.sort">
                  Pile Sort: {{ item.sort }}
              </BoardItemStat>

              <template v-if="showPrice">
                <BoardItemStat :positive="itemPricePositive" :negative="!itemPricePositive">
                  <span>{{ itemPrice }}</span>
                  <img class="size-1.5vw ml-0.25vw" src="/image/lemon.svg" alt="Lemons"/>
                </BoardItemStat>
              </template>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-1vw">
          <template v-for="button in noButtons">
            <CancelButton
              class="w-full"
              sounds
              thin
              @click="doAction(button.action)"
            >
              {{ button.title }}
            </CancelButton>
          </template>

          <template v-for="button in yesButtons">
            <ActionButton
              class="w-full"
              sounds
              thin
              @click="doAction(button.action)"
            >
              {{ button.title }}
            </ActionButton>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  board: {
    type: Object,
    required: true,
  }
})

const itemStore = useItemStore()
const {
  item,
  source,
} = storeToRefs(itemStore)

const settingsStore = useSettingsStore()
const {
  forceOneTurn,
} = storeToRefs(settingsStore)

const audioStore = useAudioStore()

const classname = computed(() => {
  if (item.value.type === 'trap') {
    return 'border-red bg-white shadow-inner-sm shadow-red'
  }

  return 'border-secondary-800'
})

const showPrice = computed(() => {
  if (item.value.price === 0) {
    return false
  }

  if (source.value.key === 'backpack' && item.value.price === 1) {
    return false
  }

  return true
})

const itemPrice = computed(() => {
  if (item.value.price === 0) {
    return null
  }

  if (item.value.priceMultiplyer) {
    if (source.value.key === 'backpack') {
      return null
    }

    if (item.value.price < 1) {
      return 'Cost: ' + Math.round(item.value.price * 100) + '%'
    }

    return 'Gain: ' + Math.round(item.value.price * 100) + '%'
  }

  if (item.value.type === 'real' || item.value.type === 'fake') {
    if (source.value.key === 'backpack') {
      if (item.value.price > 0) {
        return 'Sell: ' + Math.floor(item.value.price / 2)
      }

      return null
    }
  }

  if (item.value.price > 0) {
    return 'Cost: ' + item.value.price
  }

  return 'Gain: ' + item.value.price * -1
})

const itemPricePositive = computed(() => {
  if (item.value.priceMultiplyer) {
    return item.value.price >= 1
  }

  return item.value.price <= 0
})

const hasYesAcceptAction = computed(() => {
  if (item.value.action) {
    return true
  }

  if (item.value.happiness !== 0) {
    return true
  }

  if (item.value.stock !== 0) {
    return true
  }

  if (item.value.price !== 0 &&
    props.board.state.score.lemons + item.value.price > 0
  ) {
    return true
  }

  return false
})

const yesButtons = computed(() => {
  let buttons = []

  if (item.value.type === 'trap') {
    for (const clear of item.value.clear) {
      if (props.board.backpack.containsItem(clear)) {
        let title

        if ('yes-' + clear in item.value) {
          title = item.value['yes-' + clear]
        } else if ('yes' in item.value) {
          title = item.value['yes']
        } else {
          title = 'Dispose Of This'
        }

        buttons.push({
          title: title,
          action: {action: 'dispose', with: clear},
        })
      }
    }

  } else if (item.value.type === 'real' || item.value.type === 'fake') {
    if (source.value.key === 'backpack' && item.value.price > 1) {
      buttons.push({
        title: 'I Want To Sell This',
        action: 'sell',
      })
    } else if (source.value.key !== 'backpack' &&
      !props.board.backpack.isFull &&
      props.board.state.score.lemons - item.value.price >= 0
    ) {
      buttons.push({
        title: 'I Want To Purchase This',
        action: 'buy',
      })
    }
  } else if (item.value.type === 'consume') {
    if (source.value.key !== 'backpack' && !props.board.backpack.isFull) {
      buttons.push({
        title: 'Store In Backpack',
        action: 'backpack',
      })
    }

    if (item.value.price < 0) {
      buttons.push({
        title: 'Add To Wallet',
        action: 'wallet',
      })
    } else if (hasYesAcceptAction.value) {
      if ('yes' in item.value) {
        buttons.push({
          title: item.value.yes,
          action: 'accept',
        })
      } else {
        buttons.push({
          title: 'Accept The Benefits',
          action: 'accept',
        })
      }
    }
  }

  return buttons
})

const hasNoAcceptAction = computed(() => {
  if (item.value.action) {
    return true
  }

  if (item.value.happiness !== 0) {
      return true
  }

  if (item.value.stock !== 0) {
    return true
  }

  if (item.value.price !== 0) {
    if (props.board.state.score.lemons - item.value.price >= 0 ||
      item.value.priceZero
    ) {
      return true
    }
  }

  return false
})

const noButtons = computed(() => {
  let buttons = []

  if (item.value.type === 'trap') {
    if (hasNoAcceptAction.value) {
      if ('no' in item.value) {
        buttons.push({
          title: item.value.no,
          action: 'accept',
        })
      } else {
        buttons.push({
          title: 'Accept The Consequences',
          action: 'accept',
        })
      }
    }
  } else if (item.value.type === 'real' || item.value.type === 'fake') {
    if (source.value.key === 'backpack') {
      buttons.push({
        title: 'I\'ll Give This Away',
        action: 'dispose',
      })
    } else {
      buttons.push({
        title: 'I\'ll Let Someone Else Buy This',
        action: 'dispose',
      })
    }
  } else if (item.value.type === 'consume') {
    if (item.value.price >= 0) {
      buttons.push({
        title: 'Throw It In The Trash',
        action: 'dispose',
      })
    } else if (item.value.price < -1) {
      buttons.push({
        title: 'I\'ll Let Someone Else Pick These Up',
        action: 'dispose',
      })
    } else {
      buttons.push({
        title: 'I\'ll Let Someone Else Pick This Up',
        action: 'dispose',
      })
    }
  }

  return buttons
})

function doAction(action) {
  useItemAction(props.board, action)
}

function closeItem() {
  source.value = null
  item.value = null
}
</script>
