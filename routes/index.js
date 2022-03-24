
module.exports = (app) =>{
    var conexao = require('../config/database')
    conexao()

    var modelo = require('../models/mensagem')

    var mygrid = require('../models/mygrid')


    app.get('/', async(req, res)=>{
        mygrid.find() .limit(3) .sort({'_id':-1})
        .then((mygrid)=>{
            res.render('index.ejs', {dados:mygrid})
        })
        .catch(()=>{
            res.render('index.ejs')
        })
        
    })

    app.post('/', (req, res) => {

        var documento = new modelo({
            nome: req.body.first_name,
            sobrenome: req.body.last_name,
            email:req.body.email,
            mensagem: req.body.message
        })
        .save()
        .then(() =>{
            res.redirect('/')
        })
        .catch(() => {
            res.send("Não foi possivel gravar o documento no Banco de Dados")
        })
    })

}

