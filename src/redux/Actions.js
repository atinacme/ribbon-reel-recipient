import { CAMERA_VIDEO_ITEM, GIFTER_STEPS_ITEM, LANDING_PAGE_ITEM } from "./Types";

export const CameraVideoPageAction = (order_id) => {
    return {
        type: CAMERA_VIDEO_ITEM, order_id
    };
};

export const LandingPageAction = (order_id, gifter_name, gifter_email, gifter_phone, receiver_name, receiver_contact, send_by) => {
    return {
        type: LANDING_PAGE_ITEM, order_id, gifter_name, gifter_email, gifter_phone, receiver_name, receiver_contact, send_by
    };
};

export const GifterStepsPageAction = (receiver_name, receiver_contact) => {
    return {
        type: GIFTER_STEPS_ITEM, receiver_name, receiver_contact
    };
};