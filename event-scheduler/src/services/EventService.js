import axios from 'axios'

const apiCLient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage, page) {
    return apiCLient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiCLient.get('/events/' + id)
  },
  postEvent(event) {
    console.log('From postEvent event is ', event)
    return apiCLient.post('/events', event)
  }
}
