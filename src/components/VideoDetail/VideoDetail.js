import React, { useContext } from 'react'
// import { useLocation } from 'react-router-dom'
// import { fetchSelectedData } from '../../apis/index'
import { Store } from '../../store/index'
import VideoPlay from '../VideoPlay/VideoPlay'
import Style from './VideoDetail.module.scss'
import Linkify from 'react-linkify'
const VideoDetail = () => {
  const { globalState } = useContext(Store)
  // const location = useLocation()

  // const setSelectedVideo = async () => {
  //   const searchParams = new URLSearchParams(location.search)
  //   const id = searchParams.get('v')
  //   await fetchSelectedData(id).then((res) => {
  //     const item = res.data.items.shift()
  //     setGlobalState({ type: 'SET_SELECTED', payload: {selected: item}})
  //   })
  // }

  // useEffect(() => {
  //   setSelectedVideo()
  // }, [location.search])

//(11)useEffect内のsetSelectedVideo関数が、
//コンポーネントの配置時のみの実行になっていたため、
//これをURLが変わったタイミングでも再度実行するように、
//useEffectのdependencyリストに[location.search]を追加した

  return globalState.selected && globalState.selected.id? (
    <div className={Style.wrap}>
      <VideoPlay id={globalState.selected.id} />
      <p>{globalState.selected.snippet.title}</p>
      <hr />
      <Linkify>
        <pre>{globalState.selected.snippet.description}</pre>
      </Linkify>
    </div>
  ) : (<span>no data</span>) //←falseの処理：三項演算子(?：)
}

export default VideoDetail

//⑨リスト選択後の遷移先であるマッチページに動画詳細を表示する
//まずはVideoDetailコンポーネントを作成し、
//クエリパラメータとして渡している動画のidを受け取れるように実装する

//l2:URLからクエリパラメータを取得するために、useLocationをインポート
//現在のURLのパスやsearchパラメータの情報を取得できる！後でアクセス

//l5:useEffectを使用してコンポーネントが配置(マウント)された
//タイミングで、searchパラメータをコンソールに吐き出す

//locationからSearchParamsを取得するには、
//URLSearchParamsというコンストラクターに、locationオブジェクトを渡し、
//newすることで生成できる

//location.searchには、URLの?マーク以降がStringとして格納されている
//URLSearchParamsに渡すことで、Stringからデータを取得しやすいに、
//オブジェクトに変更してくれる

//l8:idはv=という形でURLに含まれているので、searchParams.get('v')
//とすることで、パラメータを取得する

//→今作成したVideoDetailコンポーネントをWatchコンポーネントに追加する

//l25:整形済みの形をそのまま表示したい場合には、preタグを使う