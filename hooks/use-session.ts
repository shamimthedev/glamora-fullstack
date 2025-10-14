// hooks/use-session.ts
import { useSession as useNextAuthSession } from "next-auth/react"

interface CustomSession {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
  expires: string
}

export function useSession() {
  const { data: session, status, update } = useNextAuthSession()

  return {
    session: session as CustomSession | null,
    status,
    update
  }
}