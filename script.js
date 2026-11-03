const relicData = {
    watch: {
        title: "Magic Hourglass Pendant",
        origin: "made by the ancient godfather of the 'Silly Universe'",
        story: "Long, long ago in the universe of the sillies, they discovered the concept of what we know as time. According to archeologists, it is the truest form of magic. ",
        riddle: "I have a face, but no eyes, nose, or mouth. I have hands, but I cannot clap. What am I? (asnwer in lower caps and just one word.)",
        answers: ["clock", "watch"],
        digit: "7",
        slotId: 1,
        badgeId: "badge-watch"
    },
    map: {
        title: "Ancient Treasure Map",
        origin: "Made by the mischief managers of Hogwarts, this map contains the path to the greatest treasures of life; joy",
        story: "Containing the most important of treasures, this magical map contains wonders that are invisible to human eyes",
        riddle: "I'm tall when I'm young, and I'm short when I'm old. What am I? (answer in 1 word, lower case.)",
        answers: ["candle", "pencil", "eraser"],
        digit: "3",
        slotId: 2,
        badgeId: "badge-map"
    },
    letter: {
        title: "ALchemist's Mysterious Letter",
        origin: "found be me in -1234 A.D.",
        story: "I found this letter thousands of years ago because I'm extremely old. It's extremely silly and peak.",
        riddle: "What gets wetter the more it dries? (asnwer in one word, lower case)",
        answers: ["towel"],
        digit: "4",
        slotId: 4,
        badgeId: "badge-letter"
    },
    cloak: {
        title: "Invisible Cloak",
        origin: "Discovered by my biggest hater who also happens to be my hb aka Mishu. He found it while hating on me like usual when I sent him a video of my halloween makeup",
        riddle: "The more you take, the more you leave behind. What is it? (one word answer, lower case)",
        answers: ["footsteps", "footstep", "steps", "step"],
        digit: "9",
        slotId: 3,
        badgeId: "badge-cloak"
    },
    tome: {
        title: "Ancient Tome Of Secrets",
        origin: "Found by Sabeeka The Great in 1883.",
        story: "When Sabeeka was on her journey to find me, she discoverd this absolute beauty in the world.",
        riddle: "What has many keys but opens no lock? answer in one word, lower case",
        answers: ["key", "keyboard", "keyboards", "piano", "pianos"],
        digit: "2",
        slotId: 5,
        badgeId: "badge-tome"
    }
};

const solvedRelics = {
    watch: false,
    map: false,
    cloak: false,
    letter: false,
    tome: false,

}

let currentRelickey = null;

function openModal(relicKey) {
    const relic = relicData[relicKey];
    if (!relic) return;

    currentRelicKey = relicKey;
    document.getElementById('modal-title').textContent = relic.title;
    document.getElementById('modal-origin').textContent = relic.origin;
    document.getElementById('modal-text').textContent = relic.story;

    const puzzleBox = document.getElementById('puzzle-box');
    const revealedBox = document.getElementById('revealed-word-box');

    if (solvedRelics[relicKey]) {
        puzzleBox.innerHTML = "";
        revealedBox.textContent = `Riddle SOlveddddd!!!! Secret Digit Revealed: ${relic.digit}`;


    } else {
        revealedBox.classList.add('hidden');
        puzzleBox.innerHTML = `
        <p class="riddle-text">Riddle: "${relic.riddle}"</p>
        <div class="input-group">
        <input type="text" id="riddle-input" class="puzzle-input" placeholder="Enter You Answer hereeee..." onkeypress="handleKeyPress(event)">
        <button class="puzzle-submit" onclick="SubmitAnswer()">SUBMITTTTT</button>
        </div>
        <p id="error-msg" style="color: #7a1c1c; font-size: 0.85rem; margin-top: 8px; display: none;"> incorrect Answer. try again! </p>

        `;
    }
    document.getElementById('modal').classList.add('active');


}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    currentRelicKey = null;
}

function closeModalOnOuter(event) {
    if (event.target.id == 'modal') {
        closeModal();

    }
}
function closeModalOnOuter(event) {
    if (event.target.id === 'modal') {
        closeModal();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        submitAnswer();
    }
}

function submitAnswer() {
    if (!currentRelicKey) return;
    const input = document.getElementById('riddle-input');
    const errorMsg = document.getElementById('error-msg');
    const userAnswer = input.value.trim().toLowerCase();
    const relic = relicData[currentRelicKey];

    if (relic.answers.includes(userAnswer)) {
        solvedRelics[currentRelicKey] = true;

        const slot = document.getElementById(`slot-${relic.slotId}`);
        slot.textContent = relic.digit;
        slot.classList.add('unlocked');

        const badge = document.getElementById(relic.badgeId);
        if (badge) {
            badge.textContent = "UNLOCKED";
            badge.classList.add('unlocked-badge');     
            }

        document.getElementById('puzzle-box').innerHTML = "";
        const revealedBox = document.getElementById('revealed-word-box');
        revealedBox.classList.remove('hidden');
        revealedBox.textContent = `CORRECTTTTTT!!!! YOU EARNED DIGIT #${relic.slotId}: [ ${relic.digit}]`;


        
        
    }

}

function openMasterVault() {
    const totalSolved = Object.values(solvedRelics).filter(Boolean).length;

    if (totalSolved === 5) {
        const fullCode = [
            relicData.watch.digit,
            relicData.map.digit,
            relicData.cloak.digit,
            relicData.letter.digit,
            relicData.tome.digit,

        ].join('');

        alert(`UNSEALEDDDD!! \n\ The Master Vault opens with code: ${fullCode}\n You have solved all the mysteries of Kims Antique store. psstt you MIGHT be Lane Kim. pls get my references.`);
    } else {
        alert(`The Master Vault remains sealed! You have unlocked ${totalSolved}/5 digits. Solve all riddles first!!!!!`);

    }
}
let canvas, ctx, width, height, particles;

function initCanvasAnimation() {
    const canvas = document.getElementById('shop-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        });

    const particles = Array.from({ length: 45}, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3 - 0.1
        }));
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#d4af37';
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();

document.addEventListener('DOMContentLoaded', initCanvasAnimation);
