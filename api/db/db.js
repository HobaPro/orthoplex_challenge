import mysql from "mysql2";


export let db = null;

export function InitDB(DBName){

    return new Promise((resolve, reject) => {
        db = mysql.createConnection({
            host: "localhost",
            user: "HobaPro",
            password: "HobaPro_123",
        });

        const sql = `CREATE DATABASE IF NOT EXISTS ${DBName}`;

        db.query(sql, (error, result) => {
            try
            {
                if (error) throw error;
                console.log("Database created");
            }
            catch(error){
                console.log(error);
            }
        });
    })
}

/*export default class DBManager{

    static db = null;

    static Init(DBName){
        this.db = mysql.createConnection({
            host: "localhost",
            user: "HobaPro",
            password: "HobaPro_123"
        });

        const sql = `CREATE DATABASE IF NOT EXISTS ${DBName}`;

        this.db.query(sql, (error, result) => {
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
}*/