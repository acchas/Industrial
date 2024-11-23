

const express = require('express');
const sqlite3 = require('sqlite3');
//const bodyParser = require('body-parser');
const app = express();
app.use(express.static('../front'));
const PORT = 3001;

app.use(express.json());

const db = new sqlite3.Database('/home/liv/industrial-database/industrial-orders.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err.message);
    return;
  }
  console.log('Connected to the SQLite database');
});


app.post('/submit-order', (req, res) => {
  const cart = req.body;
  if (!Array.isArray(cart) || cart.length === 0) {
    return res.redirect('sent.html');
  }

  const query = `
    INSERT INTO orders (line_id, order_id, product_id, quantity)
    VALUES (?, ?, ?, ?)
  `;

  db.get('SELECT MAX(line_id) AS maxLineId FROM orders', (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Database error.');
    }

    let line_id = row.maxLineId || 0;

    cart.forEach((item) => {
      const orderId = item.order_id;
      const lineId = ++line_id; // Öka line_id och använd det som lineId
      db.run(query, [lineId, orderId, item.articleNumber, item.quantity], (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Database error.');
        }
      });
    });

    res.send('Order submitted successfully!');
 

  });
});




app.get('/orders', (_req, res) => {
  db.all('SELECT * FROM orders', (err, rows) => {
    if (err) {
      console.error('Error fetching orders from SQLite:', err.message);
      res.status(500).json({ error: 'Failed to fetch orders' });
      return;
    }
    res.json(rows);  // Return the result from the SQLite query
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
