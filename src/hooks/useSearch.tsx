import { useState } from 'react'

const useSearch = () => {
  const [keySearch, setKeySearch] = useState('')

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  const handleBlur = (e: any) => {
    setKeySearch(e.currentTarget.value)
  }

  return {
    keySearch,
    handleKeyDown,
    handleBlur,
  }
}

export default useSearch
