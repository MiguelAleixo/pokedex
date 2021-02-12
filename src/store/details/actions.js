import Api from '../../services/api'

export async function getDetails ({ commit }, name) {
    try {
        commit('getDetailsRequesting')
        const res = await Api.get(`/pokemon/${name}`)
        commit('getDetailsSuccess', res.data)
    } catch (err) {
        commit('getDetailsFailure')
        throw error(err)
    }
}
