
// interface MinimalMetadata {
//   name: string
//   description: string
// }

class QuestMetadataDocBase {

  static makeChamberKey(realmCoord, chamberSlug) {
    if (!realmCoord || !chamberSlug) return null
    return `${realmCoord.toString()}-${chamberSlug.replace(',', '') }`
  }

  static updateMetadata(store, type, key, metadata) {
    console.log(`QuestMetadataDocBase.updateMetadata() [${type}]`, key, metadata)
    store.upsertDocument(type, key, {
      metadata: JSON.stringify(metadata),
      name: metadata?.name ?? null,
      description: metadata?.description ?? null,
    })
  }

  static updateArtUrl(store, type, key, artUrl) {
    console.log(`QuestMetadataDocBase.updateArtUrl() [${type}]`, key, artUrl)
    store.upsertDocument(type, key, {
      artUrl
    })
  }
}

class QuestRealmDoc extends QuestMetadataDocBase {
  static type = 'questRealm'
  static updateMetadata(store, realmCoord, metadata) {
    super.updateMetadata(store, QuestRealmDoc.type, realmCoord, metadata)
  }
  static updateArtUrl(store, realmCoord, artUrl) {
    super.updateArtUrl(store, QuestRealmDoc.type, realmCoord, artUrl)
  }
}

class QuestChamberDoc extends QuestMetadataDocBase {
  static type = 'questChamber'
  static updateMetadata(store, realmCoord, chamberSlug, metadata) {
    const key = QuestMetadataDocBase.makeChamberKey(realmCoord, chamberSlug)
    super.updateMetadata(store, QuestChamberDoc.type, key, metadata)
  }
  static updateArtUrl(store, realmCoord, chamberSlug, artUrl) {
    const key = QuestMetadataDocBase.makeChamberKey(realmCoord, chamberSlug)
    super.updateArtUrl(store, QuestChamberDoc.type, key, artUrl)
  }
}

class QuestAgentDoc extends QuestMetadataDocBase {
  static type = 'questAgent'
  static updateMetadata(store, realmCoord, chamberSlug, metadata) {
    const key = QuestMetadataDocBase.makeChamberKey(realmCoord, chamberSlug)
    super.updateMetadata(store, QuestAgentDoc.type, key, metadata)
  }
  static updateArtUrl(store, realmCoord, chamberSlug, artUrl) {
    const key = QuestMetadataDocBase.makeChamberKey(realmCoord, chamberSlug)
    super.updateArtUrl(store, QuestAgentDoc.type, key, artUrl)
  }
}

export {
  QuestMetadataDocBase,
  QuestRealmDoc,
  QuestChamberDoc,
  QuestAgentDoc,
}
