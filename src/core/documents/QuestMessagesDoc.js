
class QuestMessagesDoc {

  static type = 'questMessages'

  static getDescription(store, timestamp) {
    const doc = store.getDocument(QuestMessagesDoc.type, timestamp.toString())
    if (!doc) return '?'
    const date = new Date(parseInt(timestamp)).toDateString()
    const messages = doc.messages ? JSON.parse(doc.messages) : []
    return `${date} ${doc.chamber}+${doc.player} (${messages.length} msgs) ${messages[0]?.content?.slice(0,0) ?? ''}`
  }

  static updateMessages(store, timestamp, realmCoord, chamberSlug, player, messages) {
    const _messages = messages.length > 4 ? messages.slice(4) : null
    const data = {
      realm: realmCoord.toString(),
      chamber: chamberSlug,
      player,
      messages: _messages ? JSON.stringify(_messages) : null,
    }
    store.upsertDocument(QuestMessagesDoc.type, timestamp.toString(), data)
  }

  static getEncounters(store, chamberSlug, realmCoord = null) {
    const result = {}
    const ids = store.getIds(QuestMessagesDoc.type)
    for (const id of ids) {
      const doc = store.getDocument(QuestMessagesDoc.type, id)
      if (doc && doc.chamber == chamberSlug && (doc.realm == parseInt(realmCoord) || realmCoord === null)) {
        result[id] = {...doc}
      }
    }
    console.log(`ENCOUNTERS:`, chamberSlug, realmCoord, result)
    return result
  }

}

export {
  QuestMessagesDoc,
}
