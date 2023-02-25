import httpStatus from 'http-status-codes';

import TravelExpenses from '../models/TravelExpenses';
import FinancialStatements from '../models/FinancialStatements';
import Freight from '../models/Freight';

export default {
  async createTravelExpenses(user, body) {
    let result = {};
    let { freight_id } = body;

    const financial = await FinancialStatements.findOne({
      where: { driver_id: user.driverId, status: true },
    });

    const freight = await Freight.findByPk(freight_id);

    if (!financial) {
      result = {
        httpStatus: httpStatus.BAD_REQUEST,
        msg: 'Financial statements not found',
      };
      return result;
    }

    if (!freight) {
      result = { httpStatus: httpStatus.BAD_REQUEST, msg: 'Freight not found' };
      return result;
    }

    await TravelExpenses.create({
      ...body,
      financial_statements_id: financial.id,
    });

    result = { httpStatus: httpStatus.CREATED, status: 'successful' };
    return result;
  },

  async getAllTravelExpenses(req, res) {
    let result = {};

    const {
      page = 1,
      limit = 100,
      sort_order = 'ASC',
      sort_field = 'id',
    } = req.query;
    const total = (await TravelExpenses.findAll()).length;

    const totalPages = Math.ceil(total / limit);

    const travelExpenses = await TravelExpenses.findAll({
      order: [[sort_field, sort_order]],
      limit: limit,
      offset: page - 1 ? (page - 1) * limit : 0,
      attributes: [
        'id',
        'type_establishment',
        'name_establishment',
        'expense_description',
        'value',
        'proof_img',
      ],
    });

    const currentPage = Number(page);

    result = {
      httpStatus: httpStatus.OK,
      status: 'successful',
      total,
      totalPages,
      currentPage,
      dataResult: travelExpenses,
    };

    return result;
  },

  async getIdTravelExpenses(req, res) {
    let result = {};

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
      result = {
        httpStatus: httpStatus.BAD_REQUEST,
        responseData: { msg: 'Travel Expense not found' },
      };
      return result;
    }

    result = {
      httpStatus: httpStatus.OK,
      status: 'successful',
      dataResult: travelExpense,
    };
    return result;
  },
};
