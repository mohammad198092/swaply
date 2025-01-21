export const products = [
  {
    id: 1,
    title: "آيفون 14 برو ماكس",
    price: 4999,
    image: "https://images.unsplash.com/photo-1632661674596-618d8b34be07",
    images: [
      "https://images.unsplash.com/photo-1632661674596-618d8b34be07",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a",
      "https://images.unsplash.com/photo-1592286927505-1def25115558"
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
    title: "قطة شيرازي صغيرة",
    price: 1500,
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    images: [
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8"
    ],
    description: "قطة شيرازي جميلة، عمرها 3 أشهر، تم تطعيمها بالكامل",
    isNew: true,
    isExchangeable: false,
    status: 'available' as const,
    seller: {
      id: 2,
      name: "سارة أحمد",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.9
    }
  },
  {
    id: 3,
    title: "دراجة هوائية جبلية",
    price: 2999,
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91",
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e"
    ],
    description: "دراجة هوائية للمغامرات الجبلية، حالة ممتازة",
    discount: 15,
    isExchangeable: true,
    exchangeDescription: "دراجة كهربائية",
    status: 'available' as const,
    seller: {
      id: 3,
      name: "خالد عمر",
      avatar: "https://images.unsplash.com/photo-1506794778160-0c170b8c3c8b",
      rating: 4.7
    }
  },
  {
    id: 4,
    title: "كاميرا كانون احترافية",
    price: 3500,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39"
    ],
    description: "كاميرا احترافية مع عدسات متعددة وحقيبة حمل",
    isNew: true,
    status: 'available' as const,
    seller: {
      id: 4,
      name: "ليلى حسن",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      rating: 4.6
    }
  },
  {
    id: 5,
    title: "ساعة أبل الجيل الثامن",
    price: 1999,
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    description: "ساعة ذكية بحالة ممتازة مع جميع الملحقات",
    discount: 20,
    status: 'available' as const,
    seller: {
      id: 5,
      name: "عمر سعيد",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      rating: 4.5
    }
  },
  {
    id: 6,
    title: "لابتوب ماك برو M2",
    price: 8999,
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
    description: "لابتوب احترافي مع معالج M2 وذاكرة 16GB",
    isNew: true,
    status: 'available' as const,
    seller: {
      id: 6,
      name: "نورا علي",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      rating: 4.8
    }
  },
  {
    id: 7,
    title: "سماعات سوني لاسلكية",
    price: 899,
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
    description: "سماعات لاسلكية مع خاصية إلغاء الضوضاء",
    discount: 10,
    status: 'available' as const,
    seller: {
      id: 7,
      name: "محمد أحمد",
      avatar: "https://images.unsplash.com/photo-1506794778160-0c170b8c3c8b",
      rating: 4.7
    }
  },
  {
    id: 8,
    title: "طاولة خشبية فاخرة",
    price: 2500,
    image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    description: "طاولة طعام خشبية مع 6 كراسي، صناعة يدوية",
    isExchangeable: true,
    exchangeDescription: "طاولة مماثلة أو أثاث منزلي",
    status: 'available' as const,
    seller: {
      id: 8,
      name: "فاطمة محمود",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.9
    }
  },
  {
    id: 9,
    title: "جهاز تلفاز سامسونج 65 بوصة",
    price: 4999,
    image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    description: "تلفاز ذكي QLED مع دقة 4K وتقنية HDR",
    discount: 15,
    status: 'available' as const,
    seller: {
      id: 9,
      name: "ياسر علي",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      rating: 4.6
    }
  },
  {
    id: 10,
    title: "دراجة نارية هوندا",
    price: 15000,
    image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369",
    description: "دراجة نارية بحالة ممتازة، موديل 2022",
    isExchangeable: true,
    exchangeDescription: "سيارة صغيرة",
    status: 'available' as const,
    seller: {
      id: 10,
      name: "عبدالله محمد",
      avatar: "https://images.unsplash.com/photo-1506794778160-0c170b8c3c8b",
      rating: 4.8
    }
  },
  {
    id: 11,
    title: "آيباد برو 2023",
    price: 3999,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "آيباد برو مع قلم آبل وكيبورد ماجيك",
    isNew: true,
    status: 'available' as const,
    seller: {
      id: 11,
      name: "ريم سعد",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.7
    }
  },
  {
    id: 12,
    title: "كونسول بلايستيشن 5",
    price: 2299,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    description: "جهاز PS5 مع يدين تحكم وثلاث ألعاب",
    discount: 10,
    status: 'available' as const,
    seller: {
      id: 12,
      name: "طارق حسين",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      rating: 4.9
    }
  },
  {
    id: 13,
    title: "غسالة سامسونج ذكية",
    price: 3499,
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
    description: "غسالة ملابس ذكية مع تجفيف، سعة 12 كجم",
    isNew: true,
    status: 'available' as const,
    seller: {
      id: 13,
      name: "منى أحمد",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.8
    }
  },
  {
    id: 14,
    title: "مكيف سبليت LG",
    price: 2799,
    image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
    description: "مكيف هواء انفرتر موفر للطاقة",
    discount: 15,
    status: 'available' as const,
    seller: {
      id: 14,
      name: "سعد محمد",
      avatar: "https://images.unsplash.com/photo-1506794778160-0c170b8c3c8b",
      rating: 4.6
    }
  },
  {
    id: 15,
    title: "ثلاجة هيتاشي",
    price: 4999,
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    description: "ثلاجة باب فرنسي مع موزع مياه وثلج",
    isExchangeable: true,
    exchangeDescription: "ثلاجة مماثلة",
    status: 'available' as const,
    seller: {
      id: 15,
      name: "هدى علي",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.7
    }
  },
  {
    id: 16,
    title: "طقم كنب جلد",
    price: 5999,
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
    description: "طقم كنب جلد إيطالي، 7 مقاعد",
    isNew: true,
    status: 'available' as const,
    seller: {
      id: 16,
      name: "عمر خالد",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      rating: 4.8
    }
  },
  {
    id: 17,
    title: "مكتب خشبي فاخر",
    price: 1999,
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
    description: "مكتب خشبي مع رفوف ووحدات تخزين",
    discount: 20,
    status: 'available' as const,
    seller: {
      id: 17,
      name: "لينا سعيد",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.9
    }
  },
  {
    id: 18,
    title: "دراجة هوائية كهربائية",
    price: 3999,
    image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    description: "دراجة كهربائية مع بطارية تدوم 8 ساعات",
    isExchangeable: true,
    exchangeDescription: "دراجة نارية صغيرة",
    status: 'available' as const,
    seller: {
      id: 18,
      name: "فيصل عمر",
      avatar: "https://images.unsplash.com/photo-1506794778160-0c170b8c3c8b",
      rating: 4.7
    }
  },
  {
    id: 19,
    title: "جهاز عرض 4K",
    price: 2999,
    image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    description: "بروجكتور 4K مع شاشة عرض 100 بوصة",
    isNew: true,
    status: 'available' as const,
    seller: {
      id: 19,
      name: "رانيا محمد",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.8
    }
  },
  {
    id: 20,
    title: "مكنسة روبوت ذكية",
    price: 1499,
    image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369",
    description: "مكنسة روبوت مع خرائط ذكية وتحكم عن بعد",
    discount: 10,
    status: 'available' as const,
    seller: {
      id: 20,
      name: "سلمى حسن",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      rating: 4.6
    }
  },
  {
    id: 21,
    title: "ساعة رولكس أصلية",
    price: 75000,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "ساعة رولكس سبمارينر، إصدار محدود",
    isExchangeable: true,
    exchangeDescription: "ساعة باتيك فيليب",
    status: 'available' as const,
    seller: {
      id: 21,
      name: "طلال محمد",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      rating: 4.9
    }
  },
  {
    id: 22,
    title: "كاميرا درون DJI",
    price: 4999,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    description: "درون احترافي مع كاميرا 4K وحقيبة حمل",
    isNew: true,
    status: 'available' as const,
    seller: {
      id: 22,
      name: "ماجد سعيد",
      avatar: "https://images.unsplash.com/photo-1506794778160-0c170b8c3c8b",
      rating: 4.8
    }
  },
  {
    id: 23,
    title: "جيتار كهربائي فيندر",
    price: 3999,
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
    description: "جيتار فيندر ستراتوكاستر مع مكبر صوت",
    discount: 15,
    status: 'available' as const,
    seller: {
      id: 23,
      name: "كريم أحمد",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      rating: 4.7
    }
  },
  {
    id: 24,
    title: "نظارة راي بان",
    price: 899,
    image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
    description: "نظارة شمسية راي بان أفياتور أصلية",
    isNew: true,
    status: 'available' as const,
    seller: {
      id: 24,
      name: "دانا خالد",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.8
    }
  },
  {
    id: 25,
    title: "حقيبة لويس فيتون",
    price: 12999,
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    description: "حقيبة لويس فيتون أصلية، إصدار محدود",
    isExchangeable: true,
    exchangeDescription: "حقيبة شانيل",
    status: 'available' as const,
    seller: {
      id: 25,
      name: "ريم عمر",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.9
    }
  },
  {
    id: 26,
    title: "سكوتر كهربائي",
    price: 1999,
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
    description: "سكوتر كهربائي مع بطارية طويلة العمر",
    discount: 20,
    status: 'available' as const,
    seller: {
      id: 26,
      name: "باسل محمد",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      rating: 4.6
    }
  },
  {
    id: 27,
    title: "طابعة ثلاثية الأبعاد",
    price: 2499,
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
    description: "طابعة 3D احترافية مع خامات طباعة",
    isNew: true,
    status: 'available' as const,
    seller: {
      id: 27,
      name: "عادل سعيد",
      avatar: "https://images.unsplash.com/photo-1506794778160-0c170b8c3c8b",
      rating: 4.8
    }
  },
  {
    id: 28,
    title: "آلة قهوة بريفيل",
    price: 3499,
    image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    description: "آلة قهوة احترافية مع مطحنة مدمجة",
    discount: 10,
    status: 'available' as const,
    seller: {
      id: 28,
      name: "لمى حسن",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.7
    }
  },
  {
    id: 29,
    title: "سماعات آبل AirPods Pro",
    price: 999,
    image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    description: "سماعات لاسلكية مع إلغاء الضوضاء النشط",
    isNew: true,
    status: 'available' as const,
    seller: {
      id: 29,
      name: "نادر علي",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      rating: 4.9
    }
  },
  {
    id: 30,
    title: "كرسي مكتب ارجونومي",
    price: 1499,
    image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369",
    description: "كرسي مكتب مريح مع دعم كامل للظهر",
    discount: 15,
    status: 'available' as const,
    seller: {
      id: 30,
      name: "سمر محمد",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.8
    }
  }
];