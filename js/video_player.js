class VideoPlayerBasic {
    constructor(settings) {
        // "сольем" наши дефолтные сетинги с теми, что пришли
        this.settings = Object.assign(VideoPlayerBasic.getDefaultSettings(), settings)
    }

    init() {
        // сделаем проверку на то, что пришли в настройках непустые строки
        if (!this.settings.videoUrl) return console.error('NOT videoUrl')
        if (!this.settings.videoPlayerContainer) return console.error('NOT videoPlayerContainer')

        // создадим разметку на странице
        this.addTemplate()
        // найдем эл-ты для управления видосиком
        this.setElements()
        // обработчики
        this.setEvents()
    }

    addTemplate() {
        const template = this.createTemplate()
        const container = document.querySelector(this.settings.videoPlayerContainer)

        container ? container.insertAdjacentHTML('afterbegin', template) : console.error('NOT videoPlayerContainer')
    }

    setElements() {
        this.container = document.querySelector(this.settings.videoPlayerContainer);
        this.video = this.container.querySelector('video');
        this.toggleBtn = this.container.querySelector('.toggle');
        this.progress = this.container.querySelector('.progress__filled');
        this.progressContainer = this.container.querySelector('.progress');
        this.volumeInput = this.container.querySelector('[name = volume]');
        this.playbackRateInput = this.container.querySelector('[name = playbackRate]');
        this.playerButtons = this.container.querySelectorAll('[data-skip]');
    }

    setEvents() {
        this.video.addEventListener('click', this.toggleVideo)
        this.toggleBtn.addEventListener('click', this.toggleVideo)

        this.progressContainer.addEventListener('click', (e) => this.scrub(e))
        this.progressContainer.addEventListener('mousedown', () => this.isMouseDown = true)
        this.progressContainer.addEventListener('mouseup', () => this.isMouseDown = false)
        this.progressContainer.addEventListener('mousemove', (e) => {
            this.isMouseDown && this.scrub(e)
        })

        this.video.addEventListener('timeupdate', this.handleProgress)

        this.volumeInput.addEventListener('change', (event) => this.volumeChange(event))
        this.volumeInput.addEventListener('mousedown', () => this.isMouseDown = true)
        this.volumeInput.addEventListener('mouseup', () => this.isMouseDown = false)
        this.volumeInput.addEventListener('mousemove', (event) => {
            this.isMouseDown && this.volumeChange(event)
        })

        this.playbackRateInput.addEventListener('change', (event) => this.playbackRateChange(event))
        this.playbackRateInput.addEventListener('mousedown', () => this.isMouseDown = true)
        this.playbackRateInput.addEventListener('mouseup', () => this.isMouseDown = false)
        this.playbackRateInput.addEventListener('mousemove', (event) => {
            this.isMouseDown && this.playbackRateChange(event)
        })
        
        this.playerButtons.forEach(element => {
            element.addEventListener('click', this.clickRewindButton)
        })

        this.video.addEventListener('dblclick', this.clickRewindArea)
    }

    toggleVideo = () => {
        const method = this.video.paused ? 'play' : 'pause';
        this.toggleBtn.textContent = this.video.paused ? ' || ' : ' ► ';
        this.video[method]()
    }

    scrub(e) {
        this.video.currentTime = (e.offsetX / this.progressContainer.offsetWidth) * this.video.duration
    }

    handleProgress = () => {
        const {
            currentTime,
            duration
        } = this.video
        const percent = (currentTime / duration) * 100
        this.progress.style.flexBasis = `${percent}%`
    }

    volumeChange = (event) => {
        this.video.volume = event.target.value
    }

    playbackRateChange = (event) => {
        this.video.playbackRate = event.target.value
    }

    clickRewindButton = (event) => {
        const dataSkip = Number(event.target.dataset.skip);
        this.video.currentTime += dataSkip
    }

    clickRewindArea = (event) => {
        const { offsetX } = event;
        const { offsetWidth } = this.video;
        const {
            rewindAreaBack,
            rewindAreaForward
            } = this.settings.rewindAreas;

        if (offsetX >= 0 && offsetX <= 100) { this.handleRewindArea(-rewindAreaBack) }
        if (offsetX <= offsetWidth && offsetX > offsetWidth - 100) { this.handleRewindArea(rewindAreaForward) }
    }

    handleRewindArea = (value) => {
        this.video.currentTime += value
    }

    createTemplate() {
        const {
            videoUrl,
            volume,
            playbackRate,
            rewindButtons: {
                backBtnValue,
                forwardBtnValue
            }
        } = this.settings;

        return `
        <div class="player">
            <video class="player__video viewer" src="${videoUrl}"> </video>
            <div class="player__controls">
                <div class="progress">
                    <div class="progress__filled"></div>
            </div>
            <button class="player__button toggle" title="Toggle Play">►</button>
            <input type="range" name="volume" class="player__slider" min=0 max="1" step="0.05" value="${volume}">
            <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="${playbackRate}">
            <button data-skip="-${backBtnValue}" class="player__button">« ${backBtnValue}s</button>
            <button data-skip="${forwardBtnValue}" class="player__button">${forwardBtnValue}s »</button>
            </div>
        </div>
        `
    }

    static getDefaultSettings() {
        return {
            videoUrl: '',
            videoPlayerContainer: '',
            volume: 1,
            playbackRate: 1,
            rewindButtons: {
                backBtnValue: 1,
                forwardBtnValue: 1
            },
            rewindAreas: {
                rewindAreaBack: 1,
                rewindAreaForward: 1
            }
        }
    }
}

const myPlayer = new VideoPlayerBasic({
    videoUrl: 'video/mov_bbb.mp4',
    videoPlayerContainer: 'body'
});

myPlayer.init();