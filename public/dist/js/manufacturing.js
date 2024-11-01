class Manufacturing {
    constructor(gameState) {
        this.gameState = gameState;
        this.productionQueue = [];
    }

    startProduction(productId, copies, investmentPerCopy) {
        const product = this.gameState.products.find(p => p.id === productId);
        if (!product) return false;

        const totalCost = copies * investmentPerCopy;
        if (totalCost > this.gameState.money) {
            throw new Error("Insufficient funds for production");
        }

        this.gameState.money -= totalCost;
        
        const quality = this.calculateQuality(investmentPerCopy);
        product.manufacturedCopies += copies;
        product.quality = Math.min(product.quality + (investmentPerCopy / 200), 5);

        return true;
    }

    calculateQuality(investment) {
        if (investment < 200) return 1;
        if (investment < 400) return 2;
        if (investment < 600) return 3;
        if (investment < 800) return 4;
        return 5;
    }

    buyComponents() {
        if (this.gameState.money < 200000) {
            throw new Error("Insufficient funds for components");
        }
        this.gameState.money -= 200000;
    }

    hireEmployees() {
        if (this.gameState.money < 100000) {
            throw new Error("Insufficient funds to hire employees");
        }
        this.gameState.employees += 5;
        this.gameState.money -= 100000;
    }
} 