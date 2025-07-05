// Type declarations for Next.js App Router
import { Metadata } from 'next'

declare module 'next' {
  export interface PageProps {
    params: {
      [key: string]: string
    }
  }
}
