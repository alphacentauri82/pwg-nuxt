import Time from './time'

class History {

  getHistory () {
    let history = localStorage.getItem('history')
    if (!history) {
      localStorage.setItem('history', '[]')
    }
    return JSON.parse(localStorage.getItem('history'))
  }

  save (item) {
    let history = this.getHistory()
    history.push(Object.assign({time: Time.unix()}, item))
    localStorage.setItem('history', JSON.stringify(history))
  }

}

export default new History()