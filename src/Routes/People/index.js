import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "Components/Section";
import uniqBy from 'lodash';
import Loader from "Components/Loader";
import Message from "Components/Message";
import Profile from "Components/Profile";
import { peopleApi } from "API";
import { useInfiniteScroll } from "../Hooks/useInfiniteScroll";

const Container = styled.div`
    padding:20px;
    
`;

const usePopular = () => {
    const [loading, setLoading] = useState(true);
    const [popular, setPopular] = useState([]);
    const pageNumber = useInfiniteScroll();
    console.log(pageNumber);
    const loadPeople = async () => {
        let tempPopular = popular;
        const p = (pageNumber - 1) * 5;
        setLoading(true);
        try {
            for (let i = p + 1; i < p + 6; i++) {
                const { data: { results: tpopular } } = await peopleApi.popular(i);
                tempPopular = [...tempPopular, ...tpopular];
                console.log(tempPopular);
                setPopular(uniqBy(tempPopular, 'id'));
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPeople();
    }, [pageNumber]);

    return { loading, popular };
};

const People = () => {
    const { loading, popular } = usePopular();
    console.log(popular.__wrapped__);
    const people = popular.__wrapped__;
    return (loading ? (
        <Loader>
            <Helmet>
                <title>Peoples | Beomflix</title>
            </Helmet>
        </Loader>
    ) : (
        <Container>
            <Helmet>
                <title>Peoples | Beomflix</title>
            </Helmet>
            {people && people.length > 0 && (
                <Section title="Popular">
                    {people.map(person => (
                        <Profile
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            imageUrl={person.profile_path}
                        />))}

                </Section>
            )}

        </Container>
    ));
};


export default People;