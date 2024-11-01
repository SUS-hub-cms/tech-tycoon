export const researchData = {
  CPU: {
    Design: {
      levels: 5,
      description: "Improve CPU architecture",
    },
    Cores: {
      levels: 15,
      description: "Increase max number of cores",
      maxValue: 128,
      specs: [
        { level: 1, value: "1 core", cost: { researchPoints: 10, money: 5000 } },
        { level: 2, value: "2 cores", cost: { researchPoints: 15, money: 10000 } },
        { level: 3, value: "4 cores", cost: { researchPoints: 18, money: 15000 } },
        { level: 4, value: "6 cores", cost: { researchPoints: 20, money: 18000 } },
        { level: 5, value: "8 cores", cost: { researchPoints: 25, money: 20000 } },
        { level: 6, value: "12 cores", cost: { researchPoints: 30, money: 22000 } },
        { level: 7, value: "14 cores", cost: { researchPoints: 35, money: 28000 } },
        { level: 8, value: "20 cores", cost: { researchPoints: 50, money: 30000 } },
        { level: 9, value: "25 cores", cost: { researchPoints: 55, money: 35000 } },
        { level: 10, value: "30 cores", cost: { researchPoints: 58, money: 50000 } },
        { level: 11, value: "35 cores", cost: { researchPoints: 60, money: 52000 } },
        { level: 12, value: "50 cores", cost: { researchPoints: 80, money: 58000 } },
        { level: 13, value: "55 cores", cost: { researchPoints: 85, money: 60000 } },
        { level: 14, value: "85 cores", cost: { researchPoints: 92, money: 70000 } },
        { level: 15, value: "128 cores", cost: { researchPoints: 120, money: 80000 } },
      ]
    },
    Threads: {
      levels: 15,
      description: "Increase max number of threads",
      maxValue: 256,
      specs: [
        { level: 1, value: "2 threads", cost: { researchPoints: 5, money: 2000 } },
        { level: 2, value: "4 threads", cost: { researchPoints: 10, money: 4000 } },
        { level: 3, value: "6 threads", cost: { researchPoints: 12, money: 6000 } },
        { level: 4, value: "8 threads", cost: { researchPoints: 14, money: 8000 } },
        { level: 5, value: "12 threads", cost: { researchPoints: 18, money: 10000 } },
        { level: 6, value: "12 threads", cost: { researchPoints: 22, money: 12000 } },
        { level: 7, value: "14 threads", cost: { researchPoints: 28, money: 18000 } },
        { level: 8, value: "30 threads", cost: { researchPoints: 32, money: 30000 } },
        { level: 9, value: "40 threads", cost: { researchPoints: 38, money: 35000 } },
        { level: 10, value: "50 threads", cost: { researchPoints: 50, money: 40000 } },
        { level: 11, value: "55 threads", cost: { researchPoints: 52, money: 52000 } },
        { level: 12, value: "70 threads", cost: { researchPoints: 58, money: 56000 } },
        { level: 13, value: "85 threads", cost: { researchPoints: 70, money: 60000 } },
        { level: 14, value: "125 threads", cost: { researchPoints: 92, money: 70000 } },
        { level: 15, value: "256 threads", cost: { researchPoints: 120, money: 80000 } },
      ]
    },
    "Base Frequency": {
      levels: 10,
      description: "Boost base clock speeds",
      maxValue: 8.5,
      specs: [
        { level: 1, value: "1GHz", cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: "1.5GHz", cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: "2GHz", cost: { researchPoints: 6, money: 3000 } },
        { level: 4, value: "2.5GHz", cost: { researchPoints: 8, money: 4000 } },
        { level: 5, value: "3GHz", cost: { researchPoints: 10, money: 5000 } },
        { level: 6, value: "3.5GHz", cost: { researchPoints: 12, money: 6000 } },
        { level: 7, value: "5GHz", cost: { researchPoints: 18, money: 8000 } },
        { level: 8, value: "5.5GHz", cost: { researchPoints: 22, money: 9000 } },
        { level: 9, value: "8GHz", cost: { researchPoints: 28, money: 12000 } },
        { level: 10, value: "8.5GHz", cost: { researchPoints: 30, money: 18000 } },
      ]
    },
    "Turbo Boost": {
      levels: 1,
      description: "Research once to unlock",
      maxValue: "Unlocked",
      specs: [
        { level: 1, value: "Unlock", cost: { researchPoints: 50, money: 25000 } },
      ]
    },
    "Turbo Frequency": {
      levels: 10,
      description: "Boost turbo clock speeds",
      maxValue: 12.5,
      requires: "Turbo Boost", // Add dependency
      specs: [
        { level: 1, value: "2GHz", cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: "2.5GHz", cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: "3GHz", cost: { researchPoints: 6, money: 3000 } },
        { level: 4, value: "3.5GHz", cost: { researchPoints: 8, money: 4000 } },
        { level: 5, value: "4GHz", cost: { researchPoints: 10, money: 5000 } },
        { level: 6, value: "5GHz", cost: { researchPoints: 12, money: 6000 } },
        { level: 7, value: "7GHz", cost: { researchPoints: 18, money: 8000 } },
        { level: 8, value: "8.5GHz", cost: { researchPoints: 22, money: 9000 } },
        { level: 9, value: "10GHz", cost: { researchPoints: 28, money: 12000 } },
        { level: 10, value: "12.5GHz", cost: { researchPoints: 30, money: 18000 } },
      ]
    },
    "Power Usage": {
      levels: 5,
      description: "Reduce power consumption",
      maxValue: 512,
      specs: [
        { level: 1, value: "100W", cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: "200W", cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: "300W", cost: { researchPoints: 6, money: 2500 } },
        { level: 4, value: "500W", cost: { researchPoints: 8, money: 3500 } },
        { level: 5, value: "800W", cost: { researchPoints: 12, money: 5000 } },
        // ... add all levels up to 5
      ]
    },
    "Integrated CPU Graphics": {
      levels: 1,
      description: "Research once to unlock",
      maxValue: "Unlocked",
      specs: [
        { level: 1, value: "Unlocked", cost: { researchPoints: 15, money: 12000 } },
      ]
    },
  },
  GPU: {
    Design: {
      levels: 5,
      description: "Enhance GPU architecture",
    },
    "Ray Tracing": {
      levels: 1,
      description: "Research once to unlock",
      maxValue: "Unlocked",
      specs: [
        { level: 1, value: "Unlocked", cost: { researchPoints: 15, money: 12000 } },
      ]
    },
    "Ray tracing cores": {
      levels: 35,
      description: "Increase number of ray tracing cores",
      maxValue: 350,
      requires: "Ray Tracing", // Add dependency
      specs: [
        { level: 1, value: "10 Cores", cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: "20 Cores", cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: "30 Cores", cost: { researchPoints: 6, money: 3000 } },
        { level: 4, value: "40 Cores", cost: { researchPoints: 8, money: 4000 } },
        { level: 5, value: "50 Cores", cost: { researchPoints: 10, money: 5000 } },
        { level: 6, value: "60 Cores", cost: { researchPoints: 12, money: 6000 } },
        { level: 7, value: "70 Cores", cost: { researchPoints: 18, money: 8000 } },
        { level: 8, value: "80 Cores", cost: { researchPoints: 22, money: 9000 } },
        { level: 9, value: "90 Cores", cost: { researchPoints: 28, money: 12000 } },
        { level: 10, value: "100 Cores", cost: { researchPoints: 30, money: 18000 } },
        { level: 11, value: "110 Cores", cost: { researchPoints: 35, money: 20000 } },
        { level: 12, value: "120 Cores", cost: { researchPoints: 40, money: 22000 } },
        { level: 13, value: "130 Cores", cost: { researchPoints: 45, money: 24000 } },
        { level: 14, value: "140 Cores", cost: { researchPoints: 50, money: 26000 } },
        { level: 15, value: "150 Cores", cost: { researchPoints: 60, money: 28000 } },
        { level: 16, value: "160 Cores", cost: { researchPoints: 70, money: 30000 } },
        { level: 17, value: "170 Cores", cost: { researchPoints: 80, money: 32000 } },
        { level: 18, value: "180 Cores", cost: { researchPoints: 90, money: 34000 } },
        { level: 19, value: "190 Cores", cost: { researchPoints: 100, money: 36000 } },
        { level: 20, value: "200 Cores", cost: { researchPoints: 110, money: 38000 } },
        { level: 21, value: "210 Cores", cost: { researchPoints: 120, money: 40000 } },
        { level: 22, value: "220 Cores", cost: { researchPoints: 130, money: 42000 } },
        { level: 23, value: "230 Cores", cost: { researchPoints: 140, money: 44000 } },
        { level: 24, value: "240 Cores", cost: { researchPoints: 150, money: 46000 } },
        { level: 25, value: "250 Cores", cost: { researchPoints: 160, money: 48000 } },
        { level: 26, value: "260 Cores", cost: { researchPoints: 170, money: 50000 } },
        { level: 27, value: "270 Cores", cost: { researchPoints: 180, money: 52000 } },
        { level: 28, value: "280 Cores", cost: { researchPoints: 190, money: 54000 } },
        { level: 29, value: "290 Cores", cost: { researchPoints: 200, money: 56000 } },
        { level: 30, value: "300 Cores", cost: { researchPoints: 210, money: 58000 } },
        { level: 31, value: "310 Cores", cost: { researchPoints: 220, money: 60000 } },
        { level: 32, value: "320 Cores", cost: { researchPoints: 230, money: 62000 } },
        { level: 33, value: "330 Cores", cost: { researchPoints: 240, money: 64000 } },
        { level: 34, value: "340 Cores", cost: { researchPoints: 250, money: 66000 } },
        { level: 35, value: "350 Cores", cost: { researchPoints: 260, money: 68000 } },
      ]
    },
    "Graphics Cores": {
      levels: 35,
      description: "Increase number of graphics cores",
      maxValue: 30000,
      specs: [       
        { level: 1, value: "50 Cores", cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: "100 Cores", cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: "150 Cores", cost: { researchPoints: 6, money: 3000 } },
        { level: 4, value: "200 Cores", cost: { researchPoints: 8, money: 4000 } },
        { level: 5, value: "250 Cores", cost: { researchPoints: 10, money: 5000 } },
        { level: 6, value: "300 Cores", cost: { researchPoints: 12, money: 6000 } },
        { level: 7, value: "350 Cores", cost: { researchPoints: 18, money: 8000 } },
        { level: 8, value: "200 Cores", cost: { researchPoints: 22, money: 9000 } },
        { level: 9, value: "250 Cores", cost: { researchPoints: 28, money: 12000 } },
        { level: 10, value: "300 Cores", cost: { researchPoints: 30, money: 18000 } },
        { level: 11, value: "400 Cores", cost: { researchPoints: 35, money: 20000 } },
        { level: 12, value: "500 Cores", cost: { researchPoints: 40, money: 22000 } },
        { level: 13, value: "800 Cores", cost: { researchPoints: 45, money: 24000 } },
        { level: 14, value: "1000 Cores", cost: { researchPoints: 50, money: 26000 } },
        { level: 15, value: "1500 Cores", cost: { researchPoints: 60, money: 28000 } },
        { level: 16, value: "2500 Cores", cost: { researchPoints: 70, money: 30000 } },
        { level: 17, value: "5000 Cores", cost: { researchPoints: 80, money: 32000 } },
        { level: 18, value: "6000 Cores", cost: { researchPoints: 90, money: 34000 } },
        { level: 19, value: "7000 Cores", cost: { researchPoints: 100, money: 36000 } },
        { level: 20, value: "8000 Cores", cost: { researchPoints: 110, money: 38000 } },
        { level: 21, value: "9000 Cores", cost: { researchPoints: 120, money: 40000 } },
        { level: 22, value: "10000 Cores", cost: { researchPoints: 130, money: 42000 } },
        { level: 23, value: "11000 Cores", cost: { researchPoints: 140, money: 44000 } },
        { level: 24, value: "12000 Cores", cost: { researchPoints: 150, money: 46000 } },
        { level: 25, value: "13000 Cores", cost: { researchPoints: 160, money: 48000 } },
        { level: 26, value: "14000 Cores", cost: { researchPoints: 170, money: 50000 } },
        { level: 27, value: "15000 Cores", cost: { researchPoints: 180, money: 52000 } },
        { level: 28, value: "16000 Cores", cost: { researchPoints: 190, money: 54000 } },
        { level: 29, value: "17000 Cores", cost: { researchPoints: 200, money: 56000 } },
        { level: 30, value: "18000 Cores", cost: { researchPoints: 210, money: 58000 } },
        { level: 31, value: "19000 Cores", cost: { researchPoints: 220, money: 60000 } },
        { level: 32, value: "20000 Cores", cost: { researchPoints: 230, money: 62000 } },
        { level: 33, value: "21000 Cores", cost: { researchPoints: 240, money: 64000 } },
        { level: 34, value: "22000 Cores", cost: { researchPoints: 250, money: 66000 } },
        { level: 35, value: "30000 Cores", cost: { researchPoints: 260, money: 68000 } },
      ]
    },
    "Memory Technology": {
      levels: 16,
      description: "Advance memory technology",
      types: ['GDDR3', 'GDDR3X', 'GDDR4', 'GDDR4X', 'GDDR5', 'GDDR5X', 'GDDR6', 'GDDR6X', 'GDDR7', 'GDDR7X', 'GDDR8', 'GDDR8X', 'GDDR9', 'GDDR9X', 'GDDR10', 'GDDR10X'],
      specs: [
        { level: 1, value: 'GDDR3', cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: 'GDDR3X', cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: 'GDDR4', cost: { researchPoints: 6, money: 3000 } },
        { level: 4, value: 'GDDR4X', cost: { researchPoints: 8, money: 4000 } },
        { level: 5, value: 'GDDR5', cost: { researchPoints: 10, money: 5000 } },
        { level: 6, value: 'GDDR5X', cost: { researchPoints: 12, money: 6000 } },
        { level: 7, value: 'GDDR6', cost: { researchPoints: 18, money: 8000 } },
        { level: 8, value: 'GDDR6X', cost: { researchPoints: 22, money: 9000 } },
        { level: 9, value: 'GDDR7', cost: { researchPoints: 28, money: 12000 } },
        { level: 10, value: 'GDDR7X', cost: { researchPoints: 30, money: 18000 } },
        { level: 11, value: 'GDDR8', cost: { researchPoints: 35, money: 20000 } },
        { level: 12, value: 'GDDR8X', cost: { researchPoints: 40, money: 22000 } },
        { level: 13, value: 'GDDR9', cost: { researchPoints: 45, money: 24000 } },
        { level: 14, value: 'GDDR9X', cost: { researchPoints: 50, money: 26000 } },
        { level: 15, value: 'GDDR10', cost: { researchPoints: 60, money: 28000 } },
        { level: 16, value: 'GDDR10X', cost: { researchPoints: 70, money: 30000 } },
      ]
    },
    "Clock Speed": {
      levels: 10,
      description: "Boost clock speeds",
      maxBaseClock: 8.5, // GHz
      maxTurboClock: 15.5, // GHz
    },
  },
  Disk: {
    Design: {
      levels: 5,
      description: "Improve storage technology",
    },
    Category: {
      levels: 3,
      description: "Choose storage category",
      types: ['HDD', 'SSD', 'NVMe'],
      specs: [
        { level: 1, value: 'HDD', cost: { researchPoints: 10, money: 10000 } },
        { level: 2, value: 'SSD', cost: { researchPoints: 15, money: 20000 } },
        { level: 3, value: 'NVMe', cost: { researchPoints: 20, money: 30000 } },
      ]
    },
    "HDD Capacity": {
      levels: 35,
      description: "Increase storage capacity",
      maxValue: 128000, // GB
      specs: [
        { level: 1, value: '10GB', cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: '20GB', cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: '40GB', cost: { researchPoints: 6, money: 3000 } },
        { level: 4, value: '80GB', cost: { researchPoints: 8, money: 4000 } },
        { level: 5, value: '150GB', cost: { researchPoints: 10, money: 5000 } },
        { level: 6, value: '220GB', cost: { researchPoints: 12, money: 6000 } },
        { level: 7, value: '360GB', cost: { researchPoints: 18, money: 8000 } },
        { level: 8, value: '500GB', cost: { researchPoints: 22, money: 9000 } },
        { level: 9, value: '635GB', cost: { researchPoints: 28, money: 12000 } },
        { level: 10, value: '2TB', cost: { researchPoints: 30, money: 18000 } },
        { level: 11, value: '4TB', cost: { researchPoints: 35, money: 20000 } },
        { level: 12, value: '6TB', cost: { researchPoints: 40, money: 22000 } },
        { level: 13, value: '8TB', cost: { researchPoints: 45, money: 24000 } },
        { level: 14, value: '12TB', cost: { researchPoints: 50, money: 26000 } },
        { level: 15, value: '14TB', cost: { researchPoints: 60, money: 28000 } },
        { level: 16, value: '16TB', cost: { researchPoints: 70, money: 30000 } },
        { level: 17, value: '18TB', cost: { researchPoints: 80, money: 32000 } },
        { level: 18, value: '20TB', cost: { researchPoints: 90, money: 34000 } },
        { level: 19, value: '22TB', cost: { researchPoints: 100, money: 36000 } },
        { level: 20, value: '24TB', cost: { researchPoints: 110, money: 38000 } },
        { level: 21, value: '26TB', cost: { researchPoints: 120, money: 40000 } },
        { level: 22, value: '28TB', cost: { researchPoints: 130, money: 42000 } },
        { level: 23, value: '30TB', cost: { researchPoints: 140, money: 44000 } },
        { level: 24, value: '32TB', cost: { researchPoints: 150, money: 46000 } },
        { level: 25, value: '34TB', cost: { researchPoints: 160, money: 48000 } },
        { level: 26, value: '36TB', cost: { researchPoints: 170, money: 50000 } },
        { level: 27, value: '38TB', cost: { researchPoints: 180, money: 52000 } },
        { level: 28, value: '40TB', cost: { researchPoints: 190, money: 54000 } },
        { level: 29, value: '42TB', cost: { researchPoints: 200, money: 56000 } },
        { level: 30, value: '44TB', cost: { researchPoints: 210, money: 58000 } },
        { level: 31, value: '46TB', cost: { researchPoints: 220, money: 60000 } },
        { level: 32, value: '48TB', cost: { researchPoints: 230, money: 62000 } },
        { level: 33, value: '50TB', cost: { researchPoints: 240, money: 64000 } },
        { level: 34, value: '64TB', cost: { researchPoints: 250, money: 66000 } },
        { level: 35, value: '128TB', cost: { researchPoints: 260, money: 68000 } },
      ]
    },
    "SSD Capacity": {
      levels: 35,
      description: "Increase storage capacity",
      maxValue: 128000, // GB
      specs: [
        { level: 1, value: '10GB', cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: '20GB', cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: '40GB', cost: { researchPoints: 6, money: 3000 } },
        { level: 4, value: '80GB', cost: { researchPoints: 8, money: 4000 } },
        { level: 5, value: '150GB', cost: { researchPoints: 10, money: 5000 } },
        { level: 6, value: '220GB', cost: { researchPoints: 12, money: 6000 } },
        { level: 7, value: '360GB', cost: { researchPoints: 18, money: 8000 } },
        { level: 8, value: '500GB', cost: { researchPoints: 22, money: 9000 } },
        { level: 9, value: '635GB', cost: { researchPoints: 28, money: 12000 } },
        { level: 10, value: '2TB', cost: { researchPoints: 30, money: 18000 } },
        { level: 11, value: '4TB', cost: { researchPoints: 35, money: 20000 } },
        { level: 12, value: '6TB', cost: { researchPoints: 40, money: 22000 } },
        { level: 13, value: '8TB', cost: { researchPoints: 45, money: 24000 } },
        { level: 14, value: '12TB', cost: { researchPoints: 50, money: 26000 } },
        { level: 15, value: '14TB', cost: { researchPoints: 60, money: 28000 } },
        { level: 16, value: '16TB', cost: { researchPoints: 70, money: 30000 } },
        { level: 17, value: '18TB', cost: { researchPoints: 80, money: 32000 } },
        { level: 18, value: '20TB', cost: { researchPoints: 90, money: 34000 } },
        { level: 19, value: '22TB', cost: { researchPoints: 100, money: 36000 } },
        { level: 20, value: '24TB', cost: { researchPoints: 110, money: 38000 } },
        { level: 21, value: '26TB', cost: { researchPoints: 120, money: 40000 } },
        { level: 22, value: '28TB', cost: { researchPoints: 130, money: 42000 } },
        { level: 23, value: '30TB', cost: { researchPoints: 140, money: 44000 } },
        { level: 24, value: '32TB', cost: { researchPoints: 150, money: 46000 } },
        { level: 25, value: '34TB', cost: { researchPoints: 160, money: 48000 } },
        { level: 26, value: '36TB', cost: { researchPoints: 170, money: 50000 } },
        { level: 27, value: '38TB', cost: { researchPoints: 180, money: 52000 } },
        { level: 28, value: '40TB', cost: { researchPoints: 190, money: 54000 } },
        { level: 29, value: '42TB', cost: { researchPoints: 200, money: 56000 } },
        { level: 30, value: '44TB', cost: { researchPoints: 210, money: 58000 } },
        { level: 31, value: '46TB', cost: { researchPoints: 220, money: 60000 } },
        { level: 32, value: '48TB', cost: { researchPoints: 230, money: 62000 } },
        { level: 33, value: '50TB', cost: { researchPoints: 240, money: 64000 } },
        { level: 34, value: '64TB', cost: { researchPoints: 250, money: 66000 } },
        { level: 35, value: '128TB', cost: { researchPoints: 260, money: 68000 } },
      ]
    },
    "NVMe Capacity": {
      levels: 35,
      description: "Increase storage capacity",
      maxValue: 128000, // GB
      specs: [
        { level: 1, value: '10GB', cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: '20GB', cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: '40GB', cost: { researchPoints: 6, money: 3000 } },
        { level: 4, value: '80GB', cost: { researchPoints: 8, money: 4000 } },
        { level: 5, value: '150GB', cost: { researchPoints: 10, money: 5000 } },
        { level: 6, value: '220GB', cost: { researchPoints: 12, money: 6000 } },
        { level: 7, value: '360GB', cost: { researchPoints: 18, money: 8000 } },
        { level: 8, value: '500GB', cost: { researchPoints: 22, money: 9000 } },
        { level: 9, value: '635GB', cost: { researchPoints: 28, money: 12000 } },
        { level: 10, value: '2TB', cost: { researchPoints: 30, money: 18000 } },
        { level: 11, value: '4TB', cost: { researchPoints: 35, money: 20000 } },
        { level: 12, value: '6TB', cost: { researchPoints: 40, money: 22000 } },
        { level: 13, value: '8TB', cost: { researchPoints: 45, money: 24000 } },
        { level: 14, value: '12TB', cost: { researchPoints: 50, money: 26000 } },
        { level: 15, value: '14TB', cost: { researchPoints: 60, money: 28000 } },
        { level: 16, value: '16TB', cost: { researchPoints: 70, money: 30000 } },
        { level: 17, value: '18TB', cost: { researchPoints: 80, money: 32000 } },
        { level: 18, value: '20TB', cost: { researchPoints: 90, money: 34000 } },
        { level: 19, value: '22TB', cost: { researchPoints: 100, money: 36000 } },
        { level: 20, value: '24TB', cost: { researchPoints: 110, money: 38000 } },
        { level: 21, value: '26TB', cost: { researchPoints: 120, money: 40000 } },
        { level: 22, value: '28TB', cost: { researchPoints: 130, money: 42000 } },
        { level: 23, value: '30TB', cost: { researchPoints: 140, money: 44000 } },
        { level: 24, value: '32TB', cost: { researchPoints: 150, money: 46000 } },
        { level: 25, value: '34TB', cost: { researchPoints: 160, money: 48000 } },
        { level: 26, value: '36TB', cost: { researchPoints: 170, money: 50000 } },
        { level: 27, value: '38TB', cost: { researchPoints: 180, money: 52000 } },
        { level: 28, value: '40TB', cost: { researchPoints: 190, money: 54000 } },
        { level: 29, value: '42TB', cost: { researchPoints: 200, money: 56000 } },
        { level: 30, value: '44TB', cost: { researchPoints: 210, money: 58000 } },
        { level: 31, value: '46TB', cost: { researchPoints: 220, money: 60000 } },
        { level: 32, value: '48TB', cost: { researchPoints: 230, money: 62000 } },
        { level: 33, value: '50TB', cost: { researchPoints: 240, money: 64000 } },
        { level: 34, value: '64TB', cost: { researchPoints: 250, money: 66000 } },
        { level: 35, value: '128TB', cost: { researchPoints: 260, money: 68000 } },
      ]
    },
    "HDD Speed": {
      levels: 10,
      description: "Enhance HDD read/write speeds",
      maxValue: 500, // MB/s
      requires: ["Category", "HDD"], // Add dependency with required value
      specs: [
        { level: 1, value: '50MB/s', cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: '100MB/s', cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: '150MB/s', cost: { researchPoints: 6, money: 3000 } },
        { level: 4, value: '200MB/s', cost: { researchPoints: 8, money: 4000 } },
        { level: 5, value: '250MB/s', cost: { researchPoints: 10, money: 5000 } },
        { level: 6, value: '300MB/s', cost: { researchPoints: 12, money: 6000 } },
        { level: 7, value: '350MB/s', cost: { researchPoints: 14, money: 7000 } },
        { level: 8, value: '400MB/s', cost: { researchPoints: 16, money: 8000 } },
        { level: 9, value: '450MB/s', cost: { researchPoints: 18, money: 9000 } },
        { level: 10, value: '500MB/s', cost: { researchPoints: 20, money: 10000 } },
      ]
    },
    "SSD Speed": {
      levels: 10,
      description: "Enhance SSD read/write speeds",
      maxValue: 2000, // MB/s
      requires: ["Category", "SSD"], // Add dependency with required value
      specs: [
        { level: 1, value: "200MB/s", cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: "400MB/s", cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: "600MB/s", cost: { researchPoints: 6, money: 3000 } },
        { level: 4, value: "800MB/s", cost: { researchPoints: 8, money: 4000 } },
        { level: 5, value: "1000MB/s", cost: { researchPoints: 10, money: 5000 } },
        { level: 6, value: "1200MB/s", cost: { researchPoints: 12, money: 6000 } },
        { level: 7, value: "1400MB/s", cost: { researchPoints: 14, money: 7000 } },
        { level: 8, value: "1600MB/s", cost: { researchPoints: 16, money: 8000 } },
        { level: 9, value: "1800MB/s", cost: { researchPoints: 18, money: 9000 } },
        { level: 10, value: "2000MB/s", cost: { researchPoints: 20, money: 10000 } },
      ]
    },
    "NVMe Speed": {
      levels: 10,
      description: "Enhance NVMe read/write speeds",
      maxValue: 10000, // MB/s
      requires: ["Category", "NVMe"], // Add dependency with required value
      specs: [
        { level: 1, value: "1000MB/s", cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: "2000MB/s", cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: "3000MB/s", cost: { researchPoints: 6, money: 3000 } },
        { level: 4, value: "4000MB/s", cost: { researchPoints: 8, money: 4000 } },
        { level: 5, value: "5000MB/s", cost: { researchPoints: 10, money: 5000 } },
        { level: 6, value: "6000MB/s", cost: { researchPoints: 12, money: 6000 } },
        { level: 7, value: "7000MB/s", cost: { researchPoints: 14, money: 7000 } },
        { level: 8, value: "8000MB/s", cost: { researchPoints: 16, money: 8000 } },
        { level: 9, value: "9000MB/s", cost: { researchPoints: 18, money: 9000 } },
        { level: 10, value: "10000MB/s", cost: { researchPoints: 20, money: 10000 } },
      ]
    },
    Interface: {
      levels: 6,
      description: "Advance connection interface",
      maxValue: "NVMe 2.0",
      types: ['SATA', 'PCIe', 'NVMe'],
      specs: [
        { level: 1, value: 'SATA', cost: { researchPoints: 20, money: 10000 } },
        { level: 2, value: 'SATA 2.0', cost: { researchPoints: 30, money: 20000 } },
        { level: 3, value: 'PCIe', cost: { researchPoints: 40, money: 30000 } },
        { level: 4, value: 'PCIe 2.0', cost: { researchPoints: 50, money: 40000 } },
        { level: 5, value: 'NVMe', cost: { researchPoints: 60, money: 50000 } },
        { level: 6, value: 'NVMe 2.0', cost: { researchPoints: 70, money: 60000 } },
      ]
    },
  },
  RAM: {
    Design: {
      levels: 5,
      description: "Enhance RAM architecture",
    },
    Capacity: {
      levels: 25,
      description: "Increase memory capacity",
      maxValue: 16000, // GB
      specs: [
        { level: 1, value: '1GB', cost: { researchPoints: 2, money: 1000 } },
        { level: 2, value: '2GB', cost: { researchPoints: 4, money: 2000 } },
        { level: 3, value: '4GB', cost: { researchPoints: 6, money: 3000 } },
        { level: 4, value: '8GB', cost: { researchPoints: 8, money: 4000 } },
        { level: 5, value: '16GB', cost: { researchPoints: 10, money: 5000 } },
        { level: 6, value: '32GB', cost: { researchPoints: 12, money: 6000 } },
        { level: 7, value: '64GB', cost: { researchPoints: 18, money: 8000 } },
        { level: 8, value: '128GB', cost: { researchPoints: 22, money: 9000 } },
        { level: 9, value: '256GB', cost: { researchPoints: 28, money: 12000 } },
        { level: 10, value: '512GB', cost: { researchPoints: 30, money: 18000 } },
        { level: 11, value: '1TB', cost: { researchPoints: 35, money: 20000 } },
        { level: 12, value: '2TB', cost: { researchPoints: 40, money: 22000 } },
        { level: 13, value: '4TB', cost: { researchPoints: 45, money: 24000 } },
        { level: 14, value: '8TB', cost: { researchPoints: 50, money: 26000 } },
        { level: 15, value: '16TB', cost: { researchPoints: 60, money: 28000 } },
        { level: 16, value: '32TB', cost: { researchPoints: 70, money: 30000 } },
        { level: 17, value: '64TB', cost: { researchPoints: 80, money: 32000 } },
        { level: 18, value: '128TB', cost: { researchPoints: 90, money: 34000 } },
        { level: 19, value: '256TB', cost: { researchPoints: 100, money: 36000 } },
        { level: 20, value: '512TB', cost: { researchPoints: 110, money: 38000 } },
        { level: 21, value: '1TB', cost: { researchPoints: 120, money: 40000 } },
        { level: 22, value: '2TB', cost: { researchPoints: 130, money: 42000 } },
        { level: 23, value: '4TB', cost: { researchPoints: 140, money: 44000 } },
        { level: 24, value: '8TB', cost: { researchPoints: 150, money: 46000 } },
        { level: 25, value: '16TB', cost: { researchPoints: 160, money: 48000 } },
      ]
    },
    Speed: {
      levels: 10,
      description: "Boost memory speed",
      maxBusSpeed: 10000, // MHz
      specs: [
        { level: 1, value: '1000MHz', cost: { researchPoints: 6, money: 5000 } },
        { level: 2, value: '2000MHz', cost: { researchPoints: 12, money: 10000 } },
        { level: 3, value: '3000MHz', cost: { researchPoints: 18, money: 15000 } },
        { level: 4, value: '4000MHz', cost: { researchPoints: 24, money: 20000 } },
        { level: 5, value: '5000MHz', cost: { researchPoints: 30, money: 25000 } },
        { level: 6, value: '6000MHz', cost: { researchPoints: 36, money: 30000 } },
        { level: 7, value: '7000MHz', cost: { researchPoints: 42, money: 35000 } },
        { level: 8, value: '8000MHz', cost: { researchPoints: 48, money: 40000 } },
        { level: 9, value: '9000MHz', cost: { researchPoints: 54, money: 45000 } },
        { level: 10, value: '10000MHz', cost: { researchPoints: 60, money: 50000 } },
      ]
    },
    Technology: {
      levels: 9,
      description: "Advance DDR technology",
      types: ['DDR1', 'DDR2', 'DDR3', 'DDR4', 'DDR5', 'DDR6', 'DDR7', 'DDR8', 'DDR9'],
      specs: [
        { level: 1, value: 'DDR1', cost: { researchPoints: 2, money: 10000 } },
        { level: 2, value: 'DDR2', cost: { researchPoints: 4, money: 20000 } },
        { level: 3, value: 'DDR3', cost: { researchPoints: 6, money: 30000 } },
        { level: 4, value: 'DDR4', cost: { researchPoints: 8, money: 40000 } },
        { level: 5, value: 'DDR5', cost: { researchPoints: 10, money: 50000 } },
        { level: 6, value: 'DDR6', cost: { researchPoints: 12, money: 60000 } },
        { level: 7, value: 'DDR7', cost: { researchPoints: 14, money: 70000 } },
        { level: 8, value: 'DDR8', cost: { researchPoints: 16, money: 80000 } },
        { level: 9, value: 'DDR9', cost: { researchPoints: 18, money: 90000 } },
      ]
    },
  },
};

export type ResearchData = typeof researchData;

export type ResearchCategory = keyof ResearchData;
export type ResearchItem<T extends ResearchCategory> = keyof ResearchData[T];

export type Research = {
  [K in ResearchCategory]: {
    [I in ResearchItem<K>]: {
      currentLevel: number;
      maxLevel: number;
    };
  };
};

export function getResearchData(): ResearchData {
  return researchData;
}
