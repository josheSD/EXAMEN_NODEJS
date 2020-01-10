const { pool }  = require('../config/database');

const TrabajadorController = {
    getAll: async(req,res)=>{

        try{

            let trabajadores = await pool.query(`SELECT C.id as idCargo ,T.id,T.nombre, T.apellidos, T.correo, T.salario, C.cargo FROM trabajador as T 
                                            INNER JOIN cargos as C ON T.idCargo = C.id`);

            return res.status(200).json({
                ok:true,
                message:'Exito',
                data:trabajadores
            })

        }catch(err){

            return res.status(400).json({
                ok:false,
                message:err
            })

        }

    },
    getOne:async(req,res)=>{
        let IdTrabajador = req.params.id;
        
        try{

            let trabajador = await pool.query(`SELECT C.id as idCargo ,T.id,T.nombre, T.apellidos, T.correo, 
                                                T.salario, C.cargo FROM trabajador as T 
                                                INNER JOIN cargos as C ON T.idCargo = C.id 
                                                WHERE T.id = ?`,[IdTrabajador]);
            return res.status(200).json({
                ok:true,
                message:'Exito',
                data:trabajador
            })

        }catch(err){

            return res.status(400).json({
                ok:false,
                message:err
            })

        }
    },
    deleteTrabajador: async(req,res)=>{
        let IdTrabajador = req.params.id;
        try{

            let trabajadores = await pool.query(`delete from trabajador WHERE id = ?`,[IdTrabajador]);

            return res.status(200).json({
                ok:true,
                message:'Exito'
            })

        }catch(err){

            return res.status(400).json({
                ok:false,
                message:err
            })

        }

    },

    postTrabajador:async(req,res)=>{

        let create = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            salario: req.body.salario,
            idCargo: req.body.idCargo
        }

        try{

            let trabajadores = await pool.query(`INSERT INTO trabajador
                                                SET ?`,[create]);

            return res.status(200).json({
                ok:true,
                message:'Exito'
            })

        }catch(err){

            return res.status(400).json({
                ok:false,
                message:err
            })

        }

    },

    updateTrabajador:async(req,res)=>{

        let IdTrabajador = req.body.id;

        let update = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            salario: req.body.salario,
            idCargo: req.body.idCargo
        }

        try{

            let trabajadores = await pool.query(`UPDATE trabajador
                                                SET ?
                                                WHERE id = ?`,[update,IdTrabajador]);

            return res.status(200).json({
                ok:true,
                message:'Exito'
            })

        }catch(err){
            console.log('se cae')
            return res.status(400).json({
                ok:false,
                message:err
            })

        }

    }
};

module.exports = {
    TrabajadorController
}