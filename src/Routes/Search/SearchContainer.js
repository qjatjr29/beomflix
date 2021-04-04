import { MovieApi } from "API";
import { tvApi } from "API";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
    state = {
        movieResults: null, // 검색한 영화 
        tvResults: null, // 검색한 tv 프로그램
        searchTerm: "", // 사용자가 단어를 가지고 검색
        loading: false,
        error: null
    }
    componentDidMount() {
        this.handleSubmit();
    }

    handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        const { searchTerm } = this.state;
        if (searchTerm !== "") {
            this.searchByTerm();
        }
    }
    // 검색 내용 바뀔때
    updateTerm = (event) => {
        const { target: { value } } = event;
        console.log(value);
        this.setState({
            searchTerm: value
        })
    }
    searchByTerm = async () => {
        const { searchTerm } = this.state;
        this.setState({ loading: true });
        try {
            const { data: { results: movieResults } } = await MovieApi.search(searchTerm);
            const { data: { results: tvResults } } = await tvApi.search(searchTerm);

            this.setState({
                movieResults,
                tvResults
            })
        } catch {
            this.setState({ error: "Can't find results" });
        } finally {
            this.setState({ loading: false });
        }
    };


    render() {
        const { movieResults, tvResults, searchTerm, loading, error } = this.state;
        return <SearchPresenter
            movieResults={movieResults}
            tvResults={tvResults}
            searchTerm={searchTerm}
            loading={loading}
            error={error}
            handleSubmit={this.handleSubmit}
            updateTerm={this.updateTerm} />
    }
}