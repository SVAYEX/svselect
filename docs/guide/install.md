## NPM
Install with NPM
```sh
npm i svselect
```
Then, import and register the component:

```js
// Global registration:
import Vue from 'vue';
import SVSelect from 'SVSelect';

Vue.component('SVSelect', SVSelect);

// Local registration in components: 
import SVSelect from 'SVSelect';

export default {
    components: {
        SVSelect
    }
}
```

## Browser