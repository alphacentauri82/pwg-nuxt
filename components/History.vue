<template>
  <v-card>
    <v-card-text>
      <result :result="history.result" :mass="history.mass" />
      <p>{{history.time | time}}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import Time from '~/utils/time'
import Result from '~/components/Result'

export default {
  props: ['history'],
  components: {
    Result
  },
  filters: {
    time (value) {
      return Time.parse(value)
    }
  },
}
</script>

<style>

</style>
