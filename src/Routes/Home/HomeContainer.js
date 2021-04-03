import React from "react";
import HomePresenter from "./HomePresenter";
import { MovieApi } from "API";


export default class extends React.Component {
    state = {
        nowPlaying: null,
        upComing: null,
        popular: null,
        error: null,
        loading: true // 에러날 것 대비
    };
    async componentDidMount() {
        try {
            // API 의 NOWPLAYING 함수로 지금 상영중인 영화 정보를 가져온다
            // 정보들 중에 DATA의 RESULT 값만 가져오기 위해서 객체 비구조화 를 이용
            // result 변수의 이름을 nowPlaying,upComing, popular으로 바꿔주는 방법 (ES6 매직)
            const { data: { results: nowPlaying } } = await MovieApi.nowPlaying();
            const { data: { results: upComing } } = await MovieApi.upComing();
            const { data: { results: popular } } = await MovieApi.popular();

            // state의 값을 가져온 정보 값들로 바꿔ㅏ주자.
            this.setState({
                nowPlaying,
                upComing,
                popular
            })

        } catch {
            this.setState({
                error: "Can't find Movie information."
            })
        } finally {
            // error가 되든 안되든 loading은 false가 되어
            // error나 movie를 보여준다.
            this.setState({
                loading: false
            })
        }
    }




    render() {
        const { nowPlaying, upComing, popular, error, loading } = this.state;
        console.log(this.state);
        return <HomePresenter
            nowPlaying={nowPlaying}
            upComing={upComing}
            popular={popular}
            error={error}
            loading={loading} />
    }


}

