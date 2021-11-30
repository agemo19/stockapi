export default function (state, action) {
  switch (action.type) {
    case 'DATA_LOADING':
      return {
        ...state,
        isLoading: true,
      };

    case 'DATA_LOADED':
      return {
        ...state,
        isLoading: false,
        stocks: action.payload,
      };

    case 'SINGLE_LOADED':
      let indicatorlist = [];
      let indicatorlistSelected = [];
      if (state.indicatorlist.length + state.indicatorlistSelected.length === 0) {
        indicatorlist = Object.keys(action.payload.stockdata.balance).concat(
          Object.keys(action.payload.stockdata.income).filter((i) => i !== 'Revenue')
        );
        indicatorlistSelected = ['Revenue'];
      } else {
        indicatorlist = state.indicatorlist;
        indicatorlistSelected = state.indicatorlistSelected;
      }

      return {
        ...state,
        isLoading: false,
        indicatorlist: indicatorlist,
        indicatorlistSelected: indicatorlistSelected,
        compare: action.loadType === 1 ? state.compare : action.loadType === 2 ? action.payload : state.single,
        single: action.loadType !== 2 ? action.payload : state.single,
        err: null,
      };

    case 'SINGLE_ERROR':
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };

    case 'ARTICLE_LOADED':
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };

    case 'ALL_RIGHT':
      return {
        ...state,
        indicatorlistSelected: state.indicatorlistSelected.concat(state.indicatorlist),
        indicatorlist: [],
      };

    case 'RIGHT':
      let newRight = state.indicatorlist;
      for (let i1 = 0; i1 < action.payload.length; i1++) {
        newRight = newRight.filter((i2) => i2 !== action.payload[i1]);
      }
      return {
        ...state,
        indicatorlistSelected: state.indicatorlistSelected.concat(action.payload),
        indicatorlist: newRight,
      };

    case 'LEFT':
      let newLeft = state.indicatorlistSelected;
      for (let i1 = 0; i1 < action.payload.length; i1++) {
        newLeft = newLeft.filter((i2) => i2 !== action.payload[i1]);
      }
      return {
        ...state,
        indicatorlist: state.indicatorlist.concat(action.payload),
        indicatorlistSelected: newLeft,
      };

    case 'ALL_LEFT':
      return {
        ...state,
        indicatorlist: state.indicatorlistSelected.concat(state.indicatorlist),
        indicatorlistSelected: [],
      };

    default:
      return state;
  }
}
