
// interface MinimalMetadata {
//   name: string
//   description: string
// }

class QuestMetadataDocBase {

  static normalizeChamberSlug(slug) {
    // Remove default separator, is present
    return slug.replace(',', '')
  }

  static updateMetadata(store, type, slug_or_coord, metadata) {
    const _key = this.normalizeChamberSlug(slug_or_coord)
    console.log(`QuestMetadataDocBase.updateMetadata() [${type}]`, _key, metadata)
    store.upsertDocument(type, _key, {
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
  static type = 'questRealm'
  static updateMetadata(store, chamberSlug, metadata) {
    super.updateMetadata(store, QuestRealmDoc.type, chamberSlug, metadata)
  }
  static updateArtUrl(store, chamberSlug, artUrl) {
    super.updateArtUrl(store, QuestRealmDoc.type, chamberSlug, artUrl)
  }
}

class QuestChamberDoc extends QuestMetadataDocBase {
  static type = 'questChamber'
  static updateMetadata(store, chamberSlug, metadata) {
    super.updateMetadata(store, QuestChamberDoc.type, chamberSlug, metadata)
  }
  static updateArtUrl(store, chamberSlug, artUrl) {
    super.updateArtUrl(store, QuestChamberDoc.type, chamberSlug, artUrl)
  }
}

class QuestAgentDoc extends QuestMetadataDocBase {
  static type = 'questAgent'
  static updateMetadata(store, chamberSlug, metadata) {
    super.updateMetadata(store, QuestAgentDoc.type, chamberSlug, metadata)
  }
  static updateArtUrl(store, chamberSlug, artUrl) {
    super.updateArtUrl(store, QuestAgentDoc.type, chamberSlug, artUrl)
  }
}

export {
  QuestRealmDoc,
  QuestChamberDoc,
  QuestAgentDoc,
}
