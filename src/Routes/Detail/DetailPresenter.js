import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";


const Container = styled.div`
    height:calc(100vh - 50px);
    width:100%;
    position:relative;
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
    width:30%;
    background-image:url(${props => props.bgImage});
    background-position:center center;
    background-size:cover;
    height:100%;
`;
const Backdrop = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-image:url(${props => props.bgImage});
    background-position:center center;
    background-size:cover;
    filter:blur(3px);
    opacity:0.5;
    z-index:0;
`;

const Data = styled.div`
    width :70%;
    margin-left: 20px;
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
const Overview = styled.p`
    font-size:14px;
    opacity:0.7;
    line-height:2;
    width:50%;
    
`;
const Credit = styled.div`
    margin: 20px 0;
`;
const Cast = styled.div`
 
`;
const Crew = styled.div`
    margin-top:30px;
`;
const CreditItem = styled.div``;
const ProfileContanier = styled.div`
     display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Profile = styled.div`
    height: 270px;
    display: grid;
    gap: 10px;
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: 10%;
    overflow-x: auto;
`;
const ProfileImg = styled.div`
    width:120px;
    background-image:url(${props => props.bgImage});
    background-position:center center;
    background-size:cover;
    height:140px;
    border-radius:10px;
    margin-bottom:10px;
    `;
const CreditTitle = styled.span`
    font-size:23px;
    font-weight:600;
`;
const CreditHr = styled.hr``;
const PeopleName = styled.div`
    font-size:14px;
    margin-bottom:5px;
    padding:0;
`;
const CharacterName = styled.div`
    font-size:12px;
    margin:0;
    padding:0;
    opacity:0.5;
`;
const Job = styled.div`
    font-size:12px;
    margin:0;
    padding:0;
    opacity:0.5;
`;


const DetailPresenter = ({ result, loading, error, cast, crew }) =>
    loading ? (
        <>
            <Helmet><title>Loading | Beomflix</title></Helmet>
            <Loader />
        </>
    ) : (
        error ? <Message /> :
            <Container>
                <Helmet><title>{result.original_title ? result.original_title : result.original_name} | Beomflix</title></Helmet>
                <Backdrop
                    bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
                />
                <Content>
                    <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../assets/noPosterSmall.PNG")} />
                    <Data>
                        <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                        <ItemContainer>
                            <Item>{result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}</Item>
                            <Divider>  ·  </Divider>
                            <Item>{result.runtime ? result.runtime : result.episode_run_time[0]}min</Item>
                            <Divider>  ·  </Divider>
                            <Item>
                                {result.genres &&
                                    result.genres.map((genre, index) =>
                                        index === result.genres.length - 1 ? genre.name : `${genre.name} / `
                                    )}
                            </Item>
                            <Divider>  ·  </Divider>
                            <Item>
                                <a href={`https://www.imdb.com/title/${result.imdb_id}`}>
                                    <img class="fit-picture"
                                        src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png"
                                        alt="Grapefruit slice atop a pile of other slices"
                                        width="30px" />

                                </a>
                            </Item>
                            <Divider>  ·  </Divider>
                            <Item>
                                {result.production_countries &&
                                    result.production_countries[result.production_countries.length - 1].name
                                }
                            </Item>
                        </ItemContainer>
                        <Overview>{result.overview}</Overview>
                        <Credit>
                            <Cast>
                                <CreditTitle>Actor</CreditTitle>
                                <CreditHr></CreditHr>

                                <Profile >
                                    {cast.map((casting, index) =>
                                        index === casting.length - 1 ? null :
                                            <ProfileContanier>
                                                <ProfileImg bgImage={casting.profile_path ? `https://image.tmdb.org/t/p/w200${casting.profile_path}` : require("../../assets/noPosterSmall.PNG")} />
                                                <PeopleName>{casting.name}</PeopleName>
                                                <CharacterName>{casting.character}</CharacterName>
                                            </ProfileContanier>
                                    )}
                                </Profile>
                            </Cast>
                            <Crew>
                                <CreditTitle>Staff</CreditTitle>
                                <CreditHr></CreditHr>

                                <Profile >
                                    {crew.map((casting, index) =>
                                        index === casting.length - 1 ? null :
                                            <ProfileContanier>
                                                <ProfileImg bgImage={casting.profile_path ? `https://image.tmdb.org/t/p/w200${casting.profile_path}` : require("../../assets/noPosterSmall.PNG")} />
                                                <PeopleName>{casting.name}</PeopleName>
                                                <Job>{casting.job}</Job>
                                            </ProfileContanier>
                                    )}
                                </Profile>
                            </Crew>
                        </Credit>
                    </Data>
                </Content>
            </Container>
    );

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}


export default DetailPresenter;