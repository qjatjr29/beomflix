import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "API";

export default class extends React.Component {
    state = {
        topRated: null,
        popular: null,
        airingToday: null,
        loading: true,
        error: null
    }

    async componentDidMount() {
        try {
            // API 의 NOWPLAYING 함수로 지금 상영중인 영화 정보를 가져온다
            // 정보들 중에 DATA의 RESULT 값만 가져오기 위해서 객체 비구조화 를 이용
            // result 변수의 이름을 nowPlaying,upComing, popular으로 바꿔주는 방법 (ES6 매직)
            const { data: { results: topRated } } = await tvApi.topRated();
            const { data: { results: popular } } = await tvApi.popular();
            const { data: { results: airingToday } } = await tvApi.airingToday();

            // state의 값을 가져온 정보 값들로 바꿔ㅏ주자.
            this.setState({
                topRated,
                popular,
                airingToday
            })

        } catch {
            this.setState({
                error: "Can't find TV information."
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
        const { topRated, popular, airingToday, loading, error } = this.state;
        console.log(this.state);
        return <TVPresenter
            topRated={topRated}
            popular={popular}
            airingToday={airingToday}
            loading={loading}
            error={error} />
    }
}