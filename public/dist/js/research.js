class Research {
    constructor(gameState) {
        this.gameState = gameState;
        this.researchData = {
            CPU: {
                architecture: {
                    levels: 5,
                    description: "Improve CPU architecture",
                    specs: [
                        { level: 1, value: "x86", cost: { researchPoints: 100, money: 10000 } },
                        { level: 2, value: "x64", cost: { researchPoints: 200, money: 20000 } },
                        // Add more levels as needed
                    ]
                },
                // Add other CPU research areas
            },
            GPU: {
                // GPU research areas
            },
            RAM: {
                // RAM research areas
            },
            Storage: {
                // Storage research areas
            }
        };
    }

    canResearch(category, item, level) {
        const cost = this.getResearchCost(category, item, level);
        return this.gameState.money >= cost.money && 
               this.gameState.researchPoints >= cost.researchPoints;
    }

    research(category, item, level) {
        if (!this.canResearch(category, item, level)) return false;
        
        const cost = this.getResearchCost(category, item, level);
        this.gameState.money -= cost.money;
        this.gameState.researchPoints -= cost.researchPoints;
        
        // Update research progress
        if (!this.gameState.research[category]) {
            this.gameState.research[category] = {};
        }
        this.gameState.research[category][item] = level;
        
        return true;
    }

    getResearchCost(category, item, level) {
        return this.researchData[category][item].specs[level - 1].cost;
    }
} 