import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import logo from "../assets/recepientlogo.png";
import relatedvideo from "../assets/relatedvideo.png";
import edit from "../assets/edit.png";
import footerlogo from "../assets/footerlogo.png";
import { useSelector } from 'react-redux';
import checkion from "../assets/checkicon.png";

export default function CameraVideo() {
    const [completeVideo, setCompleteVideo] = useState(false)
    const [videoStatus, setVideoStatus] = useState(false);
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [uploading, setUploading] = useState()
    const [reviewStep, setReviewStep] = useState(false)
    const [blob, setBlob] = useState()
    const state = useSelector((state) => state);

    const handleStartCaptureClick = React.useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = React.useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleAddVideo = async () => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            setBlob(URL.createObjectURL(blob))
            blob.lastModifiedDate = new Date();
            blob.name = "react-webcam-stream-capture.webm";
            setVideoStatus(true);
            setUploading(false)
            setTimeout(() => setUploading(true), 1000)
            setTimeout(() => setCompleteVideo(true), 1500)
        }
    };

    const handleSendVideo = async () => {
        setReviewStep(true)
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            blob.lastModifiedDate = new Date();
            blob.name = "react-webcam-stream-capture.webm";
            var receiver_contact_type;
            if (state.landingPage.gifter_email !== '' && state.landingPage.gifter_phone !== '') {
                receiver_contact_type = 'email/phone'
            } else if (state.landingPage.gifter_email !== '') {
                receiver_contact_type = 'email'
            } else {
                receiver_contact_type = 'phone'
            }
            var formData = new FormData();
            formData.append('order_id', state.landingPage.order_id);
            formData.append('send_by', 'receipient');
            formData.append('sender_name', state.landingPage.receiver_name);
            formData.append('sender_email', state.landingPage.receiver_contact);
            formData.append('sender_phone', state.landingPage.gifter_phone);
            formData.append('receiver_name', state.landingPage.gifter_name);
            formData.append('receiver_contact', state.landingPage.gifter_email);
            formData.append('receiver_contact_type', receiver_contact_type);
            formData.append('file', blob);
            const url = `${process.env.REACT_APP_BASE_URL}/file/upload`
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            if (response) {
                setVideoStatus(true);
            }
            setRecordedChunks([]);
        }
    }
    return (
        <>
            {!completeVideo ?
                <div className='video_container '>
                    <div className='video_wrapper  '>
                        {!videoStatus ?
                            <>
                                {/* <div className="recepient-header">
                                <img src={videologo} alt="" />
                                <div className='video_timing'>60s</div>
                                <div className="close">✕</div>
                            </div> */}
                                <Webcam audio={false} ref={webcamRef} />
                                <div className='cta_wrapper'>
                                    {capturing ? (
                                        <button className='finsh_cta sfr' onClick={handleStopCaptureClick}>Finish</button>
                                    ) : (
                                        <button className='add_cta' onClick={handleStartCaptureClick}></button>
                                    )}
                                    {recordedChunks.length > 0 && (
                                        <>
                                            <button className='finsh_cta sfr' onClick={handleAddVideo}>Add Video</button>
                                        </>
                                    )}
                                </div>
                            </>
                            :
                            <>
                                {!uploading ?
                                    <div className='video_upload'>
                                        <h2 className='e1b txt28'>Uploading...</h2>
                                    </div>
                                    :
                                    <div className='video_upload'>
                                        <h2 className='e1b txt28'>Uploaded <img src={checkion} alt="tickicon" className='uploadedicon' /></h2>
                                    </div>

                                    
                                }
                            </>
                        }
                    </div>
                </div>
                :
                <>
                    {!reviewStep ?
                        <div className='gifterRecord'>
                            <div className="recepient-header">
                                <img src={logo} alt="" />
                                <div className="num_wrap"><span>2/2</span></div>
                            </div>
                            <div className='giftRecord_content'>
                                <p className='e1b txt22'>And, Scene!</p>
                                <h2 className='e1b'>Let’s Review</h2>
                                <div className='video_content'>
                                    <div className='video_wrap' onClick={() => {
                                        document.getElementById("blob_video").play();
                                    }} >
                                        <video id='blob_video' width="640" height="360" controls>
                                            <source src={blob} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    {/* <img src={thumb} alt="" className='thumb' /> */}
                                    <br></br>
                                    <img src={relatedvideo} alt="" className='record' onClick={() => window.location.reload()} />
                                    <button className="e2b txt20" onClick={handleSendVideo}>Send reply now</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='review_wrapper'>
                            <div className='review_content'>
                                <span className='e1b txt28'>That's a wrap! </span>
                                <h2 className='e1b'>{state.landingPage.gifter_name} is gonna love it!</h2>
                                <p className='e1r txt20'>Review your Ribbon Reel</p>
                                <div className='animation-step10 step'>
                                    <div className='animation10-desktop'>
                                        <div className='animation10-desktop_wrapper'>
                                            <div className='animation-step10_descrbtion'>
                                                <form>
                                                    <div>
                                                        <label className='e1b txt20'>
                                                            From
                                                            <input type="text" value={state.landingPage.receiver_name} className='txt28' />
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className='e1b txt20'>
                                                            To
                                                            <input type="text" value={state.landingPage.gifter_name} className='txt28' />
                                                        </label>
                                                    </div>
                                                    <div><p className='e1b'>Sent</p></div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='review_footer'>
                                    <img src={footerlogo} alt="" />
                                    <p className='sfr txt14'>© 2022 RibbonReel. All rights reserved.</p>
                                    <p className='sfr txt14'>Privacy Policy </p>
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    );
}
