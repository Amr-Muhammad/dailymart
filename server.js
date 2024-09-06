const express = require('express');
const stripe = require('stripe')('sk_test_51PtX5uLbeudqBLeNEAc5erBrRhOADLqzmk0AeUYntUFjcXhhuwtszfstPJl9yr44yFbeYsNTcwJP1JbxseuHRgzG00hGNa0eJM');
const bodyParser = require('body-parser');
const cors = require('cors');


function randomNumberWithZero(min = 50, max = 150, zeroProbability = 0.2) {
  if (Math.random() < zeroProbability) {
    return 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Convert json file structure
let fs = require('fs')
Products = [
  {
    "catId": "bab69910f7dc80c257a9_bevrages",
    "name": "Beverages",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlTxowoYFTjecJhYaN35eMT05ImRVScI3t2Q&s"
  },
  {
    "catId": "bab69910f7dc80c257a9_snacks",
    "name": "Snacks",
    "image_url": "https://m.media-amazon.com/images/I/712z1pDR4eL._AC_UF894,1000_QL80_.jpg"
  },
  {
    "catId": "bab69910f7dc80c257a9_cleaning",
    "name": "Cleaning",
    "image_url": "https://m.media-amazon.com/images/I/710Q6rwCZyL.__AC_SX300_SY300_QL70_ML2_.jpg"
  },
  {
    "catId": "bab69910f7dc80c257a9_fruits",
    "name": "Vegetables Fruits",
    "image_url": "https://m.media-amazon.com/images/I/71djtMGwW7L.jpg"
  },
  {
    "catId": "bab69910f7dc80c257a9_diary",
    "name": "Dairy",
    "image_url": "https://m.media-amazon.com/images/I/61PVgmrPUWL._SY385_.jpg"
  },
  {
    "catId": "bab69910f7dc80c257a9_oils",
    "name": "Cooking Oils",
    "image_url": "https://t3.ftcdn.net/jpg/01/30/63/52/360_F_130635244_bAKTab1uMo23hSYKjBYDCp9OowbVdQF5.jpg"
  },
  {
    "catId": "bab69910f7dc80c257a9_frozen",
    "name": "Frozen Goods",
    "image_url": "https://m.media-amazon.com/images/I/71Pmo+GWqdL._AC_UF894,1000_QL80_.jpg"
  },
  {
    "catId": "bab69910f7dc80c257a9oils_sauces",
    "name": "Sauces",
    "image_url": "https://t3.ftcdn.net/jpg/01/66/45/02/360_F_166450222_q738gQ0Du5fHjqhCs7PWi1yRjuWheQwL.jpg"
  }
]
let newData = {}
Products.forEach(item => {
  newData[item.catId] = {
    name: item.name,
    image_url: item.image_url,
  }
})
// Products.forEach(item => {
//   newData[item.id] = {
//     arabic_name: item.arabic_name,
//     english_name: item.english_name,
//     amount: randomNumberWithZero(),
//     price: item.price,
//     catId: item.catId,
//     category_name: item.category_name,
//     image_url: item.image_url,
//     boycott: item.boycott,
//     favorite: item.favorite,
//     onSale: item.onSale,
//     description: item.description
//   }
// })

const jsonData = JSON.stringify(newData, null, 2);
fs.writeFileSync('allCategories.json', jsonData, 'utf8');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { cartArray, userName, userEmail } = req.body;

    // Create a new Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartArray.map(product => ({
        price_data: {
          currency: 'egp',
          product_data: {
            name: product.english_name
          },
          unit_amount: product.price  // Price in cents
        },
        quantity: 1
      })),
      mode: 'payment',
      success_url: 'http://localhost:8080/success',
      cancel_url: 'http://localhost:8080/cancel',
      customer_email: userEmail, // Pass customer's email to pre-fill email field
      metadata: {
        customer_name: userName // Store customer's name as metadata
      }
    });

    // Send the session ID to the frontend
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
