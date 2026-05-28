declare global {
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
