/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('uservalidation', {
		validationID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		userName: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		userEmail: {
			type: DataTypes.STRING(60),
			allowNull: true,
			unique: true
		},
		mPhone: {
			type: DataTypes.CHAR(11),
			allowNull: true
		},
		validCode: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		msg: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		validUrl: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		expiredTime: {
			type: DataTypes.INTEGER(20),
			allowNull: false
		},
		state: {
			type: DataTypes.INTEGER(5),
			allowNull: true
		},
		validType: {
			type: DataTypes.INTEGER(5),
			allowNull: true
		},
		validMode: {
			type: DataTypes.INTEGER(5),
			allowNull: true
		}
	}, {
		tableName: 'uservalidation',
		timestamps: false
	});
};
