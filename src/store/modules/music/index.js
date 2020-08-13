import state from './state'
import getter from './getter'
import mutations from './mutations'
import actions from './actions'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}