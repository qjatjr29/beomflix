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
            videos: null,

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
        let results = null;

        try {
            if (isMovie) {
                // const request = await MovieApi.movieDetail(parsedId);
                // result = request.data;
                ({ data: result } = await MovieApi.movieDetail(parsedId));
                ({ data: { cast } } = await MovieApi.credit(parsedId));
                ({ data: { crew } } = await MovieApi.credit(parsedId));
                ({ data: { results } } = await MovieApi.video(parsedId));


            } else {
                // const request = await tvApi.showDetail(parsedId);
                // result = request.data;
                ({ data: result } = await tvApi.showDetail(parsedId));
                ({ data: { cast } } = await tvApi.credit(parsedId));
                ({ data: { crew } } = await tvApi.credit(parsedId));
                ({ data: { results } } = await tvApi.video(parsedId));




            }

        } catch {
            this.setState({ error: "Can't find anything." })
        } finally {
            this.setState({
                loading: false, result, cast, crew, videos: results
            })
        }
    }

    render() {
        // console.log(this.props);
        const { result, loading, error, cast, crew, videos } = this.state;
        // console.log(result);
        // console.log(companies.logo_path);
        return <DetailPresenter
            result={result}
            loading={loading}
            error={error}
            cast={cast}
            crew={crew}
            videos={videos}
        />
    }
}