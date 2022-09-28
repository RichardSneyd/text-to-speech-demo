const synth = window.speechSynthesis;
const selectVoiceEl = document.getElementById('select_voice');
const btn = document.getElementById('submit');
const field = document.getElementById('field');
let voices = [];
let currentVoice = null;
let lang = 'en-';
//let index = 0;

const getVoicesByLang = ()=>{
    return voices.filter((voice)=>voice.lang.indexOf(lang) !== -1)
}

const getVoiceByName = (name)=>{
    return voices.find((voice)=> voice.name === name);
}

const addVoicesToMenu = ()=>{
    selectVoiceEl.innerHTML = '';
    getVoicesByLang().forEach((voice) => addOption(voice.name, voice.name + ' (' + voice.lang + ')'));
}

const addOption = (value, text) => {
    selectVoiceEl.appendChild(makeOption(value, text));
}

const makeOption = (value, text) => {
    const option = document.createElement('option');
    option.innerText = text;
    option.value = value;
    return option;
}

synth.onvoiceschanged = ()=> {
    voices = synth.getVoices();
    console.log(voices.map((voice)=>voice.name));
    addVoicesToMenu();
    changeVoiceByName(getVoicesByLang()[0].name);
}

changeVoiceRandom = ()=> {
    const voices = getVoices();
    const index = Math.floor(Math.random() * voices.length) + 1;
    currentVoice = voices[index];
}

changeVoiceByName = (name) => {
    currentVoice = getVoiceByName(name);
}

btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    const utterance = new SpeechSynthesisUtterance(field.value);
    utterance.voice = currentVoice;
    synth.speak(utterance);
})

selectVoiceEl.addEventListener('change', ()=> {
    changeVoiceByName(selectVoiceEl.value);
});