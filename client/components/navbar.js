Vue.component('navbar-wp',{
    template : `
    <header class="container-fluid">
            <div class="row border bg-light">
                <div class="d-flex justify-content-start col-sm">
                    <a class="d-flex align-items-center mr-3 text-primary text-decoration-none" href="#"><i
                            class="fab fa-galactic-senate mr-2"></i> Mini WP</a>
                </div>
                <div class="d-flex justify-content-center col-sm">
                    <div v-if="islogin" class="searchbar d-flex align-items-center">
                        <form v-on:submit.prevent="getArticleByTitle">
                            <input class=" mr-1" type="text" v-model="titleSearch" placeholder="Search...">
                        </form>
                    </div>

                </div>
                <div class="col-sm d-flex justify-content-end">
                    <div class="g-signin2 my-2 mr-1" data-onsuccess="onSignIn"></div>
                    <button v-if="!islogin" @click="changePage('login')" class="btn btn-outline-primary my-2 mr-1">Login</button>
                    <button v-if="!islogin" @click="changePage('register')" class="btn btn-outline-primary my-2 mr-1">Register</button>
                    <button v-if="islogin" @click="logout" class="btn btn-outline-primary my-2 mr-1">Logout</button>
                    

                </div>
            </div>
        </header>
    `,
    methods : {
        onSignIn(googleUser) {
            let profile = googleUser.getBasicProfile
            const id_token = googleUser.getAuthResponse().id_token
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            axios
                .post(`${serverUrl}/users/googleVerify`,{
                    token: id_token,
                })
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        changePage(payload) {
            this.$emit('change-page',payload)
        },
        logout(){
            localStorage.clear()
            this.$emit('login-status', false)
            this.$emit('change-page','login')
        },
        getArticleByTitle(){
            this.$emit('search-tag', this.titleSearch)
            this.titleSearch = ''
        }
    },
    data : function (){
        return {
            titleSearch : ''
        }
    },
    props : ['islogin']

})