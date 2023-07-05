import mysql from 'mysql';

export default class DB{
    #Create
    #CreateTable

    static Init(){

        this.db = mysql.createConnection({
            host: "localhost",
            user: "yourusername",
            password: "yourpassword"
        });
          
        this.db.connect(function(error)
        {
            try
            {
                if (error) throw error;
                console.log("Connected!");
            
                this.#Create();
                this.#CreateTable();
            }
            catch(error)
            {
                console.log(error);
            }
        });
    }

    static #Create()
    {
        const sql = "CREATE DATABASE mydb";

        this.db.query(sql, function (error, result)
        {
            try
            {
                if (error) throw error;
                console.log("Database created");
            }
            catch(error){
                console.log(error);
            }
        });
    }

    static #CreateTable()
    {
        const sql = "CREATE TABLE users (username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), verified BOOL)";

        this.db.query(sql, function (err, result) {
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

    static CreateUser(username, email, password)
    {
        const sql = `INSERT INTO users (username, email, password, verified) VALUES (${username}, ${email}, ${password})`;

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

    static CheckExistingData(table, column, value)
    {
        const query = `SELECT COUNT(*) AS count FROM ${table} WHERE ${column} = '${value}';`;

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
                    console.log(error);
                }
            });
        })
    }

    static GetRaw(table, column, value)
    {
        const query = `SELECT * FROM ${table} WHERE ${column} = ${value}`;

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

    static UpdateRaw(table, column, value, newValue)
    {
        const sql = `UPDATE ${table} SET ${column} = '${newValue}' WHERE ${column} = '${value}'`;

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
}