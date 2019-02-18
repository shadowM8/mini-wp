Vue.component('login-form',{
    methods : {
        loginPage: function () {
            axios
                .post(`http://localhost:3000/users/login`, {
                    email: this.email,
                    password: this.password
                })
                .then(({data}) => {
                    swal("Login berhasil, selamat datang",{
                        button : false,
                        timer : 1500,
                        icon : 'success'
                    })
                    localStorage.setItem('token', data.access_token)
                    localStorage.setItem('id', data.id)
                    this.$emit('login', 'login')
                    this.$emit('login-status', true)
                })
                .catch(err => {
                    this.errorMsg = err.response.data.msg
                })
        },

    },
    data : function(){
        return {
            errorMsg : '',
            email : '',
            password : ''
        }
    },
    template : `
    <div class="container my-1 overflow-auto ">
        <div v-on:click="errorMsg = '' " v-if="errorMsg">
          <h4 class="text-center">error message :</h4>
          <h4 class="text-center text-danger">{{errorMsg}}</h4>
        </div>
        <div class="row">
          <div class="col-12 p-0 d-flex flex-column">
            <img src="/assets/security.svg" alt="" style="height:35%;" class="text-center mx-auto" />
            <h5 class="font-weight-light mb-3 text-center">You shall not pass, please verify your identity</h5>
            <div class="row">
              <div class="col-md-6 mx-auto">
                <form method="POST" v-on:submit.prevent="loginPage">
                  <div class="form-group">
                    <label for="emailInput">Email address</label>
                    <input type="email" class="form-control" id="emailInput" v-model="email" aria-describedby="emailHelp"
                      placeholder="Enter email" />
                  </div>

                  <div class="form-group">
                    <label for="passwordInput">Password</label>
                    <input type="password" class="form-control" id="passwordInput" v-model="password" aria-describedby="emailHelp"
                      placeholder="Enter password" />
                  </div>

                  <button type="submit" class="btn btn-primary btn-block">Log In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
})