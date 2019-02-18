Vue.component('sidebar',{
    template:`
    <nav class="nav flex-column col-sm-2 border border-primary rounded overflow-auto">
        <a class="nav-link" href="#" id="addArticle" @click="changeContent('addArticle')">Add Article</a>
        <a class="nav-link" href="#" id="articleList" @click="changeContent('listAll')">List of Article</a>
    </nav>
    `,
    methods : {
        changeContent(payload){
            this.$emit('the-content', payload)
        }
    }
})