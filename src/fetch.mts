import fetch from 'node-fetch'
import sharp from 'sharp'

export const fetchImage = async (path: string, fallback: string) => {
    const response = await fetch(`https://bestdori.com${path}`)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    try {
        await sharp(buffer).metadata()
        return buffer
    } catch (error) {
        console.error('[ERROR]', error)
        console.log('Using fallback', fallback)

        const response = await fetch(`https://bestdori.com${fallback}`)
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        await sharp(buffer).metadata()
        return buffer
    }
}

export const fetchJson = async (path: string) => {
    const response = await fetch(`https://bestdori.com${path}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (await response.json()) as any
}
