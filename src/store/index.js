import React, { createContext, useReducer } from 'react'

const initialState = {
  popular: [],　//空配列をデフォルトに代入
  related: [], //(11)関連動画を保存
  searched: [],
  selected: {},
  term: ''
}

const reducer = (state, action) => {
  switch(action.type){
    case 'SET_POPULAR':
      return { ...state, popular: action.payload.popular }
    case 'SET_RELATED': //(11)←アクションタイプ/↓変更する値
      return { ...state, related: action.payload.related }
    case 'SET_SELECTED':
      return {...state, selected: action.payload.selected}
    case 'SET_SEARCHED':
      return {...state, searched: action.payload.searched}
    case 'SET_TERM':
      return {...state, term: action.payload.term}
    default:
      return state
  }
}

//stateの更新の注意点：initialStateに複数のstateが含まれる場合には、
//必ずスプレット構文を使ってstateを追加してからstateの更新を行うこと
//理由：reducerでのstateの更新はマージではなくstateが上書きされてしまうため、
//今回の用にselectedのみを更新したい場合に、stateを展開せずに行うと、
//popularのデータが消えてしまうから


export const Store = createContext({
  globalState: initialState,
  setGlobalState: () => null
})

export const StoreProvider = ({children}) => {
  const [globalState,setGlobalState] = useReducer(reducer, initialState)
  return (
    <Store.Provider value={{ globalState, setGlobalState }}>{children}</Store.Provider>
  )
}

// export default StoreProvider

//ReactからStoreを作成するために、createContextとuserReducerをインポートする
//stateとdispatch関数を生成するために、initialStateとReducer関数を作成

//reducer関数：２つの値(state,action)を受け取り、１つの値を返す関数
//関数内部ではswitch文を使用し、アクションに含まれるタイプで処理を分ける
//まずは初めのケースとして、SET_POPULARを追加する。
//SET_POPULAR内では、受け取ったアクションpayloadをpopularにセットし、
//オブジェクトにリターンする。デフォルトではstateのみを返すようにする。

//createContextを使って、Storeを作成。
//Storeにはそれぞれの名前をつけ、stateとdispatch関数の初期値を渡す
//初期値の追加ができたらStoreをexportする

//userReducerにinitialStateとreducerを渡して、stateとdispatch関数を生成する
//次にproviderでchildNodeをアップする