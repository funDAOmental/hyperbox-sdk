
class QuestEncounterDoc {

  static type = 'questEncounter'

  static getDescription(store, timestamp) {
    const doc = store.getDocument(QuestEncounterDoc.type, timestamp.toString())
    if (!doc) return '?'
    const date = new Date(parseInt(timestamp)).toDateString()
    const history = doc.history ? JSON.parse(doc.history) : []
    return `${date} ${doc.realmCoord}:${doc.chamberSlug} & ${doc.playerName} (${history.length} msgs) ${history[0]?.content?.slice(0,0) ?? ''}`
  }

  static updateEncounter(store, timestamp, realmCoord, chamberSlug, playerName, agentName, history) {
    const _history = history.length > 4 ? history.slice(4) : null
    const data = {
      realmCoord: realmCoord.toString(),
      chamberSlug: chamberSlug,
      playerName,
      agentName,
      history: _history ? JSON.stringify(_history) : null,
    }
    store.upsertDocument(QuestEncounterDoc.type, timestamp.toString(), data)
  }

  static getEncounters(store, chamberSlug, realmCoord = null) {
    const result = {}
    const ids = store.getIds(QuestEncounterDoc.type)
    for (const id of ids) {
      const doc = store.getDocument(QuestEncounterDoc.type, id)
      if (doc && doc.chamberSlug == chamberSlug && (doc.realmCoord == parseInt(realmCoord) || realmCoord === null)) {
        result[id] = {...doc}
      }
    }
    return result
  }

}

export {
  QuestEncounterDoc,
}
