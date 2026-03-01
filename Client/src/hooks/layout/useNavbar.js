import { useEffect, useRef, useState } from "react"

const getGreeting = () => {
  const currentHour = new Date().getHours()
  if (currentHour < 12) return "Bom dia"
  if (currentHour < 18) return "Boa tarde"
  return "Boa noite"
}

export const useNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false)
  const [notifications] = useState(0)
  const [greeting, setGreeting] = useState("")

  const dropdownRef = useRef(null)
  const notificationDropdownRef = useRef(null)

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
  }

  const toggleNotificationDropdown = () => {
    setNotificationDropdownOpen((prev) => !prev)
  }

  useEffect(() => {
    setGreeting(getGreeting())

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }

      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setNotificationDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return {
    dropdownOpen,
    notificationDropdownOpen,
    notifications,
    greeting,
    dropdownRef,
    notificationDropdownRef,
    setDropdownOpen,
    setNotificationDropdownOpen,
    toggleDropdown,
    toggleNotificationDropdown,
  }
}
