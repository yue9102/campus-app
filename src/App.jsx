import { useState } from 'react'
import './App.css'
import MapComponent from './components/MapComponent'
import Drawer from './components/Drawer'
import SearchBar from './components/SearchBar'
import TodoList from './components/TodoList'
import DrawCardPage from './components/DrawCardPage'

function App() {
  const [currentPage, setCurrentPage] = useState('map') // 'map' or 'draw'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [todoList, setTodoList] = useState([])
  const [showDrawer, setShowDrawer] = useState(false)
  const [searchText, setSearchText] = useState('')

  // 处理餐厅点击事件
  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant)
    setShowDrawer(true)
  }

  // 处理搜索
  const handleSearch = (text) => {
    setSearchText(text)
  }

  // 处理加入待选列表
  const handleAddToTodo = (restaurant) => {
    if (!todoList.some(item => item.id === restaurant.id)) {
      setTodoList([...todoList, restaurant])
    }
  }

  // 处理从待选列表移除
  const handleRemoveFromTodo = (restaurantId) => {
    setTodoList(todoList.filter(item => item.id !== restaurantId))
  }

  // 切换到抽卡页面
  const handleGoToDraw = () => {
    setCurrentPage('draw')
  }

  // 切换回地图页面
  const handleGoToMap = () => {
    setCurrentPage('map')
  }

  // 清除待选列表
  const handleClearTodoList = () => {
    setTodoList([])
  }

  return (
    <div className="app">
      {currentPage === 'map' ? (
        <div className="map-page">
          {/* 地图组件 */}
          <MapComponent 
            onRestaurantClick={handleRestaurantClick} 
            searchText={searchText}
            todoList={todoList}
          />
          
          {/* 顶部搜索框 */}
          <SearchBar onSearch={handleSearch} />
          
          {/* 底部待选列表浮窗 */}
          <TodoList 
            count={todoList.length} 
            onGoToDraw={handleGoToDraw} 
          />
          
          {/* 底部抽屉 */}
          {showDrawer && selectedRestaurant && (
            <Drawer 
              restaurant={selectedRestaurant} 
              onClose={() => setShowDrawer(false)}
              onAddToTodo={handleAddToTodo}
              isInTodo={todoList.some(item => item.id === selectedRestaurant.id)}
              onGoToDraw={handleGoToDraw}
            />
          )}
        </div>
      ) : (
        <DrawCardPage 
          todoList={todoList} 
          onGoToMap={handleGoToMap} 
          onClearTodoList={handleClearTodoList}
        />
      )}
    </div>
  )
}

export default App
