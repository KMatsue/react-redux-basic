import React, { useEffect } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { User, fetchAsyncGet, selectUsers } from "./fetchBasicSlice"
import { useSelector } from "react-redux"

const FetchBasic = () => {
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

export default FetchBasic
