/**
 * Web Audio API synthesized sound effects for industrial locker simulation
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * High-pitch RFID badge scan "beep"
   */
  public playRfidBeep() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, this.ctx.currentTime); // A6
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Audio context policy safe fallback
    }
  }

  /**
   * Solenoid Locker Click & Unlock mechanical sound
   */
  public playLockerUnlock() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      // Click 1 (Solenoid hit)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.08);
      gain1.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start();
      osc1.stop(this.ctx.currentTime + 0.08);

      // Clack 2 (Latch release)
      setTimeout(() => {
        if (!this.ctx) return;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(640, this.ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.07);
        gain2.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.07);
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start();
        osc2.stop(this.ctx.currentTime + 0.07);
      }, 70);
    } catch {
      // safe fallback
    }
  }

  /**
   * Load Cell tare chime / verification success
   */
  public playLoadCellPass() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.25);
      });
    } catch {
      // safe fallback
    }
  }

  /**
   * Overdue Warning Alert or Weight Deficit Alarm
   */
  public playAlertBuzz() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(370, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // safe fallback
    }
  }
}

export const soundManager = new SoundEffectsManager();
