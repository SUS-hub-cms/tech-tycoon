const RESEARCH_DATA = {
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
                // ... (copy all levels from your researchData.ts)
            ]
        }
        // ... (add other CPU research areas)
    },
    GPU: {
        // ... (copy GPU research areas)
    },
    RAM: {
        // ... (copy RAM research areas)
    },
    Storage: {
        // ... (copy Storage research areas)
    }
}; 