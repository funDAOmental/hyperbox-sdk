
// interface MinimalMetadata {
//   name: string
//   description: string
// }

class QuestMetadataDocBase {

  static normalizeChamberSlug(chamberSlug) {
    // Remove default separator
    return chamberSlug.replace(',', '')
  }

  static updateMetadata(store, type, chamberSlug, metadata) {
    const _slug = this.normalizeChamberSlug(chamberSlug)
    console.log(`QuestMetadataDocBase.updateMetadata() [${type}]`, _slug, metadata)
    store.upsertDocument(type, _slug, {
      metadata: JSON.stringify(metadata),
      name: metadata?.name ?? null,
      description: metadata?.description ?? null,
    })
  }

  static updateArtUrl(store, type, chamberSlug, artUrl) {
    const _slug = this.normalizeChamberSlug(chamberSlug)
    console.log(`QuestMetadataDocBase.updateArtUrl() [${type}]`, _slug, artUrl)
    store.upsertDocument(type, _slug, {
      artUrl
    })
  }
}

class QuestRealmDoc extends QuestMetadataDocBase {
  static updateMetadata(store, chamberSlug, metadata) {
    super.updateMetadata(store, 'questRealm', chamberSlug, metadata)
  }
  static updateArtUrl(store, chamberSlug, artUrl) {
    super.updateArtUrl(store, 'questRealm', chamberSlug, artUrl)
  }
}

class QuestChamberDoc extends QuestMetadataDocBase {
  static updateMetadata(store, chamberSlug, metadata) {
    super.updateMetadata(store, 'questChamber', chamberSlug, metadata)
  }
  static updateArtUrl(store, chamberSlug, artUrl) {
    super.updateArtUrl(store, 'questChamber', chamberSlug, artUrl)
  }
}

class QuestAgentDoc extends QuestMetadataDocBase {
  static updateMetadata(store, chamberSlug, metadata) {
    super.updateMetadata(store, 'questAgent', chamberSlug, metadata)
  }
  static updateArtUrl(store, chamberSlug, artUrl) {
    super.updateArtUrl(store, 'questAgent', chamberSlug, artUrl)
  }
}

export {
  QuestRealmDoc,
  QuestChamberDoc,
  QuestAgentDoc,
}
