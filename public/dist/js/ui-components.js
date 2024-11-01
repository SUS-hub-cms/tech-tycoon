class UIComponents {
    static initializeGameUI(gameState, gameLogic, manufacturing, productManager, market, audioManager) {
        this.initializeHeader(gameState);
        this.initializeMainControls(gameState, manufacturing);
        this.initializeProductCreation(gameState, productManager);
        this.initializeResearchPanel(gameState, gameLogic);
        this.initializeMarketInfo(market);
        this.initializeAudioControls(audioManager);
        this.initializeTimeControls(gameState);
    }

    static initializeHeader(gameState) {
        const header = document.createElement('header');
        header.innerHTML = `
            <div class="stats">
                <div>Money: $<span id="money">${gameState.money.toLocaleString()}</span></div>
                <div>Research Points: <span id="research-points">${gameState.researchPoints}</span></div>
                <div>Date: <span id="date">${gameState.date.toLocaleDateString()}</span></div>
            </div>
        `;
        document.getElementById('game-container').appendChild(header);
    }

    static initializeMainControls(gameState, manufacturing) {
        const controls = document.createElement('div');
        controls.className = 'main-controls';
        controls.innerHTML = `
            <button id="buy-components">Buy Components ($200,000)</button>
            <button id="hire-employees">Hire Employees ($100,000)</button>
            <button id="create-product">Create New Product</button>
        `;
        
        document.getElementById('game-container').appendChild(controls);

        // Add event listeners
        document.getElementById('buy-components').onclick = () => {
            try {
                manufacturing.buyComponents();
                this.updateStats(gameState);
                this.showToast('Components purchased successfully!');
            } catch (error) {
                this.showToast(error.message, 'error');
            }
        };

        // Add other event listeners...
    }

    static showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    static updateStats(gameState) {
        document.getElementById('money').textContent = gameState.money.toLocaleString();
        document.getElementById('research-points').textContent = gameState.researchPoints;
        document.getElementById('date').textContent = gameState.date.toLocaleDateString();
    }

    // Add other UI initialization methods...
} 