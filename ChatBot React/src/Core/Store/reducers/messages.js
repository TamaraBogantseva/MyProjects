import update from 'react-addons-update';

const storeMessages = {
    messages: [
        // { name: 'Bot', text: 'Hey!', date: '' },
        // { name: 'Bot', text: 'How are you?', date: '' }
    ]
};

export default (store = storeMessages, action) => {
    switch (action.type) {
        case 'LOAD_MSG': {
            return store;
        }

        case 'SEND_MSG': {
            const msg = action.payload;
            return update(store, { messages: { $push: [msg] } });
        }

        case 'DELETE_MSG': {
            return update(store, { messages: { $set: [] } }) //прикрутила просто небывалый костыль и сижу довольная
        }

        default: {
            return store;
        }
    }
};