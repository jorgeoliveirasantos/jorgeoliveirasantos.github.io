const { NlpManager } = require('node-nlp');

const NLP = {
    Model: null,
    LoadModel: async function () {
        //
        const modelData = fs.readFileSync('./trained-model.json', 'utf8');
        NLP.Model.import(modelData);
    },
    SaveModel: async function () {
        const modelData = NLP.Model.export();
        require("fs").writeFileSync('./chatbot-model.json', modelData);
    },
    TrainModel: async function () {
        NLP.Model = new NlpManager({ languages: ['pt'] });
        await NLP.Model.addCorpus('./corpus.json');
        await NLP.Model.train();
    },
};

async function main() {
    const dock = await dockStart({ use: ['Basic'] });
    const nlp = dock.get('nlp');

    nlp.addLanguage('pt');
    await nlp.addCorpus('./corpus-pt.json');
    await nlp.train();
    // 
}
main();