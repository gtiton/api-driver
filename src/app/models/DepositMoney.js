import Sequelize, { Model } from 'sequelize';

class DepositMoney extends Model {
  static init(sequelize) {
    super.init(
      {
        financial_statements_id: Sequelize.INTEGER,
        freight_id: Sequelize.INTEGER,
        type_transaction: Sequelize.STRING,
        local: Sequelize.STRING,
        type_bank: Sequelize.STRING,
        value: Sequelize.INTEGER,
        proof_img: Sequelize.STRING,
        payment: {
          type: Sequelize.JSONB,
          allowNull: false,
          defaultValue: {
            modo: '',
            value: 0,
            parcels: 0,
            flag: '',
          },
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.FinancialStatements, {
      foreignKey: 'financial_statements_id',
      as: 'financialStatements',
    });
    this.belongsTo(models.Freight, { foreignKey: 'freight_id', as: 'freight' });
  }
}

export default DepositMoney;
