export default class Table{

    constructor(name, colums)
    {
        this.db = db;
        //console.log(this.db);
        this.name = name;

        //const sql = `CREATE TABLE ${name} (username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), verified BOOL)`;
        const sql = `CREATE TABLE ${name} (${colums})`;

        this.db.query(sql, function (error, result) {
            try
            {
                if (error) throw error;
                console.log("Table created");
            }
            catch(error){
                console.log(error);
            }
        });
    }

    InsertOne(columns, values)
    {
        
        //const sql = `INSERT INTO users (username, email, password, verified) VALUES (${username}, ${email}, ${password})`;
        const sql = `INSERT INTO ${this.name} (${columns}) VALUES (${values})`;

        return new Promise((resolve, reject) => {
            this.db.query(sql, function (error, result) {
                try
                {
                    if (error) throw error;

                    resolve(result);
                }
                catch(error)
                {
                    reject(error);
                }
            });
        });
    }

    GetOne(column, value)
    {
        const query = `SELECT * FROM ${this.name} WHERE ${column} = ${value}`;

        return new Promise((resolve, reject) => {
            this.db.query(query, (error, results) => {
                try
                {
                    if (error) throw error;

                    else resolve(results[0]);
                }
                catch(error)
                {
                    reject(error);
                }
            });
        });
    }

    Update(target, column, newValue)
    {
        const sql = `UPDATE users SET ${column} = '${newValue}' WHERE ${target} = '${column}'`;

        return new Promise((resolve, reject) => {
            this.db.query(sql, function (error, result) {
                try
                {
                    if (error) throw error;
    
                    resolve(result);
                }
                catch(error)
                {
                    reject(error);
                }
            });
        });
    }

    DeleteRaw(column, value)
    {
        const sql = `DELETE FROM users WHERE ${column}='${value}';`;

        return new Promise((resolve, reject) => {
            this.db.query(sql, function (error, result) {
                try
                {
                    if (error) throw error;
    
                    resolve(result);
                }
                catch(error)
                {
                    reject(error);
                }
            });
        });
    }

    IsExistsRaw(column, value)
    {
        const query = `SELECT COUNT(*) AS count FROM ${this.name} WHERE ${column} = '${value}';`;

        //This Promise To return Boolean after Checking
        return new Promise((resolve, reject) => {
            this.db.query(query, function (error, result)
            {
                try
                {
                    if (error) throw error;

                    const count = result[0].count;
    
                    if (count > 0) resolve(false);
                    else resolve(true);
                }
                catch(error){
                    reject(error);
                }
            });
        });
    }
}