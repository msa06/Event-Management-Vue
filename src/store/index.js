import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)
let nextId = 1

export default new Vuex.Store({
  state: {
    user: { id: 'msa', name: 'Suhaib' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    eventsTotal: 0,
    event: {},
    notifications: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    PUSH(state, notification) {
      state.notifications.push({
        ...notification,
        id: nextId++
      })
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(notification => {
        notification.id !== notificationToRemove.id
      })
    }
  },
  actions: {
    createEvent({ commit, dispatch }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
          const notification = {
            type: 'success',
            message: 'Your Event has been created!'
          }
          dispatch('addNotification', notification)
        })
        .catch(err => {
          const notification = {
            type: 'error',
            message: 'There was a problem creating event: ' + err.message
          }
          dispatch('addNotification', notification)
          throw err
        })
    },
    fetchEvents({ commit, dispatch }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(res => {
          commit('SET_EVENTS_TOTAL', parseInt(res.headers['x-total-count']))
          commit('SET_EVENTS', res.data)
        })
        .catch(err => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching events: ' + err.message
          }
          dispatch('addNotification', notification)
        })
    },
    fetchEvent({ commit, dispatch, getters }, id) {
      var event = getters.getEventByID(id)
      if (event) {
        commit('SET_EVENT', event)
        return event
      } else {
        return EventService.getEvent(id)
          .then(res => {
            commit('SET_EVENT', res.data)
            return res.data
          })
          .catch(err => {
            const notification = {
              type: 'error',
              message: 'There was a problem fetching event: ' + err.message
            }
            dispatch('addNotification', notification)
          })
      }
    },
    addNotification({ commit }, notification) {
      commit('PUSH', notification)
    },
    removeNotification({ commit }, notificationToRemove) {
      commit('DELETE', notificationToRemove)
    }
  },
  getters: {
    getEventByID: state => id => {
      return state.events.find(event => event.id === id)
    }
  },
  modules: {}
})
