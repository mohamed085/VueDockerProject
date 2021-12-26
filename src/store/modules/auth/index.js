import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"

export default {
    state() {
        return {
            token: null,
            userId: null,
            name: null,
            photo: null,
        }
    },
    mutations,
    getters,
    actions
}