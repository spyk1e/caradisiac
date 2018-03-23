var fs = require('fs');
var elastic = require('elasticsearch');

const {
    getBrands
} = require('node-car-api');
const {
    getModels
} = require('node-car-api');


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

async function ModelsToList(brand, callback) {
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
                if (!CheckExistuuid(JsonModel, model.uuid)) {
                    JsonModel.push(model);
                    imodels++;
                }
            });
            if (iwhile > 1) { //Check again 4 times max
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

exports.PutCarsOnJson = function (callback) {
    GetBrands(function (brands) {
        ModelsToList(brands, function (i, brands, JsonModel) {
            console.log("brands:" + i + "/" + brands.length);

            if (i > brands.length * 0.8) { //Write if more than 80% of brand checked in order to prevent API Timeout
                //console.log(JsonModel);
                console.log("Nb of cars:" + JsonModel.length);
                WriteJson(JsonModel, function () {
                    console.log("Extraction finished");
                });
            }
        });
    });
}
//max: 436

exports.PutOnElasticSearch = function () {
    var JsonC = {};
    fs.readFile('Cars.json', 'utf8', function (err, data) {
        if (err) {
            console / log(err)
        } // log the error
        else {
            var JsonC = JSON.parse(data);
            console.log("readed");

            var bulkBody = [];
            var iBulk = 1;
            /*
                        JsonC.forEach(function (car) {
                            iBulk++;
                            bulkBody.push({
                                index: {
                                    "_index": 'icars',
                                    "_type": 'cars',
                                    "_id": iBulk
                                }
                            });
                            bulkBody.push(car);
                        })

                        console.log(bulkBody);
            */

            //Put it on elastic
            var client = new elastic.Client({
                host: 'localhost:9200'
            });

            JsonC.forEach(function (car) {
                iBulk++;
                client.index({
                    index: 'icars',
                    type: 'cars',
                    id: iBulk,
                    body: car
                }, function (error, response) {
                    console.log(error);
                });
            });

            client.bulk({
                body: bulkBody
            }, function (err, resp) {
                console.log(err);
                console.log(resp);
            });

        }
    });
}

function ImportCar(client, car) {
    client.index({
        index: 'icars',
        type: 'cars',
        id: iBulk,
        body: car
    }, function (error, response) {
        console.log(error);
    });
}

exports.GetAllFromElastic = function () {
    var client = new elastic.Client({
        host: 'localhost:9200'
    });

    client.count(function (error, response, status) {
        console.log("count");
        // check for and handle error
        var count = response.count;
    });
}
