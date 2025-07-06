import crypto from 'crypto'

export const hashPassword = (password: string, givenSalt?: string): string => {
    const salt = crypto.randomBytes(16).toString("hex")

    const result = crypto.scryptSync(password, givenSalt ?? salt, 64).toString('hex')

    return `${result}.${salt}`
}

export const comparePassword = (given: string, password: string): boolean => {

    const [hash, salt] = password.split('.')

    const passwordBuf = Buffer.from(hash, 'hex')
    const givenBuf = Buffer.from(hashPassword(given, salt), 'hex')

    console.log(passwordBuf.toString('hex'), givenBuf.toString('hex'))
    return crypto.timingSafeEqual(passwordBuf, givenBuf)
}