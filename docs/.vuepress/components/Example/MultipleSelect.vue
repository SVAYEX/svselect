<template>
  <div>
    <p>Selected: {{selected}}</p>
    <SVSelect v-model="selected" :items="selectItems" multiple :maxlength="3" search placeholder="Select countries..."/>
  </div>
</template>

<script>
import SVSelect from "../../../../src/SVSelect";
export default {
  components: {
    SVSelect
  },
  data() {
    return {
      selected: [],
      selectItems: [
        {id: 'russia', text: 'Russia'},
        {id: 'usa', text: 'USA'},
        {id: 'china', text: 'China'},
        {id: 'italy', text: 'Italy'},
        {id: 'spain', text: 'Spain'},
        {id: 'turkey', text: 'Turkey'},
        {id: 'brazil', text: 'Brazil'},
        {id: 'japan', text: 'Japan'},
        {id: 'england', text: 'England'},
        {id: 'poland', text: 'Poland'},
      ]
    }
  }
}
</script>