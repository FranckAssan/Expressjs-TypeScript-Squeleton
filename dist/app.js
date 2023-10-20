"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_flash_plus_1 = __importDefault(require("express-flash-plus"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
class App {
    constructor() {
        this.expressApp = (0, express_1.default)();
        this.middleware();
        this.routes();
        this.expressApp.set('view engine', 'pug');
        this.expressApp.use(express_1.default.static(__dirname + '/public'));
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use((0, morgan_1.default)('dev'));
        this.expressApp.use(express_1.default.json());
        this.expressApp.use(express_1.default.urlencoded({ extended: false }));
        this.expressApp.use((0, express_session_1.default)({
            secret: 'My Secret Key',
            resave: false,
            saveUninitialized: true
        }));
        this.expressApp.use((0, express_flash_plus_1.default)());
    }
    routes() {
        let router = express_1.default.Router();
        router.get('/', (req, res) => {
            res.render('index', { title: 'Home' });
        });
        this.expressApp.use('/', router);
    }
}
exports.default = new App().expressApp;
//# sourceMappingURL=app.js.map