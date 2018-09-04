<template>
  <v-card>
    <v-card-title>
      <h2>Password Generator</h2>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <template v-if="mode != 'simple'">
          <v-flex xs6 mt-4>
            <v-switch label="Mass Generator" v-model="options.mass.isTrue"/>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              type="number"
              label="Amount"
              v-model="options.mass.amount"
              v-if="options.mass.isTrue"
            />
          </v-flex>
        </template>
        <template v-if="options.mass.isTrue">
          <v-flex xs6>
            <li class="subheader">Separator</li>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Separator"
              hint="Type \r\n to join with a new line"
              v-model="options.mass.separator"
            />
          </v-flex>
        </template>
        <v-flex xs6>
          <li class="subheader">Password Length</li>
        </v-flex>
        <v-flex xs6>
          <v-text-field type="number" label="Length" v-model="options.length" />
        </v-flex>
        <template v-for="(item, i) in box" v-if="mode != 'simple'">
          <v-flex xs3 :key="item.title">
            <li class="subheader">{{item.title}}</li>
          </v-flex>
          <v-flex xs6 :key="item.model" mt-2>
            <v-checkbox :label="item.label" v-model="options[item.model]"/>
          </v-flex>
          <v-flex xs3 :key="i">
            <v-switch label="Edit" v-model="edit[item.model]" @click="check(item.model)"/>
          </v-flex>
          <v-flex xs12 :key="item.label" v-if="edit[item.model]">
            <v-text-field v-model="chars[item.model.toUpperCase()]" />
          </v-flex>
        </template>
        <template v-for="(item, i) in box" v-if="mode == 'simple'">
          <v-flex xs6 :key="i">
            <li class="subheader">{{item.title}}</li>
          </v-flex>
          <v-flex xs6 :key="item.model" mt-2>
            <v-checkbox :label="item.label" v-model="options[item.model]"/>
          </v-flex>
        </template>
        <template v-if="mode != 'simple'">
          <v-flex xs3>
            <li class="subheader">Exclude Ambiguous Characters</li>
          </v-flex>
          <v-flex xs6>
            <v-checkbox :label="chars.AMBIGUOUS" v-model="options.ambiguous"/>
          </v-flex>
          <v-flex xs3>
            <v-switch label="Edit" v-model="edit.ambiguous"/>
          </v-flex>
        </template>
        <template v-else>
          <v-flex xs6>
            <li class="subheader">Exclude Ambiguous Characters</li>
          </v-flex>
          <v-flex xs6>
            <v-checkbox :label="chars.AMBIGUOUS" v-model="options.ambiguous"/>
          </v-flex>
        </template>
        <v-flex xs12 v-if="edit.ambiguous">
          <v-text-field v-model="chars.AMBIGUOUS" />
        </v-flex>
        <v-flex xs12>
          <v-btn 
            color="blue" :dark="!(characters === '')" @click="generate()"
            :disabled="characters === ''"
          >
            Generate
          </v-btn>
        </v-flex>
        <result :result="result" :mass="options.mass.isTrue"/>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import FileSaver from 'file-saver'
import Result from './Result'
import History from '~/utils/history'

const DEFAULT = {
  LOWERCASECHAR: 'qwertyuiopasdfghjklzxcvbnm',
  NUMBER: '0123456789',
  UPPERCASECHAR: 'QWERTYUIOPASDFGHJKLZXCVBNM',
  SYMBOL: `!@#$%^&*-_+=?`,
  AMBIGUOUS: "({}[]()/\\'" + '"`,;:.<>)'
}

export default {
  props: ['mode'],
  components: {
    Result
  },
  data: () => ({
    options: {
      mass: {
        isTrue: false,
        amount: 0,
        separator: ''
      },
      length: 2,
      symbol: false,
      number: false,
      uppercaseChar: false,
      lowercaseChar: false,
      ambiguous: false
    },
    edit: {
      symbol: false,
      number: false,
      uppercaseChar: false,
      lowercaseChar: false,
      ambiguous: false
    },
    result: '',
    isCopying: false,
    chars: {},
    box: [
      { title: 'Include Lowercase Characters', model: 'lowercaseChar', label: 'e.g. abcdef' },
      { title: 'Include Uppercase Characters', model: 'uppercaseChar', label: 'e.g. ABCDEFGH' },
      { title: 'Include Symbols', model: 'symbol', label: 'e.g. @#$%' },
      { title: 'Include Numbers', model: 'number', label: 'e.g. 123456' }
    ]
  }),
  computed: {
    characters () {
      let chars = ''
      let options = this.options
      chars += (options.lowercaseChar) ? this.chars.LOWERCASECHAR : ''
      chars += (options.symbol) ? this.chars.SYMBOL + this.chars.AMBIGUOUS : ''
      chars += (options.number) ? this.chars.NUMBER : ''
      chars += (options.uppercaseChar) ? this.chars.UPPERCASECHAR : ''
      if (!options.ambiguous) {
        chars.replace(this.chars.AMBIGUOUS, '')
      }
      return chars
    }
  },
  methods: {
    generate () {
      this.result = ''
      let mass = this.options.mass
      if (mass.isTrue) {
        let separator = mass.separator
        if (mass.separator.includes(`\\r\\n`)) {
          separator = mass.separator.replace('\\r\\n', '\r\n')
        }
        for (let i = 0; i < mass.amount; i++) {
          this.result += this.createPassword() + separator
        }
      } else {
        this.result = this.createPassword()
      }
      History.save({result: this.result, mass: this.options.mass.isTrue})
    },
    createPassword () {
      let password = ''
      for (let i = 0; i < this.options.length; i++) {
        password += this.characters[Math.floor(Math.random() * this.characters.length)]
      }
      return password
    },
    check (model) {
      if (this.edit[model]) {
        this.chars[model.toUpperCase()] = DEFAULT[model.toUpperCase()]
      }
    }
  },
  created () {
    this.chars = Object.assign({}, DEFAULT)
  }
}
</script>

<style>

</style>
