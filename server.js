require('dotenv').config();

require('./src/database');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log();
    console.log(`Server is runing at port ${port}`);
});
