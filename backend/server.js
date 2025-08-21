const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();

const drdRoutes = require('./routes/drdRoutes');
const authRoutes = require('./routes/authRoutes');


const serviceAreaRoutes = require('./routes/serviceAreaRoutes');

const adminRoutes = require('./routes/admin');
const contactRoute = require('./routes/contact');
const blogRoutes = require('./routes/blogRoutes');
const stripeRoutes = require('./routes/stripe');

const tyreallRoutes = require("./routes/tyreallRoutes");
const couponRoutes = require("./routes/couponRoutes")



const BookingRoutes = require("./routes/booking")

const bookingSlotRoutes = require("./routes/bookingSlotRoutes");






const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/api/drd', drdRoutes);
app.use('/api/auth', authRoutes);


app.use('/api/service', serviceAreaRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoute);
app.use('/api/blogs', blogRoutes);
app.use('/api/stripe', stripeRoutes);


app.use("/api/tyreall", tyreallRoutes);
app.use("/api/coupons", couponRoutes);

app.use("/api/booking", BookingRoutes);

app.use("/api/slots", bookingSlotRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
