<template>
  <v-layout row wrap>
    <v-flex xs3>
      <li class="subheader">Result:</li>
    </v-flex>
    <v-flex xs6>
      <v-text-field 
        :value="result"
        :multi-line="mass"
      />
    </v-flex>
    <v-flex xs3>
      <v-btn color="success" @click="copy()">Copy</v-btn>
      <v-btn color="red" dark v-if="mass" @click="download()">Download</v-btn>
    </v-flex>
    <v-snackbar
      :timeout="2000"
      top
      v-model="isCopying"
    >
      Copied
      <v-btn flat color="pink" @click.native="isCopying = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import FileSaver from 'file-saver'

export default {
  props: ['result', 'mass'],
  data: () => ({
    isCopying: false
  }),
  methods: {
    copy () {
      this.isCopying = true
      let input = document.createElement('input')
      input.value = this.result
      input.id = 'inp'
      document.body.appendChild(input)
      let text = document.getElementById('inp')
      text.select()
      document.execCommand('copy')  
      text.remove()
    },
    download () {
      const blob = new Blob([this.result], { type: 'text/plain?charset=utf-8'})
      FileSaver.saveAs(blob, `passwords.txt`)
    }
  }
}
</script>

<style>

</style>
