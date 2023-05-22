import { LANDING_PAGE_ITEM } from "../Types";

const initialState = {
    order_id: '',
    gifter_name: '',
    gifter_email: '',
    gifter_phone: '',
    receiver_name: '',
    receiver_contact: '',
    send_by: ''
};

export function LandingPageReducer(state = initialState, action) {
    switch (action.type) {
        case LANDING_PAGE_ITEM:
            return {
                ...state,
                order_id: action.order_id,
                gifter_name: action.gifter_name,
                gifter_email: action.gifter_email,
                gifter_phone: action.gifter_phone,
                receiver_name: action.receiver_name,
                receiver_contact: action.receiver_contact,
                send_by: action.send_by
            };
        default:
            return state;
    }
};