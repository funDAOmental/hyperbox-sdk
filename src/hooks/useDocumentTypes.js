import React, { useState, useEffect } from 'react'

// @ts-ignore
const useDocumentTypes = (store, excludeTypes = []) => {
  const [types, setTypes] = useState([])

  useEffect(() => {
    if (!store) return

    let _mounted = true

    function _updateTypes() {
      if (store && _mounted) {
        const _types = store.getTypes() ?? []
        if (_types.length != types.length && _mounted) {
          // @ts-ignore
          setTypes(_types.filter(t => !excludeTypes.includes(t)))
        }
      }
    }

    _updateTypes()

    store.on(null, _updateTypes)
    return () => {
      store.off(null, _updateTypes)
      _mounted = false
    }
  }, [store])

  return types
}

export {
  useDocumentTypes,
}
