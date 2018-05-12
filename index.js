const BASE_URL = 'https://jsonplaceholder.typicode.com';

let usersDivEl;
let postsDivEl;
let loadButtonEl;
let commentsDivEl;
let albumsDivEl;
let photosDivEl;

function createPhotosList(photos) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];

        // creating title
        const pTitleEl = document.createElement('p');
        pTitleEl.textContent = photo.title;

        // creating img
        const imageEl = document.createElement("img");
        imageEl.src = photo.thumbnailUrl;

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pTitleEl);
        liEl.appendChild(imageEl);

        ulEl.appendChild(liEl);
    }
    return ulEl;

}

function onPhotosReceived() {
    photosDivEl.style.display = 'block';

    const text = this.responseText;
    const photos = JSON.parse(text);

    const divEl = document.getElementById('photo-content')
    while(divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPhotosList(photos));
}


function onMouseoverAlbums() {
    const el = this;
    const albumId = el.getAttribute('data-album-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPhotosReceived);
    xhr.open('GET', BASE_URL + '/photos?albumId=' + albumId);
    xhr.send();
}

function createAlbumList(albums) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];

        // creating title
        const titleEl = document.createElement('strong');
        titleEl.textContent = "Title: ";

        const dataAlbumIdAtt = document.createAttribute('data-album-id');
        dataAlbumIdAtt.value = album.id;

        const pEl = document.createElement('p');
        pEl.appendChild(titleEl);
        pEl.appendChild(document.createTextNode(`: ${album.title}`));
        pEl.setAttributeNode(dataAlbumIdAtt)
        pEl.addEventListener("mouseover", onMouseoverAlbums)

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }
    return ulEl;
}

function onAlbumsReceived() {
    commentsDivEl.style.display = 'none';
    postsDivEl.style.display = 'none';
    photosDivEl.style.display = 'none';
    albumsDivEl.style.display = 'block';

    const text = this.responseText;
    const albums = JSON.parse(text);

    const divEl = document.getElementById('album-content')
    while(divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createAlbumList(albums));
}

function onLoadAlbums() {
    const el = this;
    const userId = el.getAttribute('data-user-id-for-albums');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAlbumsReceived);
    xhr.open('GET', BASE_URL + '/albums?userId=' + userId);
    xhr.send();
}

function createCommentList(comments) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];

        // creating name
        const pNameEl = document.createElement('strong');
        pNameEl.textContent = comment.name;

        // creating email
        const pEmailEl = document.createElement('strong');
        pEmailEl.appendChild(pNameEl);
        pEmailEl.appendChild(document.createTextNode(`; ${comment.email}`));

        // creating body
        const pBodyEl = document.createElement('p');
        pBodyEl.appendChild(pEmailEl);
        pBodyEl.appendChild(document.createTextNode(`: ${comment.body}`));


        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pBodyEl);

        ulEl.appendChild(liEl);
    }
    return ulEl;
}

function onCommentsReceived() {
    commentsDivEl.style.display = 'block';

    const text = this.responseText;
    const comments = JSON.parse(text);

    const divEl = document.getElementById('comment-content')
    while(divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createCommentList(comments));
}


function onMouseoverPosts() {
    const el = this;
    const postId = el.getAttribute('data-post-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onCommentsReceived);
    xhr.open('GET', BASE_URL + '/comments?postId=' + postId);
    xhr.send();
}

function createPostsList(posts) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = post.title;

        const dataPostIdAtt = document.createAttribute('data-post-id');
        dataPostIdAtt.value = post.id;

        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`: ${post.body}`));
        pEl.setAttributeNode(dataPostIdAtt)
        pEl.addEventListener("mouseover", onMouseoverPosts)

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }
    return ulEl;
}

function onPostsReceived() {
    albumsDivEl.style.display = 'none';
    commentsDivEl.style.display = 'none';
    photosDivEl.style.display = 'none';
    postsDivEl.style.display = 'block';

    const text = this.responseText;
    const posts = JSON.parse(text);

    const divEl = document.getElementById('posts-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPostsList(posts));
}

function onLoadPosts() {
    const el = this;
    const userId = el.getAttribute('data-user-id-for-post');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostsReceived);
    xhr.open('GET', BASE_URL + '/posts?userId=' + userId);
    xhr.send();
}

function createUsersTableHeader() {
    const idTdEl = document.createElement('td');
    idTdEl.textContent = 'Id';

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = 'Name';

    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createUsersTableBody(users) {
    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = user.id;

        // creating name cell
        const nameTdEl = document.createElement('td');
        nameTdEl.textContent = user.name;

        // creating button for post cell
        const dataUserIdAttrPost = document.createAttribute('data-user-id-for-post');
        dataUserIdAttrPost.value = user.id;

        const buttonPostsEl = document.createElement('button');
        buttonPostsEl.textContent = "Posts";
        buttonPostsEl.setAttributeNode(dataUserIdAttrPost);
        buttonPostsEl.addEventListener('click', onLoadPosts);

        const buttonPostsTdEl = document.createElement('td');
        buttonPostsTdEl.appendChild(buttonPostsEl);

        // creating button for album cell
        const dataUserIdAttrAlbum = document.createAttribute('data-user-id-for-albums');
        dataUserIdAttrAlbum.value = user.id;

        const buttonAlbumsEl = document.createElement('button');
        buttonAlbumsEl.textContent = "Albums";
        buttonAlbumsEl.setAttributeNode(dataUserIdAttrAlbum);
        buttonAlbumsEl.addEventListener('click', onLoadAlbums);

        const buttonAlbumsTdEl = document.createElement('td');
        buttonAlbumsTdEl.appendChild(buttonAlbumsEl);

        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);
        trEl.appendChild(buttonPostsTdEl);
        trEl.appendChild(buttonAlbumsTdEl);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createUsersTable(users) {
    const tableEl = document.createElement('table');
    tableEl.appendChild(createUsersTableHeader());
    tableEl.appendChild(createUsersTableBody(users));
    return tableEl;
}

function onUsersReceived() {
    loadButtonEl.remove();

    const text = this.responseText;
    const users = JSON.parse(text);

    const divEl = document.getElementById('users-content');
    divEl.appendChild(createUsersTable(users));
}

function onLoadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersReceived);
    xhr.open('GET', BASE_URL + '/users');
    xhr.send();
}

document.addEventListener('DOMContentLoaded', (event) => {
    usersDivEl = document.getElementById('users');
    postsDivEl = document.getElementById('posts');
    commentsDivEl = document.getElementById('comments');
    albumsDivEl = document.getElementById('albums');
    photosDivEl = document.getElementById('photos');
    loadButtonEl = document.getElementById('load-users');
    loadButtonEl.addEventListener('click', onLoadUsers);
});
