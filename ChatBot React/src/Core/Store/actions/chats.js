import { RSAA, getJSON } from 'redux-api-middleware';

export const loadChats = () => ({
    [RSAA]: {
        endpoint: '/api/chats/',
        method: 'GET',
        types: [
            'LOAD_CHATS_REQUEST',
            {
                type: 'LOAD_CHATS_SUCCES',
                payload: async (action, state, response) => {
                    const res = await getJSON(response);
                    return { data: JSON.parse(res) };
                },
            },
            'LOAD_CHATS_FAILURE'
        ]
    }
});

export const addChats = (name) => ({
    type: 'ADD_CHATS',
    payload: { name, text: '', id: Date.now() }
});