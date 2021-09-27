import update from 'react-addons-update';

const activeChats = {
    chats: [],
};

export default (store = activeChats, action) => {
    switch (action.type) {
        case 'LOAD_CHATS_SUCCES': {
            return update(store, {
                chats: { $set: action.payload.data }
            });
        }

        case 'ADD_CHATS': {
            const newChat = action.payload;
            return update(store, { chats: { $push: [newChat] } });
        }

        default: {
            return store;
        }
    }
};