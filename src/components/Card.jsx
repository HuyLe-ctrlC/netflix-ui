import React, { useState } from "react";
import styled from "styled-components";
import video from "../assets/video.mp4";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import * as API_ROUTES from "../constants/api_key";
import { IoPlayCircleSharp } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./../utils/firebase-config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFromLikedMovies } from "./../store/index";

function Card({ movieData, isLiked = false }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else {
      navigate(ROUTES.LOGIN);
    }
  });

  const addToList = async () => {
    try {
      await axios.post(API_ROUTES.ADD_USER, {
        email,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`${API_ROUTES.TMBD_IMAGE_SIZE}${movieData.image}`}
        alt="Card movie"
        onClick={() => navigate(ROUTES.PLAYER)}
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`${API_ROUTES.TMBD_IMAGE_SIZE}${movieData.image}`}
              alt="Card movie"
              onClick={() => navigate(ROUTES.PLAYER)}
            />
            <video
              src={video}
              autoPlay
              loop
              muted
              onClick={() => navigate(ROUTES.PLAYER)}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate(ROUTES.PLAYER)}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  tittle="play"
                  onClick={() => navigate(ROUTES.PLAYER)}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove from list"
                    onClick={() =>
                      dispatch(
                        removeFromLikedMovies({ movieId: movieData.id, email })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default React.memo(Card);

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
