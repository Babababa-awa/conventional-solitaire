<template>
  <div class="page-credits relative size-full overflow-hidden p-1vw" @click="exitCredits">

    <div class="anime-move absolute top-[35vh] -translate-y-1/2 left-1vw w-8vw">
      <img class="anime-rotate w-8vw"
        :src="imageSrc"
        draggable="false"
      />
    </div>

    <div class="absolute top-0 left-0 right-0">
      <div class="p-1vw bg-black/50 text-secondary-400 rounded-[0.25vw]">
        <h2 class="text-xl">Game Design and Programming</h2>
        <p class="mt-0.5vw text-lg text-primary-600">Babababa</p>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 bg-black/50 text-secondary-400 p-1vw">
      <h2 class="text-lg mb-0.75vw">Audio Assets</h2>

      <div class="flex flex-wrap gap-2vw">
        <div class="flex">
          <div class="size-[4.5vw] mr-0.5vw">
            <img class="size-[4.5vw] object-contain rounded-[0.25vw]" src="/image/luminary-cryhai-mix.avif" draggable="false"/>
          </div>
          <div>
            <h2 class="text-base">Luminary (Cryhai Mix)</h2>
            <p class="text-sm mt-0.25vw text-primary-600">Mix: Cryhai</p>
            <p class="text-sm mt-0.25vw text-primary-600">Original: Jelly Hoshiumi</p>
          </div>
        </div>

        <div class="flex">
          <div>
            <h2 class="text-base">SFX</h2>
            <div class="grid grid-cols-2">
              <p class="text-sm mt-0.25vw text-primary-600 mr-1vw">Jelly Hoshiumi</p>
              <p class="text-sm mt-0.25vw text-primary-600">Kaneko Lumi</p>
              <p class="text-sm mt-0.25vw text-primary-600 mr-1vw">Chisaka Airi</p>
              <p class="text-sm mt-0.25vw text-primary-600">Kaminari Clara</p>
            </div>
          </div>
        </div>

        <div class="flex">
          <div>
            <h2 class="text-base">Credits BGM</h2>
            <p class="text-sm mt-0.25vw text-primary-600">???</p>
          </div>
        </div>

        <div class="flex">
          <div>
            <h2 class="text-base">Additional SFX</h2>
            <p class="text-sm mt-0.25vw text-primary-600">???</p>
          </div>
        </div>
      </div>

      <h2 class="text-lg mt-1.25vw mb-0.75vw">Visual Assets</h2>

      <div class="flex flex-wrap gap-2vw">
        <div class="flex">
          <div class="size-3vw mr-0.5vw">
            <img class="size-3vw object-contain" src="/image/item/real/antennae.avif" draggable="false"/>
          </div>
          <div>
            <h2 class="text-base">Antennae</h2>
            <p class="text-sm mt-0.25vw text-primary-600">???</p>
          </div>
        </div>

        <div class="flex">
          <div class="size-3vw bg-white rounded-[0.25vw] mr-0.5vw">
            <img class="size-3vw object-contain" src="/image/item/real/jelly-doodle2.avif" draggable="false"/>
          </div>
          <div>
            <h2 class="text-base">Doodles</h2>
            <p class="text-sm mt-0.25vw text-primary-600">Jelly Hoshiumi</p>
          </div>
        </div>

        <div class="flex">
          <div class="size-3vw mr-0.5vw">
            <img class="size-3vw object-contain cursor-pointer hover:scale-125 transition" src="/image/item/real/jorb.gif" draggable="false" @click.stop="jorbify"/>
          </div>
          <div>
            <h2 class="text-base">Jorb</h2>
            <p class="text-sm mt-0.25vw text-primary-600">Botch (Guy)</p>
          </div>
        </div>

        <div class="flex">
          <div class="size-3vw mr-0.5vw">
            <img class="size-3vw object-contain" src="/image/item/real/doro2.avif" draggable="false"/>
          </div>
          <div>
            <h2 class="text-base">Jelly Doro</h2>
            <p class="text-sm mt-0.25vw text-primary-600">Eimi Isami</p>
          </div>
        </div>

        <div class="flex">
          <div class="size-3vw mr-0.5vw">
            <img class="size-3vw object-contain" src="/image/item/real/doro1.avif" draggable="false"/>
          </div>
          <div>
            <h2 class="text-base">Jelly Is Doro</h2>
            <p class="text-sm mt-0.25vw text-primary-600">ryoshi</p>
          </div>
        </div>

        <div class="flex">
          <div class="size-3vw mr-0.5vw">
            <img class="size-3vw object-contain" src="/image/jelly-lose.avif" draggable="false"/>
          </div>
          <div>
            <h2 class="text-base">Jelly Fail</h2>
            <p class="text-sm mt-0.25vw text-primary-600">Ashes</p>
          </div>
        </div>

        <div class="flex">
          <div class="size-3vw mr-0.5vw">
            <img class="size-3vw object-contain" src="/image/jelly-win.avif" draggable="false"/>
          </div>
          <div>
            <h2 class="text-base">Jelly Idol</h2>
            <p class="text-sm mt-0.25vw text-primary-600">Ashes</p>
          </div>
        </div>

        <div class="flex">
          <div class="size-3vw mr-0.5vw">
            <img class="size-3vw object-contain" src="/image/item/real/jelly-jar.avif" draggable="false"/>
          </div>
          <div>
            <h2 class="text-base">Jelly Jar</h2>
            <p class="text-sm mt-0.25vw text-primary-600">bunty</p>
          </div>
        </div>

        <div class="flex">
          <div class="size-3vw mr-0.5vw">
            <img class="size-3vw object-contain" src="/image/item/real/jelly-baba.avif" draggable="false"/>
          </div>
          <div>
            <h2 class="text-base">Jelly Is You</h2>
            <p class="text-sm mt-0.25vw text-primary-600">Zepnyss</p>
          </div>
        </div>

        <div class="flex">
          <div class="size-3vw mr-0.5vw">
            <img class="size-3vw object-contain" src="/image/item/real/kettle.avif" draggable="false"/>
          </div>
          <div>
            <h2 class="text-base">Kettle</h2>
            <p class="text-sm mt-0.25vw text-primary-600">Sharkron</p>
          </div>
        </div>

        <div class="flex">
          <div>
            <h2 class="text-base">mini-わくわく Font</h2>
            <p class="text-sm mt-0.25vw text-primary-600">Miniyama</p>
          </div>
        </div>

        <div class="flex">
          <div class="size-3vw bg-white rounded-[0.25vw] mr-0.5vw">
            <img class="size-3vw object-contain" src="/image/item/real/test1-chan.avif" draggable="false"/>
          </div>
          <div>
            <h2 class="text-base">test1-chan</h2>
            <p class="text-sm mt-0.25vw text-primary-600">RVE</p>
          </div>
        </div>

        <div class="flex">
          <div class="size-3vw mr-0.5vw">
            <img class="size-3vw object-contain" src="/image/item/fake/jelle-hoshmi.avif" draggable="false"/>
          </div>
          <div>
            <h2 class="text-base">Jelle Hoshmi</h2>
            <p class="text-sm mt-0.25vw text-primary-600">DALLE (AI)</p>
          </div>
        </div>

        <div class="flex">
          <div>
            <h2 class="text-base">Backgrounds</h2>
            <p class="text-sm mt-0.25vw text-primary-600">DALLE (AI)</p>
          </div>
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
  },
})

const imageSrc = ref('/image/jelly-not-crazy.avif')

const audioStore = useAudioStore()

function jorbify() {
  if (imageSrc.value === '/image/jelly-not-crazy.avif') {
    imageSrc.value = '/image/item/real/jorb.gif'
  } else {
    imageSrc.value = '/image/jelly-not-crazy.avif'
  }
}

function exitCredits() {
  audioStore.stopAudio('credits')
  props.board.state.view = 'start'
}
</script>

<style>
  .page-credits {
    background-image: url('/image/bg-credits.avif');
    background-size: cover;
    background-position: center center;
  }

  .anime-rotate {
    animation: rotate 50s infinite linear;
  }

  .anime-move {
    animation: move 100s infinite linear;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes move {
    0% {
      left: -10vw
    }
    100% {
      left: 110vw
    }
  }
</style>
