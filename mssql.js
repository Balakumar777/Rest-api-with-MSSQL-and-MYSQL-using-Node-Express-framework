const sql = require('mssql')
const config = {
    user: 'sa',
    password: 'sqlPwd@12#',
    server: "localhost",
    database: 'test',

    options: {
        encrypt: true
    }
}

exports.index = function(req, res) {
	sql.close();
    (async function () {
	    try {
	        let pool = await sql.connect(config);
	        let result1 = await pool.request().query('select * from emp');
	       	res.send(result1.recordset);
	    } catch (err) {
	        res.send(err)
	    }
	})()
};

exports.selectUserId = function(req, res) {
	sql.close();
	(async function () {
	    try {
	        let pool = await sql.connect(config);
	        let result1 = await pool.request().input('id',req.params.id).query('select * from emp where id=@id');
	       	res.send(result1.recordset);
	    } catch (err) {
	        res.send(err)
	    }
	})()
};

exports.insertUser = function(req, res) {
	sql.close();
	(async function () {
	    try {
	        let pool = await sql.connect(config)
			await pool.request().input('name',req.body.name).input('city',req.body.city).input('address',req.body.address).query(`insert into emp(name,city,address)values(@name,@city,@address)`, function () {
	       		res.send("Inserted Successfully");
	        });
	    } catch (err) {
	        res.send(err)
	    }
	})()
};

exports.updateUser = function(req, res) {
	sql.close();
	(async function () {
	    try {
	        let pool = await sql.connect(config);
			await pool.request().input('name',req.body.name).input('city',req.body.city).input('address',req.body.address).input('id',req.params.id).query(`update emp set name=@name,address=@address,city=@city where id=@id`, function () {
	       		res.send("update Successfully");
	        });
	    } catch (err) {
	        res.send(err)
	    }
	})()
};

exports.deleteUser = function(req, res) {
	sql.close();
	(async function () {
	    try {
	        let pool = await sql.connect(config)
			await pool.request().input('id',req.params.id).query(`delete from emp where id=@id`, function () {
	       		res.send("Deleted Successfully");
	        });
	    } catch (err) {
	    	console.log(err)
	        res.send(err)
	    }
	})()
};
