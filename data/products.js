export const categories = [
  { id: 'all', name: 'All Products', count: 12 },
  { id: 'audio', name: 'Premium Audio', count: 3 },
  { id: 'wearables', name: 'Wearables & Smart', count: 3 },
  { id: 'computing', name: 'Pro Computing', count: 3 },
  { id: 'optics', name: 'Smart Optics & Vision', count: 2 },
  { id: 'accessories', name: 'Lifestyle & Power', count: 1 },
];

export const products = [
  {
    id: 'prod-1',
    name: 'Aether Sonic Pro ANC Headphones',
    tagline: 'Spatial Audio & 45dB Active Noise Cancellation',
    category: 'audio',
    categoryName: 'Premium Audio',
    price: 349,
    originalPrice: 429,
    rating: 4.9,
    reviewsCount: 384,
    stock: 14,
    badge: 'BESTSELLER',
    badgeColor: 'blue',
    isFeatured: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Immerse yourself in acoustic perfection. The Aether Sonic Pro features custom beryllium 40mm drivers, industry-leading adaptive noise cancellation, transparency mode, and up to 60 hours of high-fidelity playback.',
    features: [
      'Custom 40mm Beryllium dynamic transducers',
      'Hybrid ANC with 8 precision beamforming microphones',
      '60-hour extended battery life with USB-C quick charge (5 min = 4 hrs)',
      'Multipoint Bluetooth 5.4 with LDAC & aptX Lossless',
      'Memory foam earcups wrapped in aerospace-grade vegan leather'
    ],
    specs: {
      'Frequency Response': '4 Hz - 48,000 Hz',
      'Battery Life': '60 Hours (ANC On)',
      'Weight': '255g',
      'Connectivity': 'Bluetooth 5.4, 3.5mm, USB-C Audio',
      'Warranty': '2-Year Global Protection'
    }
  },
  {
    id: 'prod-2',
    name: 'Chronos Apex Titanium Smartwatch',
    tagline: 'Sapphire Crystal • Dual-Frequency GPS • 100m Water Resistant',
    category: 'wearables',
    categoryName: 'Wearables & Smart',
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviewsCount: 219,
    stock: 8,
    badge: 'HOT DEAL',
    badgeColor: 'amber',
    isFeatured: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Forged from Grade 5 aerospace titanium with an ultra-bright 2,000-nit AMOLED display protected by synthetic sapphire. Continuous ECG, blood oxygen, sleep stage tracking, and dual-band GPS.',
    features: [
      'Grade 5 Titanium bezel with DLC scratch-resistant coating',
      '1.43" Ultra-Bright LTPO AMOLED Display (2,000 nits peak)',
      'Advanced biometric sensors: ECG, SpO2, HRV & Skin Temperature',
      'Dual-frequency GNSS tracking with offline topographic maps',
      '14-day standard battery life / 48 hours in continuous GPS mode'
    ],
    specs: {
      'Case Material': 'Grade 5 Titanium & Ceramic',
      'Water Resistance': '10 ATM (100 Meters)',
      'Battery Life': '14 Days regular / 48h GPS',
      'Sensors': 'ECG, PPG, SpO2, Barometer, Compass',
      'Weight': '52g (without strap)'
    }
  },
  {
    id: 'prod-3',
    name: 'CyberDesk Pro 75% Mechanical Keyboard',
    tagline: 'CNC Anodized Aluminum • Hot-Swappable • Tri-Mode Wireless',
    category: 'computing',
    categoryName: 'Pro Computing',
    price: 219,
    originalPrice: 259,
    rating: 4.9,
    reviewsCount: 165,
    stock: 19,
    badge: 'NEW ARRIVAL',
    badgeColor: 'emerald',
    isFeatured: true,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'An acoustic and tactile triumph. Precision-milled from a single block of 6063 aluminum with gasket-mount dampening, south-facing RGB per-key backlighting, and pre-lubed mechanical switches.',
    features: [
      'CNC anodized 6063 dark navy aluminum chassis',
      'Gasket mounted with five-layer poron sound dampening',
      'Pre-lubed custom magnetic Hall effect linear switches',
      'Tri-mode connectivity: 2.4GHz low latency, Bluetooth 5.1 & Type-C',
      'Custom PBT doubleshot keycaps with shine-through legends'
    ],
    specs: {
      'Layout': '75% Compact (82 Keys)',
      'Battery': '4,000 mAh Rechargeable (Up to 200 hours)',
      'Polling Rate': '1000Hz (2.4GHz / Wired)',
      'Switch Type': 'Hot-Swappable Pre-Lubed Mechanical',
      'Weight': '1.35 kg'
    }
  },
  {
    id: 'prod-4',
    name: 'Vision X Smart AR Audio Glasses',
    tagline: 'Polarized Carl Zeiss Lenses • Open-Ear Acoustic Beamforming',
    category: 'optics',
    categoryName: 'Smart Optics & Vision',
    price: 289,
    originalPrice: 349,
    rating: 4.7,
    reviewsCount: 94,
    stock: 6,
    badge: 'INNOVATION',
    badgeColor: 'blue',
    isFeatured: true,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Merge seamless digital life with real-world clarity. Discreet open-ear directional audio gives you crystal clear calls, music, and AI voice assistance without blocking outside sounds.',
    features: [
      'Carl Zeiss UV400 polarized anti-glare scratchproof optics',
      'Directional acoustic transducers preventing sound leakage',
      'Integrated touch sensor navigation and voice command activation',
      'IP54 dust and splash resistant lightweight frame',
      'Dual noise-filtering MEMS microphones for high-clarity calls'
    ],
    specs: {
      'Weight': '39g',
      'Battery Life': '8 Hours continuous audio / 48h standby',
      'Lenses': 'Polarized Zeiss Cat. 3 UV400',
      'Water Rating': 'IP54 Water / Sweat Resistant',
      'Bluetooth': 'v5.3 Low Energy'
    }
  },
  {
    id: 'prod-5',
    name: 'Nova Pro Wireless Studio Earbuds',
    tagline: 'Lossless Hi-Res Audio • Dual Drivers • Qi Wireless Case',
    category: 'audio',
    categoryName: 'Premium Audio',
    price: 189,
    originalPrice: 229,
    rating: 4.8,
    reviewsCount: 420,
    stock: 22,
    badge: 'POPULAR',
    badgeColor: 'blue',
    isFeatured: false,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Engineered for audiophiles on the move. Dual coaxial drivers separate punchy sub-bass from sparkling highs, while smart pressure-relief vents ensure all-day comfort.',
    features: [
      'Coaxial dual driver system (11mm bass woofer + 6mm planar tweeter)',
      'Adaptive 50dB noise cancellation with real-time ear canal calibration',
      '38 hours total listening time with wireless charging case',
      'Ultra-low 40ms gaming mode latency',
      'Custom EQ personalization via mobile companion app'
    ],
    specs: {
      'Battery Life': '9 Hours earbuds / 38 Hours with case',
      'Charging': 'USB-C + Qi Wireless Charging',
      'Drivers': '11mm Dynamic + 6mm Planar',
      'Codecs': 'LDAC, AAC, SBC',
      'Water Resistance': 'IPX5'
    }
  },
  {
    id: 'prod-6',
    name: 'Horizon Smart Health & Sleep Ring',
    tagline: 'Ultralight Titanium • Continuous Bio-Monitoring • 7-Day Battery',
    category: 'wearables',
    categoryName: 'Wearables & Smart',
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviewsCount: 178,
    stock: 12,
    badge: 'TRENDING',
    badgeColor: 'emerald',
    isFeatured: true,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Unobtrusive precision health monitoring on your finger. Tracks deep, REM, and light sleep, body temperature variations, cardiovascular fitness, and stress index with medical-grade sensors.',
    features: [
      'Seamless non-allergenic medical titanium outer shell with PVD dark finish',
      'Zero subscription fees - full data analytics included forever',
      'Sub-millimeter infrared optical sensors for precise pulse monitoring',
      'Up to 7 days continuous use on a single 30-minute magnetic charge',
      'Water resistant down to 100 meters (swim and dive safe)'
    ],
    specs: {
      'Material': 'Medical-Grade Titanium & Resin',
      'Weight': '4 to 6 grams (size dependent)',
      'Battery': '7 Days with fast magnetic dock',
      'Sensors': 'Infrared PPG, NTC temperature sensor, 3D accelerometer',
      'Water Resistance': '10 ATM (100m)'
    }
  },
  {
    id: 'prod-7',
    name: 'Orbit Precision Ergonomic Mouse',
    tagline: '32,000 DPI Optical Sensor • MagSpeed Scroll • Silent Click',
    category: 'computing',
    categoryName: 'Pro Computing',
    price: 129,
    originalPrice: 149,
    rating: 4.8,
    reviewsCount: 288,
    stock: 25,
    badge: 'PRODUCTIVITY',
    badgeColor: 'blue',
    isFeatured: false,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Engineered for coders, designers, and power users. Hand-sculpted ergonomic profile with electromagnetic stainless steel MagSpeed scroll wheel that scrolls 1,000 lines in 1 second.',
    features: [
      'Darkfield high-precision 32,000 DPI sensor tracks on any surface, even glass',
      'Whisper-quiet acoustic dampeners for 90% quieter clicks',
      'Seamless flow control between 3 computers across Windows and Mac',
      'Custom thumb gesture button and secondary horizontal scroll wheel',
      'Up to 70 days power on full charge, 3 hours from 1-minute charge'
    ],
    specs: {
      'Sensor': 'Darkfield Laser 32,000 DPI',
      'Battery': 'Rechargeable Li-Po (500 mAh)',
      'Connectivity': 'Bluetooth Low Energy & 2.4GHz Dongle',
      'Buttons': '7 Customizable Macro Buttons',
      'Weight': '141g'
    }
  },
  {
    id: 'prod-8',
    name: 'Halo Ambient Lumina Light Bar',
    tagline: 'Asymmetric Optical Design • Auto Dimming • Wireless Control Knob',
    category: 'optics',
    categoryName: 'Smart Optics & Vision',
    price: 149,
    originalPrice: 179,
    rating: 4.7,
    reviewsCount: 112,
    stock: 15,
    badge: 'DESK UPGRADE',
    badgeColor: 'blue',
    isFeatured: false,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Illuminate your workspace without screen glare. Features weighted magnetic counter-balance mounting, smart ambient light sensor, and an elegant wireless rotary dial controller.',
    features: [
      'Patented asymmetrical optical projection eliminates screen reflection',
      'Integrated real-time ambient lux sensor for intelligent auto-dimming',
      'Die-cast aluminum wireless desktop controller knob with smooth rotation',
      'Adjustable color temperature from warm 2700K to focused 6500K daylight',
      'Rear back-light RGB ambient glow for immersive wall lighting'
    ],
    specs: {
      'CRI': 'Ra ≥ 95 Color Rendering Index',
      'Illuminance': 'Center 1000 Lux at 45cm',
      'Power Source': 'USB Type-C (5V / 2A)',
      'Dimensions': '500mm x 22mm x 125mm',
      'Compatibility': 'Curved and flat monitors 1-5cm thickness'
    }
  },
  {
    id: 'prod-9',
    name: 'MagPower 3-in-1 Carbon Charging Station',
    tagline: '15W Fast Magnetic Wireless • Foldable Travel Design • MFi Certified',
    category: 'accessories',
    categoryName: 'Lifestyle & Power',
    price: 119,
    originalPrice: 149,
    rating: 4.9,
    reviewsCount: 310,
    stock: 18,
    badge: 'ESSENTIAL',
    badgeColor: 'blue',
    isFeatured: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Streamline your nightstand and travel pack. Concurrently fast-charges your smartphone, smartwatch, and wireless earbuds with aerospace carbon fiber accents and fold-flat hinges.',
    features: [
      'Simultaneous charging for Phone (15W), Watch (5W), and Earbuds (5W)',
      'Foldable dual-hinge architecture rotates 180° for ultra-compact packing',
      'Powerful N52 neodymium magnetic alignment with standby mode support',
      'Intelligent thermal management with active over-voltage safeguards',
      'Braided 1.5m 65W silicone cable and compact GaN power adapter included'
    ],
    specs: {
      'Output': '25W Max Concurrent Output',
      'Materials': 'Matte Anodized Aluminum & Carbon Fiber Panel',
      'Input': 'USB-C PD 3.0 (30W minimum recommended)',
      'Dimensions Folded': '70 x 70 x 24 mm',
      'Weight': '195g'
    }
  },
  {
    id: 'prod-10',
    name: 'Nebula 4K Laser Cinema Projector',
    tagline: '3000 ANSI Lumens • Dolby Vision & Atmos • Android TV 11',
    category: 'optics',
    categoryName: 'Smart Optics & Vision',
    price: 1299,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 78,
    stock: 4,
    badge: 'LUXURY',
    badgeColor: 'amber',
    isFeatured: true,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Transform any wall into a 150-inch cinematic spectacle. Featuring triple-laser ALPD 4.0 projection, 100% BT.2020 color gamut, and dual 20W Harman Kardon tuned speakers.',
    features: [
      'True 4K UHD resolution with 3,000 ANSI lumens ultra-high brightness',
      'ALPD 4.0 RGB+ pure laser engine producing 1.07 billion colors',
      'Instant AI auto-focus, seamless auto-keystone, and obstacle avoidance',
      'Integrated 40W Harman Kardon soundbar with Dolby Atmos decode',
      'HDMI 2.1 eARC with 12ms low latency gaming mode support'
    ],
    specs: {
      'Native Resolution': '3840 x 2160 (4K UHD)',
      'Screen Size Range': '60" - 200" Diagonal',
      'Light Source Life': '25,000 Hours',
      'Audio': 'Dual 20W Harman Kardon Acoustic Chambers',
      'Weight': '4.1 kg'
    }
  },
  {
    id: 'prod-11',
    name: 'Pulse 360 High-Res Studio Monitor',
    tagline: 'Bi-Amplified 80W Acoustic Output • Custom DSP • Balanced XLR',
    category: 'audio',
    categoryName: 'Premium Audio',
    price: 450,
    originalPrice: 520,
    rating: 4.8,
    reviewsCount: 142,
    stock: 9,
    badge: 'STUDIO GRADE',
    badgeColor: 'blue',
    isFeatured: false,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Uncompromising acoustic transparency for creators and music aficionados. Class-D bi-amplification drives a 5.25-inch woven Kevlar woofer and silk dome waveguide tweeter.',
    features: [
      'Custom tuned DSP room acoustic compensation switch',
      'Woven aramid fiber woofer with zero-distortion rubber surround',
      'Elliptical waveguide delivers wide sweet spot and pinpoint stereo imaging',
      'Balanced XLR, 1/4" TRS, and optical lossless inputs',
      'MDF anti-resonance cabinet wrapped in dark midnight satin finish'
    ],
    specs: {
      'Amplifier Power': '80W RMS Bi-Amp Class D',
      'Frequency Response': '38Hz - 22,000Hz',
      'Max SPL': '108 dB @ 1 Meter',
      'Inputs': 'XLR, 1/4" TRS, RCA, Optical',
      'Dimensions': '280 x 180 x 220 mm'
    }
  },
  {
    id: 'prod-12',
    name: 'Aero Carbon Ultra Laptop Stand',
    tagline: 'Unibody Carbon Fiber • Ergonomic Elevation • Integrated Cable Routing',
    category: 'computing',
    categoryName: 'Pro Computing',
    price: 89,
    originalPrice: 110,
    rating: 4.9,
    reviewsCount: 240,
    stock: 28,
    badge: 'TOP RATED',
    badgeColor: 'emerald',
    isFeatured: false,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Elevate your posture and workspace elegance. Crafted from aerospace-grade woven carbon fiber with micro-suction silicone grip pads to keep any 13"-17" laptop rock solid.',
    features: [
      '100% genuine 3K carbon fiber construction weighing just 320 grams',
      'Perfect 16-degree elevation angle optimizes wrist angle and eye line',
      'Open airflow architecture reduces laptop temperature up to 18%',
      'Integrated rear hidden cable pass-through channel',
      'Resistant to scratches, heat, and drops'
    ],
    specs: {
      'Material': '3K Woven Carbon Fiber & Anodized Aluminum',
      'Compatibility': 'Laptops from 11" to 17.3"',
      'Weight': '320g',
      'Elevation Height': '15 cm',
      'Weight Capacity': 'Up to 15 kg'
    }
  }
];

export const reviews = [
  {
    id: 'rev-1',
    name: 'Marcus Vance',
    role: 'Creative Director at Studio 9',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 days ago',
    product: 'Aether Sonic Pro ANC Headphones',
    content: 'The acoustic tuning on the Aether Sonic Pro is simply out of this world. Deep, punchy bass without overpowering the mids, and the dark blue aesthetic matches my workspace setup impeccably.'
  },
  {
    id: 'rev-2',
    name: 'Elena Rostova',
    role: 'Principal Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 week ago',
    product: 'CyberDesk Pro 75% Mechanical Keyboard',
    content: 'The aluminum finish and dampening acoustics provide the most satisfying typing experience I have ever had. Shipping took only 2 days, and customer support was lightning fast.'
  },
  {
    id: 'rev-3',
    name: 'David K. Liu',
    role: 'Product Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 weeks ago',
    product: 'Horizon Smart Health & Sleep Ring',
    content: 'Light as a feather on my finger, no monthly subscription fees, and battery easily lasts 6-7 days. The dark titanium finish is stunning and durable.'
  }
];

export const promoCodes = {
  'AURA20': { discountPercent: 20, description: '20% Off Storewide' },
  'SAVE10': { discountAmount: 10, description: '$10 Off Orders' },
  'VIP30': { discountPercent: 30, description: '30% VIP Exclusive' },
  'FREESHIP': { freeShipping: true, description: 'Free Express Shipping' }
};
