import { BackgroundConfiguration, BackgroundData, compress } from 'sonolus-core'

export type MiscResources = Awaited<ReturnType<typeof getMiscResources>>

export const getMiscResources = async () => {
    console.log('Generating misc resources...')

    const data = await compress<BackgroundData>({
        aspectRatio: 2048 / 864,
        fit: 'height',
        color: '#000',
    })

    const configuration = await compress<BackgroundConfiguration>({
        blur: 0,
        mask: '#0006',
    })

    return {
        data,
        configuration,
    }
}
