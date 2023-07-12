export const validateRoomSlug = (slug) => {
  if (!slug) return false
  return /^[a-zA-Z0-9-+_]+$/.test(slug)
}

export const throttle = (cb, delay = 1000) => {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true
    setTimeout(timeoutFunc, delay)
  }
}

const isObject = (item) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export const deepCopy = data => JSON.parse(JSON.stringify(data))

export const deepCompare = (a, b) => JSON.stringify(a) === JSON.stringify(b)

export const deepMerge = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {
          [key]: {}
        });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }
  return deepMerge(target, ...sources);
}

export function decodeBase64(data) {
  return Buffer.from(data, 'base64').toString('utf8')
}
export function decodeBase64Buffer(data) {
  return Buffer.from(data, 'base64')
}
export function encodeBase64(data, options = {}) {
  let result = null
  if (data != null) {
    result = ''
    if (options.svg) {
      result += 'data:image/svg+xml;base64,'
    } else if (options.html) {
      result += 'data:text/html;base64,'
    }
    result += Buffer.from(data).toString('base64')
  }
  return result
}
