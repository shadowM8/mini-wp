Vue.component('main-content',{
    template : `
    <div class="col-sm-10 overflow-auto" style="height:450px">
            
        <div class="card" style="width:200px"  v-if="currentContent === 'search' ">
            <a href="#" class="btn btn-danger" @click="currentContent = '' ">Clear Search Results</a>
        </div>
        <br>
        <div id="search-content" class="container overflow-auto pb-3"
                v-if="currentContent === 'search'"
            v-for="(search, index) in searchResult">
            <div class="card">
                <div class="card-header">
                    #{{index+1}} {{ search.title }}
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ search.title }}</h5>
                    <p class="card-text">{{ search.content }}</p>
                    <p class="card-text">{{ search.created_at }}</p>
                    <a href="#" class="btn btn-warning">Baca lebih detail</a>
                </div>
            </div>
        </div>

        <div v-if="currentContent==='no articles found'">
            <img src="/assets/404.svg" alt="" style="height:200px;" class="d-flex justify-content-center text-center mx-auto" />
            <h5 class="font-weight-light mb-3 text-center">No articles found</h5>
        </div>

        <div class="card" v-if="currentContent === 'addArticle'" >

            <div class="card-header" >
                Add Article
            </div>
            <div class="card-body">
                <form method="POST" v-on:submit.prevent="addArticle" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Article Title</label>
                        <input type="text" class="form-control" v-model="title" id="name"
                            placeholder="Enter Article Name/Title">
                        <small id="emailHelp" class="form-text text-muted">make it descriptive.</small>
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input type="file" class="form-control" @change="uploadImage">
                    </div>
                    <div class="form-group">
                        <label>Content</label>
                        <!-- <textarea class="form-control" v-model="content" id="description" rows="2"></textarea> -->
                        <wysiwyg v-model="content" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>

            </div>
        </div>

        <div class="container d-flex justify-content-center ">
            <div class="searchbar" v-if="currentContent === 'listAll' " >
                <input class="search_input" type="text" v-model="searchWord" placeholder="Search...">
                <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
            </div>
        </div>
        <br>

        <div id="content" class="container overflow-auto pb-3" v-if="currentContent === 'listAll' " 
            v-for="(article, index) in filtered">
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
                    <br>
                    <div>
                        <a href="#" class="btn btn-warning"
                            v-on:click="startEditArticle(index,article._id)">Edit Article</a>
                        <a href="#" class="btn btn-danger" v-on:click="deleteArticle(article._id)">Delete
                            Article</a>
                        <div v-if="form === index ">
                            <form method="POST" v-on:submit.prevent="submitEditArticle(article._id)">
                                <div class="form-group">
                                    <label>Article Title</label>
                                    <input type="text" class="form-control" v-model="title" id="name">
                                    <small id="emailHelp" class="form-text text-muted">make it
                                        descriptive.</small>
                                </div>
                                <div class="form-group">
                                    <label>Content</label>
                                    <!-- <textarea class="form-control" v-model="content" id="description" rows="2"></textarea> -->
                                    <wysiwyg v-model="content" value="article.content" />
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                                <a href="#" class="btn btn-warning"
                            v-on:click="form = ''">Cancel Edit</a>    
                            </form>
                        </div>
                        <div v-else></div>
                    </div>



                </div>
            </div>
        </div>
    </div>
    `
})