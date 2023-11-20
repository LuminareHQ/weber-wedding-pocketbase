import PocketBase from 'pocketbase'

const url = 'https://weber-wedding.pockethost.io/'
export const client = new PocketBase(url)
client.autoCancellation(false);