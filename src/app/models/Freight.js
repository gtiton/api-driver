import Sequelize, { Model } from 'sequelize';

class Freight extends Model {
  static init(sequelize) {
    super.init(
      {
        financial_statements_id: Sequelize.INTEGER,
        start_city: Sequelize.STRING,
        final_city: Sequelize.STRING,
        location_of_the_truck: Sequelize.STRING,
        contractor: Sequelize.STRING,
        start_km: Sequelize.DOUBLE,
        preview_tonne: Sequelize.DOUBLE,
        value_tonne: Sequelize.DOUBLE,
        preview_value_diesel: Sequelize.DOUBLE,
        // level two
        final_km: Sequelize.DOUBLE,
        final_total_tonne: Sequelize.DOUBLE,
        toll_value: Sequelize.DOUBLE,
        discharge: Sequelize.DOUBLE,
        img_proof_cte: Sequelize.STRING,
        img_proof_ticket: Sequelize.STRING,
        img_proof_freight_letter: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.FinancialStatements, { foreignKey: 'financial_statements_id', as: 'financialStatements' });
  }
}

export default Freight;