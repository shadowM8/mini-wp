// const serverUrl = `http://localhost:3000`

Vue.component('add-article',{
    template : `
    <div class="card" >
            
            <div class="card-header" >
                Add Article
            </div>
                    <div class="card-body">
                        <form method="POST" v-on:submit.prevent="addArticle" enctype="multipart/form-data">
                            <div class="form-group">
                                <label>Article Title</label>
                                <input type="text" class="form-control" v-model="title" id="name"
                                    placeholder="Enter Article Name/Title">
                            </div>
                            <div class="form-group">
                                <label>Image</label>
                                <input type="file" class="form-control" @change="uploadImage">
                            </div>
                            <div class="form-group">
                                <label>Content</label>
                                <wysiwyg v-model="content" />
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
    </div>
    `,
    data : function(){
        return {
            title : '',
            content : '',
            image : ''
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    methods : {
        uploadImage: function(e){
            this.image = e.target.files[0]
        },
        addArticle: function () {
            let formData = new FormData
            formData.append('image',this.image)
            formData.append('title', this.title)
            formData.append('content', this.content)
            axios
                .post(`${serverUrl}/articles`, formData)
                .then(({data}) => {
                    this.title = ''
                    this.content = ''
                    this.$emit('add-new',data)
                    // return this.getAllArticle()
                })
                .catch(error => {
                    console.log(error);
                    // this.errorMsg = error.response.data.message
                })
        }
    }
})