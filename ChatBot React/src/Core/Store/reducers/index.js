import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import messagesReducer from './messages';
import chatsReducer from './chats';

export default (history) => combineReducers({ messagesReducer, chatsReducer, router: connectRouter(history) });