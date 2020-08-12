<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select type="text" @input="updateValue" :value="value" v-bind="$attrs">
      <option
        v-for="option in options"
        :key="option"
        v-on="$listeners"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped></style>
