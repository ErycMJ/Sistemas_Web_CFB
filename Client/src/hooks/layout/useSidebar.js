import { useState } from "react"

export const useSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(true)

  const toggleSidebar = () => {
    setIsMinimized((prev) => !prev)
  }

  return {
    isMinimized,
    toggleSidebar,
  }
}
