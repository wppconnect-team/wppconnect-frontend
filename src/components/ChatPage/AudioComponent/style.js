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
import styled from "styled-components";

export const Layout = styled.div`
  width: 100%;

  :root {
    --bg-color: #1b1b22;
    --green: #00e5c0;
    --body-font-family: "Jost", sans-serif;
    --player-color-featured: #00e5c0;
    --player-color-background: #262d31;
    --player-color-text: #c5c6c8;
    --player-percent-played: 0;
    --player-current-time: "00:00";
    --player-current-date-time: "00:00";
  }

  @keyframes load {
    to {
      transform: rotate(360deg);
    }
  }

  .audio-player .player .btn-play span:not(.icon-play),
  .audio-player.playing .player .btn-play span:not(.icon-pause),
  .audio-player.loading .player .btn-play span:not(.icon-loop) {
    display: none;
  }

  .audio-player.playing .player .btn-play .icon-pause {
    display: inline-block;
  }
`;

export const AudioPlayer = styled.div`
  background: var(--player-color-background);
  display: inline-flex;
  flex-direction: ${({isMe}) => isMe ? "row" : "row-reverse"};
  min-width: 240px;
  width: 336px;
  max-width: 100%;
  border-radius: 0.4rem;
  //padding: 0.4rem;
  //box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  user-select: none;

  .loading {
    .player {
      .btn-play {
        span {
          &:not(.icon-loop) {
            display: none;
          }

          animation: load 1s linear infinite;
        }

        pointer-events: none;

        .icon-loop {
          display: inline-block;
        }
      }
    }
  }

  .mine {
    --player-color-background: #056162;

    .user {
      margin-left: 0;

      span {
        right: 0;
        left: auto;
        transform: translateX(50%);
      }
    }

    .player {
      margin-right: 0.8rem;

      .btn-play {
        padding: 0 0.8rem;
      }
    }
  }

  + {
    .audio-player {
      margin-top: 1rem;
    }
  }
`;

export const Player = styled.div`
  flex: 1;
  display: flex;
`;

export const PlayButton = styled.button`
  outline: none;
  appearance: none;
  cursor: pointer;
  background: none;
  border: 0;
  padding: 0 0.8rem 0 0.4rem;

  &:disabled {
    cursor: default;
  }

  span {
    color: var(--player-color-text);
    font-size: 38px;
    opacity: 0.8;

    &:not(.icon-play) {
      display: none;
    }
  }
`;

export const Timeline = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 0.2rem;

  .line {
    --line-height: 0.24rem;
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;

    &:before {
      content: "";
      width: var(--player-percent-played);
      position: absolute;
      background: var(--player-color-featured);
      height: var(--line-height);
      border-radius: calc(var(--line-height) / 2);
    }

    input[type="range"] {
      flex: 1;
      all: unset;
      appearance: none;
      background: rgba(0, 0, 0, .3);
      border: none;
      outline: none;
      width: 100%;
      position: relative;

      &::-webkit-slider-thumb {
        appearance: none;
        background: #999;
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        margin-top: calc(var(--line-height) * -1.4);
      }

      &::-moz-range-thumb {
        unset: all;
        appearance: none;
        border: 0;
        background: #286cc1;
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        margin-top: calc(var(--line-height) * -1.4);
      }

      &::-ms-thumb {
        appearance: none;
        background: var(--player-color-featured);
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        margin-top: calc(var(--line-height) * -1.4);
      }

      &::-webkit-slider-runnable-track {
        background: rgba(255, 255, 255, 0.2);
        height: var(--line-height);
        border-radius: calc(var(--line-height) / 2);
      }

      &::-moz-range-track {
        background: rgb(182, 205, 179);
        height: var(--line-height);
        border-radius: calc(var(--line-height) / 2);
      }

      &::-ms-track {
        background: rgba(255, 255, 255, 0.2);
        height: var(--line-height);
        border-radius: calc(var(--line-height) / 2);
      }
    }
  }

  .data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.68rem;
    color: var(--player-color-text);
    position: absolute;
    width: 100%;
    bottom: 0;

    .current-time {
      font-size: 1rem;

      &::before {
        content: var(--player-current-time);
      }
    }

    .time {
      display: flex;
      align-items: center;

      &::before {
        content: var(--player-current-date-time);
      }

      span {
        font-size: 1rem;
        margin-left: 0.4rem;
        color: var(--player-color-featured);
      }
    }
  }
`;

export const User = styled.div`
  position: relative;
  width: 55px;
  height: 55px;
  margin-left: ${({isMe}) => isMe ? "1.4rem;" : "10px"};

  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    object-fit: cover;
    background: rgba(255, 255, 255, 0.01);
  }

  span {
    position: absolute;
    left: 10px;
    bottom: 0;
    color: var(--player-color-featured);
    transform: translateX(-50%);
    font-size: 2.5rem;
    text-shadow: -1px -1px 0 var(--player-color-background), 1px -1px 0 var(--player-color-background), -1px 1px 0 var(--player-color-background), 1px 1px 0 var(--player-color-background);
  }
`;