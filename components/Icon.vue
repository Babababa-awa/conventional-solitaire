<template>
  <span class="flex justify-center" v-html="icon" aria-hidden="true" />
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  }
})

const icon = ref('')

const iconName = computed(() => {
  return props.name
})

watch (iconName, (_value) => {
  refresh()
})

async function refresh() {
  try {
    const iconsImport = import.meta.glob('assets/icons/**/**.svg', {
      as: 'raw',
      eager: false,
    })

    let rawIcon = await iconsImport[`/assets/icons/${iconName.value}.svg`]()

    rawIcon = rawIcon.replace('<svg ', '<svg class="block w-auto h-full fill-current" ')

    icon.value = rawIcon
  } catch {
    console.error(
      `[nuxt-icons] Icon '${iconName.value}' doesn't exist in 'assets/icons'`
    )
  }
}

refresh()
</script>
