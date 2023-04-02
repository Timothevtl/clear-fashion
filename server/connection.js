const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://timothevital:QesWA42nidBDXfEW@cluster0.xhoahnh.mongodb.net/myFirstDatabase?retryWrites=true&writeConcern=majority';
const MONGODB_DB_NAME = 'clearfashion';


async function connectToDatabase() {
  const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });

  const db = client.db(MONGODB_DB_NAME);
  console.log('Connected to MongoDB database:', MONGODB_DB_NAME);
}

connectToDatabase().catch((error) => console.error(error));

async function insertProducts(db, products) {
  const collection = db.collection('products');
  const result = await collection.insertMany(products);
  console.log(`${result.insertedCount} products inserted`);
  console.log(result);
}

async function main() {
  const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  const db = client.db(MONGODB_DB_NAME);
  const products = [
    {
      "name": "T-shirt Stockholm Butterfly Oat White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Kramer Black",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Seinfeld Family White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Jerry Black",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm No Soup White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Newman White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm George Black",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm All Out Boat Off-White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Camp Fires Off-White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Shrigley Weed Off White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Shrigley Microwave Off White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Shrigley Dodo Off White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Shrigley Bee Off White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Autumn Birds Off-White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Base Cashmere Pink",
      "price": 29
    },
    {
      "name": "T-shirt Stockholm Base Quiet Green",
      "price": 29
    },
    {
      "name": "T-shirt Stockholm Phoney Date",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Hummingbirds Off-White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Base Dusty Yellow",
      "price": 29
    },
    {
      "name": "T-shirt Stockholm Base Sunburn Orange",
      "price": 29
    },
    {
      "name": "T-shirt Stockholm Crazy World White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Crazy World Black",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Next Wave White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Next Wave Black",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Brush Waves Oat White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Brush Waves Logo Oat White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Wave Sun White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Paper Cut Surfboards White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Paper Cut Surfboards Black",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Palm Row Cashmere Pink",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Palm Row Black",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Lone Surfer White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Lawn Chair White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Lawn Chair Charcoal",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Lawn Chair AOP Off White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Lazer Cats",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Color Waves Charcoal",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Tent Sunset White",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Tent Sunset Black",
      "price": 39
    },
    {
      "name": "T-shirt Stockholm Im Out Off-White",
      "price": 39
    }
  ];
  return insertProducts(db, products);
}