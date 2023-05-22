import { CAMERA_VIDEO_ITEM, GIFTER_STEPS_ITEM } from "../Types";

const initialState = {
    receiver_name: '',
    receiver_contact: ''
};

export function GifterStepsPageReducer(state = initialState, action) {
    switch (action.type) {
        case GIFTER_STEPS_ITEM:
            return {
                ...state,
                receiver_name: action.receiver_name,
                receiver_contact: action.receiver_contact
            };
        default:
            return state;
    }
};