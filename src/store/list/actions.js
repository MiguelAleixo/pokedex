import Api from "../../services/api";

export async function requestList({ commit }, region) {
  try {
    commit("getListRequesting");
    const res = await Api.get(`/pokedex/${region}`);
    commit("getListSuccess", res.data);
  } catch (err) {
    commit("getListFailure");
    throw error(err);
  }
}

export async function orderList({ commit }, payload) {
  try {
    commit("orderListRequesting");
    commit("orderListSuccess", payload);
  } catch (err) {
    commit("orderListFailure");
    throw error(err);
  }
}

