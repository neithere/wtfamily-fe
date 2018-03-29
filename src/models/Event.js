import BaseModel from './BaseModel'

export default class Event extends BaseModel {
  static RESOURCE_NAME = 'events'
  static SORT_BY_KEY = 'date_year'

  static findByCitation (citationId) {
    return this.findBy({
      proven_by: citationId
    })
  }

  static findByPlace (placeId) {
    return this.findBy({
      place_id: placeId
    })
  }
}
