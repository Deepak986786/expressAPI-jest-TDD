const app = require('./src/app');
const sequelize = require('./src/config/database');

sequelize.sync();
const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`listening at ${port}`));
