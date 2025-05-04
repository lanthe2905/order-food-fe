import dayjs from "dayjs"
import React from "react"


type  WorkshiftProcessContextType = {
  thang: dayjs.Dayjs
}


export const WorkshiftProcessContext = React.createContext<WorkshiftProcessContextType | null>(null)
