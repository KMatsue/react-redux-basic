import React, { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { User, fetchAsyncGet, selectUsers } from "./fetchSlice"
import { useSelector } from "react-redux"

const Fetch = () => {
  const dispatch = useAppDispatch()
  const users = useSelector(selectUsers)
  useEffect(() => {
    dispatch(fetchAsyncGet())
  }, [dispatch])

  return (
    <div>
      {users.map((user: User) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  )
}

export default Fetch
