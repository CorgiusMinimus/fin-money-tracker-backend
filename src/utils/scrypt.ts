import crypto from 'crypto'

export const hashPassword = (password: string): string => {
    const salt = crypto.randomBytes(16).toString("hex")

    const result = crypto.scryptSync(password, salt, 64).toString('hex')

    return `${result}.${salt}`
}

export const comparePassword = (given: string, password: string): boolean => {
    const passwordBuf = Buffer.from(password.split('.')[0], 'hex')
    const givenBuf = Buffer.from(hashPassword(given), 'hex')
    return crypto.timingSafeEqual(passwordBuf, givenBuf)
}