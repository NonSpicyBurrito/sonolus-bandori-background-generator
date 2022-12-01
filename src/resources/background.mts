import { fetchImage } from '../fetch.mjs'
import { Server } from '../utils/servers.mjs'
import { clean } from './index.mjs'

export type BackgroundResources = Awaited<ReturnType<typeof getBackgroundResources>>

export const getBackgroundResources = async (id: string, server: Server, texts: string[]) => {
    const name = clean(id)
    console.log('Getting background', name, 'resources...')

    console.log('Fetching assets...')
    const bgImage = await fetchImage(
        `/assets/${server}/ingameskin/bgskin/skin${id}_rip/liveBG.png`,
        `/assets/${server}/ingameskin/bgskin/skin${id}_rip/liveBG_normal.png`
    )

    return {
        name,
        texts,

        bgImage,
    }
}
