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
        try {
            if (isMovie) {
                // const request = await MovieApi.movieDetail(parsedId);
                // result = request.data;
                ({ data: result } = await MovieApi.movieDetail(parsedId));
            } else {
                // const request = await tvApi.showDetail(parsedId);
                // result = request.data;
                ({ data: result } = await tvApi.movieDetail(parsedId));
            }

        } catch {
            this.setState({ error: "Can't find anything." })
        } finally {
            this.setState({
                loading: false, result
            })
        }
    }

    render() {

        const { result, loading, error } = this.state;
        console.log(result);
        return <DetailPresenter
            result={result}
            loading={loading}
            error={error} />
    }
}