import moment from 'moment'

class Time {

  unix () {
    return moment().unix()
  }

  parse (time) {
    return moment.unix(time).fromNow()
  }

}

export default new Time()