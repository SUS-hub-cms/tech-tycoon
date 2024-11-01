class Market {
    constructor(gameState) {
        this.gameState = gameState;
        this.marketTrends = {
            CPU: { demand: 1.0, competition: 1.0 },
            GPU: { demand: 1.0, competition: 1.0 },
            RAM: { demand: 1.0, competition: 1.0 },
            Storage: { demand: 1.0, competition: 1.0 }
        };
    }

    updateMarketTrends() {
        Object.keys(this.marketTrends).forEach(category => {
            // Random market fluctuations
            this.marketTrends[category].demand *= 0.9 + Math.random() * 0.2;
            this.marketTrends[category].competition *= 0.9 + Math.random() * 0.2;
            
            // Keep values in reasonable range
            this.marketTrends[category].demand = Math.max(0.5, 
                Math.min(1.5, this.marketTrends[category].demand));
            this.marketTrends[category].competition = Math.max(0.5, 
                Math.min(1.5, this.marketTrends[category].competition));
        });
    }

    calculateProductDemand(product) {
        const baseDemand = this.marketTrends[product.type].demand;
        const qualityFactor = product.quality / 100;
        const priceFactor = this.calculatePriceFactor(product);
        
        return baseDemand * qualityFactor * priceFactor;
    }

    calculatePriceFactor(product) {
        const competitionLevel = this.marketTrends[product.type].competition;
        const basePrice = product.specs.price;
        const marketAverage = this.getMarketAveragePrice(product.type);
        
        return Math.pow(marketAverage / basePrice, competitionLevel);
    }

    getMarketAveragePrice(productType) {
        // Simplified market average price calculation
        const baseAverages = {
            CPU: 300,
            GPU: 400,
            RAM: 100,
            Storage: 150
        };
        
        return baseAverages[productType] * this.marketTrends[productType].competition;
    }

    simulateMarketCycle() {
        this.updateMarketTrends();
        
        // Update market share based on product portfolio
        let totalDemand = 0;
        this.gameState.products.forEach(product => {
            totalDemand += this.calculateProductDemand(product);
        });
        
        // Update game state based on market performance
        this.gameState.marketShare = Math.min(100, 
            this.gameState.marketShare * (1 + totalDemand * 0.01));
    }
} 