const audioCtx = new AudioContext();
const audioFiles = [
    'Snapdragon_-_Therm.mp3',
    'Aria_Math_-_C418.mp3',
    'Far_-_C418.mp3',
    'Kyoto_-_C418.mp3',
    'Mutation_-_C418.mp3'
]; 
const audioPath = audioFiles[(Math.random()*audioFiles.length)|0];
const audioElement = new Audio(`./assets/music/${audioPath}`); 
audioElement.volume = 1;
audioElement.loop = true;

async function setupSurround() {
    if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
    };

    let source = audioCtx.createMediaElementSource(audioElement);

    const panner = new PannerNode(audioCtx, {
        panningModel: 'HRTF',
        distanceModel: 'inverse',
        positionX: 0,
        positionY: 0,
        positionZ: 1,
        orientationX: 0,
        orientationY: 0,
        orientationZ: -1
    });

    /*let delayNode = audioCtx.createDelay();
    delayNode.delayTime.value = 0.2;*/

    let feedbackNode = audioCtx.createGain();
    feedbackNode.gain.value = 0.5;

    //source.connect(delayNode);
    //delayNode.connect(feedbackNode);
    source.connect(feedbackNode)
    //feedbackNode.connect(delayNode);
    
    feedbackNode.connect(panner);
    panner.connect(audioCtx.destination);

    let angle = 0;
    const moveSound = () => {
        angle += 0.02;
        const x = Math.sin(angle) * 5; 
        const z = Math.cos(angle) * 5;
        
        panner.positionX.value = x;
        panner.positionZ.value = z;
        
        requestAnimationFrame(moveSound);
    };
    moveSound();
};

export async function startMusic() {
    await setupSurround();
    audioElement.play();
};