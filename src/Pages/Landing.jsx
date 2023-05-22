import React, { useState, useEffect } from 'react';
import bgimg from '../../src/assets/GiftWrap.png';
import downloadimg from '../../src/assets/download.svg';
import recordimg from '../../src/assets/record.svg';
import ribbonheader from '../../src/assets/ribbonheader.png';
import alexdesk from "../../src/assets/alexdesktop.png";
import GiftWrap from "../../src/assets/Gift_Wrap.svg";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LandingPageAction } from '../redux/Actions';

function Landing() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [videoMsg, setVideoMsg] = useState(false);
    const [first, setFirst] = useState();
    const [firstDesc, setFirstDesc] = useState();
    const [firstSure, setFirstSure] = useState(false);
    const [firstDot, setFirstDot] = useState(false);
    const [firstHmm, setFirstHmm] = useState(false);
    const [open, setOpen] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const [video, setVideo] = useState();
    const [videoEnded, setVideoEnded] = useState(false);
    
    useEffect(() => {
        let paramStringOrder = window.location.href.split('/')[3];
        let paramStringOrderId = paramStringOrder.split('?')[1];
        let paramStringSendBy = window.location.href.split('/')[4];
        const url = paramStringSendBy === 'gifter' ? 
            `${process.env.REACT_APP_BASE_URL}/file/findFileGifter/${paramStringOrderId}` :
                `${process.env.REACT_APP_BASE_URL}/file/findFileReceipient/${paramStringOrderId}`
        fetch(url, {
            method: 'GET',
        }).then(res => res.json())
            .then(data => {
                if (data) {
                    setVideo(data.file)
                    dispatch(LandingPageAction(data.order_id, data.sender_name, data.sender_email, data.sender_phone, data.receiver_name, data.receiver_contact, data.send_by))
                }
            })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setFirst(
                <div className="lowertext e2b txt29">First</div>
            );
        }, 3000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const intervalDesc = setInterval(() => {
            setFirstDesc(
                <>
                    <div className="description e1r txt29">Are you in front of your package?</div>
                    <div className="lowertext2 e1r txt16 mt5">We'll wait.</div>
                    <div className="button_text mt30">
                        <a className="e2b txt20" onClick={() => setFirstSure(true)}>
                            Yes <svg width="16" height="9" className="ml5" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.01 3.5H0V5.5H12.01V8.5L16 4.5L12.01 0.5V3.5Z" fill="white" /></svg>
                        </a>
                        {/* <a className="e2b txt20">
              No
            </a> */}
                    </div>
                </>
            );
        }, 5000);
        return () => {
            clearInterval(intervalDesc);
        };
    }, []);

    useEffect(() => {
        if (videoMsg && firstSure && firstDot) {
            const intervalHmm = setInterval(() => {
                setFirstHmm(true);
            }, 1000);

            return () => {
                clearInterval(intervalHmm);
            };
        }
    }, [firstDot]);

    return (
        <div className="client--side-section--wrapper">
            <div className="container animation_all_steps">
                {!open ?
                    <>
                        {!videoMsg ?
                            <>
                                <div className="header--wrap">
                                    <a className="header__heading-link link link--text focus-inset">
                                        <svg width="160" height="28" viewBox="0 0 160 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0 0H5.56156C7.03658 0 8.45119 0.585949 9.49418 1.62894C10.5372 2.67194 11.1231 4.08655 11.1231 5.56156H5.56156V16.6847C4.08655 16.6847 2.67194 16.0987 1.62894 15.0557C0.585949 14.0128 0 12.5981 0 11.1231V0ZM5.56156 16.6847C7.03658 16.6847 8.45119 17.2706 9.49418 18.3136C10.5372 19.3566 11.1231 20.7712 11.1231 22.2463V27.8078H5.56156V16.6847ZM16.6847 16.6847C15.2097 16.6847 13.7951 16.0987 12.7521 15.0557C11.7091 14.0128 11.1231 12.5981 11.1231 11.1231V5.56156C12.5981 5.56156 14.0128 6.14751 15.0557 7.19051C16.0987 8.2335 16.6847 9.64811 16.6847 11.1231V16.6847ZM16.6847 16.6847C18.1597 16.6847 19.5743 17.2706 20.6173 18.3136C21.6603 19.3566 22.2463 20.7712 22.2463 22.2463V27.8078H16.6847V16.6847ZM33.9873 22.2463H28.4258V16.6847C28.4258 15.2097 27.8398 13.7951 26.7968 12.7521C25.7538 11.7091 24.3392 11.1231 22.8642 11.1231V0H17.3026V5.56156C17.3026 7.03658 17.8886 8.45119 18.9316 9.49418C19.9746 10.5372 21.3892 11.1231 22.8642 11.1231V16.6847C22.8642 18.1597 23.4502 19.5743 24.4932 20.6173C25.5361 21.6603 26.9508 22.2463 28.4258 22.2463C28.4258 23.7213 29.0117 25.1359 30.0547 26.1789C31.0977 27.2219 32.5123 27.8078 33.9873 27.8078H39.5489V16.6847C39.5489 15.2097 38.9629 13.7951 37.92 12.7521C36.877 11.7091 35.4624 11.1231 33.9873 11.1231V0H28.4258V5.56156C28.4258 7.03658 29.0117 8.45119 30.0547 9.49418C31.0977 10.5372 32.5123 11.1231 33.9873 11.1231V22.2463Z" fill="#FFD682" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M66.5965 20.4321H66.547V21.7545H64.4151V5.68774H66.683V11.3605H66.7386C67.2937 10.8168 67.9551 10.3935 68.6813 10.117C69.4076 9.84055 70.183 9.71693 70.9592 9.75387C71.777 9.73084 72.5908 9.87494 73.351 10.1773C74.1111 10.4797 74.8016 10.9341 75.38 11.5126C75.9585 12.091 76.4129 12.7815 76.7153 13.5416C77.0177 14.3018 77.1618 15.1156 77.1387 15.9334C77.1387 19.536 74.5248 22.1129 70.8727 22.1129C70.0813 22.1535 69.2904 22.0246 68.5529 21.7347C67.8154 21.4448 67.1484 21.0007 66.5965 20.4321ZM74.84 15.9272C74.8768 15.3755 74.7959 14.8223 74.6026 14.3043C74.4093 13.7863 74.1081 13.3153 73.7189 12.9225C73.3297 12.5298 72.8614 12.2244 72.3451 12.0264C71.8288 11.8285 71.2764 11.7427 70.7244 11.7746C68.438 11.7746 66.683 13.2453 66.683 15.1362V16.7182C66.683 18.572 68.4194 20.0798 70.6379 20.0798C73.2086 20.0798 74.84 18.4546 74.84 15.9272ZM61.8321 5.7063H59.3603V8.07923H61.8321V5.7063ZM61.758 10.0999H59.4901V21.7545H61.758V10.0999ZM52.8038 10.1H50.6719V21.7545H52.915V15.3525C52.915 13.1774 54.0335 12.0341 55.6835 12.0341C56.2336 12.0411 56.7802 12.1222 57.3087 12.2751L57.7969 10.1679C57.1948 9.99101 56.5705 9.90153 55.943 9.90221C55.3644 9.89628 54.791 10.0108 54.259 10.2385C53.7271 10.4661 53.2484 10.802 52.8532 11.2246H52.8038V10.1ZM80.8403 20.4321H80.8836C81.432 20.9967 82.094 21.4385 82.8258 21.7282C83.5576 22.018 84.3426 22.1491 85.1289 22.1129C88.781 22.1129 91.3949 19.536 91.3949 15.9334C91.418 15.1156 91.2739 14.3018 90.9715 13.5416C90.6691 12.7815 90.2147 12.091 89.6363 11.5126C89.0578 10.9341 88.3673 10.4797 87.6072 10.1773C86.8471 9.87494 86.0332 9.73084 85.2154 9.75387C84.4392 9.71693 83.6638 9.84055 82.9376 10.117C82.2113 10.3935 81.55 10.8168 80.9948 11.3605H80.9516V5.68774H78.7022V21.7545H80.8403V20.4321ZM88.8897 14.3043C89.083 14.8223 89.1639 15.3755 89.1271 15.9272C89.1271 18.4546 87.4957 20.0798 84.925 20.0798C82.7065 20.0798 80.9701 18.572 80.9701 16.7182V15.1362C80.9701 13.2453 82.7313 11.7746 85.0115 11.7746C85.5635 11.7427 86.116 11.8285 86.6322 12.0264C87.1485 12.2244 87.6168 12.5298 88.006 12.9225C88.3952 13.3153 88.6964 13.7863 88.8897 14.3043ZM92.5505 15.9272C92.5505 12.4111 95.2324 9.74769 98.9524 9.74769C102.673 9.74769 105.367 12.3863 105.367 15.9272C105.367 19.4681 102.666 22.1067 98.9524 22.1067C95.2385 22.1067 92.5505 19.4433 92.5505 15.9272ZM103.105 15.9272C103.127 15.3696 103.035 14.8134 102.837 14.292C102.638 13.7705 102.337 13.2944 101.95 12.8923C101.563 12.4902 101.099 12.1703 100.585 11.9518C100.072 11.7333 99.5197 11.6207 98.9617 11.6207C98.4037 11.6207 97.8515 11.7333 97.338 11.9518C96.8246 12.1703 96.3605 12.4902 95.9737 12.8923C95.5868 13.2944 95.2851 13.7705 95.0865 14.292C94.888 14.8134 94.7968 15.3696 94.8183 15.9272C94.7968 16.4848 94.888 17.041 95.0865 17.5625C95.2851 18.0839 95.5868 18.56 95.9737 18.9621C96.3605 19.3642 96.8246 19.6841 97.338 19.9026C97.8515 20.1211 98.4037 20.2337 98.9617 20.2337C99.5197 20.2337 100.072 20.1211 100.585 19.9026C101.099 19.6841 101.563 19.3642 101.95 18.9621C102.337 18.56 102.638 18.0839 102.837 17.5625C103.035 17.041 103.127 16.4848 103.105 15.9272ZM109.173 10.0999H106.974V21.7545H109.235V15.266C109.235 13.2268 110.774 11.7746 113.085 11.7746C115.217 11.7746 116.576 13.0908 116.576 15.2227V21.7545H118.844V14.852C118.844 11.8178 116.601 9.77241 113.283 9.77241C112.53 9.75189 111.781 9.88547 111.082 10.1649C110.383 10.4444 109.748 10.8639 109.217 11.3976H109.173V10.0999ZM121.396 10.0999H123.528V11.2246H123.59C123.983 10.7978 124.461 10.4575 124.993 10.2256C125.525 9.99363 126.1 9.87508 126.68 9.87747C127.307 9.87679 127.932 9.96628 128.534 10.1432L128.052 12.2504C127.521 12.0975 126.972 12.0165 126.42 12.0094C124.77 12.0094 123.652 13.1526 123.652 15.3278V21.7545H121.39L121.396 10.0999ZM135.201 9.79096C131.549 9.79096 128.979 12.2628 128.979 15.9705C128.979 19.6658 131.438 22.082 135.288 22.0635C136.395 22.1135 137.497 21.8771 138.487 21.377C139.476 20.8768 140.32 20.13 140.936 19.2085L139.311 17.9294C138.89 18.6156 138.297 19.1808 137.592 19.5697C136.887 19.9585 136.093 20.1577 135.288 20.1478C133.002 20.1478 131.308 18.7451 131.24 16.6749H141.381V15.9705C141.414 15.1501 141.277 14.3318 140.978 13.5671C140.679 12.8024 140.225 12.1078 139.645 11.5273C139.064 10.9467 138.37 10.4927 137.605 10.1939C136.84 9.89505 136.022 9.75786 135.201 9.79096ZM137.801 12.5552C138.52 13.1634 138.98 14.0221 139.088 14.957H131.284C131.42 13.0908 133.026 11.6819 135.22 11.6819C136.16 11.6348 137.083 11.947 137.801 12.5552ZM143.136 15.9705C143.136 12.2628 145.707 9.79096 149.359 9.79096C150.179 9.75786 150.997 9.89505 151.762 10.1939C152.527 10.4927 153.221 10.9467 153.802 11.5273C154.382 12.1078 154.836 12.8024 155.135 13.5671C155.434 14.3318 155.571 15.1501 155.538 15.9705V16.6749H145.404C145.466 18.7451 147.159 20.1478 149.445 20.1478C150.25 20.1577 151.044 19.9585 151.749 19.5697C152.455 19.1808 153.047 18.6156 153.468 17.9294L155.106 19.2271C154.489 20.1485 153.646 20.8954 152.656 21.3955C151.667 21.8956 150.565 22.1321 149.458 22.082C145.595 22.082 143.136 19.6658 143.136 15.9705ZM153.252 14.957C153.143 14.0221 152.683 13.1634 151.965 12.5552C151.246 11.947 150.323 11.6348 149.383 11.6819C147.19 11.6819 145.583 13.0908 145.453 14.957H153.252ZM160 5.7063H157.732V21.773H160V5.7063Z" fill="white" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="animation-step1 step ">
                                    <div className='animation-step1-wrapper'>
                                        <div className='animation-step1_content'>
                                            {/* {state.landingPage.send_by === 'gifter' ? */}
                                                <div className="title e2b">
                                                    To {state.landingPage.receiver_name} From {state.landingPage.gifter_name}
                                                </div>
                                                {/* :
                                                <div className="title e2b">
                                                    To {state.landingPage.gifter_name} From {state.landingPage.receiver_name}
                                                </div>
                                            } */}
                                            <div className="description e1sb">You've received a gift from {state.landingPage.gifter_name}, and he made it extra special with video message.</div>
                                            <div className="button" onClick={() => setVideoMsg(true)}><a className="e1b">Continue to the video message <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.01 3H0V5H12.01V8L16 4L12.01 0V3Z" fill="#00187F" />
                                            </svg></a></div>
                                            <div className="lowertext mt30 e1sb"><a>What is RibbonReel?</a></div>
                                            <div className='animated-step1_img'></div>
                                        </div>
                                        <div className='animation-step1_img'>
                                            <img src={alexdesk} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="animation-step2 step">
                                    <div className='animated-step2_content'>
                                        <div className="title e2b">To {state.landingPage.receiver_name} From {state.landingPage.gifter_name}</div>
                                        {!firstSure ?
                                            <div className="innerstage">
                                                {first}
                                                {firstDesc}
                                            </div>
                                            :
                                            <>
                                                {!firstDot ?
                                                    <div className="innerstage">
                                                        <div className="description e2b txt29">Are you sure?</div>
                                                        <div className="lowertext2 e1r txt16 mt5">We don't want to ruin this.</div>
                                                        <div className="button_text mt90" onClick={() => setFirstDot(true)}><a className="e2b txt20">Yes I have it with me <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.01 3.5H0V5.5H12.01V8.5L16 4.5L12.01 0.5V3.5Z" fill="white" />
                                                        </svg>
                                                        </a></div>
                                                        <div className="button_text2 mt30 lnh1"><a className="e2b txt20">Eh, I lied... <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.01 3.5H0V5.5H12.01V8.5L16 4.5L12.01 0.5V3.5Z" fill="white" />
                                                        </svg>
                                                        </a>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="innerstage">
                                                        {!firstHmm ?
                                                            <div className="lowertext e2b txt29">...</div>
                                                            :
                                                            <>
                                                                <div className="description e2b txt29">Hmm... do you really want to watch it now?</div>
                                                                <div className="lowertext2 e1r txt16 ">Or maybe after you open it?</div>
                                                                <div className="button_text mt90" onClick={() => setOpen(true)}><a className="e2b txt20">C'MON! <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.01 3.5H0V5.5H12.01V8.5L16 4.5L12.01 0.5V3.5Z" fill="white" />
                                                                </svg>
                                                                </a></div>
                                                                <div className="button_text2  mt30 lnh1"><a className="e2b txt20">I'll hold off.. <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.01 3.5H0V5.5H12.01V8.5L16 4.5L12.01 0.5V3.5Z" fill="white" />
                                                                </svg>
                                                                </a></div>
                                                            </>
                                                        }
                                                    </div>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                            </>
                        }
                    </>
                    :
                    <>
                        {!videoOpen ?
                            <div className="animation-step8 step">
                                <div className="button"><a className="round small-btn e1sb center-btn" onClick={() => setVideoOpen(true)}>Open</a></div>
                            </div>
                            :
                            <>
                                {!videoEnded ?
                                    <div className="animation-step9 step">
                                        <div className="video-wrap">
                                            <video width="320" height="240" onEnded={() => setVideoEnded(true)} controls autoPlay muted>
                                                <source src={video} type="video/mp4" />
                                            </video>
                                        </div>
                                        <div className='animation-video_block-wrap'>
                                            <div className='animation-video_block block1'></div>
                                            <div className='animation-video_block block2'></div>
                                        </div>
                                    </div>
                                    :
                                    <div className='animation-step10 step'>
                                         <div className='animated-header'>
                                                <img src={ribbonheader} alt='ribbon' />
                                            </div>
                                        <div className='animation10-phone'>
                                           
                                            <div className='animation10_wrapper'>
                                                <div className='animation-step10_img'>
                                                    <img src={bgimg} alt='bgimg' />
                                                </div>
                                                <div className="video-wrap">
                                                    <video width="320" height="240" controls muted>
                                                        <source src={video} type="video/mp4" />
                                                    </video>
                                                </div>
                                            </div>
                                            <div className='animation-step10_descrbtion'>
                                                <div className="title e2b">To {state.landingPage.receiver_name} From {state.landingPage.gifter_name}</div>
                                                <ul>
                                                    <a href={video} download="video.mp4"><li><img src={downloadimg} alt="download" />Download</li></a>
                                                    {state.landingPage.send_by === 'gifter' && (
                                                        <li onClick={() => navigate("/RecordReaction")}><img src={recordimg} alt="record" />Record Your Reaction</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='animation10-desktop'>
                                            <div className='animation10-desktop_wrapper'>
                                                <div className='animation-step10_img' onClick={() => setVideoEnded(false)}>
                                                    <img src={GiftWrap} alt='bgimg' />
                                                    <div className="video-wrap">
                                                        <video width="320" height="240" controls muted>
                                                            <source src={video} type="video/mp4" />
                                                        </video>
                                                    </div>
                                                </div>
                                                <div className='animation-step10_descrbtion'>
                                                    {/* <div className='animated-header'>
                                                        <img src={ribbonheader} alt='ribbon' />
                                                    </div> */}
                                                    <div className="title e2b">To {state.landingPage.receiver_name} From {state.landingPage.gifter_name}</div>
                                                    <div className='watch_cta'><button className='e1sb txt14'>3 days left to watch</button></div>
                                                    <ul>
                                                        <a href={video} download="video.mp4"><li><img src={downloadimg} alt="download" />Download</li></a>
                                                        {state.landingPage.send_by === 'gifter' && (
                                                            <li onClick={() => navigate("/RecordReaction")}><img src={recordimg} alt="record" />Record Your Reaction</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>

                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Landing;