window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});

const form = document.getElementById('article-form');
form.addEventListener("submit", submitArticle);

const titleInput = document.getElementById('title-input');
const contentEditor = document.getElementById('editor');

async function submitArticle(e) {
    e.preventDefault();
    
    const token = localStorage.getItem("Token");
    const title = titleInput.value;
    const content = contentEditor.children[0].innerHTML;

    console.log(content);

    const response = await fetch('https://odbproject.herokuapp.com/api/articles/createarticle', {
        method: "POST",
        body: JSON.stringify({title, content}),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        }
    });

    if(response.status === 201) {
        window.location.replace('./myarticles.html');
    }
}

let toolbarOptions = [
    ["bold", "italic", "underline", "strike"],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['image', 'video', 'link']
  ];

let quill = new Quill("#editor", {
    modules: {
        toolbar: toolbarOptions,
        imageDrop: true,
        videoResize: {},
        imageResize: {
            displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        }
    },
    theme: "snow",
});


