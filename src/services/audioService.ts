
export class AudioService {
  private static instance: AudioService;
  private currentAudio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  async playText(text: string): Promise<void> {
    // Stop any currently playing audio
    this.stop();

    // For demo purposes, we'll use Web Speech API if available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 0.8;
      
      // Use a child-friendly voice if available
      const voices = speechSynthesis.getVoices();
      const childVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Karen') || 
        voice.name.includes('Samantha')
      );
      if (childVoice) {
        utterance.voice = childVoice;
      }

      this.isPlaying = true;
      
      utterance.onend = () => {
        this.isPlaying = false;
      };

      speechSynthesis.speak(utterance);
    } else {
      // Fallback: Create a demo beep sound
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const audioContext = new AudioContextClass();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
        
        this.isPlaying = true;
        setTimeout(() => {
          this.isPlaying = false;
        }, 1000);
      } else {
        // Final fallback - just log
        console.log('Demo audio playing for:', text);
        this.isPlaying = true;
        setTimeout(() => {
          this.isPlaying = false;
        }, 2000);
      }
    }
  }

  stop(): void {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    this.isPlaying = false;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}
