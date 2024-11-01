document.addEventListener('DOMContentLoaded', () => {
    const gameState = new GameState();
    const gameLogic = new GameLogic(gameState);
    const manufacturing = new Manufacturing(gameState);
    const productManager = new ProductManager(gameState);
    const market = new Market(gameState);
    const audioManager = new AudioManager();
    
    // Initialize game systems
    gameState.load();
    audioManager.setVolume(0.5);
    
    // Start game loops
    setInterval(() => {
        gameLogic.updateGame();
        manufacturing.update();
        market.simulateMarketCycle();
    }, gameState.timeSpeed);

    // Auto-save
    setInterval(() => {
        gameState.save();
    }, 300000); // Every 5 minutes
    
    // Initialize UI
    UIComponents.initializeGameUI(
        gameState, 
        gameLogic, 
        manufacturing, 
        productManager, 
        market,
        audioManager
    );
}); 