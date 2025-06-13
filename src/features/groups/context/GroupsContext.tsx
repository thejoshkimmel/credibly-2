import { createContext, useContext, useState, ReactNode } from "react"
import { Group, GroupContextType, GroupState } from "../types"
import { APIError, handleAPIError } from "@/lib/utils/error"

// Create the context with default values
const GroupsContext = createContext<GroupContextType>({
  groups: [],
  isLoading: false,
  error: null,
  fetchGroups: async () => {},
  addGroup: async () => {},
  removeGroup: async () => {},
  clearGroups: () => {}
})

interface GroupsProviderProps {
  children: ReactNode
}

/**
 * GroupsProvider component that wraps the application and provides groups context
 */
export function GroupsProvider({ children }: GroupsProviderProps) {
  // Initialize state
  const [state, setState] = useState<GroupState>({
    groups: [],
    isLoading: false,
    error: null
  })

  /**
   * Fetch groups from the API
   */
  const fetchGroups = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const response = await fetch("/api/groups")
      
      if (!response.ok) {
        throw new APIError(
          "Failed to fetch groups",
          response.status,
          "FETCH_GROUPS_FAILED"
        )
      }

      const groups = await response.json()
      setState(prev => ({ ...prev, groups, isLoading: false }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("Failed to fetch groups"),
        isLoading: false
      }))
      throw error
    }
  }

  /**
   * Add a new group
   * @param group - The group data to add
   */
  const addGroup = async (group: Omit<Group, "id" | "createdAt" | "updatedAt">) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(group)
      })

      if (!response.ok) {
        throw new APIError(
          "Failed to add group",
          response.status,
          "ADD_GROUP_FAILED"
        )
      }

      const newGroup = await response.json()
      setState(prev => ({
        ...prev,
        groups: [...prev.groups, newGroup],
        isLoading: false
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("Failed to add group"),
        isLoading: false
      }))
      throw error
    }
  }

  /**
   * Remove a group
   * @param groupId - The ID of the group to remove
   */
  const removeGroup = async (groupId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const response = await fetch(`/api/groups/${groupId}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new APIError(
          "Failed to remove group",
          response.status,
          "REMOVE_GROUP_FAILED"
        )
      }

      setState(prev => ({
        ...prev,
        groups: prev.groups.filter(group => group.id !== groupId),
        isLoading: false
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("Failed to remove group"),
        isLoading: false
      }))
      throw error
    }
  }

  /**
   * Clear all groups from state
   */
  const clearGroups = () => {
    setState(prev => ({ ...prev, groups: [] }))
  }

  // Context value
  const value: GroupContextType = {
    ...state,
    fetchGroups,
    addGroup,
    removeGroup,
    clearGroups
  }

  return (
    <GroupsContext.Provider value={value}>
      {children}
    </GroupsContext.Provider>
  )
}

/**
 * Custom hook to use the groups context
 * @returns GroupContextType
 */
export function useGroups() {
  const context = useContext(GroupsContext)
  
  if (context === undefined) {
    throw new Error("useGroups must be used within a GroupsProvider")
  }
  
  return context
} 