var fs = require('fs');
var elastic = require('elasticsearch');

const {
    getBrands
} = require('node-car-api');
const {
    getModels
} = require('node-car-api');

//Populate
var iBulk = 1;

function CheckExistuuid(JsonModel, uuid) {
    JsonModel.forEach(function (model) {
        if (model.uuid == uuid) {
            return true;
        }
    })
    return false;
}

async function GetBrands(callback) {
    brands = await getBrands();
    callback(brands);
}

async function ModelsToElastic(brand, client, callback) {
    var ibrands = 0;
    var JsonModel = [];

    brands.forEach(async function (brand) {
        var models = await getModels(brand);
        console.log(brand + ": " + models.length);
        var imodels = 0;
        var iwhile = 0;
        while (imodels < 10) { //Recheck if less than 10 models in the brand
            iwhile++;
            models = await getModels(brand);
            console.log(brand + ": " + models.length);
            await models.forEach(async function (model) {
                if (model.volume != null) {
                    if (!CheckExistuuid(JsonModel, model.uuid)) {
                        JsonModel.push(model);
                        ImportCar(client, iBulk, model);
                        iBulk++;
                        imodels++;
                    }
                }
            });
            if (iwhile > 1) { //Check again 2 times max
                imodels = 11;
            };
        }

        ibrands++;
        callback(ibrands, brands, JsonModel);
    })
}

function WriteJson(listJson, callback) {
    console / log("Nb cars:" + listJson.length);
    //Output on Json         
    fs.writeFile('Cars.json', JSON.stringify(listJson, null, 4), function (err) {
        console.log('File successfully written!');
        callback(1);
    })
}

exports.PutCarsOnElastic = function (callback) {
    GetBrands(function (brands) {
        //For elastic
        var client = new elastic.Client({
            host: 'localhost:9200'
        });
        iBulk = 1;

        ModelsToElastic(brands, client, function (i, brands, JsonModel) {
            console.log("brands:" + i + "/" + brands.length);
        });
    });
}

function ImportCar(client, iBulk, car) {
    client.create({
        index: 'icars',
        type: 'cars',
        id: iBulk,
        body: car
    }, function (error, response) {
        console.log("Imported:" + iBulk);
    });
}

//Car
exports.GetCarsFromElastic = function () {
    var client = new elastic.Client({
        host: 'localhost:9200'
    });

    client.search({
        index: 'icars',
        type: 'cars',
        body: {
            sort: [{
                "_source.volume": {
                    "order": "desc"
                }
            }],
            size: 10,
            query: {
                match_all: {}
            }
        }

    }).then(function (resp) {
        var hits = resp.hits.hits;
        console.log(hits);
    }, function (err) {
        console.trace(err.message);
    });
}

exports.ElasticTest = function () {
    var client = new elastic.Client({
        host: 'localhost:9200'
    });

    client.indices.delete({
        index: 'icars'
    }, function (err, res) {

        if (err) {
            console.error(err.message);
        } else {
            console.log('Indexes have been deleted!');
        }
    });
}
