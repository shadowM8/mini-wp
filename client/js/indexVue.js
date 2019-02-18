const serverUrl = `http://localhost:3000`
let article = new Vue({
    el: '#vue-miniwp',
    data: {
        articles: [],
        searchResult: [],
        title: '',
        content: '',
        searchWord: '',
        form: '',
        titleSearch: '',
        errorMsg : '',
        image : '',
        isLogin : false,
        currentPage : 'login',
        currentContent : 'listAll'
    },
    created: function () {
        this.getAllArticle()
    },
    methods: {
        newArticleData(value){
            this.articles.unshift(value)
        },
        changeCurrentContent(value){
            this.currentContent = value
        },
        cekLogin(value){
            if(value === 'login') this.currentPage = 'home'
        },
        changeCurrentPage(value){
            this.currentPage = value
        },
        loginCurrentStatus (value){
            this.isLogin = value
        },
        uploadImage: function(e){
            this.image = e.target.files[0]
        },
        deleteArticle: function (id) {
            swal("Are you sure you want to delete this article?", {
                buttons: {
                    cancel: "No, I misclicked",
                    catch: {
                        text: "Yes, delete this",
                        value: "delete",
                    }
                },
            })
                .then((value) => {
                    if (value === 'delete') {
                        return axios
                            .delete(`${serverUrl}/articles/${id}`)
                            .then(response => {
                                swal("Article deleted", "See you again", "success");
                                this.getAllArticle()
                            })
                    } else {
                        this.getAllArticle()
                    }
                })
                .catch(err => {
                    console.log(err)
                })

        },
        getAllArticle: function () {
            console.log('tes')
            axios
                .get(`${serverUrl}/articles`)
                .then(({ data }) => {
                    this.articles = data
                    this.articles.reverse()
                    console.log(article)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        startEditArticle: function (index, id) {
            console.log(index)
            axios
                .get(`${serverUrl}/articles/${id}`)
                .then(response => {
                    this.form = index
                    this.title = response.data.title
                    this.content = response.data.content
                })
                .catch(error => {
                    console.log(error.response.data.message)
                })
        },
        submitEditArticle: function (id) {
            let formData = new FormData
            formData.append('image',this.image)
            formData.append('title', this.title)
            formData.append('content', this.content)
            axios
                .put(`${serverUrl}/articles/${id}`, formData)
                .then(response => {
                    this.form = ''
                    this.getAllArticle()

                })
                .catch(err => {
                    console.log(err)
                })
        },
        
        getArticleByTitle: function (title) {
            console.log('ini', title)
            axios
                .get(`${serverUrl}/articles/?title=${title}`)
                .then(response => {
                    console.log(response.data)
                    if (response.data.length === 0) {
                        this.currentContent = 'no articles found'
                    }
                    else {
                        this.currentContent = 'search'       
                        this.searchResult = response.data
                    }
                })
                .catch(err => {
                    console.log('masuk err')
                    console.log(err)
                })
        },
        formatedDate: function (tanggal) {
            return moment(tanggal).format('MMMM Do YYYY, h:mm:ss a')             
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    computed: {
        filtered: function () {
            return this.articles.filter(article => article.title.includes(this.searchWord))
        }
    }

})