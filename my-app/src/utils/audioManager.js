// Global Audio Manager để quản lý tất cả audio trong app
class AudioManager {
  constructor() {
    this.currentAudio = null;
    this.audioElements = new Set();
  }

  // Dừng tất cả audio đang phát
  stopAllAudio() {
    // Dừng audio từ JavaScript Audio objects
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.remove();
      this.currentAudio = null;
    }

    // Dừng tất cả audio elements trong DOM
    this.audioElements.forEach((audio) => {
      if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    // Dừng tất cả audio elements khác trong DOM
    const allAudioElements = document.querySelectorAll("audio");
    allAudioElements.forEach((audio) => {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }

  // Đăng ký audio element
  registerAudio(audio) {
    if (audio) {
      this.audioElements.add(audio);
    }
  }

  // Hủy đăng ký audio element
  unregisterAudio(audio) {
    if (audio) {
      this.audioElements.delete(audio);
    }
  }

  // Set current audio (cho JavaScript Audio objects)
  setCurrentAudio(audio) {
    // Dừng audio cũ trước
    this.stopAllAudio();
    this.currentAudio = audio;
  }

  // Clear current audio
  clearCurrentAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.remove();
      this.currentAudio = null;
    }
  }

  // Cleanup khi rời khỏi trang
  cleanup() {
    this.stopAllAudio();
    this.audioElements.clear();
  }
}

// Tạo instance global
const audioManager = new AudioManager();

// Cleanup khi đóng tab/refresh
window.addEventListener("beforeunload", () => {
  audioManager.cleanup();
});

// Cleanup khi navigate (cho SPA)
window.addEventListener("popstate", () => {
  audioManager.stopAllAudio();
});

export default audioManager;
