<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-container fluid>
        <v-card>
          <v-card-title>
            <h1>History</h1>
          </v-card-title>
          <v-card-text>
            <v-list two-line>
              <v-list-tile v-for="(history, i) in histories" :key="i" @click="setCurrentHistory(i)">
                <v-list-tile-content>
                  {{history.time | time}}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-container>
    </v-flex>
    <v-dialog v-model="modal">
      <history-modal :history="histories[current]" v-if="current != null"/>
    </v-dialog>
  </v-layout>
</template>

<script>
import History from '~/utils/history'
import Time from '~/utils/time'
import HistoryModal from '~/components/History'

export default {
  data: () => ({
    histories: [],
    modal: false,
    current: null
  }),
  components: {
    HistoryModal
  },
  methods: {
    setCurrentHistory (i) {
      this.current = i
      this.modal = true
    }
  },
  filters: {
    time (value) {
      return Time.parse(value)
    }
  },
  mounted () {
    this.histories = History.getHistory().reverse()
  }
}
</script>

<style>

</style>
