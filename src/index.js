import CanvasDrawer from './controllers/drawer';
import MainController from './main';
import UIController from './controllers/ui_controller';

window.PARTS_NUM = 15;
window.UNIT_RAD = 30;
window.FOOD_RAD = 8;
window.LINE_LENGTH = 25;

window.drawer = new CanvasDrawer(document.getElementById('canvas'));;
window.MainController = new MainController({ drawer, ui: UIController });