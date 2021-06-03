/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('i_users', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		domain_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(106),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true
		},
		maildir: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		uname: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		tel: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1'
		},
		limits: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1'
		},
		limitg: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1'
		},
		ctime: {
			type: DataTypes.DATE,
			allowNull: false
		},
		mPhone: {
			type: DataTypes.CHAR(11),
			allowNull: true
		}
	}, {
		tableName: 'i_users',
		timestamps: false
	});
};
