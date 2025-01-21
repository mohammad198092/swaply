export const products = [
  {
    id: 1,
    title: "آيفون 14 برو ماكس",
    price: 4999,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    ],
    description: "هاتف ذكي متطور مع كاميرا احترافية وشاشة عالية الدقة",
    discount: 10,
    isNew: true,
    isExchangeable: true,
    exchangeDescription: "آيفون 13 برو أو ما يعادله",
    status: 'available' as const,
    seller: {
      id: 1,
      name: "أحمد محمد",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      rating: 4.8
    }
  },
  {
    id: 2,
    title: "ماك بوك برو M2",
    price: 8999,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "حاسوب محمول احترافي مع معالج M2 وشاشة Retina",
    isNew: true,
    isExchangeable: true,
    exchangeDescription: "ماك بوك برو 2021 أو ما يعادله",
    status: 'sold' as const,
    seller: {
      id: 2,
      name: "سارة أحمد",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.5
    }
  },
  {
    id: 3,
    title: "سماعات آبل AirPods Pro",
    price: 999,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    description: "سماعات لاسلكية مع خاصية إلغاء الضوضاء",
    discount: 15,
    status: 'available' as const,
    seller: {
      id: 3,
      name: "محمد علي",
      avatar: "https://images.unsplash.com/photo-1506794778160-0c170b8c3c8b",
      rating: 4.7
    }
  },
  {
    id: 4,
    title: "ساعة آبل الإصدار 8",
    price: 1999,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    description: "ساعة ذكية متطورة مع مزايا صحية وتتبع النشاط",
    isNew: true,
    status: 'available' as const,
    seller: {
      id: 4,
      name: "علي حسن",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      rating: 4.6
    }
  },
  {
    id: 5,
    title: "آيباد برو 2023",
    price: 3499,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    description: "جهاز لوحي متطور مثالي للرسم الرقمي والإنتاجية",
    isNew: true,
    discount: 5,
    status: 'available' as const,
    seller: {
      id: 5,
      name: "فاطمة الزهراء",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      rating: 4.9
    }
  },
  {
    id: 6,
    title: "سامسونج جالكسي S23 الترا",
    price: 4799,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    description: "هاتف أندرويد رائد مع كاميرا احترافية وأداء استثنائي",
    isExchangeable: true,
    exchangeDescription: "آيفون 14 برو أو ما يعادله",
    status: 'available' as const,
    seller: {
      id: 6,
      name: "يوسف سعيد",
      avatar: "https://images.unsplash.com/photo-1506794778160-0c170b8c3c8b",
      rating: 4.4
    }
  },
  {
    id: 7,
    title: "سوني بلايستيشن 5",
    price: 2199,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
    description: "منصة ألعاب متطورة مع تحكم لمسي متقدم وجرافيكس عالي الدقة",
    discount: 8,
    status: 'available' as const,
    seller: {
      id: 7,
      name: "علياء محمد",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      rating: 4.8
    }
  },
  {
    id: 8,
    title: "شاومي سمارت تي في 65",
    price: 2899,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
    description: "تلفاز ذكي بشاشة OLED مقاس 65 بوصة ودقة 4K",
    isNew: true,
    discount: 12,
    status: 'available' as const,
    seller: {
      id: 8,
      name: "سالم عبدالله",
      avatar: "https://images.unsplash.com/photo-1506794778160-0c170b8c3c8b",
      rating: 4.5
    }
  }
];