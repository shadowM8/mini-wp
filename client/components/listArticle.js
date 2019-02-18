Vue.component('list-article', {
    template : `
    <div class="">        
            <div id="content" class="container overflow-auto pb-3" v-for="(article, index) in filtered">
                <div class="card">
                    <div class="card-header">
                        #{{index+1}} {{ article.title }}
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="d-flex col-sm-2">
                                <img :src="article.image" alt="img" style="width:100%; height: 100px"
                                    class="img-thumbnail">
                            </div>
                            <div class="d-flex flex-column col-sm-10">
                                <h5 class="card-title">{{ article.title }}</h5>
                                <p class="card-text" v-html="article.content"></p>
                                <p class="card-text">{{ formatedDate(article.createdAt) }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                    <a href="#" class="btn btn-warning" @click="startEditArticle(article._id)">Edit Article</a>
                    <a href="#" v-if="edstatus === 'editNow'" class="btn btn-info" @click="edstatus = 'editStop'">Cancel Edit</a>
                    <a href="#" class="btn btn-danger" @click="deleteArticle(article._id)">Delete Article</a>
                    <edit-form v-if="edstatus === 'editNow'" @editstatus="editStatus" :dataFill="editFill"></edit-form>
                    </div>
                </div>
            </div>
    </div>                          
    `,
    props : ['filtered','searchWord'],
    data : function (){
        return {
            editFill : {},
            edstatus : ''
        }
    },
    methods : {
        editStatus : function(value){
            if (value === "editdone") this.statusEdit = ''
        },
        formatedDate: function (tanggal) {
            return moment(tanggal).format('MMMM Do YYYY, h:mm:ss a')             
        },
        startEditArticle: function(id) {
            axios
                .get(`${serverUrl}/articles/${id}`)
                .then(response => {
                    this.editFill.title = response.data.title
                    this.editFill.content = response.data.content
                    this.editFill.id = response.data._id
                    console.log(this.editFill)
                    this.edstatus = 'editNow'
                })
                .catch(error => {
                    console.log(error.response.data.message)
                })
        }
    }
})