import React, { useState } from 'react'
import './DrawCardPage.css'

const DrawCardPage = ({ todoList, onGoToMap, onClearTodoList }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const [isShaking, setIsShaking] = useState(false)

  const handleDrawCard = () => {
    if (todoList.length < 2) return
    
    setIsDrawing(true)
    setShowResult(false)
    setIsShaking(true)
    
    // 模拟抽卡动画
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * todoList.length)
      setSelectedRestaurant(todoList[randomIndex])
      setIsDrawing(false)
      setIsShaking(false)
      setShowResult(true)
    }, 1500)
  }

  const handleConfirmSelection = () => {
    setShowConfetti(true)
    // 3秒后关闭庆祝动画
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  const handleRedraw = () => {
    setShowResult(false)
    setSelectedRestaurant(null)
  }

  return (
    <div className="draw-card-page">
      {/* 顶部导航 */}
      <div className="draw-card-header">
        <button className="back-button" onClick={onGoToMap}>
          ←
        </button>
        <h1 className="draw-card-title">今天吃什么？交由天定吧！</h1>
      </div>

      {/* 待选列表 */}
      <div className="todo-list-section">
        <div className="section-header">
          <h2 className="section-title">待选餐厅</h2>
          {todoList.length > 0 && (
            <button 
              className="clear-button"
              onClick={onClearTodoList}
            >
              一键清除
            </button>
          )}
        </div>
        {todoList.length < 2 ? (
          <div className="todo-list-empty">
            至少添加2家餐厅才能抽卡哦~
          </div>
        ) : (
          <div className="todo-list-tags">
            {todoList.map((restaurant) => (
              <div key={restaurant.id} className="todo-tag">
                {restaurant.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 抽卡区域 */}
      <div className="draw-card-section">
        <div className={`card-container ${isShaking ? 'shake' : ''} ${showResult ? 'flip' : ''}`}>
          {!showResult ? (
            <div className="card-back">
              <div className="question-mark">?</div>
            </div>
          ) : (
            <div className="card-front">
              {selectedRestaurant && (
                <>
                  <img 
                    src={selectedRestaurant.images[0]} 
                    alt={selectedRestaurant.name}
                    className="restaurant-image"
                  />
                  <h3 className="selected-restaurant-name">{selectedRestaurant.name}</h3>
                  <p className="draw-message">就决定是你了！</p>
                </>
              )}
            </div>
          )}
        </div>

        <button 
          className="draw-button"
          onClick={handleDrawCard}
          disabled={todoList.length < 2 || isDrawing}
        >
          {isDrawing ? '抽卡中...' : '点击抽卡！'}
        </button>
      </div>

      {/* 抽卡结果操作 */}
      {showResult && selectedRestaurant && (
        <div className="result-actions">
          <button 
            className="secondary-btn"
            onClick={handleRedraw}
          >
            不满意，重抽
          </button>
          <button 
            className="primary-btn"
            onClick={handleConfirmSelection}
          >
            就是这家了
          </button>
        </div>
      )}

      {/* 庆祝动画 */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, index) => (
            <div 
              key={index} 
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#FF6C37', '#FFB800', '#4CAF50', '#2196F3', '#9C27B0'][Math.floor(Math.random() * 5)]
              }}
            ></div>
          ))}
        </div>
      )}

      {/* 餐厅地址 */}
      {showResult && selectedRestaurant && (
        <div className="restaurant-address">
          <h3>地址信息</h3>
          <p>距离：{selectedRestaurant.distance}</p>
          <p>地址：{selectedRestaurant.address}</p>
        </div>
      )}
    </div>
  )
}

export default DrawCardPage