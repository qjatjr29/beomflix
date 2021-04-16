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
const Name = styled.span`
    display: block;
    margin-bottom: 3px;
`;



const Profile = ({ id, imageUrl, name }) => (
    <Link to={`person/${id}`}>
        <Container>
            <ImageContainer>
                <Image bgUrl={imageUrl ? `https://image.tmdb.org/t/p/w300${imageUrl}` : require("../assets/noPosterSmall.PNG").default} />
            </ImageContainer >
            <Name>{name.length > 15 ? `${name.substring(0, 15)}...` : name}</Name>
        </Container >
    </Link >
);



Profile.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
}

export default Profile;