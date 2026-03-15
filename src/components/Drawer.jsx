import React, { useState } from 'react'
import './Drawer.css'

const Drawer = ({ restaurant, onClose, onAddToTodo, isInTodo, onGoToDraw }) => {
  const [activeTab, setActiveTab] = useState('menu')
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewContent, setReviewContent] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleAddToTodo = () => {
    onAddToTodo(restaurant)
    setShowSuccessModal(true)
  }

  const handleSubmitReview = () => {
    // 这里可以添加提交评价的逻辑
    console.log('提交评价:', { rating: reviewRating, content: reviewContent })
    setShowReviewForm(false)
    setReviewContent('')
    setReviewRating(5)
  }

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* 顶部关闭条 */}
        <div className="drawer-header">
          <div className="drawer-handle"></div>
        </div>

        {/* 餐厅信息 */}
        <div className="restaurant-info">
          <h2 className="restaurant-name">{restaurant.name}</h2>
          <div className="restaurant-meta">
            <span className={`status-badge ${restaurant.status === 'open' ? 'open' : 'closed'}`}>
              {restaurant.status === 'open' ? '营业中' : '已打烊'}
            </span>
            <span className="meta-item">{restaurant.hours}</span>
            <span className="meta-item">{restaurant.price}</span>
            <span className="meta-item">{restaurant.distance}</span>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="action-buttons">
          <button 
            className="secondary-btn"
            onClick={() => setShowReviewForm(true)}
          >
            添加评价
          </button>
          <button 
            className={`primary-btn ${isInTodo ? 'added' : ''}`}
            onClick={handleAddToTodo}
            disabled={isInTodo}
          >
            {isInTodo ? '已加入' : '加入待选名单'}
          </button>
        </div>

        {/* Tab切换 */}
        <div className="tab-container">
          <div className="tab-buttons">
            <button 
              className={`tab-button ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveTab('menu')}
            >
              菜单与实拍
            </button>
            <button 
              className={`tab-button ${activeTab === 'review' ? 'active' : ''}`}
              onClick={() => setActiveTab('review')}
            >
              实时评价
            </button>
          </div>

          {/* Tab内容 */}
          <div className="tab-content">
            {activeTab === 'menu' && (
              <div className="menu-tab">
                <div className="image-slider">
                  {restaurant.images.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image} alt={`${restaurant.name} 图片 ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'review' && (
              <div className="review-tab">
                {restaurant.reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <span className="review-user">{review.user}</span>
                      <div className="review-rating">
                        {[...Array(5)].map((_, index) => (
                          <span key={index} className={index < review.rating ? 'star active' : 'star'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="review-content">{review.content}</p>
                    <span className="review-time">{review.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 评价表单 */}
      {showReviewForm && (
        <div className="review-form-overlay" onClick={() => setShowReviewForm(false)}>
          <div className="review-form-container" onClick={(e) => e.stopPropagation()}>
            <h3>添加评价</h3>
            <div className="rating-container">
              <span>评分：</span>
              <div className="rating-stars">
                {[...Array(5)].map((_, index) => (
                  <span 
                    key={index} 
                    className={`star ${index < reviewRating ? 'active' : ''}`}
                    onClick={() => setReviewRating(index + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <textarea
              placeholder="这家店味道如何？排队久吗？"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              className="review-textarea"
            ></textarea>
            <div className="form-buttons">
              <button 
                className="secondary-btn"
                onClick={() => setShowReviewForm(false)}
              >
                取消
              </button>
              <button 
                className="primary-btn"
                onClick={handleSubmitReview}
              >
                发送评价
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 成功提示弹窗 */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h3>已将 {restaurant.name} 加入待选列表！</h3>
            <div className="modal-buttons">
              <button 
                className="secondary-btn"
                onClick={() => {
                  setShowSuccessModal(false)
                  onClose()
                }}
              >
                继续逛逛
              </button>
              <button 
                className="primary-btn"
                onClick={() => {
                  setShowSuccessModal(false)
                  onClose()
                  onGoToDraw()
                }}
              >
                去选吃的
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Drawer