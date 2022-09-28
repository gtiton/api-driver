import Sequelize, { Model } from 'sequelize';

class Notification extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.STRING,
        driver_id: Sequelize.INTEGER,
        read: {
          type: Boolean,
          defaultValue: false
        }
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
}

export default Notification;