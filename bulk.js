var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017', function (err, client) {
    if (err) throw err;

    var db = client.db('g2i');
    fs.readFile('data/acronym.json', 'utf8', function (err, data) {
        if (err) throw err;
        var json = JSON.parse(data);

        var records = [];

        for (let i in json) {
            const record = json[i];
            for (let j in record) {
                records.push({acronym: j, value: record[j]})
            }
        }
        
        db.collection('acronyms').insertMany(records, function(err, doc) {
            if(err) throw err;
            client.close();
        });
    });
}); 