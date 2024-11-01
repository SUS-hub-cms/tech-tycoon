class GameState {
    constructor() {
        this.money = 1000000;
        this.researchPoints = 100;
        this.date = new Date("2024-01-01");
        this.research = this.initializeResearch();
        this.products = [];
        this.employees = 0;
        this.marketShare = 0;
        this.customerSatisfaction = 50;
        this.series = {
            CPU: [],
            GPU: [],
            Disk: [],
            RAM: [],
        };
        this.integratedGraphics = [];
        this.timeSpeed = 'normal';
    }

    initializeResearch() {
        return Object.fromEntries(
            Object.entries(RESEARCH_DATA).map(([category, items]) => [
                category,
                Object.fromEntries(
                    Object.entries(items).map(([itemName, item]) => [
                        itemName,
                        {
                            currentLevel: 0,
                            maxLevel: item.levels
                        }
                    ])
                )
            ])
        );
    }

    getTimeInterval() {
        switch (this.timeSpeed) {
            case 'paused': return undefined;
            case 'normal': return 600;
            case 'fast': return 300;
            case 'superfast': return 150;
            default: return 600;
        }
    }

    save() {
        const saveData = {
            money: this.money,
            researchPoints: this.researchPoints,
            date: this.date,
            research: this.research,
            products: this.products,
            employees: this.employees,
            marketShare: this.marketShare,
            customerSatisfaction: this.customerSatisfaction,
            series: this.series,
            integratedGraphics: this.integratedGraphics,
        };
        localStorage.setItem('gameState', JSON.stringify(saveData));
    }

    load() {
        const savedData = localStorage.getItem('gameState');
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.assign(this, data);
            this.date = new Date(data.date);
        }
    }
} 