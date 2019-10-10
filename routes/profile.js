const express = require ('express');
const router = express.Router();
const fetch = require('node-fetch');

//har et get kall med header som inneholder private api key, spørr om platform og gamertag og sender med header i fetch.
router.get('/:platform/:gamertag', async (req, res) => {
    try{
        const headers = {
            'TRN-Api-Key' : process.env.TRACKER_API_KEY
        }
        const {platform , gamertag } = req.params;
        const response = await fetch(`${process.env.TRACKER_API_URL}/profile/${platform}/${gamertag}`, {headers});
        
        const data = await response.json();

        //Sjekker om profilen finnes i errors arrayet i apiet
        if(data.errors && data.errors.length > 0){
            return res.status(404).json({
                message: 'Profile Not Found'
            });
        }

        //Sender data
        res.json(data);

        //Error dersom serveren ikke funker
    }catch(err){
        res.status(500).json({
            message: 'Server Error'
        });
    }
});



module.exports = router;