import { create } from "zustand"

export type BadgeStore = {
    id: string
    name: string
    email: string
    eventTitle: string
    checkInURL: string
    image?: string
}

type StateProps = {
    data: BadgeStore | null
    save: (badge: BadgeStore) => void
}

export const useBadgeStore = create<StateProps>((set) => ({
    data: null,

    save: (data: BadgeStore) => set(() => ({data})),
}))