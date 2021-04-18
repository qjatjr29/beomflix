import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import CastCareer from "Components/CastCareer";
import { peopleApi } from "API";
import CrewCareer from "Components/CrewCareer";

const Container = styled.div`
    height:calc(100vh - 50px);
    width:100%;
    
    padding:50px;
`;
const Content = styled.div`
    display:flex;
    width:100%;
    position:relative;
    z-index:1;
    height:100%;
`;
const Cover = styled.div`
    width:400px;
    background-image:url(${props => props.bgImage});
    background-position:center center;
    background-size:cover;
    height:600px;
    display:block;
    position:fixed;
    top:70px;
    left:30px; 
`;

const Data = styled.div`
    width :70%;
    margin-left: 400px;
`;
const Title = styled.h3`
    font-size:35px;
    font-weight:600;
    /* margin-bottom:20px; */
`;
const ItemContainer = styled.div`
    margin:20px 0;
`;
const Item = styled.span`
    font-size:18px;
`;
const Divider = styled.span`
    font-size:25px;
    margin:0 10px;
`;
const DivideDiv = styled.div`
    height:20px;    
`;
const Overview = styled.p`
    font-size:14px;
    opacity:0.7;
    line-height:2;
    width:50%;
`;
const SectionTitle = styled.span`
    margin-top:20px;
    font-size:23px;
    font-weight:600;
`;
const SectionHr = styled.hr`
    margin-top:15px;
`;

const History = styled.div`
    margin: 20px 0;    
`;
const Credits = styled.div`
    height: 270px;
    display: grid;
    gap: 10px;
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: 10%;
    overflow-x: auto;
`;
const Movie = styled.div``;
const tvShow = styled.div``;


const useDetail = (id) => {
    // console.log(this.props);
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState([]);
    const [movieCredits, setMovieCredits] = useState([]);
    const [tvCredits, setTvCredits] = useState([]);
    const loadDetail = async () => {
        setLoading(true);
        try {
            const { data } = await peopleApi.detail(id);
            setDetail(data);
            const { data: movieCredits } = await peopleApi.MovieCredits(id);
            setMovieCredits(movieCredits);
            const { data: tvCredits } = await peopleApi.TVCredits(id);
            setTvCredits(tvCredits);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDetail();
    }, []);
    console.log(tvCredits);
    return { loading, detail, movieCredits, tvCredits };
};




const Person = (props) => {
    const id = props.match.params.id;

    const { loading, detail, movieCredits, tvCredits } = useDetail(id);
    // const personName = detailname;

    console.log(tvCredits);
    return (
        loading ? (
            <>
                <Helmet><title>Loading | Beomflix</title></Helmet>
                <Loader />
            </>
        ) : (
            <Container>
                <Helmet><title>{detail.name} | Beomflix</title>
                </Helmet>
                <Content>
                    <Cover bgImage={detail.profile_path ? `https://image.tmdb.org/t/p/original${detail.profile_path}` : require("../../assets/noPosterSmall.PNG").default} />
                    <Data>
                        <Title>{detail.name}</Title>
                        <ItemContainer>
                            <Item>{detail.birthday}</Item>
                            <Divider>  ·  </Divider>
                            <Item>{detail.known_for_department}</Item>
                            <Divider>  ·  </Divider>
                            <Item>
                                <a href={`https://www.imdb.com/name/${detail.imdb_id}`}>
                                    <img class="fit-picture"
                                        src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png"
                                        alt="Grapefruit slice atop a pile of other slices"
                                        width="30px" />
                                </a>
                            </Item>
                            <Divider>  ·  </Divider>
                            <Item>{detail.place_of_birth}</Item>
                        </ItemContainer>
                        <Overview>{detail.biography.length > 250 ? `${detail.biography.substring(0, 250)} ...` : detail.biography}</Overview>
                        <History>
                            <Movie>

                                {(movieCredits.cast || movieCredits.crew) &&
                                    <>
                                        <SectionTitle>Movie</SectionTitle>
                                        <SectionHr></SectionHr>
                                    </>
                                }

                                {movieCredits.cast && movieCredits.cast.length > 0 && (
                                    <>
                                        <SectionTitle>cast</SectionTitle>
                                        <Credits>
                                            {movieCredits.cast.map((_cast) => (
                                                <CastCareer
                                                    key={_cast.id}
                                                    id={_cast.id}
                                                    title={_cast.original_title}
                                                    character={_cast.character}
                                                    imageUrl={_cast.poster_path}
                                                    isMovie={true}
                                                />
                                            ))}
                                        </Credits>
                                    </>
                                )}
                                {movieCredits.crew && movieCredits.crew.length > 0 && (
                                    <>
                                        <DivideDiv></DivideDiv>
                                        <SectionTitle>crew</SectionTitle>
                                        <Credits>
                                            {movieCredits.crew.map((_crew) => (
                                                <CrewCareer
                                                    key={_crew.id}
                                                    id={_crew.id}
                                                    title={_crew.original_title}
                                                    job={_crew.job}
                                                    imageUrl={_crew.poster_path}
                                                    isMovie={true}
                                                />
                                            ))}
                                        </Credits>
                                    </>
                                )}

                            </Movie>

                            <tvShow>
                                {(tvCredits.cast || tvCredits.crew) &&
                                    <>
                                        <SectionTitle>Tv Show</SectionTitle>
                                        <SectionHr></SectionHr>
                                    </>
                                }

                                {tvCredits.cast && tvCredits.cast.length > 0 && (
                                    <>
                                        <SectionTitle>cast</SectionTitle>
                                        <Credits>
                                            {tvCredits.cast.map((_cast) => (
                                                <CastCareer
                                                    key={_cast.id}
                                                    id={_cast.id}
                                                    title={_cast.original_name}
                                                    character={_cast.character}
                                                    imageUrl={_cast.poster_path}
                                                    isMovie={false}
                                                />
                                            ))}
                                        </Credits>
                                    </>
                                )}
                                {tvCredits.crew && tvCredits.crew.length > 0 && (
                                    <>
                                        <DivideDiv></DivideDiv>
                                        <SectionTitle>crew</SectionTitle>
                                        <Credits>
                                            {tvCredits.crew.map((_crew) => (
                                                <CrewCareer
                                                    key={_crew.id}
                                                    id={_crew.id}
                                                    title={_crew.original_name}
                                                    job={_crew.job}
                                                    imageUrl={_crew.poster_path}
                                                    isMovie={true}
                                                />
                                            ))}
                                        </Credits>
                                    </>
                                )}
                            </tvShow>
                        </History>
                    </Data>
                </Content>
            </Container>
        ));
};

Person.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}


export default Person;