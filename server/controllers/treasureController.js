const { decodeBase64 } = require("bcryptjs");

module.exports = {

    dragonTreasure: async(req,res) => {
        const result = await req.app.get('db').get_dragon_treasure(1)
        return res.status(200).send(result)
    },
    getUserTreasure: async(req,res) => {
        const result = await req.app.get('db').get_user_treasure([req.session.user.id])
        return res.status(200).send(result)
    },
    
    addUserTreasure: async(req,res) => {
        const { treasureURL } = req.body
        const { id } = req.session.user
        let userTreasure = await req.app.get('db').add_user_treasure([treasureURL, id])

        res.status(200).send(userTreasure)


    },
    getAllTreasure: async(req,res) =>{
        let result = await req.app.get('db').get_all_treasure()
        res.status(200).send(result)
    }

};