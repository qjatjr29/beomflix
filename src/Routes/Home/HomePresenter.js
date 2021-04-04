import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";

const Container = styled.div`
    padding:0px 20px;
`;

// 로딩이 true인 상태이면 nowplaying, upcoming, popular 는 없으므로 
// 로딩상태인지 체크를 해줘야한다 !!
// 로딩이면  null
// 로딩이 아닌 상태이면 nowPlaying이 존재하는지 , section이 우리가 원하는대로 render 되는지 확인 
const HomePresenter = ({ nowPlaying, upComing, popular, loading, error }) => loading ? (<Loader />) :
    <Container>


        {nowPlaying && nowPlaying.length > 0 && (
            <Section title="Now Playing" >
                {nowPlaying.map(movie => <span key={movie.id}>{movie.title}</span>)}
            </Section>
        )}
        {upComing && upComing.length > 0 && (
            <Section title="Upcoming Moives" >
                {upComing.map(movie => <span key={movie.id}>{movie.title}</span>)}
            </Section>
        )}
        {popular && popular.length > 0 && (
            <Section title="Popular Moives" >
                {popular.map(movie => <span key={movie.id}>{movie.title}</span>)}
            </Section>
        )}


    </Container>;

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upComing: PropTypes.array,
    popular: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}


export default HomePresenter;