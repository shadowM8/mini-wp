Vue.component('register-form',{
    methods : {
        register: function () {
            axios
                .post(`http://localhost:3000/users/register`, {
                    email: this.email,
                    password: this.password
                })
                .then(({data}) => {
                    this.email = ''
                    this.password = ''
                    // this.$emit('success-register','success')
                    swal("User berhasil dibuat, silahkan login",{
                        button : false,
                        timer : 1500,
                        icon : 'success'
                    })
                    this.$emit('change-page','login')
                })
                .catch(err => {
                    this.errorMsg = err.response.data.msg
                    swal(`${this.errorMsg}`,{
                        button : false,
                        timer : 2000,
                        icon : 'error'
                    })
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
    <div class="container my-4 ">
        <div v-on:click="errorMsg = '' " v-if="errorMsg">
          <h4 class="text-center">error message :</h4>
          <h4 class="text-center text-danger">{{errorMsg}}</h4>
        </div>
        <div class="row">
          <div class="col-12 p-0 d-flex flex-column">
            <img src="/assets/register.svg" alt="" style="height:35%;" class="text-center mx-auto" />
            <h5 class="font-weight-light mb-3 text-center">Register Form</h5>
            <div class="row">
              <div class="col-md-6 mx-auto">
                <form method="POST" v-on:submit.prevent="register">
                  <div class="form-group">
                    <label for="emailInput">Email address</label>
                    <input type="email" class="form-control" id="registerEmail" v-model="email" aria-describedby="emailHelp"
                      placeholder="Enter email" />
                  </div>

                  <div class="form-group">
                    <label for="passwordInput">Password</label>
                    <input type="password" class="form-control" id="registerPassword" v-model="password" aria-describedby="emailHelp"
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