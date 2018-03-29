import BaseModel from './BaseModel'

export default class Person extends BaseModel {
  static RESOURCE_NAME = 'people'
  static SORT_BY_KEY = ['birth', 'name']

  static findByEvent (eventId) {
    return this.findBy({
      by_event: eventId
    })
  }
}
