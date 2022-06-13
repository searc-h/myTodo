<template>
  <Main></Main>
</template>

<script>
import Main from './views/Main'
import { useStore } from "vuex";
export default {
  name: 'App',
  components: {
    Main
  },
  setup(){
    const store = useStore()

    console.log(store.state.allopen.name)
  }
}
</script>

<style>
</style>
