const { pool }  = require('../config/database');

const CargoController = {

    getAll:async(req,res)=>{

        try{

            let cargos = await pool.query(`SELECT * FROM cargos`);

            return res.status(200).json({
                ok:true,
                message:'Exito',
                data:cargos
            })

        }catch(err){

            return res.status(400).json({
                ok:false,
                message:err
            })

        }
    }

};

module.exports = {
    CargoController
}