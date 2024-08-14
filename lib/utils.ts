import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: `/${string}`) {
  // TODO
  // if (env.NEXT_PUBLIC_APP_URL) return `${env.NEXT_PUBLIC_APP_URL}${path}`
  return `http://localhost:3000${path}`
}

export const isBrowser = typeof window !== 'undefined'

export const slugify = (str: string) =>
  str
    ?.normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // convert accented letters from uppercase to llowercase
    ?.toLowerCase() //lowercase whole string
    .replace(/^\s+|\s+$/g, '') // trim
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars like '/' '?' etc
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes into single -
