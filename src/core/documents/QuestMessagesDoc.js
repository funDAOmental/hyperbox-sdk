
class QuestMessagesDoc {

  static type = 'questMessages'

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
}

export {
  QuestMessagesDoc,
}
