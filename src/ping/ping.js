import { nanoid } from 'nanoid'

export const pingHyperboxSdk = () => {
  console.warn(`hyperbox-sdk PING!`, nanoid())
}
