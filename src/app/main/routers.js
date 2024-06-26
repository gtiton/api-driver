import { Router } from 'express';

import SessionController from '../controller/SessionController';
import DriverController from '../controller/DriverController';
import FreightController from '../controller/FreightController';
import DepositMoneyController from '../controller/DepositMoneyController';
import TravelExpensesController from '../controller/TravelExpensesController';
import RestockController from '../controller/RestockController';
import FinancialStatementsController from '../controller/FinancialStatementsController';
import NotificationController from '../controller/NotificationController';

import authMiddleware from '../middlewares/auth';

const routes = new Router();

routes
  .post('/driver/signin', SessionController.sessioDriver)
  .post('/driver/code-request', DriverController.requestCodeValidation)
  .post('/driver/code-validation', DriverController.validCodeForgotPassword)
  .put('/driver/forgot-password', DriverController.forgotPassword);

routes.use(authMiddleware);

routes
  .get('/driver/profile', DriverController.profile)
  .put('/driver/update-profile', DriverController.update);

routes
  .patch('/driver/financia-statement', FinancialStatementsController.update)
  .get(
    '/driver/financial-statement',
    FinancialStatementsController.getInProgress
  )
  .get(
    '/driver/financial-statements/finished',
    FinancialStatementsController.getAllFinished
  );

// Em processo de frente em aberto
routes
  .post('/driver/freight', FreightController.create)
  .patch('/driver/freight/:id', FreightController.update)
  .post('/driver/freight/starting-trip', FreightController.startingTrip)
  .get('/driver/freight/:id', FreightController.getId)
  .delete('/driver/freight/:id', FreightController.delete);

routes.get('/driver/notifications', NotificationController.getAll);
routes.put('/driver/notifications/:id', NotificationController.update);

routes
  .post('/driver/deposit', DepositMoneyController.create)
  .get('/driver/deposit/:id', DepositMoneyController.getId)
  .get('/driver/deposits', DepositMoneyController.getAll);

routes
  .post('/driver/travel', TravelExpensesController.create)
  .get('/driver/travel/:id', TravelExpensesController.getId)
  .get('/driver/travels', TravelExpensesController.getAll);

routes
  .post('/driver/restock', RestockController.create)
  .get('/driver/restock/:id', RestockController.getId)
  .get('/driver/restocks', RestockController.getAll);

export default routes;
