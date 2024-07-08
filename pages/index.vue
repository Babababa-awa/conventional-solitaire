<template>
  <PagesStart v-show="board.state.view === 'start'" :board="board"/>
  <PagesCutscene v-show="board.state.view === 'cutscene'" :board="board"/>
  <PagesPlay v-show="board.state.view === 'play'" :board="board"/>
  <PagesCredits v-show="board.state.view === 'credits'" :board="board"/>
  <PagesSettings v-show="board.state.settings" :board="board"/>

  <PagesWin v-show="board.state.view === 'win'" :board="board"/>
  <PagesLose v-show="board.state.view === 'lose'" :board="board"/>

  <PagesMenu v-show="board.state.menu" :board="board"/>

  <AudioBank/>
</template>

<script setup>
import Board from '@/reactives/Board'

const board = reactive(new Board)

useEventListener(window, 'keydown', event => {
  if (event.keyCode === 27) { // escape
    if (board.state.view === 'play') {
      if (!board.state.skip && board.state.tutorial) {
        board.state.tutorial = false
      } else {
        board.state.menu = !board.state.menu
      }
    }

    if (board.state.view === 'credits') {
      board.state.view = 'start'
    }

    if (board.state.view === 'start' && board.state.settings) {
      board.state.settings = false
    }

    if (board.state.view === 'cutscene') {
      board.state.view = 'play'
    }
  }
})
</script>
