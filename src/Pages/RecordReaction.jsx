import React, { useState } from 'react'
import ribbonheader from '../../src/assets/ribbonheader.png';
import arrowleft from '../../src/assets/arrow_left.png';
import { useNavigate } from 'react-router-dom';
import animatedImg from "../assets/animated-img.png";

function RecordReaction() {
    const navigate = useNavigate();
    const [recordReaction, setRecordReaction] = useState(false)
    return (
        <>
            {recordReaction === false ?
                <div className='animation-step11 step'>
                    <div className='animated-header'>
                        <img src={ribbonheader} alt='ribbon' />
                    </div>
                    <div className='describtion mt30'>
                        <div className='e1b txt48'>Let's Record  your Reaction!</div>
                        <div className='e1sb txt20 mt30'>With RibbonReactions you can make experience complete for Alex.
                            Simply record a video unwrapping your gift, totally free!</div>
                        <button className='e1sb txt14 tipwrap mt90'>Tip</button>
                        <div className='e1sb txt20 mt20'>Make sure to place the camera in an angle where we can see the gift!</div>
                        <button className='e1b txt20 begin_cta' onClick={() => setRecordReaction(true)}>Let's Begin!</button>
                    </div>
                </div>
                :
                <div className='animation-step12_wrapper'>
                    <div className='animation-step12 step'>
                        <div className='animated-header'>
                            <img src={ribbonheader} alt='ribbon' />
                            <div className="recepient-header">
                                <div className="num_wrap"><span>1/2</span></div>
                            </div>
                        </div>
                        <div className='animation12_desc-wrap'>
                            <div className='animation12_describtion mt30'>
                                <div className="button_text mb69 mt30" onClick={() => setRecordReaction(false)}><a className="e2b txt20">
                                    <img src={arrowleft} alt="img" />Back </a> </div>
                                <div className='e2r txt28'><strong>First,</strong> find a good angle for your camera.</div>
                                <div className="button_text mt90" onClick={() => navigate("/CameraVideo")}><a className="e2b txt20">Continue to Record
                                    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.01 3.5H0V5.5H12.01V8.5L16 4.5L12.01 0.5V3.5Z" fill="white" />
                                    </svg>
                                </a>
                                </div>
                            </div>
                            <div className='animation12_describtion-img mt30'>
                                <img src={animatedImg} alt="" />
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default RecordReaction