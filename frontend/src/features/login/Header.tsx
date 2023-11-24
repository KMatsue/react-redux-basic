import React from "react"
import styles from "./Header.module.css"
import { useAppSelector } from "../../app/hooks"
import { selectProfile } from "./loginSlice"

const Header: React.FC = () => {
  const profile = useAppSelector(selectProfile)
  return (
    <div className={styles.header}>
      <h3>{profile.username}</h3>
      <h1>Today's task</h1>
    </div>
  )
}

export default Header
