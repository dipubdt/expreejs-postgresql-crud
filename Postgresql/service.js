const Pool = require('pg').Pool

const pool= new Pool({

user:'postgres',
host:'localhost',
database:'users',
password:'123456',
port:5432

})

///////cruid


const GetUsers =(req, res) => {

    pool.query("SELECT *FROM infos ORDER BY id ASC", (err,result) =>{
    if(err)
    {
        throw err;
    }
    res.status(200).json(result.rows)
} )
}


const CreateUser =(req, res) => {

    const {name,email}=req.body;

    pool.query("INSERT INTO infos (name, email) VALUES ($1, $2) RETURNING *", [name, email], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(201).send(`added ID: ${result.rows[0].id}`);
    });
}



const UpdateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    pool.query('UPDATE infos SET name = $1, email = $2 WHERE id = $3', [name, email, id], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).send(`Updated user ID: ${id}`);
    });
}







const DeleteUser =(req, res) => {

    const id=parseInt(req.params.id);

    pool.query(`DELETE FROM infos WHERE id=$1`, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`deleted ID: ${id}`);
    });
}

const GetUserId =(req, res) => {

    const id=parseInt(req.params.id);

    pool.query(`SELECT *FROM infos WHERE id=$1`, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows)
    });
}




module.exports={
    GetUsers,
    CreateUser,
    DeleteUser,
    GetUserId,
    UpdateUser
}