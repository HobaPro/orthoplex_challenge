import pool from "../config/database.js";

export async function NewUser(username, email, password){
    const sql = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}');`;
    const selectSql = `SELECT * FROM users WHERE id = LAST_INSERT_ID();`;

    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, result) {
            try
            {
                if (error) throw error;
                pool.query(selectSql, function (selectError, selectResult) {
                    try
                    {
                        if (selectError) throw selectError;

                        resolve(selectResult[0]);
                    }
                    catch(error)
                    {
                        reject(error);
                    }
                });
            }
            catch(error)
            {
                reject(error);
            }
        });
    });
}

export async function UpdateUser(target, column, value, newValue){
    const sql = `UPDATE users SET ${column} = '${newValue}' WHERE ${target} = '${value}'`;

    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, result) {
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

export async function IsExistsUser(column, value){
    const query = `SELECT COUNT(*) AS count FROM users WHERE ${column} = '${value}';`;

    //This Promise To return Boolean after Checking
    return new Promise((resolve, reject) => {
        pool.query(query, function (error, result)
        {
            try
            {
                if (error) throw error;

                const count = result[0].count;
                console.log(result);
                if (count > 0) resolve(true);
                else resolve(false);
            }
            catch(error){
                reject(error);
            }
        });
    });
}

export async function GetUser(column, value){
    const query = `SELECT * FROM users WHERE ${column} = ${value}`;

    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
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

export async function DeleteUser(column, value){
    const sql = `DELETE FROM users WHERE ${column}='${value}';`;

    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, result) {
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