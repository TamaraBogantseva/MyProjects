const fs = require('fs');
const path = './server/db/chats';

module.exports = {
    async load(req, res) {
        try {
            const result = await fs.readFileSync(`${path}/chats.json`, 'utf-8');
            res.json(result);
        }
        catch {
            res.sendStatus(503);
        }
    }
};