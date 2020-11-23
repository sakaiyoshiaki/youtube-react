import axios from 'axios'

// const KEY = 'AIzaSyAqOub5Gx_6WD26bKdUU3ksYANbvFTBBig'
  const KEY = 'AIzaSyDHQTY_0IrhXFHR9Uqe2-uUfORRYI9-DZY'
//Yotube APIキーの取得
const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3'
})
//リストの取得(v3/以下でvideo・searchと変更することで、リクエストの用途が変更される)
//baseURLをaxiosのcreateメソッドに追加し、Youtube用のHTTPインスタンスを生成

const params = {
  part: 'snippet',
  maxResults: 40,
  key:KEY,
  regionCode: 'JP',
  type:'video',
}
export const fetchPopularData = async () => {
  return await youtube.get('/videos',{
    params:{
      ...params,
      chart: 'mostPopular'
    }
  })
}

export const fetchSelectedData = async (id) => {
  return await youtube.get('videos',{
    params: {
      ...params,
      id　//引数のidをセット
    }
  })
}

export const fetchRelatedData = async(id) => {
  return await youtube.get('/search',{
    params:{
      ...params,
      relatedToVideoId: id //(11)関連動画の取得ロジックの追加
    }
  })
}

export const fetchSearchData = async (query) => {
  return await youtube.get('/search', {
    params: {
      ...params,
      q: query
    }
  })
}
// (14)＜検索ワードを使ってAPIからデータを取得する方法＞
// apiファイルで検索用にfetchSearchData関数を用意。
// HTTPメソッドであるyoutubeのgetメソッドに'/search'パスを渡し、
// 第二引数に共通paramsと検索ワードを渡す

// 次に検索結果を保持するためのGlobalStateを用意する。(store/index.js)
// initialStateにsearched stateを追加し、
// reduceのケースにSET_SEARCHEDを追加する

// Searchページコンポーネント(pages/Search.js)に移り、
// setSearchResult関数内で作成したfetchSearchData関数を呼び出す


//youtubeインスタンスを使用して、トップページに表示するトレンドリスト用にメソッドを実装
//async:非同期関数、リクエスト結果を返したいのでreturnを使用。
//await後にリクエスト処理を追加。youtubeインスタンスのgetメソッドを使用。
//第一引数：パス,第二引数：パラメータを追加する

//l23:fetchPopularData同様、asyncを使って、リクエスト用のメソッドを追加していく
//fetchSelectedData(関数名)、asyncを加え、idを引数として受け取る

//l20,l30：共通部分はスプレット構文を使って展開し、追加していく