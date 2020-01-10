const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

const mdAutenticacion = {

    verificaToken: (req,res,next)=>{
        let token = req.header('Access-Authorization');

        jwt.verify(token,SEED,(err,decoded)=>{
            if(err){
                return res.status(401).json({
                    ok:false,
                    message:'Token incorrecto',
                    err:err
                })
            }

            req.usuario = decoded.usuario;
            next();
        })
    },

    verificaAdminRole:(req,res,next)=>{
        let usuario = req.usuario;

        if(usuario.role === 'ADMIN_ROLE'){
            next();
        }else{
            return res.status(401).json({
                ok:false,
                message:'Token incorrecto - No es administrador',
                err: 'No es administrador, no puede hacer eso'
            });
        }
    },

    verificaAdmin_o_MismoUsuario:(req,res,next)=>{
        let usuario = req.usuario;
        let id = req.params.id;

        if(usuario.role == 'ADMIN_ROLE' || usuario._id === id){
            next();
        }else{
            return res.status(401).json({
                ok:false,
                message:'Token incorrecto - No es administrador ni es el mismo usuario',
                err: 'No es administrador, no puede hacer eso'
            });
        }
    }

}

module.exports = {
    mdAutenticacion
}