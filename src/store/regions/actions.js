import Api from "../../services/api";

export async function requestRegions({ commit }, pagination) {
  try {
    commit("getRegionsRequesting");
    const offset = pagination.rowsPerPage * (pagination.page - 1);
    const res = await Api.get(
      `/pokedex?limit=${pagination.rowsPerPage}&offset=${offset}`
    );
    res.data.page = pagination.page;
    commit("getRegionsSuccess", res.data);
  } catch (err) {
    commit("getRegionsFailure");
    throw error(err);
  }
}

export async function orderRegions({ commit }, payload) {
  try {
    commit("orderRegionsRequesting");
    commit("orderRegionsSuccess", payload);
  } catch (err) {
    commit("orderRegionsFailure");
    throw error(err);
  }
}
