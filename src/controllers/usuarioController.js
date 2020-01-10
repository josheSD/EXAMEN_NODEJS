const { pool }  = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

const usuarioController = {

    loginNormal: async(req,res)=>{
        let { email , password } = req.body;

        try{
            let usuarioDB = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
            
            if(usuarioDB.length === 0){
                return res.status(400).json({
                    ok:true,
                    message:'Credenciales incorretas - email'
                })
            }

            if(!bcrypt.compareSync(password,usuarioDB[0].password)){
                return res.status(400).json({
                    ok:false,
                    message:'Credenciales incorrectas - password'
                })
            }

            usuarioDB[0].password = ':)';
            let token = jwt.sign({usuario:usuarioDB[0]},SEED,{expiresIn:14400}) // 4 horas

            return res.status(200).json({
                ok:true,
                message:'Exito',
                token:token,
                usuario:usuarioDB
            })

        }catch(err){
            return res.status(400).json({
                ok:false,
                message:err 
            })
        }

    },
    
    getUsuario: async(req,res)=>{

        try{
            let usuarios = await pool.query(`SELECT * FROM users`);

            return res.status(200).json({
                ok:true,
                message:'Exito',
                data:usuarios
            })

        }catch(err){
            return res.status(400).json({
                ok:false,
                message:err
            })
        }

    },

    postUsuario: async(req,res)=>{
        const { email, password ,fullname } = req.body;
        const newUsuario = {
            email: email,
            password: bcrypt.hashSync(password,10),
            fullname: fullname
        };

        try{
            await pool.query(`INSERT INTO users set ?`,[newUsuario]);

            return res.status(200).json({
                ok:true,
                message:'Exito al insertar usuario'
            })
        }catch(err){
            return res.status(400).json({
                ok:false,
                message:err
            })
        }

    }

}

module.exports = {
    usuarioController
}

function obtenerMenu(role){

    let menu = [
        {
            path: '/configuration',
            title: 'Configuration',
            type: 'sub',
            icontype: 'pe-7s-wallet',
            children: [
                {path: 'home', title: 'Home', ab:'H'},
                {path: 'espacios', title: 'Espacios', ab:'E'},
                {path: 'salas', title: 'Salas', ab:'S'},
                {path: 'comunidad', title: 'Comunidad', ab:'C'},
                {path: 'nosotros', title: 'Nosotros', ab:'N'},
                {path: 'escribenos', title: 'Escribenos', ab:'B'},
                {path: 'menu', title: 'Menu', ab:'M'},
                {path: 'footer', title: 'Footer', ab:'F'}
            ]
        }
    ];

    if(role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift(
        { titulo: 'Usuarios', url:'/mantenimiento/usuarios'}
        )
    }

    return menu;
}