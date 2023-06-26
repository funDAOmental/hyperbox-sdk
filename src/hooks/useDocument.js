import React, { useState, useEffect } from 'react'

const useDocument = (type, id, store) => {
  const [document, setDocument] = useState(null)

  // initialize
  useEffect(() => {
    if (type && id && store) {
      setDocument(store.getDocument(type, id))
    }
  }, [type, id, store])

  // listen
  useEffect(() => {
    if (!store || !id || !type) return

    function _handleChange(documentId, document) {
      if (documentId === id) {
        setDocument(document)
      }
    }

    store.on({ type, event: 'change' }, _handleChange)
    store.on({ type, event: 'delete' }, _handleChange)

    return () => {
      store.off({ type, event: 'change' }, _handleChange)
      store.off({ type, event: 'delete' }, _handleChange)
    }
  }, [type, id, store])

  return document
}

export {
  useDocument,
} 
