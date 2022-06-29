import "../stylesheets/styles.css";
import React, { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from "../components/BaseShot"
import { setExtraVolume } from "../components/CommonFunctions"
import { prePathUrl, getAudioPath } from "../components/CommonFunctions";

const timerList = [];

const Scene = React.forwardRef(({ nextFunc, _baseGeo, loadFunc }, ref) => {

    const audioList = useContext(UserContext)

    const [isSceneLoad, setSceneLoad] = useState(false)
    const spakleRef = useRef()
    const parentRef = useRef();

    useEffect(() => {
    }, [])


    React.useImperativeHandle(ref, () => ({
        sceneLoad: () => {
            setSceneLoad(true)
        },
        sceneStart: () => {

            parentRef.current.className = 'aniObject'
            spakleRef.current.className = 'excellentText'

            loadFunc();

            setExtraVolume(audioList.clapAudio, 2.5)
            setExtraVolume(audioList.yeahAudio, 2.5)
            setExtraVolume(audioList.tingAudio, 2.5)
            setExtraVolume(audioList.buzzAudio, 2.5)
            setExtraVolume(audioList.successAudio, 2.5)

            setExtraVolume(audioList.middleAudio, 6)

            timerList[0] = setTimeout(() => {
                audioList.middleAudio.play().catch(error => { });
                timerList[1] = setTimeout(() => {
                    nextFunc();
                }, audioList.middleAudio.duration * 1000 + 2000);
            }, 3000);
        },

        sceneEnd: () => {
            audioList.middleAudio.pause();

            for (let i = 0; i < timerList.length; i++)
                clearTimeout(timerList[i])

            audioList.middleAudio.src = getAudioPath('common/welldone')

            setSceneLoad(false)
        }
    }))


    return (
        <div>
            {isSceneLoad
                &&
                <div ref={parentRef} className="hideObject">
                    < div ref={spakleRef} className="hideObject" style={{
                        position: "fixed",
                        width: _baseGeo.width * 1 + "px",
                        height: _baseGeo.height + 'px',
                        left: _baseGeo.left + "px",
                        top: _baseGeo.top + "px",

                    }}>
                        <img width={"100%"}
                            src={prePathUrl() + "images/bg/spakle.png"}
                        />
                    </div>
                    < div style={{
                        position: "fixed",
                        width: _baseGeo.width * 1 + "px",
                        height: _baseGeo.height + 'px',
                        left: _baseGeo.left + "px",
                        top: _baseGeo.top + "px",

                    }}>
                        <img width={"100%"}
                            src={prePathUrl() + "images/bg/middle.png"}
                        />
                    </div>

                </div>
            }
        </div>
    );
});

export default Scene;
