const corpus = {
    name: "Corpus",
    locale: "pt-BR",
    data: []
}
let data = {
    intent: "assistente.oi",
    utterances: [],
    answers: []
}
const intent = document.getElementById("intent");
const utterance = document.getElementById("utterance");
const answer = document.getElementById("answer");
const addDataToCorpusBtn = document.getElementById("addDataToCorpus");
const inputName = document.getElementById("name");
const locale = document.getElementById("locale");



//
function addData(e) {
    if (e.key == "Enter") {
        if (utterance.value == "" && answer.value == "") return;
        data.utterances.push(utterance.value);
        data.answers.push(answer.value);
        console.clear();
        console.log(data);
        utterance.value = "";
        //answer.value = "";
        utterance.focus();
    }
}

function addDataToCorpus() {
    data.intent = intent.value;
    if (data.intent == "" || data.answers.length == 0 || data.utterances.length == 0) {
        console.log("Empty intent, utterance or answer");
        return;
    }
    corpus.data.push(data);
    data = {
        intent: intent.value,
        utterances: [],
        answers: []
    }
    console.clear();
    console.log("Added to corpus");
}

function downloadCorpus(e) {
    let a = document.createElement("a");
    a.download = corpus.name;
    let blob = new Blob([JSON.stringify(corpus, null, 4)], { type: 'application/json' });
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.click();
    window.URL.revokeObjectURL(url);
    a = null;
}

function next(e) {
    if (e.key != "Enter") return;
    answer.focus();
}

function view() {
    var url = "data:text/html;charset=utf-8," + encodeURIComponent();
    var blob = new Blob([JSON.stringify(corpus, false, 4)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    window.open(url, "_blank");
}

function apply() {
    corpus.name = inputName.value;
    corpus.locale = locale.value;
    alert("Applied!");
}

function importCorpus() {
    let ok = confirm("This will replace in-memory corpus!");
    if (!ok) return;
    const uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.oninput = () => {
        const file = uploadInput.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = JSON.parse(event.target.result);
                if (!content.data) throw new Error("Invalid");
                if (!content.locale) throw new Error("Invalid");
                if (!content.name) throw new Error("Invalid");
                corpus.name = content.name;
                corpus.locale = content.locale;
                corpus.data = content.data;
                inputName.value = corpus.name;
                locale.value = corpus.locale;
                alert("Corpus loaded!");
            } catch (error) {
                alert(error);
            }
        };
        reader.readAsText(file);
    }
    uploadInput.click();
}

function clearCorpus() {
    let ok = confirm("This will clear all corpus data!");
    if (!ok) return;
    corpus.data = [];
    alert("Corpus data cleared!");
}

utterance.focus();
inputName.value = corpus.name;
locale.value = corpus.locale
intent.value = data.intent;
window.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key == "Enter") {
        addDataToCorpus();
    }
})
