import TravelExpenses from "../app/models/TravelExpenses";
import httpStatus from 'http-status-codes';

export default {
  async createTravelExpenses(req, res) {
    let result = {}
    let travelExpensesBody = req;

    TravelExpenses.create(travelExpensesBody);

    result = { httpStatus: httpStatus.OK, status: "successful" }      
    return result
  },

  async getAllTravelExpenses(req, res) {
    let result = {}

    const { page = 1, limit = 100, sort_order = 'ASC', sort_field = 'id' } = req.query;
    const total = (await TravelExpenses.findAll()).length;

    const totalPages = Math.ceil(total / limit);

    const travelExpenses = await TravelExpenses.findAll({
      order: [[ sort_field, sort_order ]],
      limit: limit,
      offset: (page - 1) ? (page - 1) * limit : 0,
      attributes: [ 
        'id',
        'type_establishment', 
        'name_establishment', 
        'expense_description', 
        'value', 
        'proof_img', 
      ], 
    });

    const currentPage = Number(page)

    result = { 
      httpStatus: httpStatus.OK, 
      status: "successful", 
      total, 
      totalPages, 
      currentPage, 
      dataResult: travelExpenses 
    } 

    return result
  },

  async getIdTravelExpenses(req, res) {
    let result = {}

    let travelExpense = await TravelExpenses.findByPk(req.id, {
      attributes: [ 
        'id',
        'type_establishment', 
        'name_establishment', 
        'expense_description', 
        'value', 
        'proof_img', 
      ],  
    });
    
    if (!travelExpense) {
      result = {httpStatus: httpStatus.BAD_REQUEST, responseData: { msg: 'Travel Expense not found' }}      
      return result
    }

    result = { httpStatus: httpStatus.OK, status: "successful", dataResult: travelExpense }      
    return result
  },

  async updateTravelExpenses(req, res) {   
    let result = {}

    let travelExpenses = req
    let travelExpenseId = res.id

    const travelExpense = await TravelExpenses.findByPk(travelExpenseId);

    await travelExpense.update(travelExpenses);

    const travelExpenseResult = await TravelExpenses.findByPk(travelExpenseId, {
      attributes: [
        'id',
        'type_transaction', 
        'local', 
        'type_bank', 
        'value', 
        'proof_img',
      ],
    });

    result = { httpStatus: httpStatus.OK, status: "successful", dataResult: travelExpenseResult }      
    return result
  },
  
  async deleteTravelExpenses(req, res) {
    let result = {}
    
    const id  = req.id;

    const travelExpense = await TravelExpenses.destroy({
      where: {
        id: id,
      },
    });

    if (!travelExpense) {
      result = {httpStatus: httpStatus.BAD_REQUEST, responseData: { msg: 'Travel Expense not found' }}      
      return result
    }

    result = {httpStatus: httpStatus.OK, status: "successful", responseData: { msg: 'Deleted travel expense' }}      
    return result
  }
}