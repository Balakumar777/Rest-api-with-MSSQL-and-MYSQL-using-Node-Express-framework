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

exports.contactSave = function(req, res) {
	sql.close();
	(async function () {
	    try {
	    	let status = {code:"200",message:"Success"}
	        let pool = await sql.connect(config)
			await pool.request().input('name',req.body.data.name).input('surName',req.body.data.surName).input('created',req.body.data.created).input('email',req.body.data.email).input('zip',parseInt(req.body.data.zip)).input('address',req.body.data.address).query(`insert into userDetails(name,surName,created,email,zip,address)values(@name,@surName,@created,@email,@zip,@address)`, function () {
	       		res.send(status);
	        });
	    } catch (err) {
	    	let status = {code:"500",error:err}
	    	console.log(err)
	        res.send(err)
	    }
	})()
};
