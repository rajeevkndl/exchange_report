const axios = require('axios')

const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const database = client.db('project_db')
const exchange = database.collection('exchange')
const icons = database.collection('icons')

exports.addData = async(req,res)=>{

await exchange.deleteMany({})
await icons.deleteMany({})
axios.get('https://rest.coinapi.io/v1/exchanges?apikey= FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9').then(async function(incomingData){
    console.log(incomingData.data, "incoming data from the api")
    
    const options = { ordered: true };
    // Execute insert operation
    // const result = await coll.insert(incomingData.data, options);
    const resultExchange = await exchange.insertMany(incomingData.data, options);
    console.log(resultExchange,"result")
    axios.get('https://rest.coinapi.io/v1/exchanges/icons/32?apikey= FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9').then(async function(incomingData){
    const options = { ordered: true };
        // Execute insert operation
    const resultIcons = await icons.insertMany(incomingData.data, options);
    return res.json({
        message:{
        exchange: resultExchange,
        icons:resultIcons
        }
    })
    })

    
}
)

}

exports.getData = async(req,res)=>{
    let {search} = req.query
    let page = parseInt(req.query.page)|| 0
    let size = parseInt(req.query.size) || 10
    let toskip = size * page
    let filter = {}
    if (search){
        filter = {exchange_id: {'$regex': `${search}`,'$options': 'i'}}
    }
     try{
    let dataExchange = await exchange.find(filter).skip(toskip).limit(size).toArray()
    let dataIcons = await icons.find().toArray()
    let countData = await exchange.count()

    console.log(dataExchange[0],dataIcons[0])
    for (i of dataExchange){
        i.icon = dataIcons.filter((ic)=> i.exchange_id == ic.exchange_id)
    }
    return res.json({
        data : dataExchange,
        current_page: page,
        page_size: size,
        total_pages: countData
    })
}
    catch(e){
        console.log("error is "+e)
    }
}