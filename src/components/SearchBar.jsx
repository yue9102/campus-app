import React, { useState, useEffect } from 'react'
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('')

  // 当搜索文本变化时，自动触发搜索
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchText)
    }, 300) // 300ms防抖

    return () => clearTimeout(timer)
  }, [searchText, onSearch])

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchText)
  }

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="搜索餐厅、美食..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>
    </div>
  )
}

export default SearchBar