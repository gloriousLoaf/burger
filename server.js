// Dependencies
const express = require(`express`);
const exphbs = require(`express-handlebars`);
const routes = require(`./controllers/burgers-controller`);

// Express, Handlebars
const app = express();
app.use(express.static(`public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine(`handlebars`, exphbs({ defaultLayout: `main` }));
app.set(`view engine`, `handlebars`);
app.use(routes);

// Routes for Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App now listening at localhost: ${PORT}`);
});