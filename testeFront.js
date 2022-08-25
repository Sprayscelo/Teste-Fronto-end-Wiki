let mixin = {
    methods: {
        listarUsuarios(page) {

            this.$http.get('https://reqres.in/api/users?page=1')
            .then(response => {
                if(!localStorage.getItem('usuarios')) {
                    localStorage.setItem('usuarios', JSON.stringify(response.data.data))
                }
            })
            this.$http.get('https://reqres.in/api/users?page=2')
            .then(response => {
                if (!localStorage.getItem('usuarios2')) {
                    localStorage.setItem('usuarios2', JSON.stringify(response.data.data))
                }
            
            }, erro => {
                console.log(erro)
            })

            if(page == 1) {
                this.users = JSON.parse(localStorage.getItem('usuarios'))
            }else { 
                this.users = JSON.parse(localStorage.getItem('usuarios2'))
            }
    }
    },

}

const menu_bar = Vue.component('menu-bar', {
    template: "#menu",
    methods: {
        
    }
})

const listarUsuarios = Vue.component('listar-usuarios', {
    template: "#listarUsuarios",
    data() {
        return {
            users: '',
        }
        
    },

    created() {
        this.listarUsuarios(1)
    },

    methods: {
    //     listarUsuarios(page) {
    //         this.$http.get(`https://reqres.in/api/users?page=${page}`)
    //         .then(response => {
    //         if(!localStorage.setItem('usuarios', JSON.stringify(response.data.data))) {
    //             localStorage.setItem('usuarios', JSON.stringify(response.data.data))
    //         }
    //     }, erro => {
    //         console.log(`Erro` + erro)
    //     })
    // }
    },
    mixins: [mixin]
})

const cadastrarUsuarios = Vue.component('cadastrar-usuarios', {
    template: '#cadastrarUsuarios',
    data() {
        return {
            users: {
                id: '',
                first_name: '',
                last_name: '',
                job: '',
                avatar: '',
                email: ''
            }
        }
    },
    methods: {
        cadastrarUsuarios() {
            let th = this
            this.$http.post('https://reqres.in/api/users', {"name": this.users.first_name + ' ' + this.users.last_name, "job": this.users.job})
            .then(response => {
                this.users.id = response.data.id
                let pegarUsuarios1 = JSON.parse(localStorage.getItem('usuarios'))
                let pegarUsuarios2 = JSON.parse(localStorage.getItem('usuarios2'))
                if(pegarUsuarios1.length <= pegarUsuarios2.length) {
                    pegarUsuarios1.push(th.users)
                    localStorage.setItem('usuarios', JSON.stringify(pegarUsuarios1))
                }
                else {
                    pegarUsuarios2.push(th.users)
                    localStorage.setItem('usuarios2', JSON.stringify(pegarUsuarios2))
                }
                
                
            }, erro => {
                console.log(erro)
            })
        }
    }
})

Vue.use(VueRouter)

Vue.prototype.$eventHub = new Vue()

var router = new VueRouter({
    routes: [
        {path: '/listarUsuarios', component: listarUsuarios},
        {path: '/cadastrarUsuarios', component: cadastrarUsuarios}
    ]
})

let app = new Vue ({
    router,

    el: "#app",

    mixins: [mixin],

    data: {
        
    },

    methods: {
        
    }
})

