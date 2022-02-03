
const dummy = (...blogs) => {
    return 1;
}

const totalLikes = array => {
    const reducer = (prev, ele) => {
        return prev + ele.likes;
    }
    return array.length === 0 ? 0 : array.reduce(reducer, 0);
}

const favoriteBlog = array => {
    const returnMaxLikes = (argArray) => {
        const greaterLike = (prev, ele) => {
            if (ele.likes > prev) {
                return ele.likes;
            } else {
                return prev;
            }
        }
        return argArray.reduce(greaterLike, 0);
    }
    const maxLikes = returnMaxLikes(array);
    let maxLikedBlog;
    for (let i = 0; i < array.length; i++) {
        if (array[i].likes === maxLikes) {
            maxLikedBlog = {
                title: array[i].title,
                author: array[i].author,
                likes: array[i].likes
            };
            // console.log(maxLikedBlog);
            return maxLikedBlog;
        }
    }

    return array.length === 0 ? 0 : maxLikedBlog;
}

const mostBlogs = array => {
    const numOfBlogs = [];
    let mostNoOfBlogs = 0;

    for (let i = 0; i < array.length; i++) {
        let exists = false;
        for (let j = 0; j < numOfBlogs.length; j++) {
            if (numOfBlogs[j].author === array[i].author) {
                numOfBlogs[j].blogs += 1;
                exists = true;
            }
            if (numOfBlogs[j].blogs > mostNoOfBlogs) mostNoOfBlogs = numOfBlogs[j].blogs;
        }
        if (exists === false) {
            numOfBlogs.push({ author: array[i].author, blogs: 1 });
        }
    }

    return numOfBlogs.find(author => author.blogs === mostNoOfBlogs);
}

const mostLikes = array => {
    const authorLikes = [];
    let mostNoOfLikes = 0;

    for (let i = 0; i < array.length; i++) {
        let exists  = false;
        for (let j = 0; j < authorLikes.length; j++) {
            if (authorLikes[j].author === array[i].author) {
                authorLikes[j].likes += array[i].likes;
                exists = true;
            }
            if (authorLikes[j].likes > mostNoOfLikes) mostNoOfLikes = authorLikes[j].likes;
        }
        if (exists === false) {
            authorLikes.push({ author: array[i].author, likes: array[i].likes });
        }
    }

    return authorLikes.find(author => author.likes === mostNoOfLikes);
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };