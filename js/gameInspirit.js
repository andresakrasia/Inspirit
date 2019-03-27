const EVENTS = {
    INITIALIZE_AR: "initialize AR",
    AR_INITIALIZED: "AR initialized",
    LOAD_ASSETS: "LoadAssets",
    ASSETS_READY: "AssetsReady",
    SETUP_GAME: "SetupGame",
    START_GAME: "StartGame",
    START_LEVEL: "StartLevel",
    WIN_LEVEL: "WinLevel",
    ENEMY_HIT: "Hit",
    ENEMY_DEAD: "Dead",
    NEXT_LEVEL: "NextLevel",
    GAME_COMPLETE: "GameComplete",
    PLAY_SOUND: "PlaySound",
}

class StartUpUI {

    constructor (Game) {

        
        this.setupScreen = document.getElementById("setupscreen");
        this.titleScreen = document.getElementById("titlescreen");

        this.loadingIndicator = document.getElementById("loading");
        this.startButton = document.getElementById("start");

        this.completeSetup = this.completeSetup.bind(this);
        this.loadingComplete = this.loadingComplete.bind(this);
        this.showTitle = this.showTitle.bind(this);

        this.setupScreen.addEventListener("touchstart", ()=> kickout(EVENTS.INITIALIZE_AR));
        this.setupScreen.addEventListener("click", ()=> kickout(EVENTS.INITIALIZE_AR));

        window.addEventListener(EVENTS.AR_INITIALIZED, this.completeSetup);
        window.addEventListener(EVENTS.ASSETS_READY, this.loadingComplete);
        window.addEventListener(EVENTS.INITIALIZE_AR, this.initialize.bind(this));
        kickout(EVENTS.AR_INITIALIZED);
    }

    completeSetup () {
        this.setupScreen.classList.remove('show');
        this.setupScreen.classList.add("hide");
        this.titleScreen.classList.remove("hide");
        this.titleScreen.classList.add("show");
        window.removeEventListener(EVENTS.AR_INITIALIZED, this.completeSetup);
        kickout(EVENTS.LOAD_ASSETS);
    }

    showTitle () {
        this.titleScreen.classList.remove('show');
        this.titleScreen.classList.add("hide");
        setTimeout(()=>{
            document.getElementById("StartScreenUI").innerHTML = '';
            delete this;
        }, 4000)
        kickout(EVENTS.START_GAME);
    }

    loadingComplete () {
        this.titleScreen.addEventListener("touchstart", this.showTitle);
        this.titleScreen.addEventListener("click", this.showTitle);
        this.loadingIndicator.classList.add("hide");
        this.startButton.classList.remove("hide");
        window.removeEventListener(EVENTS.ASSETS_READY, this.loadingComplete);
    }

}
class GameManager {

    constructor (levels) {
        this.levels = levels;



        window.addEventListener(EVENTS.START_GAME, this.startGame.bind(this));
        window.addEventListener(EVENTS.START_LEVEL, ()=>{});
        window.addEventListener(EVENTS.WIN_LEVEL, this.endLevel.bind(this));
        window.addEventListener(EVENTS.NEXT_LEVEL, this.nextLevel.bind(this))

        this.AR = new ARManager();
        this.hostUI = new StartUpUI();
        this.loop = null;
        this.assets = new AssetManager(assetList);

        //this.audio = new SoundPlayer(assetList, this.AR.camera);

        this.currentLevel = 0;
        this.level = null;
        this.lastLevel = null;

    }

    findAsset(name) {
        return this.assets.assets.find((o) => o.name === name);
    }

    findModel (name) {
        return this.assets.models.find((o) => o.name === name);
    }

    startGame () {

        this.loop = new GameLoop(this.AR);

        this.setLevel(0);

    }

    nextLevel () {

        this.setLevel(this.currentLevel + 1);
        
    }

    setLevel (level) {
        if(this.levels[level]) {
            this.currentLevel = level;


            const tarjetaBoton = document.getElementById("tarjetaBoton");
            
            //tarjetaBoton.src = `textures/${this.levels[level].WEAPON}.png`;


            document.getElementById("UI").classList.remove("hide");
            document.getElementById("UI").classList.add("show");

            /*
            const text = this.findModel(this.levels[level].ENEMY);
            const enemy = this.findAsset(this.levels[level].ENEMY);
            const weapon = this.findAsset(this.levels[level].WEAPON);
            if (this.level) { this.lastLevel = this.level };
            this.level = new this.levels[level].LEVEL(enemy, weapon, text, this.levels[level]);

            kickout(EVENTS.START_LEVEL, this.level);

           // this.AR.markerRoot.add(this.level.root);
        } else {
            this.currentLevel = 0;
            this.setLevel(0);
        }
    }

    endLevel ( level ) {
        document.getElementById("UI").classList.remove("show");
        document.getElementById("UI").classList.add("hide");
    }


}


//const game = new GameManager(LEVELS)