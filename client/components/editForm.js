Vue.component('edit-form', {
    template: `
    <div class="card" >
            
            <div class="card-header" >
                Add Article
            </div>
                    <div class="card-body">
                        <form method="POST" v-on:submit.prevent="submitEditArticle(dataFill.id)" enctype="multipart/form-data">
                            <div class="form-group">
                                <label>Article Title</label>
                                <input type="text" class="form-control" v-model="title" id="name"
                                    value="dataFill.title">
                            </div>
                            <div class="form-group">
                                <label>Image</label>
                                <input type="file" class="form-control" @change="uploadImage">
                            </div>
                            <div class="form-group">
                                <label>Content</label>
                                <wysiwyg v-model="content" value="dataFile.content" />
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
    </div>
    `,
    props: ['dataFill'],
    data: function () {
        return {
            title: '',
            content: '',
            image: ''
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    methods: {
        uploadImage: function (e) {
            this.image = e.target.files[0]
        },
        submitEditArticle: function (id) {
            let formData = new FormData
            formData.append('image', this.image)
            formData.append('title', this.title)
            formData.append('content', this.content)
            axios
                .put(`${serverUrl}/articles/${id}`, formData)
                .then(response => {

                    this.$emit('editstatus', 'editdone')

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})