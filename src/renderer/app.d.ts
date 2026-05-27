// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }

  interface Note {
    id: number
    title: string
    body: string
    createdAt: string
    updatedAt: string
  }

  interface Window {
    api: {
      ping: () => Promise<string>
      notes: {
        findMany: () => Promise<Note[]>
      }
    }
  }
}

export {}
