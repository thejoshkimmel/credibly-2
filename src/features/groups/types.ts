export interface Group {
  id: string
  name: string
  description: string
  memberCount: number
  createdAt: string
  updatedAt: string
}

export interface GroupState {
  groups: Group[]
  isLoading: boolean
  error: Error | null
}

export interface GroupContextType extends GroupState {
  fetchGroups: () => Promise<void>
  addGroup: (group: Omit<Group, "id" | "createdAt" | "updatedAt">) => Promise<void>
  removeGroup: (groupId: string) => Promise<void>
  clearGroups: () => void
} 