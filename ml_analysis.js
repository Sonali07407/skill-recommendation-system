const fs = require('fs');
const KNN = require('ml-knn');
const { leaveOneOutSearch } = require('ml-cross-validation');

function loadCSV(path) {
    const data = fs.readFileSync(path, 'utf8').trim().split('\n');
    const headers = data[0].split(',');
    const rows = data.slice(1);

    const results = rows.map(line => {
        // Simple CSV split (handles basic cases)
        const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        return {
            Role: parts[0].trim(),
            Skills: parts[1].replace(/"/g, '').split(',').map(s => s.trim())
        };
    });
    return results;
}

function preprocess(data) {
    const allSkills = Array.from(new Set(data.flatMap(r => r.Skills)));
    const roles = Array.from(new Set(data.map(r => r.Role)));

    const X = data.map(r => {
        const vector = new Array(allSkills.length).fill(0);
        r.Skills.forEach(skill => {
            const index = allSkills.indexOf(skill);
            if (index !== -1) vector[index] = 1;
        });
        return vector;
    });

    const y = data.map(r => roles.indexOf(r.Role));

    return { X, y, allSkills, roles };
}

function runAnalysis() {
    const csvPath = './skills_dataset.csv';
    if (!fs.existsSync(csvPath)) {
        console.error('Dataset not found!');
        return;
    }

    const rawData = loadCSV(csvPath);
    const { X, y, roles } = preprocess(rawData);

    const kRange = Array.from({ length: 15 }, (_, i) => i + 1);
    const kScores = [];

    console.log('Running KNN Cross-Validation (K=1 to 15)...');

    kRange.forEach(k => {
        let correct = 0;
        // Leave-one-out cross validation for small dataset
        for (let i = 0; i < X.length; i++) {
            const trainX = X.filter((_, idx) => idx !== i);
            const trainY = y.filter((_, idx) => idx !== i);
            const testX = X[i];
            const testY = y[i];

            const knn = new KNN(trainX, trainY, { k });
            const prediction = knn.predict(testX);
            if (prediction === testY) {
                correct++;
            }
        }
        const accuracy = correct / X.length;
        kScores.push(accuracy);
        console.log(`k=${k}, Accuracy: ${accuracy.toFixed(4)}`);
    });

    const bestIndex = kScores.indexOf(Math.max(...kScores));
    const bestK = kRange[bestIndex];
    const bestScore = kScores[bestIndex];

    console.log(`\nBest Accuracy: ${bestScore.toFixed(4)} at k=${bestK}`);

    const result = {
        kValues: kRange,
        scores: kScores,
        bestK,
        bestScore
    };

    fs.writeFileSync('knn_results.json', JSON.stringify(result, null, 2));
    console.log('Results saved to knn_results.json');
}

runAnalysis();
