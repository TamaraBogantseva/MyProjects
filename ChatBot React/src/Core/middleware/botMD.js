
import { sendMessage } from '@actions/messages';

export default store => next => action => {
    switch (action.type) {
        case 'SEND_MSG': {
            if (action.payload.name == 'Leia') {
                setTimeout(() => {
                    return store.dispatch(sendMessage('C-3PO', 'I am fluent in over six million forms of communication'));
                }, 500);
            }
        }
    }
    return next(action);
};