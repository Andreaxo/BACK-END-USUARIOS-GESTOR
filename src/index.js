
// const app = express();
const app = require('./app');

app.listen(app.get('port'), () =>{
    console.log("Servidor ejecutando en el puerto", app.get("port"));
})