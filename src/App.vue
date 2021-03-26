<template>
  <div id="app">
    <div>
      <SVSelect v-model="selected" :items="items" multiple search  style="min-width: 560px"/>
    </div>
  </div>
</template>

<script>
import SVSelect from "@/SVSelect";
export default {
  name: 'App',
  components: {
    SVSelect
  },
  data() {
    return {
      selected: [],
      config: {
        showCounter: false
      },
      items: [
        {id: 'russian', text: 'Русский'},
        {id: 'english', text: 'Английский'},
        {id: 'chinese', text: 'Китайский'},
        {id: 'spanish', text: 'Испанский'},
        {id: 'fweffew', text: 'Русefwefский'},
        {id: 'engwefweflish', text: 'Англиwefewfйский'},
        {id: 'chiweyhtynese', text: 'Китаwefwefйский'},
        {id: 'spaythbvnish', text: 'Испtyhанский'},
        {id: 'russluiian', text: 'Руuilсский'},
        {id: 'engpolish', text: 'Англиretйский'},
        {id: 'chinsdcese', text: 'Китаhrtйский'},
        {id: 'spanawqish', text: 'Испаvbnнский'}
      ]
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
