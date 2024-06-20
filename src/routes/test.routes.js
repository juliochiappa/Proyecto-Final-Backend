import CustomRouter from "./custom.routes.js";


export default class TestRouter extends CustomRouter {
    init () {
        this.get('/', async (req, res) =>{
            res.sendSuccess('OK desde la clase personalizada');
        })
    }

}