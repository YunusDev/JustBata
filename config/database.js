if (process.env.NODE_ENV == 'production'){

    module.exports = {

        mongoURI: 'mongodb://Yunus:yunus123@ds217002.mlab.com:17002/just-bata'

    }

}else{

    module.exports = {

        mongoURI: 'mongodb://localhost/justBata'
    }

}