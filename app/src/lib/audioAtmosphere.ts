// Procedural Web Audio API sound generator for Developers App
// No external mp3 downloads required; fully synthetic and lightweight.

class AudioAtmosphere {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private oscNode: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startDrone();
      this.playChime(520, "sine", 0.08, 0.4);
    } else {
      this.stopDrone();
    }

    return !this.isMuted;
  }

  public getStatus(): boolean {
    return !this.isMuted;
  }

  private startDrone() {
    if (!this.ctx) return;
    try {
      this.stopDrone();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      osc.type = "sine";
      osc.frequency.setValueAtTime(55, this.ctx.currentTime); // Deep A1 drone

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      this.oscNode = osc;
      this.gainNode = gain;
    } catch {
      // AudioContext policy
    }
  }

  private stopDrone() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.oscNode?.stop();
          this.oscNode?.disconnect();
          this.oscNode = null;
          this.gainNode = null;
        }, 500);
      } catch {
        this.oscNode = null;
        this.gainNode = null;
      }
    }
  }

  public playChime(freq = 440, type: OscillatorType = "sine", gainVal = 0.05, duration = 0.3) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore
    }
  }

  public playBreakoutSpark() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // Ignore
    }
  }
}

export const soundFx = new AudioAtmosphere();
