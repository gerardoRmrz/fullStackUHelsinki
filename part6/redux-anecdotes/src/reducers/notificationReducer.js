import { createSlice } from "@reduxjs/toolkit"

const initialNotification = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotification,
  reducers: {
    voteNotification(state, action) {
      //console.log('Notification: ', action)
      return `you voted "${action.payload.content}"`
    },
    newAnecdoteNotification(state, action) {
      console.log('Notification: ', action)
      return `you added "${action.payload}"`
    },
  }
})

export const { voteNotification, newAnecdoteNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer