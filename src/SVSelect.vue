<template>
  <div v-click-outside="clickOutside" :class="{'SVS-open': isOpen, 'SVS-multiple': multiple}" class="SVS">
    <div @click.stop="isOpen = !isOpen" class="SVS-header">

      <p v-if="isEmpty" class="SVS-placeholder">{{placeholder}}</p>

      <div v-else class="SVS-fluid">

        <div v-if="multiple" key="multiple" class="SVS-multiple-selected SVS-fluid">
          <span v-for="item in selected" @click.stop="selectItem(item)" v-html="getItemHtml(item)" class="SVS-header-selected-item"></span>
        </div>

        <div v-else key="single">
          <span v-html="getItemHtml(selected)" class="SVS-header-selected-item"></span>
        </div>

      </div>

      <div class="SVS-right-tools">
        <span v-if="multiple && locConfig.counter" class="SVS-counter">{{ value.length }} {{ locConfig.counterSeparator }} {{ maxlength }}</span>
        <span v-html="locConfig.toggleIcon" class="SVS-toggle-icon"></span>
      </div>
    </div>
    <transition :name="locConfig.animationName">
      <div v-show="isOpen" class="SVS-body">
        <input v-if="search" v-model="searchStr" :placeholder="locConfig.searchPlaceholder" type="text" class="SVS-search">
        <div v-if="findItems && findItems.length" key="items" class="SVS-body-items">
          <span
              v-for="item in findItems"
              v-html="getItemHtml(item)"
              @click="selectItem(item)"
              :key="item.id"
              :class="{'SVS-body-item-selected': isSelectedItem(item)}"
              class="SVS-body-item"></span>
        </div>
        <div v-else key="not-found" class="SVS-search-not-found">{{locConfig.searchNotFound}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SVSelect",
  props: {
    value: {
      type: [String, Number, Array],
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Select item...'
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: 5
    },
    search: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object
    }
  },
  data() {
    return {
      isOpen: false,
      searchStr: '',
      //Local config
      locConfig: {
        searchPlaceholder: 'Search...',
        searchNotFound: 'Nothing found...',
        animationName: 'SVS-anim',
        counter: true,
        counterSeparator: 'of',
        toggleIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>',
        autoClose: true
      }
    }
  },
  computed: {
    selected() {
      if(this.value && this.items) {
        // If select multiple and value set
        if(this.multiple && this.value.length) {
          return this.items.filter(e => this.value.includes(e.id));
        }
        return this.items.find(e => e.id === this.value);
      }
      return null;
    },
    findItems() {
      if(this.items) {
        if(this.search) {
          return this.items.filter(e => e.text.toLowerCase().includes(this.searchStr.toLowerCase()));
        } else {
          return this.items;
        }
      }
    },
    isEmpty() {
      return this.multiple ? !this.value.length : !this.selected;
    }
  },
  directives: {
    'click-outside': {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          // here I check that click was outside the el and his childrens
          if (!(el === event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            vnode.context[binding.expression](event);
          }
        };
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unbind: function (el) {
        document.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },
  methods: {
    selectItem(item) {
      if(this.multiple) {
        let newData = [...this.value];
        if(!this.value.includes(item.id)) {
          // Add new item
          if(this.value.length < this.maxlength) {
            newData.push(item.id);
          }
        } else {
          // Remove item
          newData.splice(newData.indexOf(item.id), 1);
        }
        // Emit updated data
        this.$emit('input', newData);
        return;
      }
      // If not multiple
      this.$emit('input', item.id);
      this.isOpen = false;
    },
    getItemHtml(item) {
      return item.icon ? item.icon + item.text : item.text;
    },
    isSelectedItem(item) {
      return this.multiple ? this.value.includes(item.id) : this.value === item.id;
    },
    clickOutside() {
      if(this.locConfig.autoClose) {
        this.isOpen = false;
      }
    }
  },
  created() {
    if(this.config) {
      this.locConfig = {...this.locConfig, ...this.config};
    }

    if(this.multiple && !Array.isArray(this.value)) {
      console.error('SVSelect: v-model value is not array, change value to array for multiple select')
    }
  }
}
</script>

<style lang="scss">
$SVS-font-family: inherit !default;
$SVS-base-spacer: 4px !default;
$SVS-font-size: initial !default;
$SVS-icons-size: 18px !default;

$SVS-height: 40px !default;

$SVS-color: #555 !default;
$SVS-background: #fff !default;

$SVS-border: 1px solid #DBE2EA !default;
$SVS-border-radius: 4px !default;
$SVS-box-shadow: none !default;

$SVS-toggle-icon-color: $SVS-color !default;
$SVS-placeholder-color: #999 !default;
$SVS-counter-color: $SVS-placeholder-color !default;

$SVS-header-item-selected-color: $SVS-color !default;
$SVS-header-item-selected-bg: transparent !default;

$SVS-multiple-header-item-selected-bg: #5a6b75 !default;
$SVS-multiple-header-item-selected-color: #fff !default;

$SVS-body-z-index: 10 !default;
$SVS-body-max-height: 300px !default;


$SVS-body-item-margin: 5px 10px 0 10px !default;
$SVS-body-item-border-radius: $SVS-border-radius !default;
$SVS-body-item-hover-bg:  #e2e2e2 !default;
$SVS-body-item-selected-bg: #5a6b75 !default;
$SVS-body-item-selected-color: #fff !default;

$SVS-search-bg: $SVS-background !default;
$SVS-search-color: #736e83 !default;
$SVS-search-placeholder-color: $SVS-placeholder-color !default;
$SVS-search-not-found-color: $SVS-placeholder-color !default;

.SVS {
  position: relative;
  height: $SVS-height;
  font-size: $SVS-font-size;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;

  font-family: $SVS-font-family;
  background: $SVS-background;
  border: $SVS-border;
  border-radius: $SVS-border-radius;
  box-shadow:$SVS-box-shadow;

  *, ::before, ::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  svg {
    width: $SVS-icons-size;
    height: $SVS-icons-size;
    fill: currentColor;
  }

  i {
    font-size: $SVS-icons-size;
    color: currentColor;
  }

  &.SVS-open {
    .SVS-toggle-icon {
      transform: rotate(180deg);
    }
  }
}

.SVS-multiple {
  .SVS-header-selected-item {
    color: $SVS-multiple-header-item-selected-color;
    background: $SVS-multiple-header-item-selected-bg;
    margin-right: $SVS-base-spacer;
  }
}

.SVS-header, .SVS-toggle-icon, .SVS-right-tools, .SVS-fluid {
  display: flex;
  align-items: center;
}

.SVS-header {
  height: 100%;
  padding: $SVS-base-spacer 10px $SVS-base-spacer $SVS-base-spacer;
}
.SVS-header-selected-item {
  padding: 5px 12px;
  height: 100%;
  color: $SVS-header-item-selected-color;
  background: $SVS-header-item-selected-bg;
  border-radius: $SVS-border-radius;
}
.SVS-header-selected-item, .SVS-body-item, .SVS-multiple-selected {
  display: flex;
  align-items: center;
  svg, i {
    margin-right: 7px;
  }
}
.SVS-placeholder {
  color: $SVS-placeholder-color;
  padding-left: 10px;
}
.SVS-search {
  padding: 6px 16px 12px 16px;
  font-family: $SVS-font-family;

  background: $SVS-search-bg;
  color: $SVS-search-color;
  border: 0;
  outline: 0;
  border-bottom: $SVS-border;
  &::placeholder {
    color: $SVS-search-placeholder-color;
  }
}
.SVS-right-tools {
  margin-left: auto;
}
.SVS-counter {
  color: $SVS-counter-color;
  margin-right: 10px;
  white-space: nowrap;
}
.SVS-toggle-icon {
  color: $SVS-toggle-icon-color;
  transition: all .2s ease-in-out;
}
.SVS-body {
  z-index: $SVS-body-z-index;
  position: absolute;
  display: flex;
  flex-direction: column;
  max-height: $SVS-body-max-height;
  overflow-y: auto;
  width: 100%;
  top: 100%;
  left: 0;
  margin-top: 6px;
  padding: 10px 0;

  background: $SVS-background;
  border: $SVS-border;
  border-radius: $SVS-border-radius;
  box-shadow: $SVS-box-shadow;
}
.SVS-body-items {
  display: flex;
  flex-direction: column;
}
.SVS-body-item {
  color: $SVS-color;
  padding: 8px 12px;
  margin: $SVS-body-item-margin;
  border-radius: $SVS-body-item-border-radius;
  &.SVS-body-item-selected {
    color: $SVS-body-item-selected-color;
    background: $SVS-body-item-selected-bg;
  }
  &:hover:not(.SVS-body-item-selected) {
    background: $SVS-body-item-hover-bg;
  }
}
.SVS-search-not-found {
  cursor: initial;
  color: $SVS-search-not-found-color;
  padding: 12px 16px 0 16px;
}

.SVS-fluid {
  height: 100%;
  width: 100%;
}
// Default animation
.SVS-anim-active, .SVS-anim-leave-active {
  transition: opacity .1s ease-in-out;
}
.SVS-anim-enter, .SVS-anim-leave-to {
  opacity: 0;
}
</style>
