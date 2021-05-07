const userModule = {
    state: () => ({ 
        user: [{
            name: 'test',
            password: 'password',
            credit: 0
        }]
    }),
    getters: () => ({
        getUser () {
            return state.user
        }
    })
}