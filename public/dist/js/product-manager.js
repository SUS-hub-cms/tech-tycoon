class ProductManager {
    constructor(gameState) {
        this.gameState = gameState;
        this.products = [];
    }

    createProduct(type, specs) {
        const id = Utils.generateId();
        const quality = this.calculateQuality(specs);
        
        const product = {
            id,
            type,
            specs,
            quality,
            manufacturedCopies: 0
        };

        this.products.push(product);
        return product;
    }

    calculateQuality(specs) {
        let qualityScore = 0;
        
        // Calculate based on specs and research level
        switch (specs.type) {
            case 'CPU':
                qualityScore += this.calculateCPUQuality(specs);
                break;
            case 'GPU':
                qualityScore += this.calculateGPUQuality(specs);
                break;
            // Add other product types
        }

        return Math.min(100, qualityScore);
    }

    calculateCPUQuality(specs) {
        let score = 0;
        // Implementation based on CPU specs
        score += specs.clockSpeed * 10;
        score += specs.cores * 5;
        return score;
    }

    calculateGPUQuality(specs) {
        let score = 0;
        // Implementation based on GPU specs
        score += specs.memory * 5;
        score += specs.clockSpeed * 8;
        return score;
    }

    getProductById(id) {
        return this.products.find(p => p.id === id);
    }

    updateProduct(id, updates) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updates };
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }
} 