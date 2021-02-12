export function getListRequesting(state) {
  state.isRequesting = true;
}

export function getListSuccess(state, list) {
  const order = false;
  state.isRequesting = false;
  state.list = {
    count: list["pokemon_entries"].length,
    page: 1,
    order,
    results: list["pokemon_entries"],
    name: list.name
  };
}

export function getListFailure(state) {
  state.list = {
    count: 0,
    page: 1,
    order: false,
    results: [],
    name: ""
  };
}

export function orderListRequesting(state) {
  state.isRequesting = true;
}

export function orderListSuccess(state, payload) {
  const { order, page, results } = payload;
  state.isRequesting = false;
  state.list = {
    ...state.list,
    order,
    page,
    results
  };
}

export function orderListFailure(state) {
  state.isRequesting = false;
  state.list = {
    count: 0,
    page: 1,
    order: false,
    results: [],
    name: ""
  };
}
