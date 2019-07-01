import * as path from 'path'
import * as lowdb from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import Cache from '../../entities/Cache'

const adapter = new FileSync(path.resolve(__dirname, '../../../.cache'))
const db = new lowdb(adapter)

export default new Cache({
  setter(key, value) {
    db.set(key, value).write()
  },
  getter(key) {
    return db.get(key).value()
  }
})
