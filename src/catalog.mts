import { fetchJson } from './fetch.mjs'
import { clean } from './resources/index.mjs'
import { Server, servers } from './utils/servers.mjs'

export type Catalog = Awaited<ReturnType<typeof getCatalog>>

export const getCatalog = async () => {
    console.log('Getting catalog...')

    console.log('Fetching asset info...')
    const assets = await Promise.all(
        servers.map((server) => fetchJson(`/api/explorer/${server}/assets/_info.json`)),
    )

    console.log('Fetching names...')
    const backgroundInfo = await fetchJson('/api/skin/backgrounds.all.3.json')

    return {
        backgrounds: Object.entries(
            assets
                .map((asset) =>
                    Object.keys(asset.ingameskin.bgskin)
                        .filter((name) => name.startsWith('skin'))
                        .filter((name) => !name.endsWith('preview'))
                        .filter((name) => name !== 'skin_teamlivefestival'),
                )
                .reduce(
                    (all, names, index) => ({
                        ...Object.fromEntries(names.map((name) => [name.slice(4), servers[index]])),
                        ...all,
                    }),
                    {} as Record<string, Server>,
                ),
        ).map(([id, server]) => ({ id, server, texts: getTexts(backgroundInfo, id) })),
    }
}

type Info = Record<string, { assetBundleName: string; skinName: string[] }>

const getTexts = (info: Info, id: string) => {
    const fallback = capitalize(clean(id))

    const skin = Object.values(info).find((skin) => skin.assetBundleName === `skin${id}`)
    if (!skin) return servers.map(() => fallback)

    return servers.map(
        (_, i) => skin.skinName[i] || skin.skinName.filter((name) => !!name)[0] || fallback,
    )
}

const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1)
