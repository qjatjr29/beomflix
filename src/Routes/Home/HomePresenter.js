import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
    padding:20px;
    
`;

// 로딩이 true인 상태이면 nowplaying, upcoming, popular 는 없으므로 
// 로딩상태인지 체크를 해줘야한다 !!
// 로딩이면  null
// 로딩이 아닌 상태이면 nowPlaying이 존재하는지 , section이 우리가 원하는대로 render 되는지 확인 
const HomePresenter = ({ nowPlaying, upComing, popular, loading, error }) => (
    <>
        <Helmet>
            <title>Movies | Beomflix</title>
        </Helmet>
        {loading ? (<Loader />) :
            (<Container>
                {/* <Helmet>
                    <title>Movies | Beomflix</title>
                </Helmet> */}
                {nowPlaying && nowPlaying.length > 0 && (
                    <Section title="Now Playing" >
                        {nowPlaying.map(movie => (
                            <Poster
                                key={movie.id}
                                id={movie.id}
                                title={movie.original_title}
                                imageUrl={movie.poster_path}
                                rating={movie.vote_average}
                                year={movie.release_date && movie.release_date.substring(0, 4)}
                                isMovie={true}

                            />))}
                    </Section>
                )}
                {upComing && upComing.length > 0 && (
                    <Section title="Upcoming Moives" >
                        {upComing.map(movie => (
                            <Poster
                                key={movie.id}
                                id={movie.id}
                                title={movie.original_title}
                                imageUrl={movie.poster_path}
                                rating={movie.vote_average}
                                year={movie.release_date && movie.release_date.substring(0, 4)}
                                isMovie={true}

                            />))}
                    </Section>
                )}
                {popular && popular.length > 0 && (
                    <Section title="Popular Moives" >
                        {popular.map(movie => (
                            <Poster
                                key={movie.id}
                                id={movie.id}
                                title={movie.original_title}
                                imageUrl={movie.poster_path}
                                rating={movie.vote_average}
                                year={movie.release_date && movie.release_date.substring(0, 4)}
                                isMovie={true}

                            />))}
                    </Section>
                )}

                {error && <Message color="#e74c3c" text={error} />}
            </Container>)};
    </>
);


HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upComing: PropTypes.array,
    popular: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}


export default HomePresenter;