document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Modal Logik ---
    const modal = document.getElementById('customModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Stäng om användaren klickar på den suddiga bakgrunden
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // --- 2. Custom Video Player Logik ---
    const video = document.getElementById('customVideo');
    const videoContainer = document.getElementById('videoContainer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const muteBtn = document.getElementById('muteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    // Spela / Pausa videon
    function togglePlay() {
        if (video.paused) {
            video.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            video.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    playPauseBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    // Uppdatera tidslinjen när videon spelar
    video.addEventListener('timeupdate', () => {
        if (!isNaN(video.duration)) {
            const progressPercent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        }
    });

    // Klicka på tidslinjen för att hoppa i videon
    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (clickX / width) * video.duration;
        video.currentTime = newTime;
    });

    // Ljud Av / På
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.style.opacity = video.muted ? '0.5' : '1';
    });

    // Fullskärmsläge
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
});
