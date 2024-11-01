class AudioManager {
    constructor() {
        this.sounds = {
            buttonClick: new Audio('/dist/assets/audio/button-click.mp3'),
            success: new Audio('/dist/assets/audio/success.mp3'),
            error: new Audio('/dist/assets/audio/error.mp3'),
            background: new Audio('/dist/assets/audio/background-music.mp3')
        };
        
        this.volume = 1.0;
        this.isMuted = false;
        
        // Loop background music
        this.sounds.background.loop = true;
    }

    setVolume(volume) {
        this.volume = volume;
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.isMuted ? 0 : volume;
        });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.setVolume(this.volume);
    }

    playSound(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play();
        }
    }

    startBackgroundMusic() {
        this.sounds.background.play();
    }

    stopBackgroundMusic() {
        this.sounds.background.pause();
        this.sounds.background.currentTime = 0;
    }
} 