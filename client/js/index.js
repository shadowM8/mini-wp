function clickHome(){
    $(`#content`).fadeOut(400, appendHome)
    $(`#content`).fadeIn()
}

function appendHome(){
    $(`#content`).empty()
    $(`#content`).append(`
    <div class="card">
        <div class="card-header">
        Home
        </div>
        <div class="card-body">
            <h5 class="card-title">Home</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    `)
}

function clickSetting(){
    $(`#content`).fadeOut(400, appendSetting)
    $(`#content`).fadeIn()
}

function appendSetting(){
    $(`#content`).empty()
    $(`#content`).append(`
    <div class="card">
        <div class="card-header">
        Setting
        </div>
        <div class="card-body">
            <h5 class="card-title">Setting</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-warning">Go somewhere</a>
        </div>
    </div>
    `)
}

function appendForm(){
    $(`#content`).empty()
    $(`#content`).append(`
    <div class="card">
        <div class="card-header">
        Add Article
        </div>
        <div class="card-body" id="articleForm">
            <form >
                <div class="form-group">
                    <label>Article Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter Article Name">
                    <small id="emailHelp" class="form-text text-muted">make it descriptive.</small>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" id="description" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
    
    `)
}



$(`#addArticle`).click(function(){
    $(`#content`).fadeOut(400, appendForm)
    $(`#content`).fadeIn()
})


$(`#articleList`).click(function(){
    $(`#content`).fadeOut(400, appendArticle)
    $(`#content`).fadeIn()
})

function appendArticle(){
    $(`#content`).empty()
    $(`#content`).append(`
    <div class="card">
        <div class="card-header">
        Article #1
        </div>
        <div class="card-body">
            <h5 class="card-title">About Foo</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-warning">Like this</a>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
        Article #2
        </div>
        <div class="card-body">
            <h5 class="card-title">About Bar</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-warning">Like this</a>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
        Article #3
        </div>
        <div class="card-body">
            <h5 class="card-title">About Fooz</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-warning">Like this</a>
        </div>
    </div>
    `)
}

$(`#logOut`).click(function(){
    swal("Are you sure you want to log out from Mini WP?", {
        buttons: {
          cancel: "No, bring me back",
          catch: {
            text: "Yes, Im tired",
            value: "logout",
          }
          
        },
      })
      .then((value) => {
        switch (value) {

       
          case "logout":
            swal("Bye bye!", "See you again", "success");
            break;
       
          default:
            swal("Ok, enjoy your time !");
        }
      })
      .catch( err => {
          console.log(err)
      });
})