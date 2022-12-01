import { Catalog } from '../catalog.mjs'
import { BackgroundResources, getBackgroundResources } from './background.mjs'
import { getMiscResources } from './misc.mjs'

export type Resources = Awaited<ReturnType<typeof getResources>>

export const getResources = async (catalog: Catalog) => {
    console.log('Getting resources...')

    const resources = {
        backgrounds: [] as BackgroundResources[],
        misc: await getMiscResources(),
    }

    for (const { id, server, texts } of catalog.backgrounds) {
        resources.backgrounds.push(await getBackgroundResources(id, server, texts))
    }

    return resources
}

export const clean = (name: string) => (name[0] === '_' ? name.slice(1) : name)
