import React, { useState, useEffect } from 'react'
import './MapComponent.css'

const MapComponent = ({ onRestaurantClick, searchText, todoList = [] }) => {
  // 模拟餐厅数据 - 至少20家
  const restaurants = [
    {
      id: 1,
      name: '张亮麻辣烫',
      position: { x: 20, y: 30 },
      status: 'open',
      hours: '10:00-22:00',
      price: '¥25/人',
      distance: '500m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=malatang%20food%20in%20bowl&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=restaurant%20interior&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小明',
          rating: 5,
          content: '味道很好，食材新鲜，推荐！',
          time: '2小时前'
        },
        {
          id: 2,
          user: '小红',
          rating: 4,
          content: '排队有点久，但值得等待',
          time: '昨天'
        }
      ]
    },
    {
      id: 2,
      name: '肯德基',
      position: { x: 60, y: 40 },
      status: 'open',
      hours: '09:00-23:00',
      price: '¥35/人',
      distance: '300m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=KFC%20chicken%20bucket&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=KFC%20restaurant&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小李',
          rating: 4,
          content: '经典口味，服务态度好',
          time: '3小时前'
        }
      ]
    },
    {
      id: 3,
      name: '星巴克',
      position: { x: 40, y: 70 },
      status: 'open',
      hours: '08:00-22:00',
      price: '¥40/人',
      distance: '800m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Starbucks%20coffee&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Starbucks%20store%20interior&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小王',
          rating: 5,
          content: '环境舒适，咖啡好喝',
          time: '1小时前'
        }
      ]
    },
    {
      id: 4,
      name: '麦当劳',
      position: { x: 80, y: 60 },
      status: 'closed',
      hours: '09:00-22:00',
      price: '¥30/人',
      distance: '600m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=McDonald%20burger&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=McDonald%20restaurant&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小张',
          rating: 4,
          content: '快捷方便，性价比高',
          time: '昨天'
        }
      ]
    },
    {
      id: 5,
      name: '海底捞',
      position: { x: 30, y: 50 },
      status: 'open',
      hours: '10:00-02:00',
      price: '¥100/人',
      distance: '1000m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hotpot%20restaurant&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hotpot%20ingredients&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小刘',
          rating: 5,
          content: '服务超级好，食材新鲜',
          time: '4小时前'
        }
      ]
    },
    {
      id: 6,
      name: '必胜客',
      position: { x: 70, y: 30 },
      status: 'open',
      hours: '10:00-22:00',
      price: '¥60/人',
      distance: '400m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Pizza%20Hut%20pizza&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Pizza%20Hut%20restaurant&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小陈',
          rating: 4,
          content: '披萨味道不错，环境优雅',
          time: '5小时前'
        }
      ]
    },
    {
      id: 7,
      name: '眉州东坡',
      position: { x: 15, y: 60 },
      status: 'open',
      hours: '11:00-22:00',
      price: '¥80/人',
      distance: '1200m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20cuisine%20restaurant&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sichuan%20food&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小周',
          rating: 5,
          content: '川菜正宗，分量足',
          time: '昨天'
        }
      ]
    },
    {
      id: 8,
      name: '西贝莜面村',
      position: { x: 85, y: 45 },
      status: 'open',
      hours: '11:00-21:30',
      price: '¥70/人',
      distance: '700m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Northern%20Chinese%20food&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xibei%20restaurant&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小吴',
          rating: 4,
          content: '莜面很好吃，服务周到',
          time: '3小时前'
        }
      ]
    },
    {
      id: 9,
      name: '全聚德',
      position: { x: 45, y: 20 },
      status: 'open',
      hours: '11:00-22:00',
      price: '¥120/人',
      distance: '900m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Peking%20duck&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Quanjude%20restaurant&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小郑',
          rating: 5,
          content: '烤鸭皮脆肉嫩，名不虚传',
          time: '2小时前'
        }
      ]
    },
    {
      id: 10,
      name: '永和大王',
      position: { x: 55, y: 80 },
      status: 'open',
      hours: '06:00-22:00',
      price: '¥20/人',
      distance: '600m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20breakfast&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yonghe%20King%20restaurant&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小赵',
          rating: 4,
          content: '早餐种类多，味道好',
          time: '1小时前'
        }
      ]
    },
    {
      id: 11,
      name: 'DQ冰淇淋',
      position: { x: 25, y: 40 },
      status: 'open',
      hours: '10:00-22:00',
      price: '¥25/人',
      distance: '400m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=DQ%20ice%20cream&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=DQ%20store&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小钱',
          rating: 5,
          content: '冰淇淋口感丝滑，推荐暴风雪',
          time: '3小时前'
        }
      ]
    },
    {
      id: 12,
      name: '味千拉面',
      position: { x: 65, y: 70 },
      status: 'open',
      hours: '10:00-22:00',
      price: '¥40/人',
      distance: '800m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Japanese%20ramen&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ajisen%20Ramen%20restaurant&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小孙',
          rating: 4,
          content: '拉面汤头浓郁，面条劲道',
          time: '4小时前'
        }
      ]
    },
    {
      id: 13,
      name: '吉野家',
      position: { x: 10, y: 30 },
      status: 'open',
      hours: '10:00-22:00',
      price: '¥30/人',
      distance: '300m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yoshinoya%20beef%20bowl&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yoshinoya%20restaurant&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小周',
          rating: 4,
          content: '牛肉饭分量足，味道好',
          time: '2小时前'
        }
      ]
    },
    {
      id: 14,
      name: '真功夫',
      position: { x: 75, y: 85 },
      status: 'open',
      hours: '07:00-22:00',
      price: '¥25/人',
      distance: '700m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20fast%20food&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Zhen%20Gongfu%20restaurant&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小吴',
          rating: 4,
          content: '快餐营养均衡，速度快',
          time: '1小时前'
        }
      ]
    },
    {
      id: 15,
      name: '星巴克 Reserve',
      position: { x: 50, y: 50 },
      status: 'open',
      hours: '08:00-22:00',
      price: '¥50/人',
      distance: '500m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Starbucks%20Reserve%20coffee&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Starbucks%20Reserve%20store&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小陈',
          rating: 5,
          content: ' Reserve系列咖啡口感丰富',
          time: '3小时前'
        }
      ]
    },
    {
      id: 16,
      name: '肯德基甜品站',
      position: { x: 60, y: 20 },
      status: 'open',
      hours: '10:00-22:00',
      price: '¥15/人',
      distance: '400m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=KFC%20dessert&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=KFC%20dessert%20station&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小郑',
          rating: 4,
          content: '甜品种类多，味道不错',
          time: '2小时前'
        }
      ]
    },
    {
      id: 17,
      name: '麦当劳 McCafé',
      position: { x: 85, y: 75 },
      status: 'open',
      hours: '08:00-22:00',
      price: '¥25/人',
      distance: '600m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=McCafe%20coffee&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=McCafe%20counter&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小赵',
          rating: 4,
          content: '咖啡性价比高，环境舒适',
          time: '4小时前'
        }
      ]
    },
    {
      id: 18,
      name: '海底捞火锅',
      position: { x: 35, y: 80 },
      status: 'open',
      hours: '10:00-02:00',
      price: '¥100/人',
      distance: '900m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Haidilao%20hotpot&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Haidilao%20restaurant%20interior&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小孙',
          rating: 5,
          content: '服务超级好，食材新鲜',
          time: '昨天'
        }
      ]
    },
    {
      id: 19,
      name: '必胜客宅急送',
      position: { x: 20, y: 70 },
      status: 'open',
      hours: '10:00-22:00',
      price: '¥60/人',
      distance: '500m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Pizza%20delivery&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Pizza%20Hut%20delivery&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小钱',
          rating: 4,
          content: '配送速度快，披萨热乎',
          time: '1小时前'
        }
      ]
    },
    {
      id: 20,
      name: '眉州东坡小吃',
      position: { x: 70, y: 55 },
      status: 'open',
      hours: '10:00-21:00',
      price: '¥30/人',
      distance: '600m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sichuan%20snacks&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Meizhou%20Dongpo%20snack%20shop&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小周',
          rating: 4,
          content: '小吃种类多，味道正宗',
          time: '3小时前'
        }
      ]
    },
    {
      id: 21,
      name: '西贝莜面村',
      position: { x: 40, y: 30 },
      status: 'open',
      hours: '11:00-21:30',
      price: '¥70/人',
      distance: '400m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Northern%20Chinese%20noodles&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xibei%20restaurant%20interior&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小吴',
          rating: 5,
          content: '莜面很有特色，服务好',
          time: '2小时前'
        }
      ]
    },
    {
      id: 22,
      name: '全聚德烤鸭',
      position: { x: 55, y: 35 },
      status: 'open',
      hours: '11:00-22:00',
      price: '¥120/人',
      distance: '700m',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Peking%20duck%20sliced&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Quanjude%20restaurant%20interior&image_size=square_hd'
      ],
      reviews: [
        {
          id: 1,
          user: '小陈',
          rating: 5,
          content: '烤鸭皮脆肉嫩，值得一试',
          time: '4小时前'
        }
      ]
    }
  ]

  // 过滤餐厅列表
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)
  const [searchCount, setSearchCount] = useState(0)

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredRestaurants(restaurants)
      setSearchCount(0)
    } else {
      const filtered = restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchText.toLowerCase())
      )
      setFilteredRestaurants(filtered)
      setSearchCount(filtered.length)
    }
  }, [searchText, restaurants])

  return (
    <div className="map-container">
      {/* 顶部Logo和Slogan区域 */}
      <div className="top-logo-section">
        <div className="logo-container">
          <div className="app-logo">
            <span className="logo-icon">🍽️</span>
            <h1 className="app-name">校园食探</h1>
          </div>
          <p className="app-slogan">找店看地图，纠结就抽卡</p>
        </div>
      </div>
      
      {/* 搜索结果提示 */}
      {searchCount > 0 && (
        <div className="search-result">
          找到 {searchCount} 家相关餐厅
        </div>
      )}
      
      {/* 地图底图 */}
      <div className="map-background">
        <img 
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=campus%20area%20map%20with%20buildings%20and%20roads&image_size=landscape_16_9" 
          alt="校园地图" 
          className="map-image"
        />
      </div>
      
      {/* 餐厅点位 */}
      {filteredRestaurants.map((restaurant) => {
        const isInTodo = todoList.some(item => item.id === restaurant.id)
        return (
          <div
            key={restaurant.id}
            className={`restaurant-marker ${restaurant.status === 'open' ? 'open' : 'closed'} ${isInTodo ? 'selected' : ''}`}
            style={{
              left: `${restaurant.position.x}%`,
              top: `${restaurant.position.y}%`
            }}
            onClick={() => onRestaurantClick(restaurant)}
          >
            <div className="marker-dot"></div>
            <div className="marker-label">{restaurant.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default MapComponent