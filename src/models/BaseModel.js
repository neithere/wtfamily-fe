import { sortBy } from 'lodash'
import Axios from 'axios'

import { requireNonEmptyObjectValues } from './utils'

export default class BaseModel {
  static BASE_URL = 'http://localhost:5000/r/'
  static RESOURCE_NAME = '---NOT_IMPLEMENTED---'
  static SORT_BY_KEY = []

  static findBy (params) {
    let url = this.BASE_URL + this.RESOURCE_NAME + '/'

    // console.log('baseModel.findBy', params, this.BASE_URL, this.RESOURCE_NAME, url)

    requireNonEmptyObjectValues(params)

    return Axios.get(url, { params })
      .then(resp => sortBy(resp.data, this.SORT_BY_KEY))
  }

  static findByIds (ids) {
    return this.findBy({ ids: ids.join(',') })
  }
}
