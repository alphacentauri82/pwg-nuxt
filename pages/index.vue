<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-parallax src="https://png.pngtree.com/thumb_back/fh260/back_pic/03/58/44/4457a2ce0e3e2f5.jpg">
        <h1 class="text-xs-center display-3">Password Generator</h1>
      </v-parallax>
    </v-flex>
    <v-flex xs12>
      <v-container fluid>
        <generator-box mode='simple' />
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import GeneratorBox from '~/components/GeneratorBox'

export default {
  components: {
    GeneratorBox
  }
}
</script>

<style>

</style>
