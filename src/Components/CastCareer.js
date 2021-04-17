import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Container = styled.div`
    font-size:12px;
`;


const Image = styled.div`
    background-image:url(${props => props.bgUrl});
    height: 180px;
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    margin-bottom: 5px;
    transition: opacity 0.1s linear;
`;
const ImageContainer = styled.div`
    margin-bottom: 5px;
    position: relative;
        &:hover{
        ${Image} {
            opacity: 0.3;
        }
    }
`;
const Title = styled.span`
    display: block;
    margin-bottom: 3px;
`;
const Character = styled.span`
    display:block;
    margin-top:2px;
    font-size:12px;
    opacity:0.8;
`;



const CastCareer = ({ id, imageUrl, title, character, isMovie }) => (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id} `}>
        <Container>
            <ImageContainer>
                <Image bgUrl={imageUrl ? `https://image.tmdb.org/t/p/w200${imageUrl}` : require("../assets/noPosterSmall.PNG").default} />
            </ImageContainer >
            <Title>{title.length > 15 ? `${title.substring(0, 15)}...` : title}</Title>
            <Character>{character.length > 15 ? `${character.substring(0, 15)}...` : character}</Character>
        </Container >
    </Link >
);



CastCareer.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    character: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isMovie: PropTypes.bool.isRequired
}

export default CastCareer;