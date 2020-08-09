import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList'
import EventCreate from '../views/EventCreate.vue'
import EventShow from '../views/EventShow.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true
  },
  {
    path: '/eventcreate',
    name: 'event-create',
    component: EventCreate
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
