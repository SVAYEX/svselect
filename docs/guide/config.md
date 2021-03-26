## Search
To enable search, pass `search` attribute:
```html
<SVSelect v-model="selected" :items="selectItems" search />
```

## Multiple select
To enable multiple select, pass `multiple` attribute:
```html
<SVSelect v-model="selected" :items="selectItems" multiple />
```
## Maxlength
Maximum possible number of selected items:
```html
// Default 5
<SVSelect v-model="selected" :items="selectItems" multiple :maxlength="10" />
```

## Counter
Disable counter:
```html
<SVSelect v-model="selected" :items="items" multiple :config="{counter: false}"/>
```
To change counter separator: 
```html
<SVSelect v-model="selected" :items="items" multiple :config="{counterSeparator: '/'}"/>
```

## Placeholder
```html
<SVSelect v-model="selected" :items="items" placeholder="My placeholder..."/>
```

## Toggle icon
Change toggle icon:
```html
<SVSelect v-model="selected" :items="items" :config="{toggleIcon: '<svg>...</svg>'}"/>
```
Or
```html
<SVSelect v-model="selected" :items="items" :config="selectConfig"/>

data() {
    return {
        selectConfig: {
            toggleIcon: '<i class="..."></i>'
        }
    }
}
```

## Body animation
The body is animated through Vue element [transition](https://vuejs.org/v2/guide/transitions.html).  
You can pass the name of your css animation:
```html
<SVSelect v-model="selected" :items="items" :config="{animationName: 'my-anim'}"/>
```

## Disable auto close
```html
<SVSelect v-model="selected" :items="items" :config="{autoClose: false}"/>
```

## Localisation
All variables for localisation:
```html
<SVSelect v-model="selected" :items="items" placeholder="Localised placeholder..." :config="selectConfig"/>

data() {
    return {
        selectConfig: {
            searchPlaceholder: 'Search...',
            searchNotFound: 'Nothing found...',
            counterSeparator: 'of'
        }
    }
}
```