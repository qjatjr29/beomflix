import { MovieApi, tvApi } from "API";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const { location: { pathname } } = props;
        this.state = {
            result: null,  // show 를 찾을 때 id를 갖고 가서 찾는다.
            loading: true,
            error: null,
            cast: null,
            crew: null,
            isMovie: pathname.includes("/movie/")
        };
    }


    async componentDidMount() {
        const { match: { params: { id } }, history: { push } } = this.props;
        const { isMovie } = this.state;

        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/")
        }
        let result = null;
        let cast = null;
        let crew = null;
        try {
            if (isMovie) {
                // const request = await MovieApi.movieDetail(parsedId);
                // result = request.data;
                ({ data: result } = await MovieApi.movieDetail(parsedId));
                ({ data: { cast } } = await MovieApi.credit(parsedId));
                ({ data: { crew } } = await MovieApi.credit(parsedId));
            } else {
                // const request = await tvApi.showDetail(parsedId);
                // result = request.data;
                ({ data: result } = await tvApi.showDetail(parsedId));
                ({ data: { cast } } = await tvApi.credit(parsedId));
                ({ data: { crew } } = await tvApi.credit(parsedId));
            }

        } catch {
            this.setState({ error: "Can't find anything." })
        } finally {
            this.setState({
                loading: false, result, cast, crew
            })
        }
    }

    render() {
        // console.log(this.props);
        const { result, loading, error, cast, crew } = this.state;
        // console.log(result);
        console.log(cast);
        return <DetailPresenter
            result={result}
            loading={loading}
            error={error}
            cast={cast}
            crew={crew} />
    }
}