/**
 * Battle of Emoji -- Game Logic
 */

// -------------------------------
// Data: characters and moves
// -------------------------------
const CHARACTERS = [
  {
    id: 'wizard', name: 'Wizard', emoji: '🧙‍♂️', hp: 100, stamMax: 100, special: { name: 'Time Freeze', emoji: '⏳', used: false, effect: 'skip_enemy_next_turn' }, moves: [
      { id: 'timefreeze', name: 'Time Freeze', emoji: '⏳', dmg: 0, stam: 35, cd: 4, desc: 'Skip enemy turn' },
      { id: 'fireball', name: 'Fireball', emoji: '🔥', dmg: 24, stam: 18, cd: 2, dot: 3 },
      { id: 'watershield', name: 'Water Shield', emoji: '💧', dmg: 0, stam: 15, cd: 3, heal: 12, buff: 'shield' },
      { id: 'lightning', name: 'Lightning Strike', emoji: '⚡', dmg: 28, stam: 24, cd: 3, type: 'electric', debuff: 'stun' },
      { id: 'wind', name: 'Wind Gust', emoji: '🌬️', dmg: 14, stam: 10, cd: 2, buff: 'evade' },
      { id: 'earth', name: 'Earthquake', emoji: '🌍', dmg: 22, stam: 22, cd: 3 },
      { id: 'ice', name: 'Ice Shard', emoji: '❄️', dmg: 18, stam: 12, cd: 2, debuff: 'stun' },
      { id: 'arcane', name: 'Arcane Blast', emoji: '🔮', dmg: 35, stam: 30, cd: 4 },
      { id: 'meditate', name: 'Meditate', emoji: '🧘‍♂️', dmg: 0, stam: 0, cd: 3, heal: 15 },
      { id: 'meteor', name: 'Meteor Swarm', emoji: '☄️', dmg: 40, stam: 40, cd: 5, dot: 5 }
    ]
  },

  {
    id: 'demon', name: 'Demon', emoji: '👺', hp: 115, stamMax: 100, special: { name: 'Hellfire', emoji: '🔥🔥🔥', used: false, effect: 'massive_dmg' }, moves: [
      { id: 'hellfire', name: 'Hellfire', emoji: '🔥🔥', dmg: 38, stam: 35, cd: 4, dot: 5 },
      { id: 'summon', name: 'Summon Minion', emoji: '🦖', dmg: 8, stam: 20, cd: 3, dot: 2 },
      { id: 'quick', name: 'Quick Punch', emoji: '👊', dmg: 14, stam: 8, cd: 1 },
      { id: 'create', name: 'Bone Shield', emoji: '💀', dmg: 0, stam: 12, cd: 3, buff: 'shield' },
      { id: 'deadeye', name: 'Dead Eye', emoji: '👁️', dmg: 0, stam: 15, cd: 3, buff: 'crit_up' },
      { id: 'thousands', name: 'Soul Steal', emoji: '👻', dmg: 18, stam: 15, cd: 3, healPct: 0.4 },
      { id: 'bloodpact', name: 'Blood Pact', emoji: '🩸', dmg: 0, stam: 10, cd: 3, buff: 'crit_up', heal: -10 },
      { id: 'chaosorb', name: 'Chaos Orb', emoji: '🌌', dmg: 25, stam: 22, cd: 3, debuff: 'confuse' },
      { id: 'shadowclaw', name: 'Shadow Claw', emoji: '💅', dmg: 22, stam: 18, cd: 2, dot: 4 },
      { id: 'possess', name: 'Possess', emoji: '🧟', dmg: 10, stam: 25, cd: 4, debuff: 'stun' }
    ]
  },

  {
    id: 'ninja', name: 'Ninja', emoji: '🥷', hp: 90, stamMax: 110, special: { name: 'Shadow Master', emoji: '👤', used: false, effect: 'dodge_boost' }, moves: [
      { id: 'reflex', name: 'Quick Reflex', emoji: '⚡', dmg: 16, stam: 8, cd: 1, buff: 'evade' },
      { id: 'smoke', name: 'Smoke Bomb', emoji: '💨', dmg: 0, stam: 12, cd: 3, buff: 'dodge' },
      { id: 'shuriken', name: 'Shuriken', emoji: '🪃', dmg: 18, stam: 10, cd: 1, buff: 'crit_up' },
      { id: 'poison', name: 'Poison Dart', emoji: '💉', dmg: 8, stam: 10, cd: 2, dot: 6 },
      { id: 'bladestorm', name: 'Blade Storm', emoji: '⚔️', dmg: 26, stam: 24, cd: 3 },
      { id: 'shadow', name: 'Shadow Step', emoji: '👣', dmg: 14, stam: 8, cd: 2, buff: 'dodge' },
      { id: 'caltrops', name: 'Caltrops', emoji: '⚠️', dmg: 10, stam: 12, cd: 3, dot: 4 },
      { id: 'kunai', name: 'Kunai Rain', emoji: '🔪', dmg: 24, stam: 18, cd: 2 },
      { id: 'assassin', name: 'Assassin Strike', emoji: '🗡️', dmg: 35, stam: 30, cd: 4, buff: 'crit_up' },
      { id: 'substitute', name: 'Log Substitution', emoji: '🪵', dmg: 0, stam: 15, cd: 3, buff: 'evade' }
    ]
  },

  {
    id: 'swordsman', name: 'Swordsman', emoji: '🤺', hp: 105, stamMax: 100, special: { name: 'Blade Echo', emoji: '🌪️⚔️', used: false, effect: 'extra_attack' }, moves: [
      { id: 'deflect', name: 'Deflect', emoji: '🔁', dmg: 0, stam: 10, cd: 3, buff: 'reflect' },
      { id: 'bladestorm2', name: 'Bladestorm', emoji: '🌪️⚔️', dmg: 30, stam: 24, cd: 3 },
      { id: 'windslash', name: 'Wind Slash', emoji: '🍃🗡️', dmg: 20, stam: 14, cd: 2 },
      { id: 'sword', name: 'Vital Strike', emoji: '🗡️', dmg: 18, stam: 12, cd: 2, buff: 'crit_up' },
      { id: 'twin', name: 'Twin Blades', emoji: '🗡️🗡️', dmg: 22, stam: 16, cd: 2 },
      { id: 'shieldbash', name: 'Shield Bash', emoji: '🛡️', dmg: 12, stam: 10, cd: 2, debuff: 'stun' },
      { id: 'parry', name: 'Parry', emoji: '⚔️', dmg: 10, stam: 8, cd: 2, buff: 'dodge' },
      { id: 'pommel', name: 'Pommel Strike', emoji: '🔨', dmg: 15, stam: 12, cd: 2, debuff: 'stun' },
      { id: 'lunge', name: 'Lunge', emoji: '🤺', dmg: 28, stam: 20, cd: 3 },
      { id: 'berserk', name: 'Berserk', emoji: '👺', dmg: 0, stam: 20, cd: 4, buff: 'crit_up', heal: -10 }
    ]
  },

  {
    id: 'vampire', name: 'Vampire', emoji: '🧛', hp: 95, stamMax: 100, special: { name: 'Blood Thrall', emoji: '🩸', used: false, effect: 'vamp_burst' }, moves: [
      { id: 'bat', name: 'Bat Swarm', emoji: '🦇', dmg: 14, stam: 8, cd: 1, buff: 'evade' },
      { id: 'bite', name: 'Fang Bite', emoji: '☠️', dmg: 20, stam: 16, cd: 2, dot: 3 },
      { id: 'gaze', name: 'Hypnotic Gaze', emoji: '👁️', dmg: 0, stam: 18, cd: 3, debuff: 'stun' },
      { id: 'drain', name: 'Life Drain', emoji: '🩸', dmg: 18, stam: 15, cd: 2, healPct: 0.6 },
      { id: 'mist', name: 'Mist Form', emoji: '🌫️', dmg: 0, stam: 12, cd: 3, buff: 'dodge' },
      { id: 'nightmare', name: 'Nightmare', emoji: '🌑', dmg: 10, stam: 12, cd: 3, debuff: 'fear' },
      { id: 'shadowball', name: 'Shadow Ball', emoji: '🔮', dmg: 24, stam: 20, cd: 2 },
      { id: 'bloodboil', name: 'Blood Boil', emoji: '🌡️', dmg: 30, stam: 25, cd: 3, dot: 4 },
      { id: 'transfuse', name: 'Dark Pact', emoji: '📜', dmg: 0, stam: 10, cd: 3, heal: 20 },
      { id: 'screech', name: 'Sonic Screech', emoji: '🔊', dmg: 12, stam: 14, cd: 2, debuff: 'confuse' }
    ]
  },

  {
    id: 'dragon', name: 'Dragon', emoji: '🐉', hp: 125, stamMax: 100, special: { name: 'Dragon Roar', emoji: '🐉🔥', used: false, effect: 'fear' }, moves: [
      { id: 'roar', name: 'Dragon Roar', emoji: '🗣️', dmg: 5, stam: 15, cd: 3, debuff: 'fear' },
      { id: 'flame', name: 'Flame Breath', emoji: '🔥', dmg: 32, stam: 28, cd: 3, dot: 4 },
      { id: 'claw', name: 'Claw', emoji: '🦴', dmg: 20, stam: 14, cd: 1 },
      { id: 'wing', name: 'Wing Gust', emoji: '🪽', dmg: 12, stam: 10, cd: 2, debuff: 'confuse' },
      { id: 'scale', name: 'Iron Scales', emoji: '🛡️', dmg: 0, stam: 15, cd: 3, buff: 'shield' },
      { id: 'earth2', name: 'Lava Strike', emoji: '🌋', dmg: 26, stam: 22, cd: 3, dot: 3 },
      { id: 'tail', name: 'Tail Whip', emoji: '🐍', dmg: 22, stam: 18, cd: 2 },
      { id: 'fly', name: 'Fly High', emoji: '☁️', dmg: 0, stam: 12, cd: 3, buff: 'evade' },
      { id: 'magma', name: 'Magma Pool', emoji: '♨️', dmg: 15, stam: 20, cd: 3, dot: 6 },
      { id: 'bite2', name: 'Crunch', emoji: '🦷', dmg: 28, stam: 24, cd: 2 }
    ]
  },

  {
    id: 'genie', name: 'Genie', emoji: '🧞', hp: 95, stamMax: 110, special: { name: 'Wish', emoji: '✨', used: false, effect: 'big_heal' }, moves: [
      { id: 'tele', name: 'Teleport', emoji: '📍', dmg: 0, stam: 10, cd: 2, buff: 'dodge' },
      { id: 'surge', name: 'Elemental Surge', emoji: '🔥💧🌬️', dmg: 28, stam: 24, cd: 3, debuff: 'confuse' },
      { id: 'illusion', name: 'Illusion Cloud', emoji: '🌫️', dmg: 5, stam: 14, cd: 3, debuff: 'confuse' },
      { id: 'chaos', name: 'Chaos Blast', emoji: '⚡🔥', dmg: 30, stam: 26, cd: 4 },
      { id: 'heal', name: 'Healing Light', emoji: '🕊️', dmg: 0, stam: 18, cd: 3, heal: 25 },
      { id: 'cursed', name: 'Cursed Shackles', emoji: '🔗', dmg: 12, stam: 12, cd: 3, debuff: 'stun' },
      { id: 'wish3', name: 'Three Wishes', emoji: '🧞‍♂️', dmg: 0, stam: 30, cd: 5, buff: 'crit_up', heal: 15 },
      { id: 'carpet', name: 'Magic Carpet', emoji: '🛸', dmg: 15, stam: 12, cd: 2, buff: 'evade' },
      { id: 'lamp', name: 'Lamp Trap', emoji: '🏺', dmg: 20, stam: 20, cd: 3, debuff: 'stun' },
      { id: 'mystic', name: 'Mystic Bolt', emoji: '✨', dmg: 24, stam: 18, cd: 2 }
    ]
  },

  {
    id: 'knight', name: 'Knight', emoji: '🤴', hp: 120, stamMax: 90, special: { name: 'Royal Guard', emoji: '🛡️', used: false, effect: 'shield_block' }, moves: [
      { id: 'honor', name: 'Strike of Honor', emoji: '⚔️', dmg: 22, stam: 16, cd: 2 },
      { id: 'rally', name: 'Rally', emoji: '🚩', dmg: 0, stam: 14, cd: 3, buff: 'crit_up' },
      { id: 'heatview', name: 'Glare', emoji: '🧿', dmg: 5, stam: 10, cd: 2, debuff: 'fear' },
      { id: 'execute', name: 'Execution', emoji: '⚖️', dmg: 35, stam: 30, cd: 4 },
      { id: 'block', name: 'Tower Shield', emoji: '🛡️', dmg: 0, stam: 12, cd: 2, buff: 'shield' },
      { id: 'charge', name: 'Charge', emoji: '🐎', dmg: 20, stam: 18, cd: 2, debuff: 'stun' },
      { id: 'joust', name: 'Heavy Joust', emoji: '🦄', dmg: 30, stam: 25, cd: 3 },
      { id: 'holy', name: 'Holy Light', emoji: '✨', dmg: 0, stam: 20, cd: 3, heal: 15 },
      { id: 'taunt', name: 'Taunt', emoji: '🤬', dmg: 0, stam: 10, cd: 2, debuff: 'confuse' },
      { id: 'fortify', name: 'Fortify', emoji: '🏰', dmg: 0, stam: 15, cd: 3, buff: 'shield' }
    ]
  },

  {
    id: 'supermom', name: 'Super Mom', emoji: '👸', hp: 105, stamMax: 100, special: { name: 'Motherly Order', emoji: '🔊', used: false, effect: 'debuff_enemy' }, moves: [
      { id: 'scold', name: 'Scold', emoji: '👉', dmg: 5, stam: 12, cd: 2, debuff: 'fear' },
      { id: 'care', name: 'Super Care', emoji: '💖', dmg: 0, stam: 15, cd: 3, heal: 22 },
      { id: 'shieldmom', name: "Protective Shield", emoji: '🛡️', dmg: 0, stam: 12, cd: 3, buff: 'shield' },
      { id: 'hug', name: 'Nurturing Hug', emoji: '🤗', dmg: 0, stam: 12, cd: 2, heal: 14, buff: 'shield' },
      { id: 'wrath', name: 'Motherly Wrath', emoji: '🔥', dmg: 28, stam: 22, cd: 3 },
      { id: 'glare', name: 'Death Stare', emoji: '👀', dmg: 0, stam: 14, cd: 3, debuff: 'confuse' },
      { id: 'timeout', name: 'Time Out', emoji: '🛑', dmg: 0, stam: 20, cd: 4, debuff: 'stun' },
      { id: 'snack', name: 'Healthy Snack', emoji: '🍎', dmg: 0, stam: 10, cd: 2, heal: 10 },
      { id: 'grounded', name: 'You are Grounded!', emoji: '🏠', dmg: 10, stam: 15, cd: 3, debuff: 'stun' },
      { id: 'cleanup', name: 'Clean Up', emoji: '🧹', dmg: 15, stam: 12, cd: 2 }
    ]
  },

  {
    id: 'ogre', name: 'Ogre', emoji: '🧌', hp: 130, stamMax: 90, special: { name: 'Ground Smash', emoji: '🔨', used: false, effect: 'stun' }, moves: [
      { id: 'club', name: 'Club Swing', emoji: '🪓', dmg: 24, stam: 18, cd: 1 },
      { id: 'stomp', name: 'Stomp', emoji: '🦶', dmg: 26, stam: 20, cd: 2 },
      { id: 'roar', name: 'Terrifying Roar', emoji: '🗣️', dmg: 0, stam: 14, cd: 3, debuff: 'fear' },
      { id: 'intimidate', name: 'Intimidate', emoji: '😠', dmg: 0, stam: 12, cd: 3, debuff: 'confuse' },
      { id: 'slam', name: 'Slam moves', emoji: '💥', dmg: 34, stam: 28, cd: 4 },
      { id: 'boulder', name: 'Boulder Throw', emoji: '🪨', dmg: 22, stam: 18, cd: 2, debuff: 'stun' },
      { id: 'belly', name: 'Belly Flop', emoji: '🤰', dmg: 30, stam: 25, cd: 3 },
      { id: 'tree', name: 'Tree Smash', emoji: '🌲', dmg: 28, stam: 24, cd: 3 },
      { id: 'hungry', name: 'Hungry', emoji: '🍖', dmg: 0, stam: 15, cd: 3, heal: 20 },
      { id: 'rage', name: 'Ogre Rage', emoji: '😡', dmg: 0, stam: 15, cd: 4, buff: 'crit_up' }
    ]
  }
];

// -------------------------------
// Game state
// -------------------------------
let state = {
  player: null,
  opponent: null,
  playerMovesSelected: [],
  opponentMovesSelected: [],
  weather: 'sunny',
  round: 0,
  log: [],
  rngSeed: Math.random()
};

// -------------------------------
// Utility helpers
// -------------------------------
function $(id) { return document.getElementById(id) }

function cloneCharacter(char) {
  // deep copy + attach runtime fields
  const base = JSON.parse(JSON.stringify(char));
  base.hpCurrent = base.hp;
  base.stamCurrent = base.stamMax;
  base.cooldowns = {};
  base.moves.forEach(m => base.cooldowns[m.id] = 0);
  base.special = base.special || { used: false };
  base.buffs = {}; // e.g., dodge, shield
  return base;
}

function randChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// damage modifiers based on weather
function weatherModifier(move) {
  const w = state.weather;
  if (!move) return 1;
  if (w === 'storm' && move.type === 'electric') return 1.4;
  if (w === 'rain' && move.emoji && move.emoji.includes('🔥')) return 0.8; // fire dampened
  if (w === 'fog' && move.buff === 'evade') return 0.8;
  if (w === 'sunny' && move.emoji && move.emoji.includes('🔥')) return 1.1;
  return 1;
}

function pct(v, mx) { return Math.max(0, Math.min(100, Math.round((v / mx) * 100))); }

// logs
function log(msg) { state.log.unshift(msg); renderLog(); }
function renderLog() {
  const l = $('log');
  if (!l) return;
  l.innerHTML = state.log.slice(0, 200).map(s => '<div>' + s + '</div>').join('');
}

// -------------------------------
// SELECTION PAGE LOGIC
// -------------------------------
// -------------------------------
// SELECTION PAGE LOGIC
// -------------------------------
function initSelectionPage() {
  const playerPicker = $('playerPicker');
  const opponentPicker = $('opponentPicker');
  const movesList = $('movesList');
  const selectedCount = $('selectedCount');

  // Check Online Mode
  const onlineDataStr = localStorage.getItem('emojiOnline');
  const onlineData = onlineDataStr ? JSON.parse(onlineDataStr) : null;
  const isOnline = !!onlineData;
  const myRole = onlineData ? onlineData.role : null; // 'p1' or 'p2'

  if (!playerPicker) return; // safety

  // UI Tweaks for Online
  if (isOnline) {
    $('opponentPicker').parentElement.style.display = 'none'; // Hide opponent picker
    $('randomChars').style.display = 'none'; // Disable random for now
    $('weatherSelect').parentElement.style.display = 'none'; // Host handles weather or random
    $('startBtn').textContent = "Ready & Sync";

    const title = document.createElement('h3');
    title.textContent = `ONLINE MATCH (You are ${myRole.toUpperCase()})`;
    title.style.color = '#6ee7b7';
    title.style.textAlign = 'center';
    playerPicker.parentElement.parentElement.insertBefore(title, playerPicker.parentElement);
  }

  function renderPickers() {
    playerPicker.innerHTML = ''; opponentPicker.innerHTML = '';
    CHARACTERS.forEach(c => {
      const card1 = document.createElement('div'); card1.className = 'char-card';
      if (state.player && state.player.id === c.id) card1.classList.add('selected');
      card1.innerHTML = `<div class='char-emoji'>${c.emoji}</div><div><strong>${c.name}</strong><div class='muted'>HP ${c.hp} • Stamina ${c.stamMax}</div></div>`;
      card1.onclick = () => selectChar('player', c.id);
      playerPicker.appendChild(card1);

      // Only render opponent picker if NOT online
      if (!isOnline) {
        const card2 = card1.cloneNode(true); card2.className = 'char-card';
        if (state.opponent && state.opponent.id === c.id) card2.classList.add('selected');
        card2.onclick = () => selectChar('opponent', c.id);
        opponentPicker.appendChild(card2);
      }
    });
  }

  function selectChar(who, id) {
    const char = CHARACTERS.find(c => c.id === id);
    if (!char) return;
    if (who === 'player') {
      state.player = cloneCharacter(char);
    } else {
      state.opponent = cloneCharacter(char);
    }
    // reset selections related
    state.playerMovesSelected = [];
    state.opponentMovesSelected = [];
    renderPickers(); renderMovesList();
  }

  function renderMovesList() {
    movesList.innerHTML = ''; selectedCount.textContent = state.playerMovesSelected.length;
    if (!state.player) { movesList.innerHTML = '<div class="muted">Choose a player character first</div>'; return; }
    state.player.moves.forEach(m => {
      const mv = document.createElement('div'); mv.className = 'move';
      const isSelected = state.playerMovesSelected.some(x => x.id === m.id);
      mv.innerHTML = `<div class='memoji'>${m.emoji}</div><div><strong>${m.name}</strong><small>${m.desc || m.type || ''} ${m.heal ? ' • Heal' : ''}${m.dot ? ' • DOT' : ''}</small></div><div style='margin-left:8px' class='muted'>(${m.emoji} ${isSelected ? '✔' : ' '})</div>`;
      mv.onclick = () => toggleMove(m);
      if (!isSelected && state.playerMovesSelected.length >= 6) mv.classList.add('locked');
      movesList.appendChild(mv);
    });
  }

  function toggleMove(m) {
    const idx = state.playerMovesSelected.findIndex(x => x.id === m.id);
    if (idx > -1) { state.playerMovesSelected.splice(idx, 1); }
    else {
      if (state.playerMovesSelected.length >= 6) return; // limit
      state.playerMovesSelected.push(JSON.parse(JSON.stringify(m)));
    }
    selectedCount.textContent = state.playerMovesSelected.length;
    renderMovesList();
  }

  // opponent auto-pick moves (randomly pick 6 best available)
  function opponentAutoPick() {
    if (!state.opponent) return;
    const pool = [...state.opponent.moves];
    // prefer higher dmg
    pool.sort((a, b) => (b.dmg || 0) - (a.dmg || 0));
    state.opponentMovesSelected = pool.slice(0, 6).map(m => JSON.parse(JSON.stringify(m)));
  }

  // Buttons
  $('randomChars').onclick = () => {
    const p = randChoice(CHARACTERS); const o = randChoice(CHARACTERS);
    selectChar('player', p.id); selectChar('opponent', o.id);
  }
  $('randomMoves').onclick = () => {
    if (!state.player) return; const pool = [...state.player.moves]; pool.sort(() => Math.random() - 0.5);
    state.playerMovesSelected = pool.slice(0, 6).map(m => JSON.parse(JSON.stringify(m)));
    selectedCount.textContent = state.playerMovesSelected.length; renderMovesList();
  }

  $('startBtn').onclick = () => {
    // 1. Validation
    if (!state.player) { alert('Select your character first.'); return; }
    if (state.playerMovesSelected.length === 0) { alert('Select up to 6 moves (min 1).'); return; }
    // 2. Online Path
    if (isOnline) {
      const btn = $('startBtn');
      btn.disabled = true;
      btn.textContent = "Syncing...";

      // Sync my selection to DB
      const roomRef = db.ref('rooms/' + onlineData.room);
      const myData = {
        char: state.player,
        moves: state.playerMovesSelected,
        ready: true
      };

      console.log(`Sending ready state for ${myRole}...`);

      roomRef.child(myRole).update(myData).then(() => {
        console.log(`✅ ${myRole} Data saved!`);
        btn.textContent = "Waiting for Opponent...";

        // Host sets weather (or whoever is first if missing)
        roomRef.child('weather').get().then(snap => {
          if (!snap.exists() && myRole === 'p1') {
            const w = randChoice(['sunny', 'rain', 'storm', 'fog']);
            roomRef.update({ weather: w });
          }
        });

      }).catch(err => {
        console.error(`❌ Data save failed:`, err);
        alert("Network Error: Could not save selection. " + err.message);
        btn.disabled = false;
        btn.textContent = "Ready & Sync";
      });

      // Wait for both ready
      roomRef.on('value', snap => {
        const val = snap.val();
        console.log("Room Update:", val);
        if (!val) return;

        const p1Ready = val.p1 && val.p1.ready;
        const p2Ready = val.p2 && val.p2.ready;
        let weather = val.weather;

        if (p1Ready && p2Ready) {
          // If weather missing, default it locally and push, but don't block
          if (!weather) {
            console.warn("Weather missing from sync, defaulting to Sunny locally.");
            weather = 'sunny';
            if (myRole === 'p1') roomRef.update({ weather: 'sunny' });
          }

          console.log("ALL READY! Starting game...");
          const opponentRole = myRole === 'p1' ? 'p2' : 'p1';
          const oppData = val[opponentRole];

          state.opponent = oppData.char;
          state.opponentMovesSelected = oppData.moves;
          state.weather = weather;

          // Save and Go
          const saveData = {
            player: state.player,
            opponent: state.opponent,
            playerMovesSelected: state.playerMovesSelected,
            opponentMovesSelected: state.opponentMovesSelected,
            weather: state.weather,
            online: true,
            role: myRole,
            room: onlineData.room
          };
          localStorage.setItem('emojiBattleState', JSON.stringify(saveData));
          window.location.href = 'play.html';
        } else {
          btn.textContent = `Waiting... (P1:${p1Ready ? 'OK' : '...'} P2:${p2Ready ? 'OK' : '...'})`;
        }
      });
      return;
    }

    // 3. Local Path (Legacy)
    if (!state.opponent) { alert('Select opponent character.'); return; }
    opponentAutoPick();

    const wSel = $('weatherSelect').value;
    state.weather = wSel === 'random' ? randChoice(['sunny', 'rain', 'storm', 'fog']) : wSel;

    // Save state to localStorage
    const saveData = {
      player: state.player,
      opponent: state.opponent,
      playerMovesSelected: state.playerMovesSelected,
      opponentMovesSelected: state.opponentMovesSelected,
      weather: state.weather
    };
    localStorage.setItem('emojiBattleState', JSON.stringify(saveData));

    // Redirect
    window.location.href = 'play.html';
  }

  // Init
  renderPickers();
  renderMovesList();
}


// -------------------------------
// BATTLE PAGE LOGIC
// -------------------------------

function initBattlePage() {
  if (!$('playerBox')) return;

  // Load state
  const saved = localStorage.getItem('emojiBattleState');
  if (!saved) {
    alert("No game state found. Redirecting to selection.");
    window.location.href = "select.html";
    return;
  }
  let data;
  try {
    data = JSON.parse(saved);
  } catch (e) {
    console.error(e);
    localStorage.removeItem('emojiBattleState');
    alert("Game data corrupted. Resetting.");
    window.location.href = "select.html";
    return;
  }

  // Validate Data
  if (!data.player || !data.opponent || !data.player.moves || !data.player.name) {
    // Invalid state from old version
    localStorage.removeItem('emojiBattleState');
    alert("Game assets updated! Please select characters again.");
    window.location.href = "select.html";
    return;
  }

  state.player = data.player;
  state.opponent = data.opponent;
  state.playerMovesSelected = data.playerMovesSelected;
  state.opponentMovesSelected = data.opponentMovesSelected;
  state.weather = data.weather;
  state.log = [];
  state.round = 0;

  log(`Battle started! Weather: ${state.weather.toUpperCase()}`);

  // render fighters
  function renderFighters() {
    $('playerName').textContent = state.player ? `${state.player.emoji} ${state.player.name}` : 'Player';
    $('opponentName').textContent = state.opponent ? `${state.opponent.emoji} ${state.opponent.name}` : 'Opponent';

    // Arena Updates
    const arena = $('battleArena');
    if (arena && state.player && state.opponent) {
      arena.className = `arena bg-${state.weather}`;
      $('arenaPlayer').textContent = state.player.emoji;
      $('arenaOpponent').textContent = state.opponent.emoji;
    }

    updateBars(); updateCooldownDisplays(); renderPlayerMovesArea();
  }

  function updateBars() {
    if (state.player) { $('playerHP').style.width = pct(state.player.hpCurrent, state.player.hp) + "%"; $('playerHPText').textContent = state.player.hpCurrent + " / " + state.player.hp; $('playerStam').style.width = pct(state.player.stamCurrent, state.player.stamMax) + "%"; $('playerStamText').textContent = Math.round(state.player.stamCurrent) + " / " + state.player.stamMax; }
    if (state.opponent) { $('opponentHP').style.width = pct(state.opponent.hpCurrent, state.opponent.hp) + "%"; $('opponentHPText').textContent = state.opponent.hpCurrent + " / " + state.opponent.hp; $('opponentStam').style.width = pct(state.opponent.stamCurrent, state.opponent.stamMax) + "%"; $('opponentStamText').textContent = Math.round(state.opponent.stamCurrent) + " / " + state.opponent.stamMax; }
    renderBuffs();
  }

  const BUFF_ICONS = {
    skip_turn: { icon: '⏳', name: 'Frozen', type: 'debuff' },
    stun: { icon: '💫', name: 'Stunned', type: 'debuff' },
    confuse: { icon: '😵', name: 'Confused', type: 'debuff' },
    fear: { icon: '😱', name: 'Fear', type: 'debuff' },
    poison: { icon: '☠️', name: 'Poison', type: 'debuff' },
    dot: { icon: '🔥', name: 'Burn', type: 'debuff' },
    shield: { icon: '🛡️', name: 'Shield', type: 'buff' },
    dodge: { icon: '💨', name: 'Dodge', type: 'buff' },
    evade: { icon: '⚡', name: 'Evade', type: 'buff' },
    crit_up: { icon: '🎯', name: 'Crit Up', type: 'buff' },
    reflect: { icon: '🔁', name: 'Reflect', type: 'buff' }
  };

  function renderBuffs() {
    const render = (char, containerId) => {
      const container = $(containerId);
      if (!container || !char || !char.buffs) return;
      container.innerHTML = '';

      Object.entries(char.buffs).forEach(([key, val]) => {
        if (val > 0) {
          const info = BUFF_ICONS[key] || { icon: '❓', name: key, type: 'buff' };
          const div = document.createElement('div');
          div.className = `buff-item ${info.type}`;
          div.innerHTML = `${info.icon} ${info.name} (${val})`;
          container.appendChild(div);
        }
      });
    };
    render(state.player, 'playerBuffs');
    render(state.opponent, 'opponentBuffs');
  }


  function updateCooldownDisplays() {
    if (state.player) {
      const txt = Object.entries(state.player.cooldowns).map(([id, cd]) => {
        const mv = state.player.moves.find(m => m.id === id); if (!mv) return null; return `${mv.emoji} (${cd}/${mv.cd})`;
      }).filter(Boolean).join(' ');
      $('playerCooldowns').textContent = 'Cooldowns: ' + (txt || '-');
    }
    if (state.opponent) {
      const txt = Object.entries(state.opponent.cooldowns).map(([id, cd]) => {
        const mv = state.opponent.moves.find(m => m.id === id); if (!mv) return null; return `${mv.emoji} (${cd}/${mv.cd})`;
      }).filter(Boolean).join(' ');
      $('opponentCooldowns').textContent = 'Cooldowns: ' + (txt || '-');
    }
  }

  // player moves area (active battle controls)
  function renderPlayerMovesArea() {
    const area = $('playerMovesArea'); area.innerHTML = '';
    if (!state.player || state.playerMovesSelected.length === 0) { area.innerHTML = '<div class="muted">Error: No moves</div>'; return; }
    state.playerMovesSelected.forEach(m => {
      const btn = document.createElement('div'); btn.className = 'move';
      const cd = state.player.cooldowns[m.id] || 0;
      const locked = (cd > 0) || (state.player.stamCurrent < (m.stam || 0));
      if (locked) btn.classList.add('locked');
      btn.innerHTML = `<div class='memoji'>${m.emoji}</div><div><strong>${m.name}</strong><small>${m.dmg ? m.dmg + ' dmg' : ''}${m.heal ? ' • heal' : ''} (${m.emoji} ${cd}/${m.cd})</small></div>`;
      btn.onclick = () => { if (locked) return; playerUseMove(m); };
      area.appendChild(btn);
    });
  }

  // helper for visual effects
  function animate(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth; // trigger reflow
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 600);
  }

  function showFloatingText(targetEl, text, type) {
    if (!targetEl) return;
    const el = document.createElement('div');
    el.className = `floating-text ${type}`;
    el.textContent = text;
    // position center
    el.style.left = '50%';
    el.style.top = '20%';
    el.style.transform = 'translate(-50%, -50%)';
    targetEl.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  function animateProjectile(isPlayer, emoji, callback) {
    const arena = $('battleArena');
    if (!arena) { if (callback) callback(); return; }

    const proj = document.createElement('div');
    proj.className = `arena-projectile ${isPlayer ? 'anim-projectile-right' : 'anim-projectile-left'}`;
    proj.textContent = emoji;

    // Position vertically relative to arena
    proj.style.top = '50%';

    arena.appendChild(proj);

    // Animation duration is 1.2s defined in CSS
    setTimeout(() => {
      proj.remove();
      if (callback) callback();
    }, 1150); // Slightly less than 1.2s to trigger hit right before end
  }

  // resolve a move from attacker to defender
  function resolveMove(attacker, defender, move) {
    const isPlayer = attacker === state.player;
    // TARGET ARENA CHARACTERS for animation/text
    const attEl = isPlayer ? $('arenaPlayer') : $('arenaOpponent');
    const defEl = isPlayer ? $('arenaOpponent') : $('arenaPlayer');

    // 0. check skip turn (Time Freeze / Stun)
    if (attacker.buffs.skip_turn) {
      log(`${attacker.emoji} ${attacker.name} is frozen in time! Turn skipped.`);
      attacker.buffs.skip_turn = 0; // consume
      showFloatingText(attEl, "FROZEN", "float-miss");
      return { skipped: true };
    }
    if (attacker.buffs.stun) {
      log(`${attacker.emoji} ${attacker.name} is stunned! Turn skipped.`);
      attacker.buffs.stun = 0; // consume (or handle duration in endOfRound)
      showFloatingText(attEl, "STUNNED", "float-miss");
      return { skipped: true };
    }

    // 1. check confuse (33% chance to hit self or fail)
    if (attacker.buffs.confuse) {
      if (Math.random() < 0.33) {
        log(`${attacker.emoji} ${attacker.name} is confused and hurt itself!`);
        attacker.hpCurrent = Math.max(0, attacker.hpCurrent - 10);
        attacker.buffs.confuse = Math.max(0, attacker.buffs.confuse - 1);
        showFloatingText(attEl, "-10", "float-dmg");
        animate(attEl, "anim-hit");
        return { self_harm: true };
      }
    }

    // 2. check fear (50% chance to fail)
    if (attacker.buffs.fear) {
      if (Math.random() < 0.5) {
        log(`${attacker.emoji} ${attacker.name} is too afraid to move!`);
        attacker.buffs.fear = Math.max(0, attacker.buffs.fear - 1);
        showFloatingText(attEl, "SCARED", "float-miss");
        return { skipped: true };
      }
    }

    // basic checks
    if (move.stam && attacker.stamCurrent < move.stam) { log(`${attacker.name} attempted ${move.name} but lacked stamina.`); return { skipped: true }; }

    // consume stamina
    if (move.stam) attacker.stamCurrent = Math.max(0, attacker.stamCurrent - move.stam);

    // set cooldown
    attacker.cooldowns[move.id] = move.cd || 1;

    // --- ANIMATION START ---
    // Instead of immediate resolution, we queue the impact call after projectile

    const impactCallback = () => {
      // Special Effects from Move
      if (move.id === 'timefreeze') {
        defender.buffs.skip_turn = 1;
        log(`${attacker.emoji} ${attacker.name} casts Time Freeze! ${defender.name} will skip next turn.`);
        showFloatingText(defEl, "TIME STOP", "float-miss");
        // return { success: true }; // Cannot return from async
      }

      // hit chance (dodge + weather + random)
      let baseDodge = 25; // base enemy dodge chance
      if (defender.buffs && defender.buffs.dodge) baseDodge += 25; // buffed dodge
      if (defender.buffs && defender.buffs.evade) baseDodge += 50; // high evade

      const missRoll = Math.random() * 100;
      const hitChance = 100 - baseDodge;
      const weatherHitMod = state.weather === 'fog' ? 0.85 : 1;

      // critical (base 10%, +25% if crit_up)
      let critChance = 10;
      if (attacker.buffs && attacker.buffs.crit_up) critChance += 25;
      const crit = Math.random() * 100 < critChance;

      // calculate damage
      let dmg = move.dmg || 0;
      dmg = Math.round(dmg * (crit ? 1.7 : 1) * weatherModifier(move));

      // check reflect
      if (defender.buffs && defender.buffs.reflect && dmg > 0) {
        log(`${defender.emoji} ${defender.name} REFLECTS the attack!`);
        attacker.hpCurrent = Math.max(0, attacker.hpCurrent - dmg); // Reflect full damage
        defender.buffs.reflect = Math.max(0, defender.buffs.reflect - 1); // consume reflect
        showFloatingText(attEl, `-${dmg} (Reflect)`, "float-dmg");
        animate(attEl, "anim-hit");
        // return { reflected: true };
      } else if (dmg > 0 && missRoll > hitChance * weatherHitMod) {
        log(`${attacker.emoji} ${attacker.name} used ${move.emoji} ${move.name} -- but it MISSED!`);
        showFloatingText(defEl, "MISS", "float-miss");
        // return { missed: true };
      } else {
        // apply damage
        if (dmg > 0) {
          // Shield reduces damage
          if (defender.buffs && defender.buffs.shield) {
            dmg = Math.round(dmg * 0.5);
            defender.buffs.shield = Math.max(0, defender.buffs.shield - 1);
            log("Shield reduced damage by 50%!");
          }
          defender.hpCurrent = Math.max(0, defender.hpCurrent - dmg);

          // ANIMATION: Hit
          animate(defEl, "anim-hit");
          showFloatingText(defEl, crit ? `-${dmg}!` : `-${dmg}`, "float-dmg");
        }

        // DOT
        if (move.dot) { defender.buffs.dot = (defender.buffs.dot || 0) + move.dot; showFloatingText(defEl, "POISONED", "float-miss"); }

        // logging (move usage) handled below
      }

      // apply heal (happens regardless of hit usually)
      let hpHealed = 0;
      if (move.heal) { hpHealed += (typeof move.heal === 'number' ? move.heal : 0); }
      if (move.healPct) { hpHealed += Math.round((move.healPct || 0) * dmg); } // lifesteal only if dmg>0
      if (hpHealed > 0) {
        attacker.hpCurrent = Math.min(attacker.hp, attacker.hpCurrent + hpHealed);
        showFloatingText(attEl, `+${hpHealed}`, "float-heal");
        animate(attEl, "anim-heal");
      }

      // buff/debuffs from move
      if (move.buff === 'dodge') { attacker.buffs.dodge = (attacker.buffs.dodge || 0) + 2; showFloatingText(attEl, "DODGE UP", "float-heal"); }
      if (move.debuff === 'stun') { defender.buffs.stun = 1; showFloatingText(defEl, "STUNNED", "float-miss"); }
      if (move.buff === 'shield') { attacker.buffs.shield = (attacker.buffs.shield || 0) + 2; showFloatingText(attEl, "SHIELD UP", "float-heal"); }
      if (move.buff === 'crit_up') { attacker.buffs.crit_up = (attacker.buffs.crit_up || 0) + 3; showFloatingText(attEl, "CRIT UP", "float-heal"); }
      if (move.buff === 'reflect') { attacker.buffs.reflect = (attacker.buffs.reflect || 0) + 1; showFloatingText(attEl, "REFLECT", "float-heal"); }
      if (move.debuff === 'fear') { defender.buffs.fear = (defender.buffs.fear || 0) + 2; showFloatingText(defEl, "FEARED", "float-miss"); }
      if (move.debuff === 'confuse') { defender.buffs.confuse = (defender.buffs.confuse || 0) + 2; showFloatingText(defEl, "CONFUSED", "float-miss"); }

      // logging moved here to sync with impact
      let s = `${attacker.emoji} ${attacker.name} used ${move.emoji} ${move.name}`;
      if (crit) s += ' -- CRITICAL!';
      if (dmg > 0) s += ` and dealt ${dmg} damage.`;
      if (hpHealed > 0) s += ` ${attacker.emoji} healed ${hpHealed}.`;
      log(s);

      // Update UI bars only AFTER animations finish
      updateBars();

      // If player move, check game end. If not end, trigger AI.
      // But resolveMove is called by player AND AI.
      // We need to know who called to trigger next step?
      // Actually, just check death here.
      if (state.player.hpCurrent <= 0 || state.opponent.hpCurrent <= 0) {
        checkEndGame();
      } else if (isPlayer) {
        // Only if it was player turn, queue AI
        setTimeout(() => aiTakeTurn(), 1000);
      }
    };

    // DECIDE: Projectile or Instant?
    if (move.dmg > 0 || move.debuff) {
      // Attack -> Projectile
      animateProjectile(isPlayer, move.emoji, impactCallback);
      // Return placeholder, processing happens async
      return { pending: true };
    } else {
      // Buff/Heal -> Instant
      animate(attEl, 'anim-heal');
      impactCallback();
      return { executed: true };
    }
  }

  // apply end-of-round effects
  function endOfRound() {
    state.round++;
    $('roundCounter').textContent = state.round;

    // Effects Process
    [state.player, state.opponent].forEach(ch => {
      if (!ch) return;
      // Cooldowns
      for (const k in ch.cooldowns) { if (ch.cooldowns[k] > 0) ch.cooldowns[k] = Math.max(0, ch.cooldowns[k] - 1); }

      // DOT
      if (ch.buffs && ch.buffs.dot) {
        const dot = ch.buffs.dot;
        ch.hpCurrent = Math.max(0, ch.hpCurrent - dot);
        log(`${ch.emoji} ${ch.name} suffers ${dot} poison damage.`);
        // dot persists until cleansed or match ends (simplification: reduce duration if we tracked it, but here it's permanent stack or we can decay it)
        // Let's decay it slightly so it's not infinite 
        ch.buffs.dot = Math.max(0, ch.buffs.dot - 1);
      }

      // Stamina
      ch.stamCurrent = Math.min(ch.stamMax, ch.stamCurrent + 10); // increased regen slightly
    });

    // Reduce duration of buffs
    [state.player, state.opponent].forEach(ch => {
      if (!ch) return;
      // Most buffs we handled consumption on use (shield, reflect, fear), but let's decay unused ones or generic ones
      if (ch.buffs.dodge) ch.buffs.dodge = Math.max(0, ch.buffs.dodge - 1);
      if (ch.buffs.evade) ch.buffs.evade = Math.max(0, ch.buffs.evade - 1);
      if (ch.buffs.crit_up) ch.buffs.crit_up = Math.max(0, ch.buffs.crit_up - 1);
      // Stun and Skip Turn are usually consumed in resolveMove, but safety clear if they weren't (e.g. if they didn't act?)
      // Actually, if they didn't act, resolveMove wasn't called. So we shouldn't clear them here, or they last forever.
      // Logic: resolveMove handles the "act of skipping". If you don't call resolveMove, you didn't skip.
    });

    updateBars(); updateCooldownDisplays();
  }

  function playerUseMove(move) {
    if (!state.player || !state.opponent) return;
    if (state.player.cooldowns[move.id] > 0) { log('Move is on cooldown'); return; }
    if (state.player.stamCurrent < (move.stam || 0)) { log('Not enough stamina'); return; }

    // ONLINE LOGIC
    const saved = localStorage.getItem('emojiBattleState');
    const saveData = saved ? JSON.parse(saved) : {};
    if (saveData.online) {
      // Online: Push move to DB
      // Format: { from: 'p1', moveId: 'fireball' }
      const roomRef = db.ref('rooms/' + saveData.room);
      const myRole = saveData.role;

      // Check local turn? 
      // For simplicity, we allow spamming moves but cooldowns apply locally.
      // Better: Disable UI if we want turn-based. But this is cooldown-based.

      // Push move
      roomRef.child('moves').push({
        from: myRole,
        moveId: move.id,
        timestamp: Date.now()
      });

      // Apply locally immediately for responsiveness?
      // Or wait for echo? Let's apply locally to me, but we need to ensure unique IDs if using push keys.
      // Actually, let's Apply locally for ME (attacker), and opponent applies when they hear it.
      // Wait. resolveMove(attacker... ) needs to happen on BOTH screens.
      // If I run it here, I see my move. Opponent needs to run it too.

      // We will run it here for instant feedback.
      const res = resolveMove(state.player, state.opponent, move);
      updateBars(); updateCooldownDisplays();
      checkEndGame();
      return;
    }

    // OFFLINE LOGIC
    const res = resolveMove(state.player, state.opponent, move);
    updateBars(); updateCooldownDisplays();

    // check deaths
    if (state.player.hpCurrent <= 0 && state.opponent.hpCurrent <= 0) { log("Draw! Both fell."); return; }
    if (state.player.hpCurrent <= 0) { log(`${state.player.emoji} You fainted from recoil/reflect!`); return; }
    if (state.opponent.hpCurrent <= 0) { log(`${state.opponent.emoji} ${state.opponent.name} has been defeated! You WIN 🎉`); return; }

    // AI turn: choose move
    window.setTimeout(() => aiTakeTurn(), 700);
  }

  function checkEndGame() {
    if (!state.player || !state.opponent) return;

    let gameOver = false;
    let title = "";
    let msg = "";

    if (state.player.hpCurrent <= 0 && state.opponent.hpCurrent <= 0) {
      gameOver = true;
      title = "It's a Draw!";
      msg = "Both fighters fell at the same time.";
    } else if (state.player.hpCurrent <= 0) {
      gameOver = true;
      title = "You Lost! 💀";
      msg = `${state.opponent.emoji} ${state.opponent.name} defeated you.`;
    } else if (state.opponent.hpCurrent <= 0) {
      gameOver = true;
      title = "You Win! 🎉"; // Added trophy
      msg = `You defeated ${state.opponent.emoji} ${state.opponent.name}!`;
    }

    if (gameOver) {
      // Show Modal
      const modal = $('gameOverModal');
      if (modal) {
        $('gameOverTitle').textContent = title;
        $('gameOverMessage').textContent = msg;
        modal.style.display = 'flex';

        const updateBtnText = () => {
          if (localStorage.getItem('emojiOnline')) {
            $('btnPlayAgain').textContent = "Rematch (Coming Soon)";
            $('btnPlayAgain').disabled = true;
          }
        }
        updateBtnText();

        $('btnPlayAgain').onclick = () => {
          // Reset HP and reload? Or just reload logic
          // For now, reload page is simplest "Play Again"
          window.location.reload();
        };
        $('btnChangeChar').onclick = () => {
          window.location.href = 'select.html';
        };
        $('btnEndGame').onclick = () => {
          window.location.href = 'index.html';
        };
      }
    }
  }

  // Override initBattlePage to listen for moves
  const _originalInitBattle = initBattlePage;
  initBattlePage = function () {
    _originalInitBattle(); // Standard init

    // Check Online
    const saved = localStorage.getItem('emojiBattleState');
    const data = saved ? JSON.parse(saved) : {};

    if (data.online && data.room) {
      log("Connected to Online Room: " + data.room);
      const myRole = data.role; // 'p1'
      const oppRole = myRole === 'p1' ? 'p2' : 'p1';

      const roomRef = db.ref('rooms/' + data.room);

      // Listen for moves
      roomRef.child('moves').on('child_added', snap => {
        const val = snap.val();
        if (!val) return;

        // If it's MY move, I already ran it locally? 
        // Yes, locally ran in playerUseMove.
        // But what if I refresh?
        // For now, assume session persistence.

        if (val.from === oppRole) {
          // Opponent used a move!
          const mv = state.opponentMovesSelected.find(m => m.id === val.moveId);
          if (mv) {
            log(`Opponent used ${mv.name}`);
            resolveMove(state.opponent, state.player, mv);
            updateBars(); updateCooldownDisplays();
            checkEndGame();
          } else {
            console.error("Unknown move from opponent", val.moveId);
          }
        }
      });

      // Listen for disconnect?
    }
  };

  function aiTakeTurn() {
    if (!state.opponent) return;

    // AI Logic Improved
    const opponent = state.opponent;
    const player = state.player;

    // 1. Check if we can WIN now
    const killMove = state.opponentMovesSelected.find(m =>
      (opponent.cooldowns[m.id] || 0) === 0 &&
      opponent.stamCurrent >= (m.stam || 0) &&
      (m.dmg || 0) >= player.hpCurrent
    );

    if (killMove) {
      log(`${opponent.emoji} sees a chance to finish you!`);
      resolveMove(opponent, player, killMove);
      checkEndGame();
      endOfRound();
      return;
    }

    // 2. Heal if low HP (< 35%)
    if (opponent.hpCurrent < (opponent.hp * 0.35)) {
      const healMove = state.opponentMovesSelected.find(m =>
        (m.heal || m.healPct) &&
        (opponent.cooldowns[m.id] || 0) === 0 &&
        opponent.stamCurrent >= (m.stam || 0)
      );
      if (healMove) {
        log(`${opponent.emoji} is trying to recover!`);
        resolveMove(opponent, player, healMove);
        checkEndGame();
        endOfRound();
        return;
      }
    }

    // 3. Fallback: Filter available moves
    const avail = state.opponentMovesSelected.filter(m => (opponent.cooldowns[m.id] || 0) === 0 && (opponent.stamCurrent >= (m.stam || 0)));
    if (avail.length === 0) {
      // Try to rest/wait? Or just skip
      log(`${opponent.emoji} ${opponent.name} has no available moves and skips turn.`);
      endOfRound(); return;
    }

    // 4. Randomize slightly but prefer efficiency (Dmg / Stamina ratio)
    avail.sort((a, b) => {
      const effA = (a.dmg || 0) / Math.max(1, (a.stam || 1));
      const effB = (b.dmg || 0) / Math.max(1, (b.stam || 1));
      return effB - effA + (Math.random() * 0.5 - 0.25); // fuzzy sort
    });

    const choice = avail[0]; // Best efficient move
    resolveMove(opponent, player, choice);
    checkEndGame();
    endOfRound();
  }

  function checkEndGame() {
    updateBars(); updateCooldownDisplays();
    if (state.player.hpCurrent <= 0) { log(`${state.player.emoji} ${state.player.name} has been defeated. You Lose.`); return; }
    if (state.opponent.hpCurrent <= 0) { log(`${state.opponent.emoji} ${state.opponent.name} has been defeated! You WIN 🎉`); return; }
  }

  // Start
  renderFighters(); renderLog();
}

// -------------------------------
// LOBBY PAGE LOGIC
// -------------------------------
// -------------------------------
// LOBBY PAGE LOGIC
// -------------------------------
function initLobbyPage() {
  const createBtn = $('createRoomBtn');
  const joinBtn = $('joinRoomBtn');
  const roomCodeInput = $('roomCodeInput');
  const statusEl = $('roomStatus');

  if (!createBtn) return;

  // Monitor Connection
  const connectedRef = db.ref(".info/connected");
  connectedRef.on("value", (snap) => {
    if (snap.val() === true) {
      console.log("✅ LIVE: Connected to Firebase Realtime DB");
    } else {
      console.log("❌ DISCONNECTED: Not connected to Firebase DB");
    }
  });

  // Helper to generate 4-char code
  const generateCode = () => Math.random().toString(36).substring(2, 6).toUpperCase();

  createBtn.onclick = () => {
    const code = generateCode();
    statusEl.innerHTML = `<div class="panel" style="text-align:center">
            <h3>Room Created!</h3>
            <div style="font-size:32px; font-weight:bold; letter-spacing:4px; margin:10px 0; color:#6ee7b7">${code}</div>
            <p class="muted">Waiting for opponent to join...</p>
        </div>`;

    // Save my role as P1 (Host)
    // Ensure anonymous auth
    auth.signInAnonymously().then(creds => {
      console.log("Host signed in:", creds.user.uid);
      const uid = creds.user.uid;
      const roomRef = db.ref('rooms/' + code);
      roomRef.set({
        p1: { uid: uid, status: 'waiting' },
        created: Date.now()
      });

      // Listen for P2
      roomRef.child('p2').on('value', snapshot => {
        if (snapshot.exists()) {
          // P2 joined!
          // Redirect to selection with room data
          localStorage.setItem('emojiOnline', JSON.stringify({
            room: code,
            role: 'p1', // Host is P1
            uid: uid
          }));
          window.location.href = 'select.html';
        }
      });
    }).catch(e => {
      console.error("Host Auth Error:", e);
      alert("Error connecting to lobby: " + e.message);
    });
  };

  joinBtn.onclick = () => {
    const code = roomCodeInput.value.trim().toUpperCase();
    if (code.length !== 4) { alert("Invalid Room Code"); return; }

    console.log("Attempting to join room:", code);
    joinBtn.disabled = true;
    joinBtn.textContent = "Joining...";

    auth.signInAnonymously().then(creds => {
      console.log("Joiner signed in:", creds.user.uid);
      const uid = creds.user.uid;
      const roomRef = db.ref('rooms/' + code);

      roomRef.get().then(snapshot => {
        if (snapshot.exists()) {
          console.log("Room found! Joining...");
          // Join as P2
          roomRef.update({
            p2: { uid: uid, status: 'joined' }
          }).then(() => {
            console.log("Joined successfully!");
            localStorage.setItem('emojiOnline', JSON.stringify({
              room: code,
              role: 'p2', // Joiner is P2
              uid: uid
            }));
            window.location.href = 'select.html';
          }).catch(err => {
            console.error("Update failed:", err);
            alert("Failed to join: " + err.message);
            joinBtn.disabled = false;
            joinBtn.textContent = "Join";
          });
        } else {
          console.warn("Room not found");
          alert("Room not found! Check the code.");
          joinBtn.disabled = false;
          joinBtn.textContent = "Join";
        }
      }).catch(err => {
        console.error("Read failed:", err);
        alert("Network error: " + err.message);
        joinBtn.disabled = false;
        joinBtn.textContent = "Join";
      });
    }).catch(e => {
      console.error("Auth failed:", e);
      alert("Auth Error: " + e.message);
      joinBtn.disabled = false;
      joinBtn.textContent = "Join";
    });
  };
}


// -------------------------------
// ONLINE SELECTION INTERCEPT
// -------------------------------
// Modify initSelectionPage to handle online mode...
// Actually, let's keep it simple. If 'emojiOnline' exists in localStorage,
// initSelectionPage behaves differently.

// We need to patch initSelectionPage logic or wrapping it.
// Let's check for online mode at start of initSelectionPage.

// -------------------------------
// INIT
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Route based on what elements exist
  if (document.getElementById('lobbyControls')) {
    initLobbyPage();
  } else if (document.getElementById('playerPicker')) {
    // Check if online mode
    const onlineData = localStorage.getItem('emojiOnline');
    // For now, standard selection. We will add Online Selection Logic in next step or inject it.
    initSelectionPage();
  } else if (document.getElementById('playerBox')) {
    initBattlePage();
  }
});
