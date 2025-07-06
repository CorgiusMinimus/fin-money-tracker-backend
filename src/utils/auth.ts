import crypto from 'crypto'

export const hashSecret = (secret: string) => {
    return crypto.createHash('sha256').update(secret).digest('hex')
}