/*
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, {useEffect, useRef, useState} from "react";
import {AudioPlayer, Layout, PlayButton, Player, Timeline, User} from "./style";
import PropTypes from "prop-types";

const AudioComponent = ({url, isMe, profileImage, downloadAudio}) => {
    const audioPlayer = useRef(null);
    const sliderRef = useRef(null);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        setAudio(new Audio(audioPlayer.current.dataset.url));
    }, [url]);

    const onClickPlay = () => {
        audio.paused ? audio.play() : audio.pause();
    };

    async function checkIsDownloaded() {
        if (audioPlayer.current.dataset.url === undefined) {
            downloadAudio("audio").then(() => {
                start();
            });
        } else {
            start();
        }
    }

    function start() {
        onClickPlay();
        audio.onloadstart = () => {
            setMessageDate();
            audioPlayer.current.classList.add("loading");
        };

        audio.onplay = () => audioPlayer.current.classList.add("playing");
        audio.onpause = () => audioPlayer.current.classList.remove("playing");
        audio.onloadeddata = () => audioPlayer.current.classList.remove("loading");
        audio.ondurationchange = showTimeDuration;
        audio.onended = () => (audio.currentTime = 0);
        audio.ontimeupdate = () => {
            const {currentTime} = audio;
            const currentTimeDisplay = formatTimeToDisplay(currentTime);
            updateCurrentTimeDisplay(currentTimeDisplay);
            updateCurrentPercent();
            if (currentTime === 0) {
                showTimeDuration();
            }
        };
    }

    function formatTimeToDisplay(seconds) {
        const milliseconds = seconds * 1000;
        return new Date(milliseconds).toISOString().substr(14, 5);
    }

    function setMessageDate() {
        let currentDateTime = new Date().toISOString().substr(11, 5);
        audioPlayer.current.style.setProperty(
            "--player-current-date-time",
            `'${currentDateTime}'`
        );
    }

    function handleSlider(e) {
        const {duration} = audio;
        const percent = e.target.value;
        const currentTimeInSeconds = ((percent * duration) / 100).toFixed(2);
        audio.currentTime = currentTimeInSeconds;
    }

    function showTimeDuration() {
        const {duration} = audio;
        const durationDisplay = formatTimeToDisplay(duration);
        updateCurrentTimeDisplay(durationDisplay);
    }

    function updateCurrentTimeDisplay(time) {
        audioPlayer.current.style.setProperty("--player-current-time", `'${time}'`);
    }

    function updateCurrentPercent() {
        const {currentTime, duration} = audio;
        const percentPlayed = (currentTime * 100) / duration;
        sliderRef.current.value = percentPlayed;
        audioPlayer.current.style.setProperty(
            "--player-percent-played",
            `${percentPlayed}%`
        );
    }

    return (
        <Layout>
            <AudioPlayer className="audio-player" data-url={url} ref={audioPlayer} isMe={isMe}>
                <Player className="player">
                    <PlayButton type="button" className="btn-play" onClick={() => checkIsDownloaded()}>
                        <span className="material-icons icon-play">play_arrow</span>
                        <span className="material-icons icon-pause">pause</span>
                        <span className="material-icons icon-loop">loop</span>
                    </PlayButton>

                    <Timeline className="timeline">
                        <div className="line">
                            <input dir="ltr" type="range" min="0" max="100" value="0" ref={sliderRef}
                                   onInput={handleSlider}/>
                        </div>
                        <div className="data">
                            <div className="current-time"/>
                            <div className="time">
                            </div>
                        </div>
                    </Timeline>
                </Player>
                <User className="user">
                    <img src={profileImage} alt={"ProfileImg"}/>
                    <span className="material-icons">mic</span>
                </User>
            </AudioPlayer>
        </Layout>
    );
};

export default AudioComponent;

AudioComponent.propTypes = {
    url: PropTypes.string,
    isMe: PropTypes.bool.isRequired,
    profileImage: PropTypes.string.isRequired,
    downloadAudio: PropTypes.func.isRequired,
};