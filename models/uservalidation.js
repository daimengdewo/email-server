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
			allowNull: true
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
		validMode: {
			type: DataTypes.ENUM('phone','Email'),
			allowNull: true,
			defaultValue: 'Email'
		},
		expiredTime: {
			type: DataTypes.DATE,
			allowNull: false
		},
		state: {
			type: DataTypes.ENUM('未发送','发送成功','发送失败'),
			allowNull: true,
			defaultValue: '未发送'
		},
		validType: {
			type: DataTypes.ENUM('测试','注册','登录','找回密码'),
			allowNull: true,
			defaultValue: '测试'
		}
	}, {
		tableName: 'uservalidation',
		timestamps: false
	});
};
