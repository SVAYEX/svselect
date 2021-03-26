<template>
  <div>
    <p>Selected: {{selected}}</p>
    <SVSelect v-model="selected" :items="selectItems" search placeholder="Select your language..."/>
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
      selected: '',
      selectItems: [
        {id: 'russian', text: 'Russian'},
        {id: 'english', text: 'English'},
        {id: 'chinese', text: 'Chinese'},
        {id: 'spanish', text: 'Spanish'},
      ]
    }
  }
}
</script>